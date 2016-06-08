<template>
    <div 
        class='intersection'
        :class="{ 'first-intersection': isfirst, 'last-intersection': islast }"
        @click="selectOrientation"
    >
        <wall :class="[ wall == 'v' ? 'vertical-wall' : '' ]" v-if="wall"></wall>
    </div>
</template>

<script>
import Wall from './Wall'
import { updateMoveCoords } from '../store/actions'

export default {
    data: function () {
        return {
            orientation: 'h'
        }
    },
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
        getters: {
            move: state => state.move,
        },
        actions: {
            updateMoveCoords
        }
    },
    methods: {
        'selectOrientation' () {
            jQuery(this.$el).css('background-color', 'white');
            updateMoveCoords(this.$store, this.coords);
            if(this.wall == null) {
                $('.intersection').popup('show');
            }
        },
    },
    ready () {
        // Enable the pop up on the intersection
        $('.intersection').popup({
            popup: '#wall-selector',
            exclusive: true,
            position: 'top right',
            on: 'click',
            // offset: '40',
        });
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