import { PuzzleBoard } from '@components/features/puzzle-board/puzzle-board';
import { DataManager } from '@utils/data-manager';
import { HeaderGame } from '@components/layout/header-game/header-game';
import { Component } from '@/common/base-component';
import type { Router } from '@/router/router';

import styles from './game-page.module.scss';
import { ControlPanel } from '@/components/features/control-panel/control-panel';

export class GamePage {
  private container: Component;
  private router: Router;

  private currentLevel: number;
  private currentRound: number;
  private dataManager: DataManager;

  constructor(container: Component, router: Router) {
    this.container = container;
    this.router = router;

    this.currentLevel = 1;
    this.currentRound = 1; // TODO: add level and round selection

    this.dataManager = new DataManager();
  }

  render(): void {
    // ================= Game Header =====================
    const header = new HeaderGame({ className: [styles.header] });

    // ================= PuzzleBoard ================
    const round = this.dataManager.getRound(this.currentLevel, this.currentRound);
    const puzzleBoard = new PuzzleBoard({ round });

    // ================= ControlPanel ================
    const controlPanel = new ControlPanel({});

    // ================= Containers =================
    const pageContainer = new Component({ className: ['pageContainer', 'gameContainer'] }, puzzleBoard, controlPanel);
    this.container.appendChildren([header, pageContainer]);
  }

  temporaryMethod(): Router {
    return this.router; // ? Temporarily, so that eslint doesn't complain that the router is not being used
  }
}
