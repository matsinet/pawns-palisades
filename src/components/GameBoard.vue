<template>
    <div id="gameboard" :class="[pawns == 4 ? 'players-4' : 'players-2']">
        <div class='row'>
            <square :square="board[9].a" :coords="{row:9, col:'a'}"></square>
            <square :square="board[9].b" :coords="{row:9, col:'b'}"></square>
            <square :square="board[9].c" :coords="{row:9, col:'c'}"></square>
            <square :square="board[9].d" :coords="{row:9, col:'d'}"></square>
            <square :square="board[9].e" :coords="{row:9, col:'e'}"></square>
            <square :square="board[9].f" :coords="{row:9, col:'f'}"></square>
            <square :square="board[9].g" :coords="{row:9, col:'g'}"></square>
            <square :square="board[9].h" :coords="{row:9, col:'h'}"></square>
            <square :square="board[9].i" :coords="{row:9, col:'i'}"></square>
        </div>
        <div class='row'>
            <intersection :wall="board[9].a.wall" :coords="{row: 9, col:'a'}"></intersection>
            <intersection :wall="board[9].b.wall" :coords="{row: 9, col:'b'}"></intersection>
            <intersection :wall="board[9].c.wall" :coords="{row: 9, col:'c'}"></intersection>
            <intersection :wall="board[9].d.wall" :coords="{row: 9, col:'d'}"></intersection>
            <intersection :wall="board[9].e.wall" :coords="{row: 9, col:'e'}"></intersection>
            <intersection :wall="board[9].f.wall" :coords="{row: 9, col:'f'}"></intersection>
            <intersection :wall="board[9].g.wall" :coords="{row: 9, col:'g'}"></intersection>
            <intersection :wall="board[9].h.wall" :coords="{row: 9, col:'h'}"></intersection>
        </div>
        <div class='row'>
            <square :square="board[8].a" :coords="{row:8, col:'a'}"></square>
            <square :square="board[8].b" :coords="{row:8, col:'b'}"></square>
            <square :square="board[8].c" :coords="{row:8, col:'c'}"></square>
            <square :square="board[8].d" :coords="{row:8, col:'d'}"></square>
            <square :square="board[8].e" :coords="{row:8, col:'e'}"></square>
            <square :square="board[8].f" :coords="{row:8, col:'f'}"></square>
            <square :square="board[8].g" :coords="{row:8, col:'g'}"></square>
            <square :square="board[8].h" :coords="{row:8, col:'h'}"></square>
            <square :square="board[8].i" :coords="{row:8, col:'i'}"></square>
        </div>
        <div class='row'>
            <intersection :wall="board[8].a.wall" :coords="{row: 8, col:'a'}"></intersection>
            <intersection :wall="board[8].b.wall" :coords="{row: 8, col:'b'}"></intersection>
            <intersection :wall="board[8].c.wall" :coords="{row: 8, col:'c'}"></intersection>
            <intersection :wall="board[8].d.wall" :coords="{row: 8, col:'d'}"></intersection>
            <intersection :wall="board[8].e.wall" :coords="{row: 8, col:'e'}"></intersection>
            <intersection :wall="board[8].f.wall" :coords="{row: 8, col:'f'}"></intersection>
            <intersection :wall="board[8].g.wall" :coords="{row: 8, col:'g'}"></intersection>
            <intersection :wall="board[8].h.wall" :coords="{row: 8, col:'h'}"></intersection>
        </div>
        <div class='row'>
            <square :square="board[7].a" :coords="{row:7, col:'a'}"></square>
            <square :square="board[7].b" :coords="{row:7, col:'b'}"></square>
            <square :square="board[7].c" :coords="{row:7, col:'c'}"></square>
            <square :square="board[7].d" :coords="{row:7, col:'d'}"></square>
            <square :square="board[7].e" :coords="{row:7, col:'e'}"></square>
            <square :square="board[7].f" :coords="{row:7, col:'f'}"></square>
            <square :square="board[7].g" :coords="{row:7, col:'g'}"></square>
            <square :square="board[7].h" :coords="{row:7, col:'h'}"></square>
            <square :square="board[7].i" :coords="{row:7, col:'i'}"></square>
        </div>
        <div class='row'>
            <intersection :wall="board[7].a.wall" :coords="{row: 7, col:'a'}"></intersection>
            <intersection :wall="board[7].b.wall" :coords="{row: 7, col:'b'}"></intersection>
            <intersection :wall="board[7].c.wall" :coords="{row: 7, col:'c'}"></intersection>
            <intersection :wall="board[7].d.wall" :coords="{row: 7, col:'d'}"></intersection>
            <intersection :wall="board[7].e.wall" :coords="{row: 7, col:'e'}"></intersection>
            <intersection :wall="board[7].f.wall" :coords="{row: 7, col:'f'}"></intersection>
            <intersection :wall="board[7].g.wall" :coords="{row: 7, col:'g'}"></intersection>
            <intersection :wall="board[7].h.wall" :coords="{row: 7, col:'h'}"></intersection>
        </div>
        <div class='row'>
            <square :square="board[6].a" :coords="{row:6, col:'a'}"></square>
            <square :square="board[6].b" :coords="{row:6, col:'b'}"></square>
            <square :square="board[6].c" :coords="{row:6, col:'c'}"></square>
            <square :square="board[6].d" :coords="{row:6, col:'d'}"></square>
            <square :square="board[6].e" :coords="{row:6, col:'e'}"></square>
            <square :square="board[6].f" :coords="{row:6, col:'f'}"></square>
            <square :square="board[6].g" :coords="{row:6, col:'g'}"></square>
            <square :square="board[6].h" :coords="{row:6, col:'h'}"></square>
            <square :square="board[6].i" :coords="{row:6, col:'i'}"></square>
        </div>
        <div class='row'>
            <intersection :wall="board[6].a.wall" :coords="{row: 6, col:'a'}"></intersection>
            <intersection :wall="board[6].b.wall" :coords="{row: 6, col:'b'}"></intersection>
            <intersection :wall="board[6].c.wall" :coords="{row: 6, col:'c'}"></intersection>
            <intersection :wall="board[6].d.wall" :coords="{row: 6, col:'d'}"></intersection>
            <intersection :wall="board[6].e.wall" :coords="{row: 6, col:'e'}"></intersection>
            <intersection :wall="board[6].f.wall" :coords="{row: 6, col:'f'}"></intersection>
            <intersection :wall="board[6].g.wall" :coords="{row: 6, col:'g'}"></intersection>
            <intersection :wall="board[6].h.wall" :coords="{row: 6, col:'h'}"></intersection>
        </div>
        <div class='row'>
            <square :square="board[5].a" :coords="{row:5, col:'a'}"></square>
            <square :square="board[5].b" :coords="{row:5, col:'b'}"></square>
            <square :square="board[5].c" :coords="{row:5, col:'c'}"></square>
            <square :square="board[5].d" :coords="{row:5, col:'d'}"></square>
            <square :square="board[5].e" :coords="{row:5, col:'e'}"></square>
            <square :square="board[5].f" :coords="{row:5, col:'f'}"></square>
            <square :square="board[5].g" :coords="{row:5, col:'g'}"></square>
            <square :square="board[5].h" :coords="{row:5, col:'h'}"></square>
            <square :square="board[5].i" :coords="{row:5, col:'i'}"></square>
        </div>
        <div class='row'>
            <intersection :wall="board[5].a.wall" :coords="{row: 5, col:'a'}"></intersection>
            <intersection :wall="board[5].b.wall" :coords="{row: 5, col:'b'}"></intersection>
            <intersection :wall="board[5].c.wall" :coords="{row: 5, col:'c'}"></intersection>
            <intersection :wall="board[5].d.wall" :coords="{row: 5, col:'d'}"></intersection>
            <intersection :wall="board[5].e.wall" :coords="{row: 5, col:'e'}"></intersection>
            <intersection :wall="board[5].f.wall" :coords="{row: 5, col:'f'}"></intersection>
            <intersection :wall="board[5].g.wall" :coords="{row: 5, col:'g'}"></intersection>
            <intersection :wall="board[5].h.wall" :coords="{row: 5, col:'h'}"></intersection>
        </div>
        <div class='row'>
            <square :square="board[4].a" :coords="{row:4, col:'a'}"></square>
            <square :square="board[4].b" :coords="{row:4, col:'b'}"></square>
            <square :square="board[4].c" :coords="{row:4, col:'c'}"></square>
            <square :square="board[4].d" :coords="{row:4, col:'d'}"></square>
            <square :square="board[4].e" :coords="{row:4, col:'e'}"></square>
            <square :square="board[4].f" :coords="{row:4, col:'f'}"></square>
            <square :square="board[4].g" :coords="{row:4, col:'g'}"></square>
            <square :square="board[4].h" :coords="{row:4, col:'h'}"></square>
            <square :square="board[4].i" :coords="{row:4, col:'i'}"></square>
        </div>
        <div class='row'>
            <intersection :wall="board[4].a.wall" :coords="{row: 4, col:'a'}"></intersection>
            <intersection :wall="board[4].b.wall" :coords="{row: 4, col:'b'}"></intersection>
            <intersection :wall="board[4].c.wall" :coords="{row: 4, col:'c'}"></intersection>
            <intersection :wall="board[4].d.wall" :coords="{row: 4, col:'d'}"></intersection>
            <intersection :wall="board[4].e.wall" :coords="{row: 4, col:'e'}"></intersection>
            <intersection :wall="board[4].f.wall" :coords="{row: 4, col:'f'}"></intersection>
            <intersection :wall="board[4].g.wall" :coords="{row: 4, col:'g'}"></intersection>
            <intersection :wall="board[4].h.wall" :coords="{row: 4, col:'h'}"></intersection>
        </div>
        <div class='row'>
            <square :square="board[3].a" :coords="{row:3, col:'a'}"></square>
            <square :square="board[3].b" :coords="{row:3, col:'b'}"></square>
            <square :square="board[3].c" :coords="{row:3, col:'c'}"></square>
            <square :square="board[3].d" :coords="{row:3, col:'d'}"></square>
            <square :square="board[3].e" :coords="{row:3, col:'e'}"></square>
            <square :square="board[3].f" :coords="{row:3, col:'f'}"></square>
            <square :square="board[3].g" :coords="{row:3, col:'g'}"></square>
            <square :square="board[3].h" :coords="{row:3, col:'h'}"></square>
            <square :square="board[3].i" :coords="{row:3, col:'i'}"></square>
        </div>
        <div class='row'>
            <intersection :wall="board[3].a.wall" :coords="{row: 3, col:'a'}"></intersection>
            <intersection :wall="board[3].b.wall" :coords="{row: 3, col:'b'}"></intersection>
            <intersection :wall="board[3].c.wall" :coords="{row: 3, col:'c'}"></intersection>
            <intersection :wall="board[3].d.wall" :coords="{row: 3, col:'d'}"></intersection>
            <intersection :wall="board[3].e.wall" :coords="{row: 3, col:'e'}"></intersection>
            <intersection :wall="board[3].f.wall" :coords="{row: 3, col:'f'}"></intersection>
            <intersection :wall="board[3].g.wall" :coords="{row: 3, col:'g'}"></intersection>
            <intersection :wall="board[3].h.wall" :coords="{row: 3, col:'h'}"></intersection>
        </div>
        <div class='row'>
            <square :square="board[2].a" :coords="{row:2, col:'a'}"></square>
            <square :square="board[2].b" :coords="{row:2, col:'b'}"></square>
            <square :square="board[2].c" :coords="{row:2, col:'c'}"></square>
            <square :square="board[2].d" :coords="{row:2, col:'d'}"></square>
            <square :square="board[2].e" :coords="{row:2, col:'e'}"></square>
            <square :square="board[2].f" :coords="{row:2, col:'f'}"></square>
            <square :square="board[2].g" :coords="{row:2, col:'g'}"></square>
            <square :square="board[2].h" :coords="{row:2, col:'h'}"></square>
            <square :square="board[2].i" :coords="{row:2, col:'i'}"></square>
        </div>
        <div class='row'>
            <intersection :wall="board[2].a.wall" :coords="{row: 2, col:'a'}"></intersection>
            <intersection :wall="board[2].b.wall" :coords="{row: 2, col:'b'}"></intersection>
            <intersection :wall="board[2].c.wall" :coords="{row: 2, col:'c'}"></intersection>
            <intersection :wall="board[2].d.wall" :coords="{row: 2, col:'d'}"></intersection>
            <intersection :wall="board[2].e.wall" :coords="{row: 2, col:'e'}"></intersection>
            <intersection :wall="board[2].f.wall" :coords="{row: 2, col:'f'}"></intersection>
            <intersection :wall="board[2].g.wall" :coords="{row: 2, col:'g'}"></intersection>
            <intersection :wall="board[2].h.wall" :coords="{row: 2, col:'h'}"></intersection>
        </div>
        <div class='row'>
            <square :square="board[1].a" :coords="{row:1, col:'a'}"></square>
            <square :square="board[1].b" :coords="{row:1, col:'b'}"></square>
            <square :square="board[1].c" :coords="{row:1, col:'c'}"></square>
            <square :square="board[1].d" :coords="{row:1, col:'d'}"></square> <!-- alternate bind syntax -->
            <square v-bind:square="board[1].e" :coords="{row:1, col:'e'}"></square> <!-- verbose bind syntax -->
            <square :square="board[1].f" :coords="{row:1, col:'f'}"></square>
            <square :square="board[1].g" :coords="{row:1, col:'g'}"></square>
            <square :square="board[1].h" :coords="{row:1, col:'h'}"></square>
            <square :square="board[1].i" :coords="{row:1, col:'i'}"></square>
        </div>
    </div>
    <div class="ui wide popup" id="wall-selector">
        <div class="header">Wall Orientation</div>
        <div v-if="hasErrors" class="ui small negative message">
            <div class="popupErrorMessage" v-for="error in errors">
                <div>{{ error }}</div>
            </div>
        </div>
        <select class="ui dropdown" v-model='orientation' placeholder="Select Orientation">
            <option value="" selected></option>
            <option value="h">Horizontal</option>
            <option value="v">Vertical</option>
        </select>
        <div class="ui button" @click="insertWall">Place Wall</div>
        <div class="ui button" v-on:click="cancelWall">Cancel</div>
    </div>
