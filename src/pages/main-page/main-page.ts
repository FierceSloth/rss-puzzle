import { Header } from '@components/layout/header/header';
import { Component } from '@/common/base-component';
import type { Router } from '@/router/router';

import styles from './main-page.module.scss';

export class MainPage {
  private container: Component;

  private router: Router;

  constructor(container: Component, router: Router) {
    this.container = container;
    this.router = router;
  }

  render(): void {
    const header = new Header({ className: [styles.header] });

    const pageContainer = new Component({ className: 'pageContainer' }, header);
    this.container.append(pageContainer);
  }

  temporaryMethod(): Router {
    return this.router; // ? Temporarily, so that eslint doesn't complain that the router is not being used
  }
}
