import { PuzzleBoard } from '@components/features/puzzle-board/puzzle-board';
import { dataManager } from '@utils/data-manager';
import { HeaderGame } from '@components/layout/header-game/header-game';
import { Component } from '@/common/base-component';
import { Button } from '@/components/ui/button/button';
import type { Router } from '@/router/router';

import styles from './game-page.module.scss';
import { ControlPanel } from '@/components/features/control-panel/control-panel';
import { IRound } from '@/common/types/types';

export class GamePage {
  private container: Component;
  private router: Router;

  private currentLevel: number;
  private currentRound: number;

  constructor(container: Component, router: Router) {
    this.container = container;
    this.router = router;

    this.currentLevel = 1;
    this.currentRound = 1; // TODO: add level and round selection
  }

  render(): void {
    // ================= Game Header =====================
    const header = new HeaderGame({ className: [styles.header] });

    // ================= PuzzleBoard ================
    const round = dataManager.getRound(this.currentLevel, this.currentRound);
    const puzzleBoard = new PuzzleBoard({ round });
    GamePage.simulationAddingResults(round);

    // ================= ControlPanel ================
    const controlPanel = new ControlPanel({});

    // ============ Temporary Dev Btn ===============

    const devBtn = new Button({
      className: [styles.devBtn],
      text: 'DEV: Go to Statistics',
      onClick: () => {
        this.router.navigate('/statistics');
      },
    });

    // ================= Containers =================
    const pageContainer = new Component(
      { className: ['pageContainer', styles.gameContainer] },
      puzzleBoard,
      controlPanel
    );
    this.container.appendChildren([header, pageContainer, devBtn]);
  }

  private static simulationAddingResults(round: IRound) {
    const paintInfo = {
      imageSrc: round.levelData.imageSrc,
      name: round.levelData.name,
      author: round.levelData.author,
      year: round.levelData.year,
    };
    const sentences = {
      known: [
        {
          sentence: 'The students agree they have too much homework',
          audioSrc: 'files/01_0001_example.mp3',
        },
        {
          sentence: 'The students agree they have too much homework',
          audioSrc: 'files/01_0001_example.mp3',
        },
        {
          sentence: 'The students agree they have too much homework',
          audioSrc: 'files/01_0001_example.mp3',
        },
        {
          sentence: 'The students agree they have too much homework',
          audioSrc: 'files/01_0001_example.mp3',
        },
      ],
      unknown: [
        {
          sentence: 'The students agree they have too much homework',
          audioSrc: 'files/01_0001_example.mp3',
        },
        {
          sentence: 'The students agree they have too much homework',
          audioSrc: 'files/01_0001_example.mp3',
        },
        {
          sentence: 'The students agree they have too much homework',
          audioSrc: 'files/01_0001_example.mp3',
        },
        {
          sentence: 'The students agree they have too much homework',
          audioSrc: 'files/01_0001_example.mp3',
        },
        {
          sentence: 'The students agree they have too much homework',
          audioSrc: 'files/01_0001_example.mp3',
        },
      ],
    };
    dataManager.setLastResults({ paintInfo, sentences });
  } // ? Temporary Method
}
