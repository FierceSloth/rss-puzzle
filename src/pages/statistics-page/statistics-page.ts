import { Component } from '@/common/base-component';
import { dataManager } from '@/common/utils/data-manager';
import { StatsCard } from '@/components/features/stats-card/stats-card';
import { PagePath } from '@/common/enums/enums';
import type { Router } from '@/router/router';

import styles from './statistics-page.module.scss';

export class StatisticsPage {
  private container: Component;
  private router: Router;

  constructor(container: Component, router: Router) {
    this.container = container;
    this.router = router;
  }

  render(): void {
    const lastResult = dataManager.getLastResults();
    if (lastResult === null) {
      this.router.navigate(PagePath.GAME);
      return;
    }
    const statsCard = new StatsCard({ className: [styles.card], result: lastResult, router: this.router });

    const pageContainer = new Component({ className: [styles.statsContainer, 'pageContainer'] }, statsCard);
    this.container.appendChildren([pageContainer]);
  }
}
