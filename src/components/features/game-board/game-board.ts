import { IComponentChild, IGroupResult } from '@/common/types/interfaces';
import { Component } from '@/common/base-component';
import styles from './game-board.module.scss';
import { dataManager } from '@/common/utils/data-manager';
import { PuzzleBoard } from '../puzzle-board/puzzle-board';
import { ControlPanel } from '../control-panel/control-panel';
import { gameEmitter } from '@/common/utils/emitter';

interface IProps extends IComponentChild {}

export class GameBoard extends Component {
  private currentLevel: number;
  private currentRound: number;

  constructor({ className = [], children = [] }: IProps) {
    super({ className: [styles.gameBoard, ...className] }, ...children);

    this.currentLevel = 1;
    this.currentRound = 1;

    const round = dataManager.getRound(this.currentLevel, this.currentRound);
    const puzzleBoard = new PuzzleBoard({ round });

    const controlPanel = new ControlPanel({});

    this.appendChildren([puzzleBoard, controlPanel]);

    gameEmitter.clear('game:send-results');
    gameEmitter.on<IGroupResult>('game:send-results', (group) => {
      dataManager.setLastResults({
        paintInfo: round.levelData,
        sentences: group,
      });
    });
  }
}
