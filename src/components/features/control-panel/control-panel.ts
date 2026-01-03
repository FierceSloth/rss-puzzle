import { ToggleButton } from '@components/ui/toggle-button/toggle-button';

import view from '@assets/images/view.png';
import audio from '@assets/images/audio.png';
import translate from '@assets/images/translation.png';

import { ToggleButtonAlts } from '@enums/enums';
import { actionButtonMessages } from '@constants/messages';
import { IComponentChild } from '@/common/types/interfaces';
import styles from './control-panel.module.scss';
import { Button } from '@/components/ui/button/button';
import { Component } from '@/common/base-component';
import { gameEmitter } from '@/common/utils/emitter';

interface IProps extends IComponentChild {}

export class ControlPanel extends Component {
  constructor({ className = [] }: IProps) {
    super({ className: [styles.controlPanel, ...className] });

    this.renderToggleButtons();
    this.renderActionButtons();
  }

  private renderToggleButtons() {
    const toggleButtons = [
      {
        className: [],
        attrs: {
          src: translate,
          alt: ToggleButtonAlts.translate,
        },
        onclick: () => {},
      },
      {
        className: [],
        attrs: {
          src: audio,
          alt: ToggleButtonAlts.audio,
        },
        onclick: () => {},
      },
      {
        className: [],
        attrs: {
          src: view,
          alt: ToggleButtonAlts.view,
        },
        onclick: () => {},
      },
    ];
    const toggleButtonsContainer = new Component({ className: styles.toggleButtonsContainer });

    toggleButtons.forEach((buttonOption) => {
      const toggleButton = new ToggleButton(buttonOption);
      toggleButtonsContainer.append(toggleButton);
    });

    this.append(toggleButtonsContainer);
  }

  private renderActionButtons() {
    const giveUpButton = new Button({ text: actionButtonMessages.giveUpButton, onClick: () => {} });
    const checkButton = new Button({
      text: actionButtonMessages.checkButton,
      onClick: () => {
        gameEmitter.emit('game:sentence-check', '');
      },
    });

    checkButton.node.disabled = true; // ? temporary

    const actionButtonsContainer = new Component(
      { className: styles.actionButtonsContainer },
      giveUpButton,
      checkButton
    );
    this.append(actionButtonsContainer);

    gameEmitter.on<boolean>('game:sentence-end', (condition) => {
      checkButton.node.disabled = !condition;
    });
  }
}
