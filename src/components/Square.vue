<template>
    <div id='s{{ coords.col }}{{ coords.row }}' class='square' v-on:click="notify">
        <pawn v-bind:class="square.pawn" v-if="square.pawn"></pawn>
        <move v-bind:class="square.move" v-if="square.move"></move>
    </div>
</template>

<script>
import Pawn from './Pawn'
import Move from './Move'
import { nextPlayer } from '../store/actions'

export default {
    components: {
        Pawn,
        Move
    },
    props: [
        'coords',
        'square'
    ],
    vuex: {
        actions: {
            nextPlayer
        }
    },
    methods: {
        notify () {
            if(this.square.move !== null) {
                nextPlayer(this.$store, this.$el, this.coords);
            }
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
    /* set the transition */
    transition: all 2s ease-in-out;
}
.move-right {
    transform: translate(350px,0);
}
</style>