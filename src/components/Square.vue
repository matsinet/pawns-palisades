<template>
    <div class='square' v-on:click="notify">
        <pawn v-bind:class="[ pawn ]" v-if="pawn">
            <slot></slot>
        </pawn>
        <move v-bind:class="[ move ]" v-if="move"></move>
    </div>
</template>

<script>
import Pawn from './Pawn'
import Move from './Move'

export default {
    components: {
        Pawn,
        Move
    },
    props: [
        'column',
        'row',
        'pawn',
        'move'
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
    background-color: rgba(255, 255, 255, .3);
    border-radius: .5vh;
    float: left;
    margin-left: 2vh;
    text-align: center;
}
</style>