import { IComponentChild } from '@/common/types/interfaces';
import { BaseCard } from '@/components/ui/card/card';
import styles from './source-field.module.scss';
import { PuzzlePiece } from '@/components/ui/puzzle-piece/puzzle-piece';

interface IProps extends IComponentChild {}

export class SourceField extends BaseCard {
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
