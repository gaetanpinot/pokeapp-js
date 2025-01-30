<script>
import { usePanierStore } from '@/store/panierStore.js';
import { mapState } from 'pinia';

export default {

  data() {

    return {

    }
  },
  computed: {
    ...mapState(usePanierStore, ['panier']),
    ...mapState(usePanierStore, ['nbObjetPanier']),
  },
}
</script>

<template>
  <router-link :to="{ name: 'panier' }">Panier ( {{ nbObjetPanier }})</router-link>
</template>

<style scoped></style>
