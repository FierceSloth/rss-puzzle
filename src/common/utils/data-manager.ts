import level1 from '@data/wordCollectionLevel1.json';
import level2 from '@data/wordCollectionLevel2.json';
import level3 from '@data/wordCollectionLevel3.json';
import level4 from '@data/wordCollectionLevel4.json';
import level5 from '@data/wordCollectionLevel5.json';
import level6 from '@data/wordCollectionLevel6.json';
import { ILevel, IRound } from '../types/types';

class DataManager {
  private levels: ILevel[];
  private lastResults: [] | null;

  constructor() {
    this.levels = [level1, level2, level3, level4, level5, level6];
    this.lastResults = null;
  }

  getRound(level: number, round: number): IRound {
    const currentLevel = this.levels[level - 1];
    return currentLevel.rounds[round - 1];
  }

  getLastResults() {
    return this.lastResults;
  }
}

export const dataManager = new DataManager();
