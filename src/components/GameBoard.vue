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
<style scoped>
.gameboard {
    background: black;
    width: 100px;
    height: 100px;
    margin-left: auto;
    margin-right: auto;
}
</style>
