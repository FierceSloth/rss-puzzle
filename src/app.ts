import { Component } from '@common/base-component';
import { Router } from './router/router';

export class App {
  public readonly container: HTMLElement;

  public readonly router: Router;

  constructor() {
    const root = new Component({ attrs: { id: 'app' } });
    document.body.append(root.node);
    this.container = root.node;

    this.router = new Router(this);
  }

  start() {
    this.router.listen();
  }
}
