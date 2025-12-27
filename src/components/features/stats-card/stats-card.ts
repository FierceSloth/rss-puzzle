import { IComponentChild } from '@app-types/types';
// import { Component } from '@common/base-component';
import { BaseCard } from '@components/ui/card/card';
import styles from './card.module.scss';

interface IProps extends IComponentChild {}

export class StatsCard extends BaseCard {
  constructor({ className = [] }: IProps) {
    super({ className: [styles.card, ...className] });
  }
}
