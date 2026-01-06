import type { Component } from '@common/base-component';

// prettier-ignore
type AppEvents =
  'router:navigate';

// prettier-ignore
type GameEvents =
  | 'game:source-word-click'
  | 'game:result-word-click'
  | 'game:sentence-end'
  | 'game:sentence-check'
  | 'game:auto-complete'
  | 'game:round-complete'
  | 'game:send-results'
  | 'game:next-sentence-request'
  | 'game:sentence-checked-success';

// prettier-ignore
type HintEvents =
  | 'game:translate-toggle' 
  | 'game:audio-toggle' 
  | 'game:view-toggle';

// prettier-ignore
type RoundEvents =
  | 'game:round-change' ;

export type EmitterEvents = AppEvents | GameEvents | HintEvents | RoundEvents;

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

export interface IAppSettings {
  translate: boolean;
  audio: boolean;
  view: boolean;
}

export interface IRounds {
  currentRound: number;
  currentLevel: number;
  completedRounds: Record<number, number[]>;
}

export interface IGameState {
  settings: IAppSettings;
  user: IUser;
  rounds: IRounds;
  lastGameResult: ILastResult | null;
}

// ============== Results Interfaces ==================

export interface ILastResult {
  paintInfo: IPaintInfoResult;
  sentences: IGroupResult;
}

export interface IGroupResult {
  known: ISentenceResult[];
  unknown: ISentenceResult[];
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

// =============== Game Interfaces =======================

export type PuzzleStatus = 'success' | 'error' | '';

export interface IPuzzleWord {
  word: string;
  id: string;
  width: number;
  status?: PuzzleStatus;

  background: IPuzzleBackground;
}

export interface IPuzzleBackground {
  url: string;
  widthPercent: number;
  y: number;
  isOn: boolean;
  offsetX: number;
  totalRows: number;
}

export interface IOption {
  value: string | number;
  text: string;
}