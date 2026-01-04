import { HeaderGame } from '@components/layout/header-game/header-game';
import { Component } from '@common/base-component';

import styles from './game-page.module.scss';
import { GameBoard } from '@/components/features/game-board/game-board';

export class GamePage {
  private container: Component;

  constructor(container: Component) {
    this.container = container;
  }

  render(): void {
    // ================= Game Header =====================
    const header = new HeaderGame({ className: [styles.header] });

    // ================= GameBoard ================

    const gameBoard = new GameBoard({});

    // ================= Containers =================
    const pageContainer = new Component({ className: ['pageContainer', styles.gameContainer] }, gameBoard);
    this.container.appendChildren([header, pageContainer]);
  }
}
