import type { Router } from '@/router/router';

export class MainPage {
  private container: HTMLElement;

  private router: Router;

  constructor(container: HTMLElement, router: Router) {
    this.container = container;
    this.router = router;
  }

  render(): void {
    this.container.innerHTML = '<h1> Main Page </h1>';
    console.log(this.router); // ? Temporarily, so that eslint doesn't complain that the router is not being used
  }
} // ! Temporary placeholder for the router class
