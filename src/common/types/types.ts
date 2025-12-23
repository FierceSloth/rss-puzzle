import type { Component } from '@common/base-component';

export interface IPage {
  render: () => void;
}

export interface IComponent {
  tag?: keyof HTMLElementTagNameMap;
  className?: string | string[];
  text?: string;
  attrs?: Record<string, string>;
}

export interface IComponentChild {
  otherClasses?: string[];
  children?: Component[];
}
