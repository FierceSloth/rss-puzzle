import { IComponentChild } from '@app-types/types';
import puzzleIcon from '@assets/images/logo-puzzle.png';
import { Component } from '@/common/base-component';

import styles from './logo.module.scss';

interface IProps extends IComponentChild {}

export class Logo extends Component {
  constructor({ className = [] }: IProps) {
    super({ tag: 'a', className: [styles.logoWrapper, ...className], attrs: { href: '/' } });

    const logoAttrs = {
      alt: 'logo',
      src: puzzleIcon,
    };

    const firstText = new Component({ className: styles.text, text: 'RSS' });
    const logoImg = new Component({ tag: 'img', className: styles.icon, attrs: logoAttrs });
    const secondText = new Component({ className: styles.text, text: 'Puzzle' });

    this.appendChildren([firstText, logoImg, secondText]);
  }
}
