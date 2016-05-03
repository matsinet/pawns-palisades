<template>
    <div id="gameboard">
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <div class='temp'></div>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <div class='temp'></div>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <div class='temp'></div>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <div class='temp'></div>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <div class='temp'></div>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <div class='temp'></div>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <div class='temp'></div>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <div class='temp'></div>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
    </div>
</template>

<script>
import Tile from './GameBoardTile'

export default {
    components: {
        Tile
    },
    vuex: {
        getters: {
            players: state => state.players,
            turn: state => state.game.turn
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#gameboard {
    width: 74vh;
    height: 70vh;
    margin-left: auto;
    margin-right: auto;
    background: gray;
    padding-top: 2vh;
    padding-bottom: 2vh;
    border-radius: 2vh;
    /*background-image: url('../assets/wood.jpg');*/
}

.temp {
    height: 2vh;
    width: 74vh;
    /*background: white;*/
    position: relative;
    float: left;
}
</style>
