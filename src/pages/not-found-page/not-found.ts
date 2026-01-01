import { Component } from '@/common/base-component';
import type { Router } from '@/router/router';

import styles from './not-found-page.module.scss';
import { notFoundMessages } from '@/common/constants/messages';
import { Button } from '@/components/ui/button/button';
import { PagePath } from '@/common/enums/enums';
import { BaseCard } from '@/components/ui/card/card';

export class NotFound {
  private container: Component;
  private router: Router;

  constructor(container: Component, router: Router) {
    this.container = container;
    this.router = router;
  }

  render(): void {
    const title = new Component({ tag: 'h1', className: styles.title, text: notFoundMessages.title });
    const button = new Button({
      className: [styles.button],
      text: notFoundMessages.buttonText,
      onClick: () => {
        this.router.navigate(PagePath.MAIN);
      },
    });

    const card = new BaseCard({ className: [styles.card], children: [title, button] });

    const pageContainer = new Component({ className: [styles.notFoundContainer, 'pageContainer'] }, card);
    this.container.append(pageContainer);
  }
}
