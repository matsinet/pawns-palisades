<template>
    <!--<div class='intersection' v-on:click="notify" v-bind:class="[isfirst ? 'first-intersection' : '']"></div>-->
    <div class='intersection' v-on:click="notify" v-bind:class="{ 'first-intersection': isfirst, 'last-intersection': islast }"></div>
</template>

<script>
export default {
    // data () {
    //     return {
    //         isFirst: this.isFirst
    //     }
    // },
    props: [
        'column',
        'row',
        'orientation',
        'isfirst',
        'islast'
    ],
    vuex: {
        getters: {
            turn: state => state.game.turn
        }
    },
    methods: {
        notify () {
            this.$dispatch(
                'wall',
                {
                    column: this.column,
                    row: this.row,
                    orientation: this.orientation
                }
            );
            this.$el.style.background='black';
        }
    }
}
</script>

<style>
.intersection {
    width: 2vh;
    height: 2vh;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: .5vh;
    float: left;
    margin-left: 6vh;
}
.first-intersection {
    margin-left: 8vh;
}
.last-intersection {
    margin-right: 8vh;
}
</style>