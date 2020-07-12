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
    attackFunc(context, kindOf) {
      if (kindOf === 0) {
        kindOf = context.state.attackMonster;
      } else {
        kindOf = context.state.strongAttackMonster;
      }
      context.state.randomNum = Math.random();
      let monsterAt = context.state.monsterAttack * context.state.randomNum;
      let playerAt = kindOf * context.state.randomNum;

      context.state.playerAtt = playerAt;
      context.state.monsterAtt = monsterAt;

      context.state.playerHealth -= monsterAt;
      context.state.monsterHealth -= playerAt;

      context.state.playerHealth = Math.round(context.state.playerHealth);
      context.state.monsterHealth = Math.round(context.state.monsterHealth);
    },
    attackMonster(context) {
      // eslint-disable-next-line no-unused-vars
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          context.dispatch("attackFunc", 0);
          resolve();
        }, 100);
      });
    },
    strongAttack(context) {
      // eslint-disable-next-line no-unused-vars
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          context.dispatch("attackFunc", 1);
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
