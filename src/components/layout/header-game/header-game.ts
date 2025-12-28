import { IComponentChild } from '@app-types/types';
import { Header } from '@components/layout/header/header';
import { Button } from '@components/ui/button/button';
import { Component } from '@common/base-component';
import type { Router } from '../../../router/router';

import styles from './header-game.module.scss';

interface IProps extends IComponentChild {
  router: Router;
}

export class HeaderGame extends Header {
  constructor({ className = [], router }: IProps) {
    super({ className: [styles.headerGame, ...className], router });

    const level = 'Level 1'; // ? temporary
    const levelSelect = new Button({ className: [styles.select], text: level });

    const round = 'Round 1'; // ? temporary
    const roundSelect = new Button({ className: [styles.select], text: round });

    const levelInfoContainer = new Component({ className: styles.levelContainer }, levelSelect, roundSelect);
    this.append(levelInfoContainer);
  }
}
