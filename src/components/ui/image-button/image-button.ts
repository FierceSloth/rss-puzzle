import { Component } from '@common/base-component';
import { IComponentChild } from '@/common/types/interfaces';

import styles from './image-button.module.scss';

type IListener = null | ((event: MouseEvent) => void);

interface IProps extends IComponentChild {
  onClick?: IListener;
  attrs: IImageAttrs;
}

interface IImageAttrs {
  src: string;
  alt: string;
}

export class ImageButton extends Component {
  private isActive: boolean;
  private callback: IListener;

  constructor({ className = [], attrs, onClick }: IProps) {
    super({ className: [styles.imageButton, ...className] });

    const imageAttrs = {
      src: attrs.src,
      alt: attrs.alt,
    };
    const image = new Component({ tag: 'img', className: styles.imageButton, attrs: imageAttrs });

    this.callback = null;
    this.isActive = false;

    this.append(image);

    if (onClick) {
      this.setOnClick(onClick);
    }
  }

  setOnClick(onClick: IListener) {
    if (this.callback) {
      this.removeListener('click', this.callback);
    }

    this.isActive = false;

    this.callback = (event) => {
      if (this.isActive) return;

      this.isActive = true;

      setTimeout(() => {
        this.isActive = false;
      }, 3000);

      if (onClick) {
        onClick(event);
      }
    };

    this.addListener('click', this.callback);
  }
}
