import puzzleIcon from '@assets/images/logo-puzzle.png';
import { logoMessages } from '@constants/messages';
import { IComponentChild } from '@/common/types/interfaces';
import { Component } from '@/common/base-component';
import { ImgAlts, PagePath } from '@enums/enums';
import { appEmitter } from '@utils/emitter';

import styles from './logo.module.scss';

interface IProps extends IComponentChild {}

export class Logo extends Component {
  constructor({ className = [] }: IProps) {
    super({ className: [styles.logoWrapper, ...className] });
    this.addListener('click', () => {
      appEmitter.emit('router:navigate', PagePath.MAIN);
    });

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
