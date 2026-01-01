import { IRound } from '../types/interfaces';
import { dataManager } from './data-manager';

export function simulationAddingResults(round: IRound) {
  const paintInfo = {
    imageSrc: round.levelData.imageSrc,
    name: round.levelData.name,
    author: round.levelData.author,
    year: round.levelData.year,
  };
  const sentences = {
    known: [
      {
        sentence: 'The students agree they have too much homework',
        audioSrc: 'files/01_0001_example.mp3',
      },
      {
        sentence: 'The students agree they have too much homework',
        audioSrc: 'files/01_0001_example.mp3',
      },
      {
        sentence: 'The students agree they have too much homework',
        audioSrc: 'files/01_0001_example.mp3',
      },
      {
        sentence: 'The students agree they have too much homework',
        audioSrc: 'files/01_0001_example.mp3',
      },
    ],
    unknown: [
      {
        sentence: 'The students agree they have too much homework',
        audioSrc: 'files/01_0001_example.mp3',
      },
      {
        sentence: 'The students agree they have too much homework',
        audioSrc: 'files/01_0001_example.mp3',
      },
      {
        sentence: 'The students agree they have too much homework',
        audioSrc: 'files/01_0001_example.mp3',
      },
      {
        sentence: 'The students agree they have too much homework',
        audioSrc: 'files/01_0001_example.mp3',
      },
      {
        sentence: 'The students agree they have too much homework',
        audioSrc: 'files/01_0001_example.mp3',
      },
    ],
  };
  dataManager.setLastResults({ paintInfo, sentences });
} // ? Temporary
