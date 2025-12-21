import { App } from '../app';

export class StatisticsPage {
  private app: App;

  constructor(app: App) {
    this.app = app;
  }

  render(): void {
    this.app.container.innerHTML = '<h1> Statistics Page </h1>';
  }
} // ! Temporary placeholder for the router class
