import { Component } from '@/common/base-component';
import { dataManager } from '@/common/utils/data-manager';
import { StatsCard } from '@/components/features/stats-card/stats-card';
import { PagePath } from '@/common/enums/enums';

import styles from './statistics-page.module.scss';
import { appEmitter } from '@/common/utils/emitter';

export class StatisticsPage {
  private container: Component;

  constructor(container: Component) {
    this.container = container;
  }

  render(): void {
    const lastResult = dataManager.getLastResults();
    if (lastResult === null) {
      appEmitter.emit('router:navigate', PagePath.GAME);
      return;
    }
    const statsCard = new StatsCard({ result: lastResult });

    const pageContainer = new Component({ className: [styles.statsContainer, 'pageContainer'] }, statsCard);
    this.container.appendChildren([pageContainer]);
  }
}
