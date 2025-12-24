import { Component } from '@/common/base-component';
import type { Router } from '@/router/router';

export class MainPage {
  private container: Component;

  private router: Router;

  constructor(container: Component, router: Router) {
    this.container = container;
    this.router = router;
  }

  render(): void {
    this.container.node.innerHTML = '<h1> Main Page </h1>';
  }

  temporaryMethod(): Router {
    return this.router; // ? Temporarily, so that eslint doesn't complain that the router is not being used
  }
} // ! Temporary placeholder for the router class
