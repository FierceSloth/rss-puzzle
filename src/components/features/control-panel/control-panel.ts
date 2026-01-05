import { ToggleButton } from '@components/ui/toggle-button/toggle-button';

import view from '@assets/images/view.png';
import audio from '@assets/images/audio.png';
import translate from '@assets/images/translation.png';

import { PagePath, ToggleButtonAlts } from '@enums/enums';
import { actionButtonMessages } from '@constants/messages';
import { IComponentChild } from '@/common/types/interfaces';
import styles from './control-panel.module.scss';
import { Button } from '@/components/ui/button/button';
import { Component } from '@/common/base-component';
import { appEmitter, gameEmitter } from '@/common/utils/emitter';
import { dataManager } from '@/common/utils/data-manager';

interface IProps extends IComponentChild {}

export class ControlPanel extends Component {
  private giveUpButton: Button;
  private checkButton: Button;

  private isContinueMode: boolean = false;

  constructor({ className = [] }: IProps) {
    super({ className: [styles.controlPanel, ...className] });

    this.giveUpButton = new Button({
      text: actionButtonMessages.giveUpButton,
      onClick: () => gameEmitter.emit('game:auto-complete', ''),
    });

    this.checkButton = new Button({
      text: actionButtonMessages.checkButton,
      onClick: () => this.checkClick(),
    });
    this.checkButton.node.disabled = true;

    this.renderToggleButtons();
    this.renderActionButtons();

    this.subscribe();
  }

  private checkClick() {
    if (this.isContinueMode) {
      this.setCheckMode();
      gameEmitter.emit('game:next-sentence-request', '');
    } else {
      gameEmitter.emit('game:sentence-check', '');
    }
  }

  private setContinueMode() {
    this.isContinueMode = true;
    this.checkButton.node.textContent = actionButtonMessages.continueButton;
    this.checkButton.node.disabled = false;
  }

  private setCheckMode() {
    this.isContinueMode = false;
    this.checkButton.node.textContent = actionButtonMessages.checkButton;
    this.checkButton.node.disabled = true;
  }

  private subscribe() {
    gameEmitter.on('game:sentence-checked-success', () => {
      this.setContinueMode();
    });

    gameEmitter.on<boolean>('game:sentence-end', (condition) => {
      this.sentenceEnd(condition);
    });

    gameEmitter.on('game:round-complete', () => {
      this.roundComplete();
    });
  }

  private roundComplete() {
    this.giveUpButton.node.disabled = true;
    this.checkButton.node.disabled = false;

    this.checkButton.node.textContent = actionButtonMessages.continueButton;
    this.checkButton.removeClickListener();

    this.checkButton.addListener('click', () => {
      appEmitter.emit('router:navigate', PagePath.STATISTICS);
    });
  }

  private sentenceEnd(condition: boolean) {
    this.checkButton.node.disabled = !condition;
  }

  private renderToggleButtons() {
    const initSettings = {
      translate: dataManager.getSetting('translate'),
      audio: dataManager.getSetting('audio'),
      view: dataManager.getSetting('view'),
    };

    const translateButton = new ToggleButton({
      className: [],
      attrs: { src: translate, alt: ToggleButtonAlts.translate },
      onClick: () => {
        const current = dataManager.getSetting('translate');
        const newValue = !current;

        dataManager.setSetting('translate', newValue);

        translateButton.toggleUI(newValue);
        gameEmitter.emit('game:translate-toggle', newValue);
      },
    });
    translateButton.toggleUI(initSettings.translate);

    const audioButton = new ToggleButton({
      className: [],
      attrs: { src: audio, alt: ToggleButtonAlts.audio },
      onClick: () => {
        const current = dataManager.getSetting('audio');
        const newValue = !current;

        dataManager.setSetting('audio', newValue);

        audioButton.toggleUI(newValue);
        gameEmitter.emit('game:audio-toggle', newValue);
      },
    });
    audioButton.toggleUI(initSettings.audio);

    const viewButton = new ToggleButton({
      className: [],
      attrs: { src: view, alt: ToggleButtonAlts.view },
      onClick: () => {
        const current = dataManager.getSetting('view');
        const newValue = !current;

        dataManager.setSetting('view', newValue);

        viewButton.toggleUI(newValue);
        gameEmitter.emit('game:view-toggle', newValue);
      },
    });
    viewButton.toggleUI(initSettings.view);

    const toggleButtonsContainer = new Component(
      { className: styles.toggleButtonsContainer },
      translateButton,
      audioButton,
      viewButton
    );

    this.append(toggleButtonsContainer);
  }

  private renderActionButtons() {
    const actionButtonsContainer = new Component(
      { className: styles.actionButtonsContainer },
      this.giveUpButton,
      this.checkButton
    );
    this.append(actionButtonsContainer);
  }
}
