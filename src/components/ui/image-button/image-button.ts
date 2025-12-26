import { IComponentChild } from '@app-types/types';
import { Component } from '@common/base-component';

import styles from './image-button.module.scss';

interface IProps extends IComponentChild {
  onClick?: (event: MouseEvent) => void;
  attrs: IImageAttrs;
}

interface IImageAttrs {
  src: string;
  alt: string;
}

export class ImageButton extends Component {
  private isActive: boolean;

  constructor({ className = [], attrs, onClick }: IProps) {
    super({ className: [styles.imageButton, ...className] });

    const imageAttrs = {
      src: attrs.src,
      alt: attrs.alt,
    };
    const image = new Component({ tag: 'img', className: styles.imageBtn, attrs: imageAttrs });

    this.isActive = false;
    this.addListener('click', (event) => {
      if (this.isActive) return;

      this.isActive = true;

      setTimeout(() => {
        this.isActive = false;
      }, 2000);

      if (onClick) {
        onClick(event);
      }
    });

    this.append(image);
  }
}
