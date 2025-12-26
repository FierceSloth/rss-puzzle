import { IComponentChild } from '@app-types/types';
import { Component } from '@/common/base-component';
import styles from './source-field.module.scss';
import { PuzzlePiece } from '@/components/ui/puzzle-piece/puzzle-piece';

interface IProps extends IComponentChild {}

export class SourceField extends Component {
  constructor({ className = [] }: IProps) {
    super({ className: [styles.sourceField, ...className] });
  }

  setWords(arr: string[]): void {
    this.destroyChildren();
    arr.forEach((word) => {
      this.append(new PuzzlePiece({ word }));
    });
  }
}
