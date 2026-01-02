import { Component } from '@common/base-component';
import { BaseCard } from '@components/ui/card/card';
import { BaseInput } from '@components/ui/input/input';
import { Button } from '@components/ui/button/button';
import { loginMessages } from '@/common/constants/messages';

import styles from './login-page.module.scss';
import { PagePath } from '@/common/enums/enums';
import { isLoginValid, validateInput } from '@/common/utils/validation';
import { dataManager } from '@/common/utils/data-manager';
import { LogoLogin } from '@/components/ui/logo-login/logo-login';
import { appEmitter } from '@/common/utils/emitter';

export class LoginPage {
  private container: Component;

  constructor(container: Component) {
    this.container = container;
  }

  render(): void {
    // ================== Logo =================

    const logo = new LogoLogin({});

    // =================== Inputs =================

    const nameInput = new BaseInput({
      className: [styles.input],
      type: 'text',
      labelText: loginMessages.nameLabel,
      placeholder: loginMessages.namePlaceholder,
    });
    const surNameInput = new BaseInput({
      className: [styles.input],
      type: 'text',
      labelText: loginMessages.surnameLabel,
      placeholder: loginMessages.surnamePlaceholder,
    });

    const inputWrapper = new Component({ className: [styles.inputWrapper] }, nameInput, surNameInput);

    // ================== Button =================

    const loginButton = new Button({
      className: [styles.loginButton],
      text: loginMessages.buttonText,
      onClick: () => {
        dataManager.setUser({ name: nameInput.getValue(), surname: surNameInput.getValue() });
        appEmitter.emit('router:navigate', PagePath.MAIN);
      },
    });

    loginButton.node.disabled = true;

    // ================ Validation ================

    const inputSuccess = {
      name: false,
      surname: false,
    };

    nameInput.addListener('input', () => {
      const result = validateInput(nameInput.getValue(), 3);

      if (!result.isValid && result.errorMessage) {
        nameInput.setError(result.errorMessage);
        inputSuccess.name = false;
      } else {
        nameInput.setSuccess();
        inputSuccess.name = true;
      }

      loginButton.node.disabled = !isLoginValid([inputSuccess.name, inputSuccess.surname]);
    });

    surNameInput.addListener('input', () => {
      const result = validateInput(surNameInput.getValue(), 4);

      if (!result.isValid && result.errorMessage) {
        surNameInput.setError(result.errorMessage);
        inputSuccess.surname = false;
      } else {
        surNameInput.setSuccess();
        inputSuccess.surname = true;
      }

      loginButton.node.disabled = !isLoginValid([inputSuccess.name, inputSuccess.surname]);
    });

    // ================== Containers =================

    const card = new BaseCard({ className: [styles.card], children: [logo, inputWrapper, loginButton] });

    const pageContainer = new Component({ className: ['pageContainer', styles.loginContainer] }, card);
    this.container.append(pageContainer);
  }
}
