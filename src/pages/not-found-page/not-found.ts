import { Component } from '@/common/base-component';

import styles from './not-found-page.module.scss';
import { notFoundMessages } from '@/common/constants/messages';
import { Button } from '@/components/ui/button/button';
import { PagePath } from '@/common/enums/enums';
import { BaseCard } from '@/components/ui/card/card';
import { appEmitter } from '@/common/utils/emitter';

export class NotFound {
  private container: Component;

  constructor(container: Component) {
    this.container = container;
  }

  render(): void {
    const title = new Component({ tag: 'h1', className: styles.title, text: notFoundMessages.title });
    const button = new Button({
      className: [styles.button],
      text: notFoundMessages.buttonText,
      onClick: () => {
        appEmitter.emit('router:navigate', PagePath.MAIN);
      },
    });

    const card = new BaseCard({ className: [styles.card], children: [title, button] });

    const pageContainer = new Component({ className: [styles.notFoundContainer, 'pageContainer'] }, card);
    this.container.append(pageContainer);
  }
}
