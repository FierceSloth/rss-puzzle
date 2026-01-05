import { Component } from '@common/base-component';
import { ResultBoard } from '@components/features/result-board/result-board';
import { SourceField } from '@components/features/source-field/source-field';

import playAudio from '@assets/images/play-audio.png';

import { shuffleArr } from '@common/utils/random';
import { PuzzleBoardAlts, PuzzlePieceStatus } from '@enums/enums';
import { IComponentChild, IGroupResult, IPuzzleWord, IRound, ISentence } from '@/common/types/interfaces';
import { ImageButton } from '@/components/ui/image-button/image-button';
import styles from './puzzle-board.module.scss';
import { AUDIO_BASE_URL } from '@/common/constants/constants';
import { gameEmitter } from '@/common/utils/emitter';
import { IMAGE_BASE_URL } from '../../../common/constants/constants';

interface IProps extends IComponentChild {
  round: IRound;
}

export class PuzzleBoard extends Component {
  private round: IRound;
  private currentSentenceIndex: number = 0;
  private isAutoCompleted: boolean = false;

  private currentSourceWords: IPuzzleWord[] = [];
  private currentResultWords: IPuzzleWord[] = [];
  private correctSentence: IPuzzleWord[] = [];
  private gameResults: IGroupResult = { known: [], unknown: [] };

  private resultBoard: ResultBoard;
  private sourceField: SourceField;

  private translationText: Component;
  private audioButton: ImageButton;

  constructor({ className = [], round }: IProps) {
    super({ className: [styles.puzzleBoard, ...className] });

    this.round = round;

    // ? ================= Render ====================

    const audioButtonOptions = {
      className: [styles.audioButton],
      attrs: {
        alt: PuzzleBoardAlts.audio,
        src: playAudio,
      },
    };

    this.translationText = new Component({ className: styles.translateText });
    this.audioButton = new ImageButton(audioButtonOptions);

    const translateContainer = new Component(
      { className: styles.translateContainer },
      this.translationText,
      this.audioButton
    );

    this.resultBoard = new ResultBoard({});
    this.sourceField = new SourceField({});

    this.appendChildren([translateContainer, this.resultBoard, this.sourceField]);

    setTimeout(() => {
      this.initSentence();
    }, 0);
  }

  // ? ========= Initializations Methods ============

  private initSentence() {
    this.unsubscribeFromEvents();

    const currentRoundData = this.getRoundData();
    this.correctSentence = this.getSentencesData();

    this.currentSourceWords = shuffleArr(this.correctSentence);
    this.currentResultWords = [];

    this.setupTranslate(currentRoundData);

    this.renderBoards();

    this.subscribeToEvents();
  }

  private setupTranslate(roundData: ISentence) {
    this.setupAudio(roundData.audioExample);
    this.setTranslationText(roundData.textExampleTranslate);
  }

  // ? ============= Core Methods ===================

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
      if (!this.isAutoCompleted) {
        this.saveSentenceResult('known');
      } else {
        this.saveSentenceResult('unknown');
      }
      this.isAutoCompleted = false;
      this.currentSentenceIndex += 1;

      if (!this.checkCompletion()) {
        this.initSentence();
      }
    } else {
      correctWords.forEach((wordObj) => {
        wordObj.status = PuzzlePieceStatus.SUCCESS;
      });

      incorrectWords.forEach((wordObj) => {
        wordObj.status = PuzzlePieceStatus.ERROR;
      });

      this.renderBoards();
      this.resetHighlighting();
    }
  }

  private autoCompleteSentence() {
    this.currentResultWords = [];
    this.currentSourceWords = [];

    this.currentResultWords.push(...this.correctSentence);

    this.isAutoCompleted = true;

    this.renderBoards();
  }

  private movePuzzlePiece(words: IPuzzleWord[], id: string) {
    const index = words.findIndex((wordObj) => wordObj.id === id);
    if (index === -1) return;

    const currentWord = words.splice(index, 1);

    if (words === this.currentResultWords) {
      this.currentSourceWords.push(...currentWord);
    } else {
      this.currentResultWords.push(...currentWord);
    }

    this.renderBoards();
  }

  private checkCompletion(): boolean {
    if (this.currentSentenceIndex === this.round.words.length) {
      gameEmitter.emit<IGroupResult>('game:send-results', this.gameResults);
      gameEmitter.emit('game:round-complete', '');

      this.setPaintInfo();

      return true;
    }
    return false;
  }

  // ? =============== Rendering ====================

  private renderBoards() {
    this.resultBoard.renderWords(this.currentResultWords, this.currentSentenceIndex);
    this.sourceField.renderWords(this.currentSourceWords);

    const isCompleted = this.currentSourceWords.length === 0;
    gameEmitter.emit('game:sentence-end', isCompleted);
  }

  private setTranslationText(text: string) {
    this.translationText.setText(text);
  }

  private resetHighlighting() {
    this.currentResultWords.forEach((word) => {
      word.status = '';
    });
    this.currentSourceWords.forEach((word) => {
      word.status = '';
    });
  }

  // ? ================= Utils ======================

  private getRoundData(): ISentence {
    return this.round.words[this.currentSentenceIndex];
  }

  private getSentencesData(): IPuzzleWord[] {
    const roundData = this.getRoundData();
    const correctSentence = roundData.textExample.split(' ');
    const totalLength = correctSentence.join('').length;

    const totalRows = this.round.words.length;
    const imageUrl = `${IMAGE_BASE_URL}${this.round.levelData.imageSrc}`;
    let currentOffset = 0;

    return correctSentence.map((word, index) => {
      const widthPercent = (word.length / totalLength) * 100;
      const puzzleId = `word-${index}-${this.currentSentenceIndex}`;

      const wordObj = {
        word,
        id: puzzleId,
        width: widthPercent,

        background: {
          url: imageUrl,
          widthPercent,
          offsetX: currentOffset,
          y: this.currentSentenceIndex,
          totalRows,
        },
      };

      currentOffset += widthPercent;
      return wordObj;
    });
  }

  private setupAudio(src: string) {
    this.audioButton.setOnClick(() => {
      const audio = new Audio(`${AUDIO_BASE_URL}${src}`);
      audio.play();
    });
  }

  private setPaintInfo() {
    const roundData = this.round.levelData;
    const paintInfo = `${roundData.author} - ${roundData.name} (${roundData.year})`;
    this.audioButton.destroy();
    this.setTranslationText(paintInfo);
  }

  private saveSentenceResult(status: 'known' | 'unknown') {
    this.gameResults[status].push({
      sentence: this.correctSentence.map((word) => word.word).join(' '),
      audioSrc: this.getRoundData().audioExample,
    });
  }

  // ? ================ Emitter ======================

  private subscribeToEvents(): this {
    gameEmitter.on<string>('game:source-word-click', (id) => {
      this.movePuzzlePiece(this.currentSourceWords, id);
    });
    gameEmitter.on<string>('game:result-word-click', (id) => {
      this.movePuzzlePiece(this.currentResultWords, id);
    });
    gameEmitter.on('game:sentence-check', () => {
      this.checkSentence();
    });
    gameEmitter.on('game:auto-complete', () => {
      this.autoCompleteSentence();
    });
    return this;
  }

  private unsubscribeFromEvents(): this {
    gameEmitter.clear('game:result-word-click');
    gameEmitter.clear('game:source-word-click');
    gameEmitter.clear('game:sentence-check');
    gameEmitter.clear('game:auto-complete');
    return this;
  }
}
