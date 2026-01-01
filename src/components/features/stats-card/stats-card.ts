import { Component } from '@common/base-component';
import { BaseCard } from '@components/ui/card/card';
import { ImageButton } from '@components/ui/image-button/image-button';
import { Button } from '@components/ui/button/button';

import playAudio from '@assets/images/play-audio.png';
import { PagePath, PuzzleBoardAlts, StatisticsAlts } from '@enums/enums';
import { statisticsMessages } from '@constants/messages';
import { AUDIO_BASE_URL, IMAGE_BASE_URL } from '@constants/constants';
import { IComponentChild, ILastResult, ISentenceResult } from '@/common/types/interfaces';
import type { Router } from '@/router/router';
import styles from './stats-card.module.scss';

interface IProps extends IComponentChild {
  result: ILastResult;
  router: Router;
}

export class StatsCard extends BaseCard {
  constructor({ className = [], result, router }: IProps) {
    super({ className: [styles.card, ...className] });

    // ================== Paint Info ==================

    const imgAttrs = {
      alt: StatisticsAlts.img,
      src: `${IMAGE_BASE_URL}${result.paintInfo.imageSrc}`,
    };
    const paintText = `${result.paintInfo.author} - "${result.paintInfo.name}" (${result.paintInfo.year})`;

    const img = new Component({ tag: 'img', className: styles.img, attrs: imgAttrs });
    const text = new Component({ className: styles.text, text: paintText });
    const paintContainer = new Component({ className: styles.paintContainer }, img, text);

    // ================== Results =====================

    const knownTitle = new Component({
      className: styles.title,
      text: `${statisticsMessages.known} (${result.sentences.known.length})`,
    });
    const knownContainer = new Component({ className: styles.sentencesContainer }, knownTitle);
    StatsCard.appendSentences(knownContainer, result.sentences.known);

    const unknownTitle = new Component({
      className: styles.title,
      text: `${statisticsMessages.unknown} (${result.sentences.unknown.length})`,
    });
    const unknownContainer = new Component({ className: styles.sentencesContainer }, unknownTitle);
    StatsCard.appendSentences(unknownContainer, result.sentences.unknown);

    const resultsContainer = new Component({ className: styles.resultsContainer }, knownContainer, unknownContainer);

    // ================== Button =======================

    const continueButton = new Button({
      className: [styles.continueButton],
      text: statisticsMessages.buttonText,
      onClick: () => {
        router.navigate(PagePath.GAME);
      },
    });

    this.appendChildren([paintContainer, resultsContainer, continueButton]);
  }

  private static appendSentences(container: Component, sentences: ISentenceResult[]) {
    sentences.forEach((options) => {
      const buttonAttrs = {
        alt: PuzzleBoardAlts.audio,
        src: playAudio,
      };

      const audioButton = new ImageButton({
        className: [styles.sentenceButton],
        attrs: buttonAttrs,
        onClick: () => {
          const audio = new Audio(`${AUDIO_BASE_URL}${options.audioSrc}`);
          audio.play();
        },
      });
      const sentenceText = new Component({ className: styles.sentenceText, text: options.sentence });

      const sentenceContainer = new Component({ className: styles.sentence }, audioButton, sentenceText);
      container.append(sentenceContainer);
    });
  }
}
