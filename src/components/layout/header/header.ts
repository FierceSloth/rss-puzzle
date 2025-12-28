import { IComponentChild } from '@app-types/types';
import { Logo } from '@components/ui/logo/logo';
import iconImg from '@assets/images/exit.png';
import { ImgAlts } from '@enums/enums';
import { Component } from '@/common/base-component';

import styles from './header.module.scss';
import { dataManager } from '@/common/utils/data-manager';

interface IProps extends IComponentChild {}

export class Header extends Component {
  private exitText: Component;
  private exitLink: Component;

  constructor({ className = [] }: IProps) {
    super({ className: [styles.header, ...className], tag: 'header' });

    const iconAttrs = {
      alt: ImgAlts.exitIcon,
      src: iconImg,
    };

    const logo = new Logo({ className: [styles.logoWrapper] });

    const userData = dataManager.getUser();
    const userName = `${userData?.name} ${userData?.surname}`;
    const exitText = new Component({ className: styles.exitText, text: userName });
    const exitIcon = new Component({ tag: 'img', className: styles.exitIcon, attrs: iconAttrs });

    const exitContainer = new Component(
      { tag: 'a', className: styles.exitContainer, attrs: { href: '/' } }, // ! Then it will be a ‘button’ with onclick that calls the router.
      exitText,
      exitIcon
    );

    this.appendChildren([logo, exitContainer]);
    this.exitText = exitText;
    this.exitLink = exitContainer;
  }

  setExitText(text: string): void {
    this.exitText.setText(text);
  }

  setLinkHref(href: string): void {
    this.exitLink.setAttribute('href', href); // ! Then it will be a ‘button’ with onclick that calls the router.
  }
}
