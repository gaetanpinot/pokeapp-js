<script>
import { fetchUrl, getPokemon } from "@/services/httpClient.js";
import { usePokeStore } from "@/store.js";
import { usePanierStore } from "@/store/panierStore";
import { mapActions, mapState } from "pinia";

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
    },
    ...mapActions(usePanierStore, ['addPokemonToPanier']),
    ...mapActions(usePanierStore, ['removePokemonFromPanier']),
  },
  computed: {
    ...mapState(usePokeStore, ["pokemonList"]),
    ...mapState(usePokeStore, ['pokemonList']),
    ...mapState(usePanierStore, ['panier']),
  }
}

</script>

<template>
  <div id="pokemon">

    <div v-if="pokemon !== null" class="pokemon-card">
      <div class="card-header">
        <h2 class="pokemon-name">{{ pokemon.name.replace('-', ' ') }}</h2>
        <div class="types">
          <span v-for="type in pokemon.types" :key="type.slot" :class="['type-badge', type.type.name]">
            {{ type.type.name }}
          </span>
        </div>
      </div>

      <div class="card-image">
        <img :src="pokemon.sprites.front_default" :alt="pokemon.name">
      </div>

      <div class="stats">
        <div v-for="stat in pokemon.stats" :key="stat.stat.name" class="stat-row">
          <span class="stat-name">{{ stat.stat.name.replace('-', ' ') }}:</span>
          <span class="stat-value">{{ stat.base_stat }}</span>
        </div>
      </div>

      <div class="abilities">
        <h3>Abilities:</h3>
        <span v-for="ability in pokemon.abilities" :key="ability.slot" class="ability">
          {{ ability.ability.name.replace('-', ' ') }}
        </span>
      </div>

      <div class="btnsPanier">
        <button id="add" v-if="panier[name] === undefined" @click="addPokemonToPanier(name)">Ajouter au panier</button>
        <div v-else>
          <button @click="removePokemonFromPanier(name)">-</button>
          <span id="qtt">{{ panier[name] }}</span>
          <button @click="addPokemonToPanier(name)">+</button>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Chargement ... </p>
    </div>

  </div>
</template>

<style lang="scss" scoped>
#pokemon {
  display: flex;
  justify-content: center;
  align-items: center;
}

$sizeBtn: 1.5em;

.btnsPanier {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: inherit;

  #qtt {
    font-size: 2em;
  }

  #add {
    height: $sizeBtn;
    width: fit-content;
    padding-left: 5px;
    padding-right: 5px;
  }

  button {
    font-size: 1.5em;
    width: $sizeBtn;
    height: $sizeBtn;
    text-align: center;
    background-color: white;
    border-radius: 0.4em;
    margin: 0.2em;
    border: 1px solid dimgray;

    &:active {
      transform: translate(4px, 4px);
    }
  }
}

.pokemon-card {
  width: 22em;
  padding: 20px;
  border-radius: 15px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.card-header {
  text-align: center;
  margin-bottom: 15px;
}

.pokemon-name {
  margin: 0;
  text-transform: capitalize;
  font-size: 24px;
  color: #333;
}

.types {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 8px;
}

.type-badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 14px;
  color: white;
  text-transform: uppercase;
}

/* Type colors merci claude*/
.normal {
  background-color: #A8A878;
}

.flying {
  background-color: #A890F0;
}

.fire {
  background-color: #F08030;
}

.water {
  background-color: #6890F0;
}

.grass {
  background-color: #78C850;
}

.electric {
  background-color: #F8D030;
}

.ice {
  background-color: #98D8D8;
}

.fighting {
  background-color: #C03028;
}

.poison {
  background-color: #A040A0;
}

.ground {
  background-color: #E0C068;
}

.psychic {
  background-color: #F85888;
}

.bug {
  background-color: #A8B820;
}

.rock {
  background-color: #B8A038;
}

.ghost {
  background-color: #705898;
}

.dragon {
  background-color: #7038F8;
}

.dark {
  background-color: #705848;
}

.steel {
  background-color: #B8B8D0;
}

.fairy {
  background-color: #EE99AC;
}

.card-image {
  text-align: center;
  background-color: #f0f0f0;
  border-radius: 10px;
  padding: 10px;
  margin: 10px 0;
}

.card-image img {
  width: 150px;
  height: 150px;
}

.stats {
  margin: 15px 0;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
  font-size: 14px;
}

.stat-name {
  text-transform: capitalize;
  color: #666;
}

.stat-value {
  font-weight: bold;
  color: #333;
}

.abilities {
  margin-top: 15px;
  font-size: 14px;
}

.abilities h3 {
  margin: 0 0 8px 0;
  color: #333;
}

.ability {
  display: inline-block;
  margin-right: 10px;
  text-transform: capitalize;
  color: #666;
}

.ability:not(:last-child)::after {
  content: "•";
  margin-left: 10px;
  color: #999;
}
</style>
