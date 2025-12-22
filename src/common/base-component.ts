import { IComponent } from '@app-types/types';

export class Component<T extends HTMLElement = HTMLElement> {
  public readonly node: T;

  constructor({ tag = 'div', className = '', text = '', attrs = {} }: IComponent, ...children: Component[]) {
    const node = document.createElement(tag) as T;
    node.textContent = text;
    this.node = node;

    if (className) {
      if (Array.isArray(className)) {
        node.classList.add(...className);
      } else {
        node.className = className;
      }
    }

    Object.entries(attrs).forEach(([key, value]) => {
      node.setAttribute(key, value);
    });

    if (children.length > 0) {
      children.forEach((child) => {
        this.append(child);
      });
    }
  }

  setText(text: string): this {
    this.node.textContent = text;
    return this;
  }

  addClass(className: string): this {
    this.node.classList.add(className);
    return this;
  }

  removeClass(className: string): this {
    this.node.classList.remove(className);
    return this;
  }

  toggleClass(className: string): this {
    this.node.classList.toggle(className);
    return this;
  }

  setAttribute(attribute: string, value: string): this {
    this.node.setAttribute(attribute, value);
    return this;
  }

  removeAttribute(attribute: string): this {
    this.node.removeAttribute(attribute);
    return this;
  }

  append(child: Component): this {
    this.node.append(child.node);
    return this;
  }

  appendChildren(children: Component[]): this {
    children.forEach((child) => {
      this.append(child);
    });
    return this;
  }

  /**
   * Adds an event listener with strict type checking.
   *
   * Note: Complex typing logic (Generics + Mapped Types) is used here.
   * This ensures that IDE autocomplete works correctly (e.g., inferring MouseEvent for 'click').
   * Adapted this implementation from a ready-made solution.
   *
   * @param event - The name of the event (e.g., 'click').
   * @param listener - The callback function.
   * @param options - Standard addEventListener options.
   *
   */
  addListener<K extends keyof HTMLElementEventMap>(
    event: K,
    listener: (this: T, ev: HTMLElementEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions
  ): this {
    this.node.addEventListener(event, listener as unknown as EventListener, options);
    return this;
  }

  destroy(): void {
    this.node.remove();
  }
}
