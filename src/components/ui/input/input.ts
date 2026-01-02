import { IComponentChild, IValidateResult } from '@/common/types/interfaces';
import { Component } from '@/common/base-component';
import styles from './input.module.scss';

interface IProps extends IComponentChild {
  type?: string;
  labelText?: string;
  placeholder?: string;
  validator?: (value: string) => IValidateResult;
}

export class BaseInput extends Component {
  private inputEl: HTMLInputElement;
  private errorEl: HTMLElement;
  private valid = false;

  constructor({ className = [], type = 'text', labelText = '', placeholder = '', validator }: IProps) {
    super({ className: [styles.сontainer, ...className] });

    const inputAttrs = {
      type,
      placeholder,
    };

    const label = new Component<HTMLLabelElement>({ tag: 'label', className: styles.label, text: labelText });
    const input = new Component<HTMLInputElement>({ tag: 'input', className: styles.input, attrs: inputAttrs });

    const inputWrapper = new Component({ className: styles.inputWrapper }, input);

    const error = new Component({ className: styles.errorText });

    this.appendChildren([label, inputWrapper, error]);

    this.inputEl = input.node;
    this.errorEl = error.node;

    if (validator) {
      this.addListener('input', () => {
        const result = validator(this.getValue());

        if (!result.isValid && result.errorMessage) {
          this.setError(result.errorMessage);
          this.valid = false;
        } else {
          this.setSuccess();
          this.valid = true;
        }
      });
    }
  }

  public getValue(): string {
    return this.inputEl.value;
  }

  public setError(message: string) {
    this.removeClass(styles.success);
    this.addClass(styles.error);
    this.errorEl.textContent = message;
  }

  public setSuccess() {
    this.removeClass(styles.error);
    this.errorEl.textContent = '';
    this.addClass(styles.success);
  }

  public isValid(): boolean {
    return this.valid;
  }
}
