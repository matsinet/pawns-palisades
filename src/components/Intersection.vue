<template>
    <div class='intersection' v-on:click="notify" v-bind:class="{ 'first-intersection': isfirst, 'last-intersection': islast }">
        <wall v-bind:class="[ wall == 'v' ? 'vertical-wall' : '' ]" v-if="wall"></wall>
    </div>
</template>

<script>
import Wall from './Wall'

export default {
    components: {
        Wall
    },
    props: [
        'column',
        'row',
        'isfirst',
        'islast',
        'wall',
    ],
    methods: {
        notify () {
            if(typeof this.wall === 'undefined') {
                this.$dispatch(
                    'wall',
                    {
                        column: this.column,
                        row: this.row,
                        wall: this.wall ? this.wall : '',
                    }
                );
            }
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