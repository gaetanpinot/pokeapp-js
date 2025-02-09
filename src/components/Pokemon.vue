<script>
import { fetchUrl, getPokemon } from "@/services/httpClient.js";
import { usePokeStore } from "@/store.js";
import { mapState } from "pinia";

export default {
  name: "Pokemon",
  props: {
    name: ""
  },

  data() {
    return {
      error: "",
      pokemon: null
    }
  },

  mounted() {
    this.chargePokemon()
  },


  methods: {

    async chargePokemon() {
      this.pokemon = this.pokemonList[this.name]
      if (this.pokemon === undefined) {
        try {
          this.pokemon = await getPokemon(this.name)
          //console.log(this.store.status)
        } catch (e) {
          this.error = e.message
        }
      }
    }
  },
  computed: {
    ...mapState(usePokeStore, ["pokemonList"])
  }
}

</script>

<template>
  <div v-if="pokemon" id="pokemon-detail">
    <h2>{{ pokemon.name }}</h2>
    <img :alt="pokemon.name + ' Image'" :src="pokemon.sprites.front_default">
    <p>Prix: {{ pokemon.base_experience }}€</p>
    <p>Poids: {{ pokemon.weight }}</p>
    <p>Type: <span class="typePkmn" v-for="type in pokemon.types"> {{ type.type.name.toUpperCase() + " " }} </span> </p>

    <!--    <audio controls>-->
    <!--      <source :src="pokemon.cries.legacy">-->
    <!--      Pas d'audio-->
    <!--    </audio><audio controls>-->
    <!--      <source :src="pokemon.cries.latest">-->
    <!--      <source :src="pokemon.cries.legacy">-->
    <!--      Pas d'audio-->
    <!--    </audio>-->
    <div id="statPkmn">
      <p v-for="stat in pokemon.stats">
        {{ stat.stat.name }}: {{ stat.base_stat }}
      </p>
    </div>
  </div>
  <span>{{ error }}</span>
</template>

<style scoped>
.typePkmn {
  font-weight: bold;
}
</style>
