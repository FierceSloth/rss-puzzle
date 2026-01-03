import { IComponentChild, IPuzzleWord } from '@/common/types/interfaces';
import { BaseCard } from '@/components/ui/card/card';
import styles from './source-field.module.scss';
import { PuzzlePiece } from '@/components/features/puzzle-piece/puzzle-piece';

interface IProps extends IComponentChild {}

export class SourceField extends BaseCard {
  constructor({ className = [] }: IProps) {
    super({ className: [styles.sourceField, ...className] });
  }

  renderWords(wordArr: IPuzzleWord[]): void {
    this.destroyChildren();
    wordArr.forEach((wordObj) => {
      this.append(
        new PuzzlePiece({
          word: wordObj.word,
          width: wordObj.width,
          id: wordObj.id,
          clickEventName: 'game:source-word-click',
        })
      );
    });
  }
}
