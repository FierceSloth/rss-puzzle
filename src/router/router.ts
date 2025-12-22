import type { IPage } from '@app-types/types';
import { PagePath } from '@enums/enums';
import type { App } from '@/app';
import { GamePage } from '@/pages/game-page';
import { LoginPage } from '@/pages/login-page';
import { MainPage } from '@/pages/main-page';
import { StatisticsPage } from '@/pages/statistics-page';
import { NotFound } from '@/pages/not-found';

export class Router {
  private pages: Record<string, IPage>;

  private currentPath = '';

  constructor(app: App) {
    this.pages = {
      [PagePath.LOGIN]: new LoginPage(app.container, this),
      [PagePath.MAIN]: new MainPage(app.container, this),
      [PagePath.GAME]: new GamePage(app.container, this),
      [PagePath.STATISTICS]: new StatisticsPage(app.container, this),
      [PagePath.NOT_FOUND]: new NotFound(app.container, this),
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
