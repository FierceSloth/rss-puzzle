import { IComponentChild, IGroupResult } from '@/common/types/interfaces';
import { Component } from '@/common/base-component';
import styles from './game-board.module.scss';
import { dataManager } from '@/common/utils/data-manager';
import { PuzzleBoard } from '../puzzle-board/puzzle-board';
import { ControlPanel } from '../control-panel/control-panel';
import { gameEmitter } from '@/common/utils/emitter';

interface IProps extends IComponentChild {}

export class GameBoard extends Component {
  constructor({ className = [], children = [] }: IProps) {
    super({ className: [styles.gameBoard, ...className] }, ...children);

    this.renderRound();

    gameEmitter.clear('game:send-results');
    gameEmitter.clear('game:round-change');

    gameEmitter.on('game:round-change', () => {
      this.renderRound();
    });

    gameEmitter.on<IGroupResult>('game:send-results', (group) => {
      const { currentLevel, currentRound } = dataManager.getCurrentProgress();
      const roundData = dataManager.getRound(currentLevel, currentRound);
      dataManager.markRoundAsCompleted(currentLevel, currentRound);

      dataManager.setLastResults({
        paintInfo: roundData.levelData,
        sentences: group,
      });
    });
  }

  private renderRound() {
    this.destroyChildren();

    const { currentLevel, currentRound } = dataManager.getCurrentProgress();
    const round = dataManager.getRound(currentLevel, currentRound);

    const puzzleBoard = new PuzzleBoard({ round });
    const controlPanel = new ControlPanel({});

    this.appendChildren([puzzleBoard, controlPanel]);
  }
}
