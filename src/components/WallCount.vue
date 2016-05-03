<template>
    <template v-for="player in players">
        <div class="fence-count {{ $index }}" name="{{ $index }}">
            {{ player.username }}'s Fences: {{ player.walls }}
        </div>
    </template>
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

<style scoped>
.fence-count {
    width: 50%;
    height: 1.5em;
    float: left;
}
</style>