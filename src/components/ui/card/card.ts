import { IComponentChild } from '@app-types/types';
import { Component } from '@/common/base-component';
import styles from './card.module.scss';

interface IProps extends IComponentChild {}

export class BaseCard extends Component {
  constructor({ className = [], children = [] }: IProps) {
    super({ className: [styles.card, ...className] }, ...children);
  }
}
