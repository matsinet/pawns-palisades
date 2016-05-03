<template>
    <div id="gameboard">
        <square column="a" row="9"></square>
        <square column="b" row="9"></square>
        <square column="c" row="9"></square>
        <square column="d" row="9"></square>
        <square column="e" row="9"></square>
        <square column="f" row="9"></square>
        <square column="g" row="9"></square>
        <square column="h" row="9"></square>
        <square column="i" row="9"></square>
        <div class='temp'></div>
        <square></square>
        <square></square>
        <square></square>
        <square></square>
        <square></square>
        <square></square>
        <square></square>
        <square></square>
        <square></square>
        <div class='temp'></div>
        <square></square>
        <square></square>
        <square></square>
        <square></square>
        <square></square>
        <square></square>
        <square></square>
        <square></square>
        <square></square>
        <div class='temp'></div>
        <square></square>
        <square></square>
        <square></square>
        <square></square>
        <square></square>
        <square></square>
        <square></square>
        <square></square>
        <square></square>
        <div class='temp'></div>
        <square></square>
        <square></square>
        <square></square>
        <square></square>
        <square></square>
        <square></square>
        <square></square>
        <square></square>
        <square></square>
        <div class='temp'></div>
        <square></square>
        <square></square>
        <square></square>
        <square></square>
        <square></square>
        <square></square>
        <square></square>
        <square></square>
        <square></square>
        <div class='temp'></div>
        <square></square>
        <square></square>
        <square></square>
        <square></square>
        <square></square>
        <square></square>
        <square></square>
        <square></square>
        <square></square>
        <div class='temp'></div>
        <square></square>
        <square></square>
        <square></square>
        <square></square>
        <square></square>
        <square></square>
        <square></square>
        <square></square>
        <square></square>
        <div class='temp'></div>
        <square></square>
        <square></square>
        <square></square>
        <square></square>
        <square></square>
        <square></square>
        <square></square>
        <square></square>
        <square></square>
    </div>
</template>

<script>
import Square from './Square'

export default {
    components: {
        Square
    },
    vuex: {
        getters: {
            players: state => state.players,
            turn: state => state.game.turn
        }
    },
    events: {
        square (data) {
            console.log(data);
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
