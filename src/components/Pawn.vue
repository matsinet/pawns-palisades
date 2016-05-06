<template>
    <div class='pawn' v-on:click="notify" v-bind:class="[ color ? color : '' ]"></div>
</template>

<script>
export default {
    props: [
        'column',
        'row',
        'color'
    ],
    vuex: {
        getters: {
            pawn_count: state => state.game.pawn_count
        }
    },
    methods: {
        notify () {
            this.$dispatch(
                'pawn',
                {
                    column: this.column,
                    row: this.row,
                    color: this.color
                }
            );
        }
    }
}
</script>

<style scoped>
.pawn {
    width: 4.5vh;
    height: 4.5vh;
    border-radius: 2.25vh;
    background-color: white;
    float: left;
    margin: .5vh;
    border: .25vh solid white;
}
.green {
    background-color: green;
}

.blue {
    background-color: blue;
}

.red {
    background-color: red;
}

.yellow {
    background-color: yellow;
}
</style>