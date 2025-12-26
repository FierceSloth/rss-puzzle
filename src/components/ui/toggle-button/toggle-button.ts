import { IComponentChild } from '@app-types/types';
import { Component } from '@common/base-component';

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
    super({ tag: 'button', className: [styles.toggleBtn, ...className] });

    const imageAttrs = {
      src: attrs.src,
      alt: attrs.alt,
    };
    const image = new Component({ tag: 'img', className: styles.imageBtn, attrs: imageAttrs });

    this.addListener('click', (event) => {
      this.toggleClass(styles.disabled);
      if (onClick) {
        onClick(event);
      }
    });

    this.append(image);
  }
}
