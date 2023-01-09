<template>
    <template v-for="(index, player) in players">
        <div class="fence-count" name="{{ index }}-fence-count">
            {{ player.username }}'s Fences: {{ player.walls }}
        </div>
    </template>
</template>

<script>
export default {
    vuex: {
        getters: {
            players: state => state.players,
        }
    }
}
</script>

<style scoped>
.fence-count {
    width: 50%;
    height: 1.5em;
    line-height: 1.5em;
    float: left;
    vertical-align: middle;
    text-align: center;
}
</style>