import { Component } from '@common/base-component';
import { BaseCard } from '@components/ui/card/card';
import { Logo } from '@components/ui/logo/logo';
import { BaseInput } from '@components/ui/input/input';
import { Button } from '@components/ui/button/button';
import type { Router } from '@/router/router';
import { loginMessages } from '@/common/constants/messages';

import styles from './login-page.module.scss';
import { PagePath } from '@/common/enums/enums';
import { isLoginValid, validateName, validateSurName } from '@/common/utils/validation';
import { dataManager } from '@/common/utils/data-manager';

export class LoginPage {
  private container: Component;
  private router: Router;

  constructor(container: Component, router: Router) {
    this.container = container;
    this.router = router;
  }

  render(): void {
    // ================== Logo =================

    const logo = new Logo({ className: [styles.logo] });
    const secondText = new Component({ tag: 'p', className: styles.text, text: loginMessages.secondText });

    const logoContainer = new Component({ className: styles.logoContainer }, logo, secondText);

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

    const loginBtn = new Button({
      className: [styles.loginBtn],
      text: loginMessages.btnText,
      onClick: () => {
        dataManager.setUser({ name: nameInput.getValue(), surname: surNameInput.getValue() });
        this.router.navigate(PagePath.MAIN);
      },
    });

    loginBtn.node.disabled = true;

    // ================ Validation ================

    const inputSuccess = {
      name: false,
      surname: false,
    };

    nameInput.addListener('input', () => {
      const result = validateName(nameInput.getValue());

      if (!result.isValid && result.errorMessage) {
        nameInput.setError(result.errorMessage);
        inputSuccess.name = false;
      } else {
        nameInput.setSuccess();
        inputSuccess.name = true;
      }

      loginBtn.node.disabled = !isLoginValid([inputSuccess.name, inputSuccess.surname]);
    });

    surNameInput.addListener('input', () => {
      const result = validateSurName(surNameInput.getValue());

      if (!result.isValid && result.errorMessage) {
        surNameInput.setError(result.errorMessage);
        inputSuccess.surname = false;
      } else {
        surNameInput.setSuccess();
        inputSuccess.surname = true;
      }

      loginBtn.node.disabled = !isLoginValid([inputSuccess.name, inputSuccess.surname]);
    });

    // ================== Containers =================

    const card = new BaseCard({ className: [styles.card], children: [logoContainer, inputWrapper, loginBtn] });

    const pageContainer = new Component({ className: ['pageContainer', styles.loginContainer] }, card);
    this.container.append(pageContainer);
  }
}
