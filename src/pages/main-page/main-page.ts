import { Header } from '@components/layout/header/header';
import { Component } from '@/common/base-component';
import type { Router } from '@/router/router';

import styles from './main-page.module.scss';
import { BaseCard } from '@/components/ui/card/card';
import { Button } from '@/components/ui/button/button';

export class MainPage {
  private container: Component;

  private router: Router;

  constructor(container: Component, router: Router) {
    this.container = container;
    this.router = router;
  }

  render(): void {
    // ================== Header ===============

    const header = new Header({ className: [styles.header] });

    // ================== TextContainer ===============

    const title = new Component({ tag: 'h1', className: styles.title, text: 'Welcome back, User Name!' });
    const text = new Component({ tag: 'p', className: styles.text, text: 'Assemble sentences, reveal masterpieces.' });
    const textContainer = new Component({ className: styles.textContainer }, title, text);

    // ================== Button ===============

    const startBtn = new Button({
      className: [styles.startBtn],
      text: 'Start Game',
      onClick: () => {
        this.router.navigate('/game');
      },
    });

    // ================== Containers ===============

    const card = new BaseCard({ className: [styles.card], children: [textContainer, startBtn] });

    const pageContainer = new Component({ className: ['pageContainer', styles.mainContainer] }, card);
    this.container.appendChildren([header, pageContainer]);
  }
}
