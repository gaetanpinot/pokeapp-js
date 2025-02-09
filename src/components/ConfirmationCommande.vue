<script>
import { usePanierStore } from '@/store/panierStore';
import { mapState } from 'pinia';

export default {
  name: "ConfirmationCommande",
  props: {
  },
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
  },
  computed: {
    ...mapState(usePanierStore, ['panier']),
    ...mapState(usePanierStore, ['total']),
  }
}
</script>

<template>
  <h3>Panier:</h3>
  <div v-for="(nombre, name) in panier">
    <span> {{ name }} </span> x {{ nombre }}
  </div>
  <div>Total : {{ total }}</div>
  <h3>Passer une commande:</h3>
  <!-- Adresse de Livraison -->
  <h4>Adresse de Livraison</h4>
  <label for="fullname">Nom Complet</label>
  <input type="text" id="fullname" name="fullname" required>

  <label for="address">Adresse</label>
  <input type="text" id="address" name="address" required>

  <label for="city">Ville</label>
  <input type="text" id="city" name="city" required>

  <label for="state">État/Région</label>
  <input type="text" id="state" name="state" required>

  <label for="zip">Code Postal</label>
  <input type="text" id="zip" name="zip" pattern="\d{5}" required>

  <label for="country">Pays</label>
  <select id="country" name="country" required>
    <option value="">Sélectionner un pays</option>
    <option value="France">France</option>
    <option value="Belgique">Belgique</option>
    <option value="Suisse">Suisse</option>
    <option value="Canada">Canada</option>
  </select>

  <!-- Détails de Paiement -->
  <h3>Informations de Paiement</h3>
  <label for="cardname">Nom du Titulaire</label>
  <input type="text" id="cardname" name="cardname" required>

  <label for="cardnumber">Numéro de Carte</label>
  <input type="text" id="cardnumber" name="cardnumber" pattern="\d{16}" placeholder="1234123412341234" required>

  <label for="expdate">Date d'Expiration</label>
  <input type="month" id="expdate" name="expdate" required>

  <label for="cvv">CVV</label>
  <input type="text" id="cvv" name="cvv" pattern="\d{3,4}" placeholder="123" required>

  <button type="submit">Valider la Commande</button>


</template>
