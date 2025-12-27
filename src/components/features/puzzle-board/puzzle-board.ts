import { IComponentChild, IRound } from '@app-types/types';
import { Component } from '@common/base-component';
import { ResultBoard } from '@components/features/result-board/result-board';
import { SourceField } from '@components/features/source-field/source-field';

import playAudio from '@assets/images/play-audio.png';

import { shuffleArr } from '@common/utils/random';
import { PuzzleBoardAlts } from '@enums/enums';
import { ImageButton } from '@/components/ui/image-button/image-button';
import styles from './puzzle-board.module.scss';
import { AUDIO_BASE_URL } from '@/common/constants/constants';

interface IProps extends IComponentChild {
  round: IRound;
}

export class PuzzleBoard extends Component {
  private round: IRound;
  private currentSentenceIndex: number;

  private resultBoard: ResultBoard;
  private sourceField: SourceField;

  private translationEl: Component;
  private audioBtn: ImageButton;

  constructor({ className = [], round }: IProps) {
    super({ className: [styles.puzzleBoard, ...className] });
    this.round = round;
    this.currentSentenceIndex = 0;

    const audioBtnOptions = {
      className: [styles.audioBtn],
      attrs: {
        alt: PuzzleBoardAlts.audio,
        src: playAudio,
      },
    };

    this.translationEl = new Component({ className: styles.translateText });
    this.audioBtn = new ImageButton(audioBtnOptions);

    const translateContainer = new Component(
      { className: styles.translateContainer },
      this.translationEl,
      this.audioBtn
    );

    this.resultBoard = new ResultBoard({});
    this.sourceField = new SourceField({});

    this.appendChildren([translateContainer, this.resultBoard, this.sourceField]);

    this.startCurrentSentence();
  }

  private startCurrentSentence() {
    const currentRoundData = this.round.words[this.currentSentenceIndex];
    const wordsArr = currentRoundData.textExample.split(' ');
    const shuffledWord = shuffleArr(wordsArr);

    this.setAudioSrc(currentRoundData.audioExample);
    this.setTranslationText(currentRoundData.textExampleTranslate);
    this.sourceField.setWords(shuffledWord);
  }

  private setTranslationText(text: string) {
    this.translationEl.setText(text);
  }

  private setAudioSrc(src: string) {
    this.audioBtn.setOnClick(() => {
      const audio = new Audio(`${AUDIO_BASE_URL}${src}`);
      audio.play();
    });
  }
}
