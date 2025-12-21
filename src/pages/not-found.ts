import { App } from '../app';

export class NotFound {
  private app: App;

  constructor(app: App) {
    this.app = app;
  }

  render(): void {
    this.app.container.innerHTML = '<h1> 404 Not Found </h1>';
  }
} // ! Temporary placeholder for the router class
