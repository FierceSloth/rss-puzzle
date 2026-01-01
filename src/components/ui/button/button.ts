import { IComponentChild } from '@/common/types/interfaces';
import { Component } from '@/common/base-component';
import styles from './button.module.scss';

interface IProps extends IComponentChild {
  onClick?: (event: MouseEvent) => void;
  type?: 'button' | 'submit' | 'reset';
  text?: string;
}

type IListener = null | ((event: MouseEvent) => void);

export class Button extends Component<HTMLButtonElement> {
  private listener: IListener;

  constructor({ className = [], children = [], type = 'button', text = '', onClick }: IProps) {
    super({ tag: 'button', text, className: [styles.button, ...className], attrs: { type } }, ...children);

    if (typeof onClick === 'function') {
      this.addListener('click', onClick);
      this.listener = onClick;
    } else {
      this.listener = null;
    }
  }

  public removeClickListener(): this {
    if (this.listener) {
      super.removeListener('click', this.listener);
      this.listener = null;
    }
    return this;
  }
}
