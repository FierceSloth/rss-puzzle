import { IComponentChild } from '@app-types/types';
import { Component } from '@/common/base-component';
import styles from './puzzle-piece.module.scss';

interface IProps extends IComponentChild {
  word: string;
}

export class PuzzlePiece extends Component {
  constructor({ className = [], word = '' }: IProps) {
    super({ className: [styles.puzzlePiece, ...className], text: word });
  }
}
