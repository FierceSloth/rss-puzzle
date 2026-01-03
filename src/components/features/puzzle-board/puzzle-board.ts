import { Component } from '@common/base-component';
import { ResultBoard } from '@components/features/result-board/result-board';
import { SourceField } from '@components/features/source-field/source-field';

import playAudio from '@assets/images/play-audio.png';

import { shuffleArr } from '@common/utils/random';
import { PuzzleBoardAlts } from '@enums/enums';
import { IComponentChild, IPuzzleWord, IRound, ISentence } from '@/common/types/interfaces';
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

  private correctSentence: IPuzzleWord[] = [];

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

    const currentRoundData = this.getRoundData();
    this.correctSentence = this.getSentencesObj();

    this.currentSourceWords = shuffleArr(this.correctSentence);
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
    gameEmitter.on('game:sentence-check', () => {
      this.checkSentence();
    });
  }

  private updateBoards() {
    this.resultBoard.renderWords(this.currentResultWords, this.currentSentenceIndex);
    this.sourceField.renderWords(this.currentSourceWords);

    const isCompleted = this.currentSourceWords.length === 0;
    gameEmitter.emit('game:sentence-end', isCompleted);
  }

  private checkSentence() {
    const result = this.currentResultWords;
    const correct = this.correctSentence;

    const correctWords: IPuzzleWord[] = [];
    const incorrectWords: IPuzzleWord[] = [];

    const isEqualLength = result.length === correct.length;
    const errorCount = result.reduce((acc, el, index) => {
      if (el.id === correct[index].id) {
        correctWords.push(el);
      } else {
        acc += 1;
        incorrectWords.push(el);
      }
      return acc;
    }, 0);

    if (isEqualLength && errorCount === 0) {
      this.currentSentenceIndex += 1;
      this.startCurrentSentence();
    } else {
      correctWords.forEach((wordObj) => {
        wordObj.status = 'success';
        setTimeout(() => {
          wordObj.status = '';
        }, 0);
      });
      incorrectWords.forEach((wordObj) => {
        wordObj.status = 'error';
        setTimeout(() => {
          wordObj.status = '';
        }, 0);
      });
      this.updateBoards();
    }
  }

  private wordClick(words: IPuzzleWord[], id: string) {
    const index = words.findIndex((wordObj) => wordObj.id === id);
    if (index === -1) return;

    const currentWord = words.splice(index, 1);

    if (words === this.currentResultWords) {
      this.currentSourceWords.push(...currentWord);
    } else {
      this.currentResultWords.push(...currentWord);
    }

    this.updateBoards();
  }

  private getRoundData(): ISentence {
    return this.round.words[this.currentSentenceIndex];
  }

  private getSentencesObj(): IPuzzleWord[] {
    const roundData = this.getRoundData();
    const correctSentence = roundData.textExample.split(' ');

    return correctSentence.map((word, index) => {
      const totalLength = correctSentence.join('').length;
      const widthPercent = (word.length / totalLength) * 100;

      const puzzleId = `word-${index}-${this.currentSentenceIndex}`;

      return {
        word,
        id: puzzleId,
        width: widthPercent,
        position: {
          x: index,
          y: this.currentSentenceIndex,
        },
      };
    });
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
    gameEmitter.clear('game:sentence-check');
  }
}
