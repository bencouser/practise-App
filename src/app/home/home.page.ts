import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENOSPC } from 'constants';
import { NONE_TYPE } from '@angular/compiler';
import {GetPokemonResponse, GetPokemonResults} from '../interfaces/get-pokemon.interface';
import {PokemonDetails} from '../interfaces/pokemon-details.interface'
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  title: string = "Pokemon List";
  pokemonAPI = 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=200';
  endpointResults: GetPokemonResults[] = [];
  filteredResults: GetPokemonResults[] = [];
  pokemonDetails: PokemonDetails;
  
  constructor(public httpClient: HttpClient) {
    this.getPokemon();
  }


/**
 * get pokemon data
 * sort alphabetically
 * make new filtered results
 */
  getPokemon(){
    this.httpClient.get(this.pokemonAPI)
      .subscribe((response: GetPokemonResponse) => {
        this.endpointResults = response.results.sort((a, b) => a.name.localeCompare(b.name));
        this.filteredResults = this.endpointResults;
      })
  }

/**
 * filter search bar
 */
  onSearch(event) {
    const input: string = event.detail.value;
    this.filteredResults = this.endpointResults.filter((result: GetPokemonResults) => result.name.toUpperCase().includes(input.toUpperCase()));
  }

  onClick(url: string) {
    console.log(url);
    this.httpClient.get(url)
    .subscribe((response: PokemonDetails) => {
      console.log(response);
      this.pokemonDetails = response;
  })
}
}
