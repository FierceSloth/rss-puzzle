import { IComponentChild, IOption } from '@/common/types/interfaces';
import { Component } from '@/common/base-component';
import styles from './select.module.scss';

interface IProps extends IComponentChild {
  options: IOption[];
  onChange: (value: string) => void;
  value: number;
}

export class Select extends Component<HTMLSelectElement> {
  constructor({ className = [], value = 1, onChange, options }: IProps) {
    super({ tag: 'select', className: [styles.select, ...className] });

    this.setOptions(options);

    if (value !== undefined) {
      this.setValue(value);
    }

    this.addListener('change', () => {
      onChange(this.node.value);
    });
  }

  public setOptions(options: IOption[]) {
    this.destroyChildren();

    options.forEach(({ value, text }) => {
      const optionEl = new Component({ tag: 'option', className: styles.option, text });
      optionEl.node.setAttribute('value', String(value));
      this.append(optionEl);
    });
  }

  public setValue(value: string | number) {
    this.node.value = String(value);
  }
}
