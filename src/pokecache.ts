export type CacheEntry<T> = {
    createdAt: number
    val: T
}

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(interval: number) {
    this.#interval = interval;
    this.#startReapLoop()
  }

  add<T>(key: string, val: T): void {
    const entry: CacheEntry<T> = {
        createdAt: Date.now(),
        val
    };
    this.#cache.set(key, entry);
  }
  get<T>(key: string): T | undefined {
    const getEntry = this.#cache.get(key)
    if (getEntry === undefined) {
        return undefined
    }
    return getEntry.val;
  }

  #reap(): void {
    const date = Date.now()
    for (const [key, val] of this.#cache.entries()) {
        if (val.createdAt <  date - this.#interval) {
            this.#cache.delete(key)
        }
    }
  }
  #startReapLoop(): void {
    if (this.#reapIntervalId) return;
    this.#reapIntervalId = setInterval(() => {
      this.#reap();
    }, this.#interval);
  }
  stopReapLoop(): void {
  if (this.#reapIntervalId) {
    clearInterval(this.#reapIntervalId);
    this.#reapIntervalId = undefined;
    }
  }
} 