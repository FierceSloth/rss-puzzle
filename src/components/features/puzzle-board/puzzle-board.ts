import { Component } from '@common/base-component';
import { ResultBoard } from '@components/features/result-board/result-board';
import { SourceField } from '@components/features/source-field/source-field';
import { ImageButton } from '@components/ui/image-button/image-button';

import playAudio from '@assets/images/play-audio.png';

import { gameEmitter } from '@utils/emitter';
import { dataManager } from '@utils/data-manager';
import { shuffleArr } from '@utils/random';
import { PuzzleBoardAlts, PuzzlePieceStatus } from '@enums/enums';
import { AUDIO_BASE_URL, IMAGE_BASE_URL } from '@constants/constants';
import { IComponentChild, IGroupResult, IPuzzleWord, IRound, ISentence } from '@/common/types/interfaces';

import styles from './puzzle-board.module.scss';

interface IProps extends IComponentChild {
  round: IRound;
}

export class PuzzleBoard extends Component {
  private round: IRound;
  private currentSentenceIndex: number = 0;

  private isAutoCompleted: boolean = false;
  private isBackgroundOn: boolean = true;
  private isLocked: boolean = false;

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

    const settings = dataManager.getSettings();
    this.toggleView(settings.view);
    this.toggleTranslate(settings.translate);
    this.toggleAudio(settings.audio);

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

      this.isLocked = true;
      this.showHints();

      gameEmitter.emit('game:sentence-checked-success', '');
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

  private loadNextSentence() {
    this.currentResultWords.forEach((word) => {
      word.background.isOn = true;
    });
    this.renderBoards();

    this.isLocked = false;
    this.isAutoCompleted = false;
    this.currentSentenceIndex += 1;

    if (!this.checkCompletion()) {
      this.initSentence();
    }
  }

  private autoCompleteSentence() {
    this.currentResultWords = [];
    this.currentSourceWords = [];

    this.currentResultWords.push(...this.correctSentence);

    this.isAutoCompleted = true;

    this.renderBoards();
    this.checkSentence();
  }

  private movePuzzlePiece(words: IPuzzleWord[], id: string) {
    if (this.isLocked) return;

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

      this.isLocked = true;

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

  private showHints() {
    this.currentResultWords.forEach((word) => {
      word.status = 'success';
    });

    this.toggleView(true);
    this.toggleTranslate(true);
    this.toggleAudio(true);

    this.renderBoards();
    this.resetHighlighting();
  }

  // ? ================= Hints ======================

  private toggleAudio(isActive: boolean) {
    this.audioButton.toggleClass(styles.hide, !isActive);
  }

  private toggleTranslate(isActive: boolean) {
    this.translationText.toggleClass(styles.hide, !isActive);
  }

  private toggleView(isActive: boolean) {
    this.isBackgroundOn = isActive;
    this.currentSourceWords.forEach((wordObj) => {
      wordObj.background.isOn = this.isBackgroundOn;
    });
    this.currentResultWords.forEach((wordObj) => {
      wordObj.background.isOn = this.isBackgroundOn;
    });
    this.renderBoards();
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
          offsetX: currentOffset,
          y: this.currentSentenceIndex,
          isOn: this.isBackgroundOn,
          widthPercent,
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
    this.translationText.removeClass(styles.hide);
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
    gameEmitter.on('game:next-sentence-request', () => {
      this.loadNextSentence();
    });

    gameEmitter.on<boolean>('game:translate-toggle', (condition) => {
      this.toggleTranslate(condition);
    });

    gameEmitter.on<boolean>('game:audio-toggle', (condition) => {
      this.toggleAudio(condition);
    });

    gameEmitter.on<boolean>('game:view-toggle', (condition) => {
      this.toggleView(condition);
    });

    return this;
  }

  private unsubscribeFromEvents(): this {
    gameEmitter.clear('game:result-word-click');
    gameEmitter.clear('game:source-word-click');

    gameEmitter.clear('game:sentence-check');
    gameEmitter.clear('game:auto-complete');
    gameEmitter.clear('game:next-sentence-request');

    gameEmitter.clear('game:audio-toggle');
    gameEmitter.clear('game:translate-toggle');
    gameEmitter.clear('game:view-toggle');
    return this;
  }
}
