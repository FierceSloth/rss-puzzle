import { IComponentChild } from '@app-types/types';
import { Component } from '@/common/base-component';
import styles from './card.module.scss';

interface IChild extends IComponentChild {}

export class BaseCard extends Component {
  constructor({ otherClasses = [], children = [] }: IChild) {
    super({ className: [styles.card, ...otherClasses] }, ...children);
  }
}
