import { IComponentChild } from '@/common/types/interfaces';
import { Component } from '@/common/base-component';
import styles from './game-board.module.scss';
import type { Router } from '@/router/router';
import { dataManager } from '@/common/utils/data-manager';
import { PuzzleBoard } from '../puzzle-board/puzzle-board';
import { simulationAddingResults } from '@/common/utils/simulationResult';
import { ControlPanel } from '../control-panel/control-panel';

interface IProps extends IComponentChild {
  router: Router;
}

export class GameBoard extends Component {
  private currentLevel: number;
  private currentRound: number;

  constructor({ className = [], children = [] }: IProps) {
    super({ className: [styles.gameBoard, ...className] }, ...children);

    this.currentLevel = 1;
    this.currentRound = 1;

    const round = dataManager.getRound(this.currentLevel, this.currentRound);
    const puzzleBoard = new PuzzleBoard({ round });
    simulationAddingResults(round);

    const controlPanel = new ControlPanel({});

    this.appendChildren([puzzleBoard, controlPanel]);
  }
}
