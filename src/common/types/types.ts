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
  className?: string[];
  children?: Component[];
}

// ============== Data Interfaces =====================

export interface ISentence {
  audioExample: string;
  textExample: string;
  textExampleTranslate: string;
  id: number;
  word: string;
  wordTranslate: string;
}

export interface IPaintInfo {
  id: string;
  name: string;
  imageSrc: string;
  cutSrc: string;
  author: string;
  year: string;
}

export interface IRound {
  levelData: IPaintInfo;
  words: ISentence[];
}

export interface ILevel {
  rounds: IRound[];
}
