import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private url: string = "https://pokeapi.co/api/v2/pokemon"

  constructor(private http: HttpClient) { }

  getPokemon(name:string) {
    return this.http.get(`${this.url}/${name}`)
  }
  getPokemonAll(number:number) {
    return this.http.get(`${this.url}?limit=${number}&offset=0`)
  }
}
