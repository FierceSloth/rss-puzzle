type EventName = 'router:navigate'; // ? will expand

type Listener<T = unknown> = (data: T) => void;

class EventEmitter {
  private events: Partial<Record<EventName, Listener[]>> = {};

  on<T>(event: EventName, listener: Listener<T>) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener as Listener);
  }

  off<T>(event: EventName, listener: Listener<T>) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter((l) => l !== (listener as Listener));
  }

  emit<T>(event: EventName, data: T) {
    if (!this.events[event]) return;
    this.events[event].forEach((listener) => listener(data));
  }
}

export const appEmitter = new EventEmitter();
export const gameEmitter = new EventEmitter();
