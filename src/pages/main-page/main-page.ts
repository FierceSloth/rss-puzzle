import { Header } from '@components/layout/header/header';
import { Component } from '@/common/base-component';
import { Router } from '@/router/router';

import styles from './main-page.module.scss';
import { BaseCard } from '@/components/ui/card/card';
import { Button } from '@/components/ui/button/button';
import { mainMessages } from '@/common/constants/messages';
import { PagePath } from '@/common/enums/enums';
import { dataManager } from '@/common/utils/data-manager';

export class MainPage {
  private container: Component;
  private router: Router;

  constructor(container: Component, router: Router) {
    this.container = container;
    this.router = router;
  }

  render(): void {
    // ================== Header ===============

    const header = new Header({ className: [styles.header], router: this.router });

    // ================== TextContainer ===============

    const userName = dataManager.getUserFullName();

    const title = new Component({
      tag: 'h1',
      className: styles.title,
      text: `${mainMessages.maintText} ${userName}!`,
    });
    const text = new Component({ tag: 'p', className: styles.text, text: mainMessages.secondText });
    const textContainer = new Component({ className: styles.textContainer }, title, text);

    // ================== Button ===============

    const startButton = new Button({
      className: [styles.startButton],
      text: mainMessages.buttonText,
      onClick: () => {
        this.router.navigate(PagePath.GAME);
      },
    });

    // ================== Containers ===============

    const card = new BaseCard({ className: [styles.card], children: [textContainer, startButton] });

    const pageContainer = new Component({ className: ['pageContainer', styles.mainContainer] }, card);
    this.container.appendChildren([header, pageContainer]);
  }
}
