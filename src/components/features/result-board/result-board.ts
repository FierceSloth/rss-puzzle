import { IComponentChild, IPuzzleWord } from '@/common/types/interfaces';
import { Component } from '@/common/base-component';
import { BaseCard } from '@/components/ui/card/card';
import { PuzzlePiece } from '@/components/features/puzzle-piece/puzzle-piece';

import styles from './result-board.module.scss';
import { gameEmitter } from '@/common/utils/emitter';

interface IProps extends IComponentChild {}

export class ResultBoard extends BaseCard {
  private gameWrapper: Component;
  private backgroundUrl: string = '';

  private rowsNumber = 10;
  private rows: Component[];

  constructor({ className = [] }: IProps) {
    super({ className: [styles.resultBoard, ...className] });

    this.rows = [];

    this.gameWrapper = new Component({ className: styles.gameWrapper });
    this.append(this.gameWrapper);

    this.renderRows();

    gameEmitter.on('game:round-complete', () => {
      this.renderPaint();
    });
  }

  public renderWords(wordArr: IPuzzleWord[], row: number): void {
    const currentRow = this.rows[row];
    currentRow.destroyChildren();

    if (!this.backgroundUrl) {
      this.backgroundUrl = wordArr[0]?.background?.url;
    }

    wordArr.forEach((wordObj) => {
      currentRow.append(
        new PuzzlePiece({
          word: wordObj.word,
          width: wordObj.width,
          status: wordObj.status,
          id: wordObj.id,
          clickEventName: 'game:result-word-click',
          background: wordObj.background,
          containerWidth: currentRow.node.clientWidth,
        })
      );
    });
  }

  private renderRows() {
    for (let i = 0; i < this.rowsNumber; i += 1) {
      const row = new Component({ className: styles.row });
      this.rows.push(row);
      this.gameWrapper.append(row);
    }
  }

  private renderPaint() {
    this.rows.forEach((row) => {
      row.addClass(styles.hide);
    });
    this.gameWrapper.node.style.backgroundImage = `url(${this.backgroundUrl})`;
  }
}
