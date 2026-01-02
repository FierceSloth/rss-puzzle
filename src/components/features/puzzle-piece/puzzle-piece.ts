import { EmitterEvents, IComponentChild } from '@/common/types/interfaces';
import { Component } from '@/common/base-component';
import { gameEmitter } from '@/common/utils/emitter';

import styles from './puzzle-piece.module.scss';

interface IProps extends IComponentChild {
  word: string;
  clickEventName: EmitterEvents;
  id: string;
}

export class PuzzlePiece extends Component {
  private id: string;
  private clickEventName: EmitterEvents;

  constructor({ className = [], word = '', clickEventName, id }: IProps) {
    super({ className: [styles.puzzlePiece, ...className], text: word });

    this.id = id;
    this.clickEventName = clickEventName;

    this.addListener('click', () => {
      gameEmitter.emit(this.clickEventName, this.id);
    });
  }
}
