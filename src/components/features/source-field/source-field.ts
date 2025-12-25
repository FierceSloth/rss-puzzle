import { IComponentChild } from '@app-types/types';
import { Component } from '@/common/base-component';
import styles from './source-field.module.scss';

interface IProps extends IComponentChild {}

export class SourceField extends Component {
  constructor({ className = [], children = [] }: IProps) {
    super({ className: [styles.sourceField, ...className] }, ...children);
  }
}
