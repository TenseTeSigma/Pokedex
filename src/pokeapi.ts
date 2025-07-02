import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  interval: number
  pokeCache: Cache

  constructor(interval: number) {
    this.interval = interval
    this.pokeCache = new Cache(this.interval)
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL || `${PokeAPI.baseURL}/location-area`;
    try {
      const result: ShallowLocations | undefined = this.pokeCache.get<ShallowLocations>(url);
      if (result === undefined) {
        const resp = await fetch(url);
        if (!resp.ok) {
          throw new Error(`Failed to fetch locations: ${resp.status} ${resp.statusText}`);
        }
        const locations: ShallowLocations = await resp.json();
        this.pokeCache.add(url, locations)
        return locations
      }
      else {
        const locations: ShallowLocations = result
        return locations
        }
    } catch (e) {
      throw new Error(`Error fetching locations: ${(e as Error).message}`);
    }
  }

  async fetchLocation(locationName: string): Promise<Location | undefined> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`
    try {
      const result: Location | undefined = this.pokeCache.get<Location>(url);
      if (result === undefined) {
        const resp= await fetch(url);
        if (!resp.ok) {
          console.log(`Error fetching data ${resp.status} ${resp.statusText}`)
          return undefined;
        }
        const pokeInfo: Location = await resp.json();
        this.pokeCache.add(url, pokeInfo)
        return pokeInfo;
      }
      else {
        return result;
      }
    } catch (err) {
      console.log(`Error thrown ${err}`)
      return undefined;
    }
  }
  async fetchPokemon(pokemonName: string): Promise<Pokemon | undefined> {
    const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`
    try {
      const result: Pokemon | undefined = this.pokeCache.get<Pokemon>(url)
      if (result === undefined) {
        const resp = await fetch(url);
        if (!resp.ok) {
          console.log(`Error fetching data ${resp.status} ${resp.statusText}`)
          return;
        }
        const pokemon: Pokemon = await resp.json();
        this.pokeCache.add(url, pokemon)
        return pokemon;
      }
      else {
        return result
      }
    } catch (err) {
      console.log(`Error thrown ${err}`)
      return undefined
    }
  }
}

export type ShallowLocations = {
  count: number;
  next: string;
  previous: string;
  results: {
    name: string;
    url: string;
  }[];
};

export type Location = {
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
  }[];
};

export type Pokemon = {
    abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
  }[];
  base_experience: number;
  height: number;
  name: string;
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  weight: number;
};

