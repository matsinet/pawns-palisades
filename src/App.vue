<template>
    <div id="app">
        <div class="game">
            <scoreboard></scoreboard>
            <gameboard></gameboard>
            <poweredby></poweredby>
        </div>
        <div class="lobby">
        </div>
    </div>
</template>

<script>
import '../node_modules/jquery/dist/jquery.min';
import './assets/semantic/dist/semantic.min';
import Scoreboard from './components/ScoreBoard';
import Gameboard from './components/GameBoard';
import Poweredby from './components/PoweredBy';
import { setTurn, nextPlayer } from './store/actions'

export default {
    components: {
        Scoreboard,
        Gameboard,
        Poweredby
    },
    vuex: {
        getters: {
            players: state => state.players,
            turn: state => state.game.turn,
            pawns: state => state.game.pawn_count,
        },
        actions: {
            setTurn,
            nextPlayer
        }
    }
}
</script>

<style lang="scss">
@import './assets/semantic/dist/semantic.min.css';

html {
    height: 100%;
}

body {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

}

.game {
    font-family: Source Sans Pro, Helvetica, sans-serif;
    color: white;
    width: 78vh;
    margin-left: auto;
    margin-right: auto;
    border: 3px solid black;
    border-radius: 20px;
    background-color: black;
    display: inline-block;
}

.game a {
    color: #42b983;
    text-decoration: none;
}

.lobby {
    width: 24vh;
    /*background-color: black;*/
    display: inline-block;
}

.vuejs-logo {
    width: 20px;
    height: 20px
}

.green {
    color: green;
}

.blue {
    color: blue;
}

.red {
    color: red;
}

.yellow {
    color: yellow;
}
</style>
