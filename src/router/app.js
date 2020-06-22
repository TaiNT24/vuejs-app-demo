import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    playerHealth: 100,
    monsterHealth: 100,
    attackMonster: 10,
    strongAttackMonster: 15,
    monsterAttack: 13,
    healConstant: 10,
    timeHeal: 2,
    randomNum: 0,
    playerAtt: 0,
    monsterAtt: 0
  },
  mutations: {
    attackFunc(state, kindOf) {
      if (kindOf === 0) {
        kindOf = state.attackMonster;
      } else {
        kindOf = state.strongAttackMonster;
      }
      state.randomNum = Math.random();
      let monsterAt = state.monsterAttack * state.randomNum;
      let playerAt = kindOf * state.randomNum;

      state.playerAtt = playerAt;
      state.monsterAtt = monsterAt;

      state.playerHealth -= monsterAt;
      state.monsterHealth -= playerAt;

      state.playerHealth = Math.round(state.playerHealth);
      state.monsterHealth = Math.round(state.monsterHealth);
    },
  },
  getters: {
    getPlayerHealth(state) {
      return state.playerHealth;
    },
    getMonsterHealth(state) {
      return state.monsterHealth;
    },
    getMonsterAtt(state) {
      return state.monsterAtt;
    },
    getPlayerAtt(state) {
      return state.playerAtt;
    }
  },
  actions: {
    attackMonster({ commit }) {
      // eslint-disable-next-line no-unused-vars
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit("attackFunc", 0);
          resolve();
        }, 100);
      });
    },
    strongAttack({ commit }) {
      // eslint-disable-next-line no-unused-vars
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit("attackFunc", 1);
          resolve();
        }, 200);
      });
    },
    healX(context) {
      if (context.state.timeHeal > 0) {
        context.state.playerHealth += context.state.healConstant;
        context.state.timeHeal--;
      }
    }
  }
});

export default store;
