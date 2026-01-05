import level1 from '@data/wordCollectionLevel1.json';
import level2 from '@data/wordCollectionLevel2.json';
import level3 from '@data/wordCollectionLevel3.json';
import level4 from '@data/wordCollectionLevel4.json';
import level5 from '@data/wordCollectionLevel5.json';
import level6 from '@data/wordCollectionLevel6.json';
import { LOCAL_STORAGE_KEY } from '@constants/constants';
import { ILastResult, ILevel, IRound, IUser, IGameState, IAppSettings } from '@app-types/interfaces';

class DataManager {
  private levels: ILevel[];
  private state: IGameState;
  private storageKey: string;

  constructor() {
    this.storageKey = LOCAL_STORAGE_KEY;

    this.levels = [level1, level2, level3, level4, level5, level6];

    this.state = this.loadState();
  }

  // ? ============= Core Logic ======================

  private loadState(): IGameState {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      return JSON.parse(saved);
    }
    return DataManager.getInitialState();
  }

  private saveData() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.state));
  }

  private static getInitialState(): IGameState {
    return {
      settings: {
        translate: true,
        audio: true,
        view: true,
      },
      user: {
        name: '',
        surname: '',
      },
      completedRounds: {
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
      },
      lastGameResult: null,
    };
  }

  resetLocalStorage() {
    localStorage.removeItem(this.storageKey);
    this.state = DataManager.getInitialState();
  }

  // ? =============== Level Logic =====================

  getRound(level: number, round: number): IRound {
    const currentLevel = this.levels[level - 1];
    const currentRound = currentLevel.rounds[round - 1];

    return currentRound;
  }

  // ? =============== User Management =================

  setUser(user: IUser) {
    this.state.user = user;
    this.saveData();
  }

  getUser(): IUser {
    return this.state.user;
  }

  getUserFullName(): string {
    const { name, surname } = this.state.user;
    return `${name} ${surname}`.trim();
  }

  // ? ================= Settings (Hints) =================

  getSettings(): IAppSettings {
    return this.state.settings;
  }

  getSetting(key: keyof IAppSettings): boolean {
    return this.state.settings[key];
  }

  setSetting(key: keyof IAppSettings, value: boolean) {
    this.state.settings[key] = value;
    this.saveData();
  }

  // ? ================= Progress & Results =================

  markRoundAsCompleted(level: number, round: number) {
    const completed = this.state.completedRounds[level];
    if (!completed.includes(round)) {
      completed.push(round);
      this.saveData();
    }
  }

  isRoundCompleted(level: number, round: number): boolean {
    return this.state.completedRounds[level]?.includes(round) || false;
  }

  setLastResults(result: ILastResult) {
    this.state.lastGameResult = result;
    this.saveData();
  }

  getLastResults(): ILastResult | null {
    return this.state.lastGameResult;
  }
}

export const dataManager = new DataManager();
