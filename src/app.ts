import { Component } from '@common/base-component';
import { Router } from './router/router';

export class App {
  public readonly container: Component;

  public readonly router: Router;

  constructor() {
    const root = new Component({ attrs: { id: 'app' } });
    document.body.append(root.node);
    this.container = root;

    this.router = new Router(this);
  }

  start() {
    this.router.listen();
  }

  clearContainer() {
    this.container.destroyChildren();
  }
}
