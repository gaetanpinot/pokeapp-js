import { createPinia, defineStore } from "pinia";

const usePokeStore = defineStore("pokeStore", {
  state: () => ({
    currentPokemon: null,
    status: "bonjour",
    //liste du nom de tout les pokemons de l'api
    pokemonNameList: [],
    //liste des nom disponible (recherche et filtrage)
    availablePokemonName: [],
    //object contenant le detail de tout les pokémons qu'on à déjà chargé (sorte de cache)
    pokemonList: {},

    listeType: [],
  }),
  getters: {},
  actions: {
    fillTypeList(listType) {
      this.listeType = listType;
    },
    //enleve les noms de pokemons ne correspondant pas à la recherche des pokémons disponibles
    rechercher(recherche, pokemonNameListPreFiltered = null) {
      this.availablePokemonName = (
        pokemonNameListPreFiltered !== null
          ? pokemonNameListPreFiltered
          : this.pokemonNameList
      ).filter((name) => name.toLowerCase().includes(recherche.toLowerCase()));
      //console.log("store" + this.availablePokemonName);
    },

    sliceNamePokemon(start, end) {
      return this.availablePokemonName.slice(start, end);
    },
    fillPokemonNameList(listPokemon) {
      this.pokemonNameList = listPokemon;
      this.availablePokemonName = listPokemon;
    },
    emptyPokemonList() {
      this.pokemonList = {};
    },
    addPokemon(pokemon) {
      this.pokemonList[pokemon.name] = pokemon;
    },
  },
});
export { usePokeStore };
