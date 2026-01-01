import { IComponentChild } from '@/common/types/interfaces';
import { Component } from '@/common/base-component';
import { Logo } from '../logo/logo';
import styles from './logo-login.module.scss';
import { loginMessages } from '@/common/constants/messages';

interface IProps extends IComponentChild {}

export class LogoLogin extends Component {
  constructor({ className = [], children = [] }: IProps) {
    super({ className: [styles.logoContainer, ...className] }, ...children);

    const logo = new Logo({ className: [styles.logo] });
    const secondText = new Component({ tag: 'p', className: styles.text, text: loginMessages.secondText });

    this.appendChildren([logo, secondText]);
  }
}
