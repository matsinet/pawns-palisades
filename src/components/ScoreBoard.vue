<template>
    <div id="scoreboard">
        <div id='turn'>
            Turn:
            <span class="{{ turn }}" id='player-name'>
                {{ players[turn].username }} ({{ turn | capitalize }})
            </span>
        </div>
        <wallcount></wallcount>
    </div>
</template>

<script>
    import Wallcount from './WallCount'
    
    export default {
        components: {
            Wallcount
        },
        vuex: {
            getters: {
                title: state => state.game.title,
                players: state => state.players,
                turn: state => state.game.turn
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#scoreboard {
    /*width: 100%;*/
    height: 4em;
    background: white;
    color: black;
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
    border-bottom-left-radius: 14px;
    border-bottom-right-radius: 14px;
    margin: 1vh;
    padding: 1em;
}
#turn {
   width: 100%;
   text-align: center;
}
#player-name {
    font-weight: bold;
}
</style>
