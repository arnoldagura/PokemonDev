<!-- creates individual card for grid view -->
<template>
  <div class="pokemon-list">
    <search-input @searching="filters = $event"></search-input>
    <table class="table mt-3">
      <tr class="font-weight-bold">
        <td class="text-center">Card</td>
        <td>Name</td>
        <td>Type</td>
        <td>Rarity</td>
        <td>Set</td>
      </tr>

      <tr v-for="pokemon in pokemons" :key="pokemon.id">
        <td class="text-center">
          <img
            slot="image"
            :src="pokemon.imageUrl"
            :alt="pokemon.name"
            class="w-50"
          />
        </td>
        <td class="align-middle">
          {{ pokemon.name }}
        </td>
        <td class="align-middle">
          <span v-for="(type, index) in pokemon.types" :key="type">
            <span>{{ type }}</span>
            <span v-if="index + 1 < pokemon.types.length">, </span>
          </span>
        </td>
        <td class="align-middle">{{ pokemon.rarity }}</td>
        <td class="align-middle">{{ pokemon.set }}</td>
      </tr>
    </table>
    <b-pagination
      v-model="currentPage"
      :total-rows="totalCount"
      :per-page="pageSize"
      aria-controls="my-table"
    ></b-pagination>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

import { BPagination } from "bootstrap-vue";
import SearchInput from "@/components/SearchInput.vue";
export default {
  name: "PokemonList",
  components: {
    BPagination,
    SearchInput,
  },
  data() {
    return {
      user: "",
      users: [],
      url: "https://api.pokemontcg.io/v1/cards",
      modalOpen: false,
      pokemonData: {},
      pokemons: [],
      currentPage: 1,
      pageSize: 20,
      totalCount: 0,
      filters: "",
    };
  },
  methods: {
    getPokemons() {
      Vue.axios
        .get(
          `${this.url}?page=${this.currentPage}&pageSize=${this.pageSize}${this.filters}&orderBy=name,-number`
        )
        .then((resp) => {
          console.warn(resp);
          this.pageSize = resp.headers["page-size"];
          this.totalCount = resp.headers["total-count"];
          this.pokemons = resp.data.cards;
        });
    },
    onPageClick(event) {
      this.currentPage = event;
      this.getPokemons();
    },
  },
  watch: {
    currentPage: {
      handler: function () {
        this.getPokemons();
      },
    },
    filters: {
      handler: function () {
        this.getPokemons();
      },
    },
  },
  mounted() {
    this.getPokemons();
  },
};
</script>

<style scoped></style>
