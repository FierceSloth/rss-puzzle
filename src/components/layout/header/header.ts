import { Logo } from '@components/ui/logo/logo';
import { IComponentChild } from '@/common/types/interfaces';
import { Component } from '@/common/base-component';
import { Exit } from '@/components/ui/exit/exit';

import styles from './header.module.scss';

interface IProps extends IComponentChild {}

export class Header extends Component {
  constructor({ className = [] }: IProps) {
    super({ className: [styles.header, ...className], tag: 'header' });

    const logo = new Logo({ className: [styles.logoWrapper] });

    const exit = new Exit({});

    this.appendChildren([logo, exit]);
  }
}
