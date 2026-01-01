import level1 from '@data/wordCollectionLevel1.json';
import level2 from '@data/wordCollectionLevel2.json';
import level3 from '@data/wordCollectionLevel3.json';
import level4 from '@data/wordCollectionLevel4.json';
import level5 from '@data/wordCollectionLevel5.json';
import level6 from '@data/wordCollectionLevel6.json';
import { ILastResult, ILevel, IRound, IUser } from '../types/interfaces';
import { LOCAL_STORAGE_KEY } from '../constants/constants';

class DataManager {
  private levels: ILevel[];
  private lastResults: ILastResult | null;
  private storageKey = LOCAL_STORAGE_KEY;

  constructor() {
    this.levels = [level1, level2, level3, level4, level5, level6];
    this.lastResults = null;
  }

  getRound(level: number, round: number): IRound {
    const currentLevel = this.levels[level - 1];
    return currentLevel.rounds[round - 1];
  }

  setLastResults(data: ILastResult) {
    this.lastResults = data;
  }

  getLastResults() {
    return this.lastResults;
  }

  setUser(user: IUser) {
    localStorage.setItem(this.storageKey, JSON.stringify(user));
  }

  getUser(): IUser | null {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }

  getUserFullName() {
    const userData = this.getUser();
    return `${userData?.name} ${userData?.surname}`;
  }

  deleteUser() {
    localStorage.removeItem(this.storageKey);
  }
}

export const dataManager = new DataManager();
