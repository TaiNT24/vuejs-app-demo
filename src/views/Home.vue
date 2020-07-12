<template>
  <div class="btn">
    <el-row class="lineHP">
      <el-col :span="10">
        Player
        <el-progress
          :stroke-width="40"
          :percentage="this.$store.getters.getPlayerHealth"
          :text-inside="true"
          :status="playerStatus"
        />
      </el-col>
      <el-col :span="4">vs</el-col>
      <el-col :span="10">
        Monster
        <el-progress
          :stroke-width="40"
          :percentage="this.$store.getters.getMonsterHealth"
          :text-inside="true"
          :status="monsterStatus"
        />
      </el-col>

      <el-col :span="24" v-if="!gameIsRunning">
        <el-button :type="labelButtonSuccess.type" 
                  @click="labelButtonSuccess.action">
          {{labelButtonSuccess.label}}
        </el-button>
      </el-col>

      <!-- <el-row v-else>
        <el-col :span="24">
          <el-button type="warning" @click="attack">Attack</el-button>
        </el-col>
        <el-col :span="24">
          <el-button type="danger" @click="strongAttack"
            >Strong Attack</el-button
          >
        </el-col>
        <el-col :span="24">
          <el-button type="primary" @click="heal">Heal</el-button>
        </el-col>
        <el-col :span="24">
          <el-button type="success" @click="restart">Give up</el-button>
        </el-col>
      </el-row> -->

      <el-row v-else>
        <el-col :span="24" v-for="(buttonX, index) in labelButton" :key="index">
          <el-button @click="buttonX.action" :type="buttonX.type">
            {{buttonX.label}}
          </el-button>
        </el-col>
      </el-row>
    </el-row>

    <el-row id="logMsg" v-for="(msg, index) in logMsg" :key="index">
      <el-col :span="24">{{ msg.player }}</el-col>
      <el-col :span="24">{{ msg.monster }}</el-col>
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src
// import "../assets/js/hello.css";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      logMsg: [],
      gameIsRunning: false,
      randomNum: 0,
      attackValue: 10,
      strongAttackValue: 15,
      playerStatus: "success",
      monsterStatus: "success",
      labelButtonSuccess:{
          label: 'Start the game',
          action: this.start,
          type: 'primary'
      },
      labelButton: [
        {
          label: 'Attack',
          action: this.attack,
          type: 'warning'
        },
        {
          label: 'Strong Attack',
          action: this.strongAttack,
          type: 'danger'

        },
        {
          label: 'Heal',
          action: this.heal,
          type: 'primary'
        },
        {
          label: 'Give up',
          action: this.restart,
          type: 'success'
        }
      ]
    };
  },
  computed: {
    // map getter -> the instance auto like data properties
    ...mapGetters({
      // map `this.doneCount` to `this.$store.getters.getPlayerHealth`
      playerHealth: "getPlayerHealth",
      monsterHealth: "getMonsterHealth",
    }),
  },
  watch: {
    playerHealth() {
      if (this.playerHealth < 70) {
        this.playerStatus = "warning";
      }
      if (this.playerHealth < 40) {
        this.playerStatus = "exception";
      }
      if (this.playerHealth <= 0) {
        this.restart();
        alert("You lose !");
      }
    },
    monsterHealth() {
      if (this.monsterHealth < 70) {
        this.monsterStatus = "warning";
      }
      if (this.monsterHealth < 40) {
        this.monsterStatus = "exception";
      }
      if (this.monsterHealth <= 0) {
        this.restart();
        alert("You win !");
      }
    }
  },
  methods: {
    ...mapActions(["healX"]),
    ...mapGetters(["getPlayerAtt", "getMonsterAtt"]),
    end() {
      let msg = {
        player: "Player attack: " + this.getPlayerAtt(),
        monster: "Monster attack: " + this.getMonsterAtt()
      };
      // this.logMsg.push(msg);
      this.logMsg.unshift(msg);
    },
    start: function(){
      this.gameIsRunning = true;
    },
    restart: function() {
      this.gameIsRunning = false;
      this.playerStatus = "success";
      this.monsterStatus = "success";
      this.$store.state.playerHealth = 100;
      this.$store.state.monsterHealth = 100;

      this.logMsg = [];
    },
    attack: function() {
//       eslint-disable-next-line prettier/prettier
//       eslint-disable-next-line no-unused-vars
      new Promise((resolve, reject) => {
        resolve()
      }).then(() => {
        return this.$store.dispatch("attackMonster");
      }).then(() => {
        this.end();
      });

    },
    strongAttack: function() {
      // eslint-disable-next-line no-unused-vars
      new Promise((resolve, reject) => {
        resolve()
      }).then(() => {
        return this.$store.dispatch("strongAttack");
      }).then(() => {
        this.end();
      });

    },
    heal: function() {
      this.healX();
    }
  }
};
</script>
<style scoped>
.lineHP {
  margin: 5vh;
}
.btn button {
  width: 50vh;
  margin: 1.5vh;
}
/* #logMsg {
} */
</style>
