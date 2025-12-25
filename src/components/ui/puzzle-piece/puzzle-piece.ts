import { IComponentChild } from '@app-types/types';
import { Component } from '@/common/base-component';
import styles from './puzzle-piece.module.scss';

interface IProps extends IComponentChild {}

export class PuzzlePiece extends Component {
  constructor({ className = [], children = [] }: IProps) {
    super({ className: [styles.puzzlePiece, ...className] }, ...children);
  }
}
