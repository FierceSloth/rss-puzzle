import puzzleIcon from '@assets/images/logo-puzzle.png';
import { logoMessages } from '@constants/messages';
import { IComponentChild } from '@/common/types/interfaces';
import { Component } from '@/common/base-component';
import { ImgAlts } from '@/common/enums/enums';

import styles from './logo.module.scss';

interface IProps extends IComponentChild {}

export class Logo extends Component {
  constructor({ className = [] }: IProps) {
    super({ tag: 'a', className: [styles.logoWrapper, ...className], attrs: { href: '/' } });

    const logoAttrs = {
      alt: ImgAlts.logoIcon,
      src: puzzleIcon,
    };

    const firstText = new Component({ className: styles.text, text: logoMessages.textRSS });
    const logoImg = new Component({ tag: 'img', className: styles.icon, attrs: logoAttrs });
    const secondText = new Component({ className: styles.text, text: logoMessages.textPuzzle });

    this.appendChildren([firstText, logoImg, secondText]);
  }
}
