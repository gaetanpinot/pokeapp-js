import { createRouter, createWebHistory } from "vue-router";
import App from "@/App.vue";
import Pokemon from "@/components/Pokemon.vue";
import PokemonList from "@/components/PokemonList.vue";
import PanierDetail from "./components/PanierDetail.vue";
import ConfirmationCommande from "./components/ConfirmationCommande.vue";

const routes = [
  { path: "/", name: "root", component: PokemonList, props: true },
  { path: "/pokemon/:name", name: "pokemon", component: Pokemon, props: true },
  { path: "/panier", name: "panier", component: PanierDetail, props: true },
  {
    path: "/panier/confirmation",
    name: "confirmation",
    component: ConfirmationCommande,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export { router };
