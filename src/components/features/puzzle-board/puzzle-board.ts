import { Component } from '@common/base-component';
import { ResultBoard } from '@components/features/result-board/result-board';
import { SourceField } from '@components/features/source-field/source-field';

import playAudio from '@assets/images/play-audio.png';

import { shuffleArr } from '@common/utils/random';
import { PuzzleBoardAlts } from '@enums/enums';
import { IComponentChild, IPuzzleWord, IRound } from '@/common/types/interfaces';
import { ImageButton } from '@/components/ui/image-button/image-button';
import styles from './puzzle-board.module.scss';
import { AUDIO_BASE_URL } from '@/common/constants/constants';
import { gameEmitter } from '@/common/utils/emitter';

interface IProps extends IComponentChild {
  round: IRound;
}

export class PuzzleBoard extends Component {
  private round: IRound;
  private currentSentenceIndex: number = 0;

  private currentSourceWords: IPuzzleWord[] = [];
  private currentResultWords: IPuzzleWord[] = [];

  private resultBoard: ResultBoard;
  private sourceField: SourceField;

  private translationEl: Component;
  private audioButton: ImageButton;

  constructor({ className = [], round }: IProps) {
    super({ className: [styles.puzzleBoard, ...className] });
    this.round = round;

    const audioButtonOptions = {
      className: [styles.audioButton],
      attrs: {
        alt: PuzzleBoardAlts.audio,
        src: playAudio,
      },
    };

    this.translationEl = new Component({ className: styles.translateText });
    this.audioButton = new ImageButton(audioButtonOptions);

    const translateContainer = new Component(
      { className: styles.translateContainer },
      this.translationEl,
      this.audioButton
    );

    this.resultBoard = new ResultBoard({});
    this.sourceField = new SourceField({});

    this.appendChildren([translateContainer, this.resultBoard, this.sourceField]);

    this.startCurrentSentence();
  }

  private startCurrentSentence() {
    PuzzleBoard.clearSubscribes();

    const currentRoundData = this.round.words[this.currentSentenceIndex];
    const correctSentence = currentRoundData.textExample.split(' ');

    const puzzleWords: IPuzzleWord[] = correctSentence.map((word, index) => ({
      word,
      id: `word-${index}-${Date.now()}`,
      position: {
        x: index,
        y: this.currentSentenceIndex,
      },
    }));

    this.currentSourceWords = shuffleArr(puzzleWords);
    this.currentResultWords = [];

    this.setAudioSrc(currentRoundData.audioExample);
    this.setTranslationText(currentRoundData.textExampleTranslate);

    this.updateBoards();

    gameEmitter.on<string>('game:source-word-click', (id) => {
      this.wordClick(this.currentSourceWords, id);
    });
    gameEmitter.on<string>('game:result-word-click', (id) => {
      this.wordClick(this.currentResultWords, id);
    });
  }

  private updateBoards() {
    this.resultBoard.renderWords(this.currentResultWords, this.currentSentenceIndex);
    this.sourceField.renderWords(this.currentSourceWords);
    this.checkSentence();
  }

  private checkSentence() {
    if (this.currentSourceWords.length <= 0) {
      gameEmitter.emit('game:sentence-end', false);

      this.currentSentenceIndex += 1; // ? Temporary
      this.startCurrentSentence(); // ? Temporary
    } else {
      gameEmitter.emit('game:sentence-end', true);
    }
  }

  private wordClick(words: IPuzzleWord[], id: string) {
    const index = words.findIndex((wordObj) => wordObj.id === id);
    const currentWord = words.splice(index, 1);

    if (words === this.currentResultWords) {
      this.currentSourceWords.push(...currentWord);
    } else {
      this.currentResultWords.push(...currentWord);
    }

    this.updateBoards();
  }

  private setTranslationText(text: string) {
    this.translationEl.setText(text);
  }

  private setAudioSrc(src: string) {
    this.audioButton.setOnClick(() => {
      const audio = new Audio(`${AUDIO_BASE_URL}${src}`);
      audio.play();
    });
  }

  private static clearSubscribes() {
    gameEmitter.clear('game:result-word-click');
    gameEmitter.clear('game:source-word-click');
  }
}
