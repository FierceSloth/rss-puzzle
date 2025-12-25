import { IComponentChild, IRound } from '@app-types/types';
import { Component } from '@/common/base-component';
import styles from './result-board.module.scss';

interface IProps extends IComponentChild {
  round: IRound;
}

export class ResultBoard extends Component {
  private round: IRound;

  constructor({ className = [], round }: IProps) {
    super({ className: [styles.resultBoard, ...className] });
    this.round = round;
  }
}
