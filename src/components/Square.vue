<template>
    <div class='square' v-on:click="notify">{{ column }}{{ row }}</div>
</template>

<script>
export default {
    props: [
        'column',
        'row'
    ],
    vuex: {
        getters: {
            turn: state => state.game.turn
        }
    },
    methods: {
        notify () {
            this.$dispatch(
                'square',
                {
                    column: this.column,
                    row: this.row
                }
            );
            this.$el.style.background='black';
        }
    }
}
</script>

<style>
.square {
    width: 6vh;
    height: 6vh;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: .5vh;
    float: left;
    margin-left: 2vh;
    text-align: center;
}
</style>