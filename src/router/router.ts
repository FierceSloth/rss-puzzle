import type { Page } from '../common/types/types';
import type { App } from '../app';
import { GamePage } from '../pages/game-page';
import { LoginPage } from '../pages/login-page';
import { MainPage } from '../pages/main-page';
import { StatisticsPage } from '../pages/statistics-page';
import { NotFound } from '../pages/not-found';
import { PagePath } from '../common/enums/enums';

export class Router {
  private pages: Record<string, Page>;

  private currentPath = '';

  constructor(app: App) {
    this.pages = {
      [PagePath.LOGIN]: new LoginPage(app),
      [PagePath.MAIN]: new MainPage(app),
      [PagePath.GAME]: new GamePage(app),
      [PagePath.STATISTICS]: new StatisticsPage(app),
      [PagePath.NOT_FOUND]: new NotFound(app),
    };
  }

  public route(path: string): void {
    if (this.currentPath === path) return;

    this.currentPath = path;
    const page = this.pages[path] || this.pages[PagePath.NOT_FOUND];
    page.render();
  }

  public navigate(path: string): void {
    globalThis.history.pushState({}, '', path);
    this.route(path);
  }

  public listen(): void {
    globalThis.addEventListener('popstate', () => {
      this.route(globalThis.location.pathname);
    });
    this.route(globalThis.location.pathname);
  }
}
