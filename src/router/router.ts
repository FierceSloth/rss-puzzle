import { PagePath } from '@enums/enums';
import { GamePage } from '@pages/game-page/game-page';
import { LoginPage } from '@pages/login-page/login-page';
import { MainPage } from '@pages/main-page/main-page';
import { StatisticsPage } from '@pages/statistics-page/statistics-page';
import { NotFound } from '@pages/not-found-page/not-found';
import type { IPage } from '@/common/types/interfaces';
import { dataManager } from '@/common/utils/data-manager';
import type { App } from '@/app';

export class Router {
  private pages: Record<string, IPage>;

  private app: App;

  private currentPath = '';

  constructor(app: App) {
    this.pages = {
      [PagePath.LOGIN]: new LoginPage(app.container, this),
      [PagePath.MAIN]: new MainPage(app.container, this),
      [PagePath.GAME]: new GamePage(app.container, this),
      [PagePath.STATISTICS]: new StatisticsPage(app.container, this),
      [PagePath.NOT_FOUND]: new NotFound(app.container, this),
    };
    this.app = app;
  }

  public route(path: string): void {
    const isLogged = Boolean(dataManager.getUser());

    if (!isLogged && path !== PagePath.LOGIN) {
      this.navigate(PagePath.LOGIN);
      return;
    }

    if (isLogged && path === PagePath.LOGIN) {
      this.navigate(PagePath.MAIN);
      return;
    }

    const isRoundDone = dataManager.getLastResults() !== null;

    if (path === PagePath.STATISTICS && !isRoundDone) {
      this.navigate(PagePath.GAME);
      return;
    }

    if (this.currentPath === path) return;

    this.currentPath = path;
    const page = this.pages[path] || this.pages[PagePath.NOT_FOUND];
    this.app.clearContainer();
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
