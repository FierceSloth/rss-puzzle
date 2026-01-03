import { EmitterEvents, IComponentChild, PuzzleStatus } from '@/common/types/interfaces';
import { Component } from '@/common/base-component';
import { gameEmitter } from '@/common/utils/emitter';

import styles from './puzzle-piece.module.scss';

interface IProps extends IComponentChild {
  word: string;
  width: number;
  status?: PuzzleStatus;
  clickEventName: EmitterEvents;
  id: string;
}

export class PuzzlePiece extends Component {
  private id: string;
  private clickEventName: EmitterEvents;

  constructor({ className = [], word = '', width = 0, status = '', clickEventName, id }: IProps) {
    super({ className: [styles.puzzlePiece, ...className], text: word });

    this.id = id;
    this.node.style.width = `${width}%`;

    if (status) {
      this.addClass(status);
      setTimeout(() => this.removeClass(status), 2000);
    }

    this.clickEventName = clickEventName;

    this.addListener('click', () => {
      gameEmitter.emit(this.clickEventName, this.id);
    });
  }
}
