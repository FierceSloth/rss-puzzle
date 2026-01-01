import { PagePath, ImgAlts } from '@enums/enums';
import iconImg from '@assets/images/exit.png';
import { IComponentChild } from '@/common/types/interfaces';
import { Component } from '@/common/base-component';
import styles from './exit.module.scss';
import { dataManager } from '@/common/utils/data-manager';
import { Router } from '@/router/router';

interface IProps extends IComponentChild {
  router: Router;
}

export class Exit extends Component {
  constructor({ className = [], children = [], router }: IProps) {
    const iconAttrs = {
      alt: ImgAlts.exitIcon,
      src: iconImg,
    };

    super({ className: [styles.exitContainer, ...className] }, ...children);
    const userName = dataManager.getUserFullName();
    const exitText = new Component({ className: styles.exitText, text: userName });
    const exitIcon = new Component({ tag: 'img', className: styles.exitIcon, attrs: iconAttrs });

    this.appendChildren([exitText, exitIcon]);

    this.addListener('click', () => {
      dataManager.deleteUser();
      router.navigate(PagePath.LOGIN);
    });
  }
}
