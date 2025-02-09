<script>
import { mapActions, mapState } from "pinia";
import { usePokeStore } from "@/store.js";
import { usePanierStore } from "@/store/panierStore";

export default {
  name: "PokemonDetailList",
  props: {
    name: String
  },
  computed: {
    ...mapState(usePokeStore, ['pokemonList']),
    ...mapState(usePanierStore, ['panier']),
    pokemon() {
      return this.pokemonList[this.name] !== undefined ? this.pokemonList[this.name] : null
    }
  },
  methods: {
    ...mapActions(usePanierStore, ['addPokemonToPanier']),
    ...mapActions(usePanierStore, ['removePokemonFromPanier']),
  }
}
</script>

<template>
  <div class="miniCartePokemon">
    <router-link :to="{ name: 'pokemon', params: { name: this.name } }" class="nomPokemon">
      <p class="nameCartePokemon">{{ name }}</p>
      <div v-if="pokemon" class="detailPokemon">
        <p>Prix: {{ pokemon.base_experience }}</p>
        <img :src="pokemon.sprites.front_default" :alt="pokemon.name + ' Image'">
      </div>
    </router-link>
    <div class="btnsPanier">
      <button v-if="panier[name] === undefined" @click="addPokemonToPanier(name)">Ajouter au panier</button>
      <div v-else>
        <button @click="removePokemonFromPanier(name)">-</button>
        <span>{{ panier[name] }}</span>
        <button @click="addPokemonToPanier(name)">+</button>
      </div>
    </div>

  </div>
</template>

<style scoped>
.nomPokemon {
  width: inherit;
}

.btnsPanier {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: inherit;
}

.nameCartePokemon {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: inherit;
}

.miniCartePokemon {
  border: 1px solid black;
  border-radius: 0.3em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: fit-content;
  width: inherit;
}

.detailPokemon {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: inherit;
}

img {
  width: inherit;
}
</style>
