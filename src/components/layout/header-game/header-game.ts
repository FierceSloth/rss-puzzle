import { Header } from '@components/layout/header/header';
import { Component } from '@common/base-component';
import { IComponentChild, IOption } from '@/common/types/interfaces';

import styles from './header-game.module.scss';
import { dataManager } from '@/common/utils/data-manager';
import { gameEmitter } from '@/common/utils/emitter';
import { Select } from '@/components/ui/select/select';

interface IProps extends IComponentChild {}

export class HeaderGame extends Header {
  private levelSelect: Select;
  private roundSelect: Select;

  constructor({ className = [] }: IProps) {
    super({ className: [styles.headerGame, ...className] });

    const { currentLevel, currentRound } = dataManager.getCurrentProgress();

    const levelOptions = HeaderGame.addLevelOptions();
    this.levelSelect = new Select({
      className: [styles.levelSelect],
      options: levelOptions,
      value: currentLevel,
      onChange: (val) => this.levelChange(Number(val)),
    });

    const roundOptions = HeaderGame.addRoundOptions(currentLevel);
    this.roundSelect = new Select({
      className: [styles.roundSelect],
      options: roundOptions,
      value: currentRound,
      onChange: (val) => HeaderGame.roundChange(Number(val)),
    });

    const selectsContainer = new Component({ className: styles.selectContainer }, this.levelSelect, this.roundSelect);

    this.append(selectsContainer);
  }

  private levelChange(newLevel: number): void {
    dataManager.setCurrentLevel(newLevel);
    dataManager.setCurrentRound(1);

    const newRoundOptions = HeaderGame.addRoundOptions(newLevel);
    this.roundSelect.setOptions(newRoundOptions);
    this.roundSelect.setValue(1);

    gameEmitter.emit('game:round-change', '');
  }

  private static addLevelOptions(): IOption[] {
    const options: IOption[] = [];
    for (let i = 1; i <= 6; i += 1) {
      options.push({ value: i, text: `Level ${i}` });
    }
    return options;
  }

  private static addRoundOptions(level: number): IOption[] {
    const count = dataManager.getRoundsCount(level);
    const options: IOption[] = [];
    for (let i = 1; i <= count; i += 1) {
      const isComplete = dataManager.isRoundCompleted(level, i);
      const text = `Round ${i} ${isComplete ? '✔' : ''}`;
      options.push({ value: i, text });
    }
    return options;
  }

  private static roundChange(newRound: number): void {
    dataManager.setCurrentRound(newRound);
    gameEmitter.emit('game:round-change', '');
  }
}
