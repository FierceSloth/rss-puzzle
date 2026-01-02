import { IComponentChild, IPuzzleWord } from '@/common/types/interfaces';
import { Component } from '@/common/base-component';
import { BaseCard } from '@/components/ui/card/card';
import { PuzzlePiece } from '@/components/features/puzzle-piece/puzzle-piece';

import styles from './result-board.module.scss';

interface IProps extends IComponentChild {}

export class ResultBoard extends BaseCard {
  private rows: Component[];

  constructor({ className = [] }: IProps) {
    super({ className: [styles.resultBoard, ...className] });

    this.rows = [];

    this.renderRows();
  }

  renderRows() {
    for (let i = 0; i < 10; i += 1) {
      const row = new Component({ className: styles.row });
      this.rows.push(row);
      this.append(row);
    }
  }

  renderWords(wordArr: IPuzzleWord[], row: number): void {
    const currentRow = this.rows[row];
    currentRow.destroyChildren();
    wordArr.forEach((wordObj) => {
      currentRow.append(
        new PuzzlePiece({ word: wordObj.word, id: wordObj.id, clickEventName: 'game:result-word-click' })
      );
    });
  }
}
