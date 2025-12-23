import { IComponentChild } from '@app-types/types';
import { Component } from '@/common/base-component';
import styles from './input.module.scss';

interface IChild extends IComponentChild {
  type: string;
  labelText: string;
  placeholder: string;
}

export class BaseInput extends Component {
  public readonly inputEl: HTMLInputElement;

  public readonly errorEl: HTMLElement;

  constructor({ otherClasses = [], type = 'text', labelText = '', placeholder = '' }: IChild) {
    super({ className: styles.inputContainer });

    const inputAttrs = {
      type,
      placeholder,
    };

    const label = new Component<HTMLLabelElement>({ tag: 'label', className: styles.label, text: labelText });
    const input = new Component<HTMLInputElement>({
      tag: 'input',
      className: [styles.input, ...otherClasses],
      attrs: inputAttrs,
    });

    const inputWrapper = new Component({ className: styles.inputWrapper }, input);

    const error = new Component({ className: styles.errorText });

    this.appendChildren([label, inputWrapper, error]);

    this.inputEl = input.node;
    this.errorEl = error.node;
  }

  public getValue(): string {
    return this.inputEl.value;
  }

  // TODO: add validation methods and error message
}
