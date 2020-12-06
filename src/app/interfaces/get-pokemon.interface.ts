
export interface GetPokemonResponse {
    count: number;
    next: string;
    previous: string;
    results: GetPokemonResults[];
}
  
export interface GetPokemonResults{
    name: string;
    url: string;
}