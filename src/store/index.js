import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

function loadStateFromLocalStorage(key, defaultValue) {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : defaultValue;
}

export default new Vuex.Store({
  state: {
    games: [],
    selectedGenres: [],
    opinions: loadStateFromLocalStorage('opinions', {}),
    user: loadStateFromLocalStorage('user', {
      name: '',
      surname: '',
      coins: 0,
    }),
  },
  mutations: {
    setGames(state, games) {
      state.games = games;
    },
    toggleGenre(state, genre) {
      const index = state.selectedGenres.indexOf(genre);
      if (index === -1) {
        state.selectedGenres.push(genre);
      } else {
        state.selectedGenres.splice(index, 1);
      }
    },
    addOpinion(state, { gameName, opinion }) {
      if (state.user.coins >= 5) {
        if (!state.opinions[gameName]) {
          Vue.set(state.opinions, gameName, []);
        }
        state.opinions[gameName].push(opinion);
        state.user.coins -= 5;
        localStorage.setItem('opinions', JSON.stringify(state.opinions));
        localStorage.setItem('user', JSON.stringify(state.user));
      } else {
        alert('No tienes suficientes créditos para agregar una opinión.');
      }
    },
    deleteOpinion(state, { gameName, index }) {
      if (state.opinions[gameName]) {
        state.opinions[gameName].splice(index, 1);
        localStorage.setItem('opinions', JSON.stringify(state.opinions));
      }
    },
    updateUser(state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    updateCoins(state, coins) {
      state.user.coins = coins;
      localStorage.setItem('user', JSON.stringify(state.user));
    },
  },
  getters: {
    filteredGames(state) {
      if (state.selectedGenres.length === 0) return state.games;
      return state.games.filter((game) =>
        game.genres.some((genre) => state.selectedGenres.includes(genre.name))
      );
    },
    genres(state) {
      const genresSet = new Set();
      state.games.forEach((game) =>
        game.genres.forEach((genre) => genresSet.add(genre.name))
      );
      return Array.from(genresSet);
    },
  },
  actions: {
    fetchGames({ commit }) {
      axios
        .get('https://api.rawg.io/api/games?key=c210308e1b5c44cd800e4ae82647b2b4')
        .then((response) => commit('setGames', response.data.results))
        .catch(console.error);
    },
    addOpinion({ commit }, payload) {
      commit('addOpinion', payload);
    },
    deleteOpinion({ commit }, payload) {
      commit('deleteOpinion', payload);
    },
    updateUser({ commit }, user) {
      commit('updateUser', user);
    },
  },
});
