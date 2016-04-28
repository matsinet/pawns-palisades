<template>
    <div class="scoreboard">
        <h2>{{ title }}</h2>
        <h3>Turn: 
            <span class="{{ turn }}">
                {{ player.username }}
            </span>
        </h3>
    </div>
</template>

<script>
    import store from '../vuex/store'
    
    export default {
        vuex: {
            getters: {
                title: state => state.game.title,
                player: state => state.players[state.game.turn],
                turn: state => state.game.turn
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
