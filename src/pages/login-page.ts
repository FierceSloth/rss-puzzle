import { App } from '../app';

export class LoginPage {
  private app: App;

  constructor(app: App) {
    this.app = app;
  }

  render(): void {
    this.app.container.innerHTML = '<h1> Login Page </h1>';
  }
} // ! Temporary placeholder for the router class
