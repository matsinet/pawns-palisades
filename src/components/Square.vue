<template>
    <div class='square' v-on:click="notify" data-column='{{ column }}' data-row='{{ row }}'>
        <pawn v-bind:class="[ pawn ]" v-if="pawn" data-pawn='{{ pawn }}'>
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
            if(typeof this.move !== 'undefined') {
                this.$dispatch(
                    'move',
                    {
                        column: this.column,
                        row: this.row,
                        move: this.move
                    }
                );
            }
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