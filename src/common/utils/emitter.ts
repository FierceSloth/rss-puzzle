import { EmitterEvents } from '../types/interfaces';

type Listener<T = unknown> = (data: T) => void;

class EventEmitter {
  private events: Partial<Record<EmitterEvents, Listener[]>> = {};

  on<T>(event: EmitterEvents, listener: Listener<T>) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener as Listener);
  }

  off<T>(event: EmitterEvents, listener: Listener<T>) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter((l) => l !== (listener as Listener));
  }

  emit<T>(event: EmitterEvents, data: T) {
    if (!this.events[event]) return;
    this.events[event].forEach((listener) => listener(data));
  }

  clear(event: EmitterEvents | undefined) {
    if (event) {
      this.events[event] = [];
    } else {
      this.events = {};
    }
  }
}

export const appEmitter = new EventEmitter();
export const gameEmitter = new EventEmitter();
