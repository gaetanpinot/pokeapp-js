import { usePokeStore } from "@/store";
import { defineStore } from "pinia";

const usePanierStore = defineStore("panierStore", {
  state: () => ({
    panier: {},
    nbObjetPanier: 0,
  }),
  getters: {
    total: (state) => {
      let total = 0;
      const pokeStore = usePokeStore();
      for (const name in state.panier) {
        if (pokeStore.pokemonList[name] === undefined) {
          pokeStore.fetchPokemon(name);
        }
        total +=
          pokeStore.pokemonList[name].base_experience * state.panier[name];
      }
      return total;
    },
  },
  actions: {
    addPokemonToPanier(name) {
      console.log(name + "++");
      if (this.panier[name] === undefined) {
        this.panier[name] = 1;
      } else {
        this.panier[name]++;
      }
      this.nbObjetPanier++;
    },
    removePokemonFromPanier(name) {
      if (this.panier[name] <= 1) {
        delete this.panier[name];
        this.nbObjetPanier--;
      } else if (this.panier[name] !== undefined) {
        this.panier[name]--;
        this.nbObjetPanier--;
      }
    },
  },
});
export { usePanierStore };
