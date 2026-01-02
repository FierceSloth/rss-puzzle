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

export interface IUser {
  name: string;
  surname: string;
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

// ============== Results Interfaces ==================

export interface ILastResult {
  paintInfo: IPaintInfoResult;
  sentences: {
    known: ISentenceResult[];
    unknown: ISentenceResult[];
  };
}

export interface IPaintInfoResult {
  imageSrc: string;
  name: string;
  author: string;
  year: string;
}

export interface ISentenceResult {
  sentence: string;
  audioSrc: string;
}

// ============== Validation Interfaces ==================

export interface IValidateResult {
  isValid: boolean;
  errorMessage?: string;
}
