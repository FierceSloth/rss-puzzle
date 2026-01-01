import { HeaderGame } from '@components/layout/header-game/header-game';
import { Component } from '@/common/base-component';
import { Button } from '@/components/ui/button/button';
import type { Router } from '@/router/router';

import styles from './game-page.module.scss';
import { GameBoard } from '@/components/features/game-board/game-board';

export class GamePage {
  private container: Component;
  private router: Router;

  constructor(container: Component, router: Router) {
    this.container = container;
    this.router = router;
  }

  render(): void {
    // ================= Game Header =====================
    const header = new HeaderGame({ className: [styles.header], router: this.router });

    // ================= GameBoard ================

    const gameBoard = new GameBoard({ router: this.router });

    // ============ Temporary Dev Button ===============

    const devButton = new Button({
      className: [styles.devButton],
      text: 'DEV: Go to Statistics',
      onClick: () => {
        this.router.navigate('/statistics');
      },
    });

    // ================= Containers =================
    const pageContainer = new Component({ className: ['pageContainer', styles.gameContainer] }, gameBoard);
    this.container.appendChildren([header, pageContainer, devButton]);
  }
}
