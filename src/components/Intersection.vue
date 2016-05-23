<template>
    <div class='intersection' @click="notify" v-bind:class="{ 'first-intersection': isfirst, 'last-intersection': islast }">
        <wall v-bind:class="[ wall == 'v' ? 'vertical-wall' : '' ]" v-if="wall"></wall>
    </div>
</template>

<script>
import Wall from './Wall'
import { placeWall } from '../store/actions'

export default {
    components: {
        Wall
    },
    props: [
        'coords',
        'isfirst',
        'islast',
        'wall',
    ],
    vuex: {
        actions: {
            placeWall
        }
    },
    methods: {
        notify () {
            if(this.wall == null) {
                let wall = 'h';
                placeWall(this.$store, this.$el, this.coords, wall);
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