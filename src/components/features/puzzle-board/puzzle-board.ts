import { IComponentChild, IRound } from '@app-types/types';
import { Component } from '@/common/base-component';
import { ResultBoard } from '../result-board/result-board';
import { SourceField } from '../source-field/source-field';

import styles from './puzzle-board.module.scss';

interface IProps extends IComponentChild {
  round: IRound;
}

export class PuzzleBoard extends Component {
  private round: IRound;

  constructor({ className = [], round }: IProps) {
    super({ className: [styles.puzzleBoard, ...className] });
    this.round = round;

    const resultBoard = new ResultBoard({ className: [styles.resultBoard], round: this.round });
    const sourceField = new SourceField({ className: [styles.resultBoard] });

    this.appendChildren([resultBoard, sourceField]);
  }
}
