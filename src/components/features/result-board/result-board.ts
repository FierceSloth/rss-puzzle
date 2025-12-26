import { IComponentChild } from '@app-types/types';
import { Component } from '@/common/base-component';
import styles from './result-board.module.scss';

interface IProps extends IComponentChild {}

export class ResultBoard extends Component {
  private rows: Component[];

  constructor({ className = [] }: IProps) {
    super({ className: [styles.resultBoard, ...className] });

    this.rows = [];

    this.renderRows();
  }

  renderRows(): void {
    for (let i = 0; i < 10; i += 1) {
      const row = new Component({ className: styles.row });
      this.rows.push(row);
      this.append(row);
    }
  }
}
