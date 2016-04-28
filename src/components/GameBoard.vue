<template>
    <div class="gameboard">
    </div>
</template>

<script>
    export default {
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
.gameboard {
    width: 550px;
    height: 540px;
    padding-top: 10px;
    margin-left: auto;
    margin-right: auto;
    /*background-image: URL('wood.jpg');*/
    background: gray;
    position: relative;
    border-top: 4px solid green;
    border-bottom: 4px solid blue;
    
}
</style>