</template>

<script>
import Square from './Square'
import Intersection from './Intersection'
import Wall from './Wall'
import Pawn from './Pawn'
import { placeWall, nextPlayer, drawMoves } from '../store/actions'

export default {
    data: function () {
        return {
            orientation: '',
        }
    },
    computed: {
        hasErrors () {
            return this.errors.length;
        }
    },
    methods: {
        insertWall () {
            if( this.orientation !== '') {
                $('#wall-selector').popup('hide all');
                placeWall(this.$store, this.orientation);
                this.orientation = '';
                nextPlayer(this.$store);
            }
        },
        cancelWall () {
            $('#wall-selector').popup('hide all');
            this.orientation = '';
            drawMoves(this.$store);
        }
    },
    components: {
        Square,
        Intersection,
        Wall,
        Pawn
    },
    vuex: {
        getters: {
            players: state => state.players,
            turn: state => state.game.turn,
            errors: state => state.game.errors,
            pawns: state => state.game.pawn_count,
            board: state => state.board,
        },
        actions: {
            placeWall,
            nextPlayer,
            drawMoves
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#gameboard {
    width: 74vh;
    height: 68.5vh;
    margin-left: auto;
    margin-right: auto;
    background: gray;
    padding-top: 2vh;
    padding-bottom: 3.25vh;
    border-radius: 2vh;
    background-image: url('../../public/assets/wood.jpg');
    border-top: .75vh solid blue;
    border-bottom: .75vh solid red;
    
        
    /* Set to override Semantic UI */
    box-sizing: unset;
}

.players-2 {
    border-left: .75vh solid gray;
    border-right: .75vh solid gray;
}

.players-4 {
    /*width: 71vh !important;*/
    border-left: .75vh solid yellow;
    border-right: .75vh solid green;
}

.popupErrorMessage {
    list-style-type: none;
    list-style-position: outside;
    color: red;
    font-weight: bold;
    margin-left: -30px;
}
</style>
