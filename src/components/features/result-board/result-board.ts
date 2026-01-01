import { IComponentChild } from '@/common/types/interfaces';
import { Component } from '@/common/base-component';
import { BaseCard } from '@/components/ui/card/card';
import styles from './result-board.module.scss';

interface IProps extends IComponentChild {}

export class ResultBoard extends BaseCard {
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
