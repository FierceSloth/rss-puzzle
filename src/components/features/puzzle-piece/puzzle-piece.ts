import { EmitterEvents, IComponentChild, IPuzzleBackground, PuzzleStatus } from '@/common/types/interfaces';
import { Component } from '@/common/base-component';
import { gameEmitter } from '@/common/utils/emitter';

import styles from './puzzle-piece.module.scss';

interface IProps extends IComponentChild {
  word: string;
  width: number;
  status?: PuzzleStatus;
  clickEventName: EmitterEvents;
  id: string;
  background: IPuzzleBackground;
  containerWidth: number;
}

export class PuzzlePiece extends Component {
  private id: string;
  private clickEventName: EmitterEvents;

  constructor({
    className = [],
    word = '',
    width = 0,
    status = '',
    clickEventName,
    id,
    background,
    containerWidth,
  }: IProps) {
    super({ className: [styles.puzzlePieceContainer, ...className] });

    const puzzlePiece = new Component({ className: styles.puzzlePiece, text: word });
    const puzzleEar = new Component({ className: styles.puzzleEar });
    this.id = id;
    this.clickEventName = clickEventName;

    this.node.style.width = `${width}%`;

    if (status) {
      this.addClass(status);
      setTimeout(() => this.removeClass(status), 2000);
    }

    if (background) {
      const pieceHeight = 50;
      const verticalOffset = (pieceHeight - 16) / 2;
      const earOverlap = 8;

      const pieceWidthPx = (containerWidth * width) / 100;
      const currentPieceOffsetPx = (containerWidth * background.offsetX) / 100;

      const bgOffsetY = background.y * pieceHeight;

      const bgImageValue = `url(${background.url})`;
      const bgSizeValue = `${containerWidth}px ${background.totalRows * pieceHeight}px`;

      puzzlePiece.node.style.backgroundImage = bgImageValue;
      puzzlePiece.node.style.backgroundSize = bgSizeValue;
      puzzlePiece.node.style.backgroundPosition = `-${currentPieceOffsetPx}px -${bgOffsetY}px`;

      const earXShift = currentPieceOffsetPx + pieceWidthPx - earOverlap;

      puzzleEar.node.style.backgroundImage = bgImageValue;
      puzzleEar.node.style.backgroundSize = bgSizeValue;
      puzzleEar.node.style.backgroundPosition = `-${earXShift}px -${bgOffsetY + verticalOffset}px`;

      if (background.offsetX !== 0) {
        puzzlePiece.addClass(styles.leftSocket);
      }
    }

    this.appendChildren([puzzlePiece, puzzleEar]);

    this.addListener('click', () => {
      gameEmitter.emit(this.clickEventName, this.id);
    });
  }
}
