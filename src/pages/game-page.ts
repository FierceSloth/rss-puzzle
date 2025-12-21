import { App } from '../app';

export class GamePage {
  private app: App;

  constructor(app: App) {
    this.app = app;
  }

  render(): void {
    this.app.container.innerHTML = '<h1> Game Page </h1>';
  }
} // ! Temporary placeholder for the router class
