import { Component } from '@common/base-component';
import { IComponentChild } from '@/common/types/interfaces';

import styles from './toggle-button.module.scss';

interface IProps extends IComponentChild {
  onClick?: (event: MouseEvent) => void;
  attrs: IImageAttrs;
}

interface IImageAttrs {
  src: string;
  alt: string;
}

export class ToggleButton extends Component {
  constructor({ className = [], attrs, onClick }: IProps) {
    super({ tag: 'button', className: [styles.toggleButton, ...className] });

    const imageAttrs = {
      src: attrs.src,
      alt: attrs.alt,
    };
    const image = new Component({ tag: 'img', className: styles.imageButton, attrs: imageAttrs });

    this.addListener('click', (event) => {
      this.toggleClass(styles.disabled);
      if (onClick) {
        onClick(event);
      }
    });

    this.append(image);
  }
}
