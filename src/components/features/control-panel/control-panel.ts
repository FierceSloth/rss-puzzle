import { IComponentChild } from '@app-types/types';
import { ToggleButton } from '@components/ui/toggle-button/toggle-button';

import view from '@assets/images/view.png';
import audio from '@assets/images/audio.png';
import translate from '@assets/images/translation.png';

import { ToggleBtnAlts } from '@enums/enums';
import { actionBtnMessages } from '@constants/messages';
import styles from './control-panel.module.scss';
import { Button } from '@/components/ui/button/button';
import { Component } from '@/common/base-component';

interface IProps extends IComponentChild {}

export class ControlPanel extends Component {
  constructor({ className = [] }: IProps) {
    super({ className: [styles.controlPanel, ...className] });

    this.renderToggleButtons();
    this.renderActionButtons();
  }

  private renderToggleButtons() {
    const toggleBtns = [
      {
        className: [styles.translateBtn],
        attrs: {
          src: translate,
          alt: ToggleBtnAlts.translate,
        },
        onclick: () => {},
      },
      {
        className: [styles.translateBtn],
        attrs: {
          src: audio,
          alt: ToggleBtnAlts.translate,
        },
        onclick: () => {},
      },
      {
        className: [styles.translateBtn],
        attrs: {
          src: view,
          alt: ToggleBtnAlts.view,
        },
        onclick: () => {},
      },
    ];
    const toggleBtnsContainer = new Component({ className: styles.toggleBtnsContainer });

    toggleBtns.forEach((btnOption) => {
      const toggleBtn = new ToggleButton(btnOption);
      toggleBtnsContainer.append(toggleBtn);
    });

    this.append(toggleBtnsContainer);
  }

  private renderActionButtons() {
    const giveUpBtn = new Button({ text: actionBtnMessages.giveUpBtn, onClick: () => {} });
    const checkBtn = new Button({ text: actionBtnMessages.checkBtn, onClick: () => {} });

    checkBtn.node.disabled = true; // ? temporary

    const actionBtnsContainer = new Component({ className: styles.actionBtnsContainer }, giveUpBtn, checkBtn);
    this.append(actionBtnsContainer);
  }
}
