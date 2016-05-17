<template>
    <div id="gameboard" v-bind:class="[pawns == 4 ? 'players-4' : 'players-2']">
        <square v-bind:square="board[9].a" v-bind:coords="{row:9, col:'a'}"></square>
        <square v-bind:square="board[9].b" v-bind:coords="{row:9, col:'b'}"></square>
        <square v-bind:square="board[9].c" v-bind:coords="{row:9, col:'c'}"></square>
        <square v-bind:square="board[9].d" v-bind:coords="{row:9, col:'d'}"></square>
        <square v-bind:square="board[9].e" v-bind:coords="{row:9, col:'e'}"></square>
        <square v-bind:square="board[9].f" v-bind:coords="{row:9, col:'f'}"></square>
        <square v-bind:square="board[9].g" v-bind:coords="{row:9, col:'g'}"></square>
        <square v-bind:square="board[9].h" v-bind:coords="{row:9, col:'h'}"></square>
        <square v-bind:square="board[9].i" v-bind:coords="{row:9, col:'i'}"></square>
        <intersection column="a" row="9" isfirst=true></intersection>
        <intersection column="b" row="9"></intersection>
        <intersection column="c" row="9"></intersection>
        <intersection column="d" row="9"></intersection>
        <intersection column="e" row="9"></intersection>
        <intersection column="f" row="9"></intersection>
        <intersection column="g" row="9"></intersection>
        <intersection column="h" row="9" islast=true></intersection>
        <square v-bind:square="board[8].a" v-bind:coords="{row:8, col:'a'}"></square>
        <square v-bind:square="board[8].b" v-bind:coords="{row:8, col:'b'}"></square>
        <square v-bind:square="board[8].c" v-bind:coords="{row:8, col:'c'}"></square>
        <square v-bind:square="board[8].d" v-bind:coords="{row:8, col:'d'}"></square>
        <square v-bind:square="board[8].e" v-bind:coords="{row:8, col:'e'}"></square>
        <square v-bind:square="board[8].f" v-bind:coords="{row:8, col:'f'}"></square>
        <square v-bind:square="board[8].g" v-bind:coords="{row:8, col:'g'}"></square>
        <square v-bind:square="board[8].h" v-bind:coords="{row:8, col:'h'}"></square>
        <square v-bind:square="board[8].i" v-bind:coords="{row:8, col:'i'}"></square>
        <intersection column="a" row="8" isfirst=true></intersection>
        <intersection column="b" row="8"></intersection>
        <intersection column="c" row="8"></intersection>
        <intersection column="d" row="8"></intersection>
        <intersection column="e" row="8"></intersection>
        <intersection column="f" row="8"></intersection>
        <intersection column="g" row="8"></intersection>
        <intersection column="h" row="8" islast=true></intersection>
        <square v-bind:square="board[7].a" v-bind:coords="{row:7, col:'a'}"></square>
        <square v-bind:square="board[7].b" v-bind:coords="{row:7, col:'b'}"></square>
        <square v-bind:square="board[7].c" v-bind:coords="{row:7, col:'c'}"></square>
        <square v-bind:square="board[7].d" v-bind:coords="{row:7, col:'d'}"></square>
        <square v-bind:square="board[7].e" v-bind:coords="{row:7, col:'e'}"></square>
        <square v-bind:square="board[7].f" v-bind:coords="{row:7, col:'f'}"></square>
        <square v-bind:square="board[7].g" v-bind:coords="{row:7, col:'g'}"></square>
        <square v-bind:square="board[7].h" v-bind:coords="{row:7, col:'h'}"></square>
        <square v-bind:square="board[7].i" v-bind:coords="{row:7, col:'i'}"></square>
        <intersection column="a" row="7" isfirst=true></intersection>
        <intersection column="b" row="7"></intersection>
        <intersection column="c" row="7"></intersection>
        <intersection column="d" row="7"></intersection>
        <intersection column="e" row="7"></intersection>
        <intersection column="f" row="7"></intersection>
        <intersection column="g" row="7"></intersection>
        <intersection column="h" row="7" islast=true></intersection>
        <square v-bind:square="board[6].a" v-bind:coords="{row:6, col:'a'}"></square>
        <square v-bind:square="board[6].b" v-bind:coords="{row:6, col:'b'}"></square>
        <square v-bind:square="board[6].c" v-bind:coords="{row:6, col:'c'}"></square>
        <square v-bind:square="board[6].d" v-bind:coords="{row:6, col:'d'}"></square>
        <square v-bind:square="board[6].e" v-bind:coords="{row:6, col:'e'}"></square>
        <square v-bind:square="board[6].f" v-bind:coords="{row:6, col:'f'}"></square>
        <square v-bind:square="board[6].g" v-bind:coords="{row:6, col:'g'}"></square>
        <square v-bind:square="board[6].h" v-bind:coords="{row:6, col:'h'}"></square>
        <square v-bind:square="board[6].i" v-bind:coords="{row:6, col:'i'}"></square>
        <intersection column="a" row="6" isfirst=true></intersection>
        <intersection column="b" row="6"></intersection>
        <intersection column="c" row="6"></intersection>
        <intersection column="d" row="6"></intersection>
        <intersection column="e" row="6"></intersection>
        <intersection column="f" row="6"></intersection>
        <intersection column="g" row="6"></intersection>
        <intersection column="h" row="6" islast=true></intersection>
        <square v-bind:square="board[5].a" v-bind:coords="{row:5, col:'a'}"></square>
        <square v-bind:square="board[5].b" v-bind:coords="{row:5, col:'b'}"></square>
        <square v-bind:square="board[5].c" v-bind:coords="{row:5, col:'c'}"></square>
        <square v-bind:square="board[5].d" v-bind:coords="{row:5, col:'d'}"></square>
        <square v-bind:square="board[5].e" v-bind:coords="{row:5, col:'e'}"></square>
        <square v-bind:square="board[5].f" v-bind:coords="{row:5, col:'f'}"></square>
        <square v-bind:square="board[5].g" v-bind:coords="{row:5, col:'g'}"></square>
        <square v-bind:square="board[5].h" v-bind:coords="{row:5, col:'h'}"></square>
        <square v-bind:square="board[5].i" v-bind:coords="{row:5, col:'i'}"></square>
        <intersection column="a" row="5" isfirst=true></intersection>
        <intersection column="b" row="5"></intersection>
        <intersection column="c" row="5"></intersection>
        <intersection column="d" row="5"></intersection>
        <intersection column="e" row="5"></intersection>
        <intersection column="f" row="5"></intersection>
        <intersection column="g" row="5"></intersection>
        <intersection column="h" row="5" islast=true></intersection>
        <square v-bind:square="board[4].a" v-bind:coords="{row:4, col:'a'}"></square>
        <square v-bind:square="board[4].b" v-bind:coords="{row:4, col:'b'}"></square>
        <square v-bind:square="board[4].c" v-bind:coords="{row:4, col:'c'}"></square>
        <square v-bind:square="board[4].d" v-bind:coords="{row:4, col:'d'}"></square>
        <square v-bind:square="board[4].e" v-bind:coords="{row:4, col:'e'}"></square>
        <square v-bind:square="board[4].f" v-bind:coords="{row:4, col:'f'}"></square>
        <square v-bind:square="board[4].g" v-bind:coords="{row:4, col:'g'}"></square>
        <square v-bind:square="board[4].h" v-bind:coords="{row:4, col:'h'}"></square>
        <square v-bind:square="board[4].i" v-bind:coords="{row:4, col:'i'}"></square>
        <intersection column="a" row="4" isfirst=true></intersection>
        <intersection column="b" row="4"></intersection>
        <intersection column="c" row="4"></intersection>
        <intersection column="d" row="4"></intersection>
        <intersection column="e" row="4"></intersection>
        <intersection column="f" row="4"></intersection>
        <intersection column="g" row="4"></intersection>
        <intersection column="h" row="4" islast=true></intersection>
        <square v-bind:square="board[3].a" v-bind:coords="{row:3, col:'a'}"></square>
        <square v-bind:square="board[3].b" v-bind:coords="{row:3, col:'b'}"></square>
        <square v-bind:square="board[3].c" v-bind:coords="{row:3, col:'c'}"></square>
        <square v-bind:square="board[3].d" v-bind:coords="{row:3, col:'d'}"></square>
        <square v-bind:square="board[3].e" v-bind:coords="{row:3, col:'e'}"></square>
        <square v-bind:square="board[3].f" v-bind:coords="{row:3, col:'f'}"></square>
        <square v-bind:square="board[3].g" v-bind:coords="{row:3, col:'g'}"></square>
        <square v-bind:square="board[3].h" v-bind:coords="{row:3, col:'h'}"></square>
        <square v-bind:square="board[3].i" v-bind:coords="{row:3, col:'i'}"></square>
        <intersection column="a" row="3" isfirst=true></intersection>
        <intersection column="b" row="3"></intersection>
        <intersection column="c" row="3"></intersection>
        <intersection column="d" row="3"></intersection>
        <intersection column="e" row="3"></intersection>
        <intersection column="f" row="3"></intersection>
        <intersection column="g" row="3"></intersection>
        <intersection column="h" row="3" islast=true></intersection>
        <square v-bind:square="board[2].a" v-bind:coords="{row:2, col:'a'}"></square>
        <square v-bind:square="board[2].b" v-bind:coords="{row:2, col:'b'}"></square>
        <square v-bind:square="board[2].c" v-bind:coords="{row:2, col:'c'}"></square>
        <square v-bind:square="board[2].d" v-bind:coords="{row:2, col:'d'}"></square>
        <square v-bind:square="board[2].e" v-bind:coords="{row:2, col:'e'}"></square>
        <square v-bind:square="board[2].f" v-bind:coords="{row:2, col:'f'}"></square>
        <square v-bind:square="board[2].g" v-bind:coords="{row:2, col:'g'}"></square>
        <square v-bind:square="board[2].h" v-bind:coords="{row:2, col:'h'}"></square>
        <square v-bind:square="board[2].i" v-bind:coords="{row:2, col:'i'}"></square>
        <intersection column="a" row="2" isfirst=true></intersection>
        <intersection column="b" row="2"></intersection>
        <intersection column="c" row="2"></intersection>
        <intersection column="d" row="2"></intersection>
        <intersection column="e" row="2"></intersection>
        <intersection column="f" row="2"></intersection>
        <intersection column="g" row="2"></intersection>
        <intersection column="h" row="2" islast=true></intersection>
        <square v-bind:square="board[1].a" v-bind:coords="{row:1, col:'a'}"></square>
        <square v-bind:square="board[1].b" v-bind:coords="{row:1, col:'b'}"></square>
        <square v-bind:square="board[1].c" v-bind:coords="{row:1, col:'c'}"></square>
        <square v-bind:square="board[1].d" v-bind:coords="{row:1, col:'d'}"></square>
        <square v-bind:square="board[1].e" v-bind:coords="{row:1, col:'e'}"></square>
        <square v-bind:square="board[1].f" v-bind:coords="{row:1, col:'f'}"></square>
        <square v-bind:square="board[1].g" v-bind:coords="{row:1, col:'g'}"></square>
        <square v-bind:square="board[1].h" v-bind:coords="{row:1, col:'h'}"></square>
        <square v-bind:square="board[1].i" v-bind:coords="{row:1, col:'i'}"></square>
    </div>
</template>

<script>
import Square from './Square'
import Intersection from './Intersection'
import Pawn from './Pawn'

export default {
    components: {
        Square,
        Intersection,
        Pawn
    },
     vuex: {
         getters: {
             players: state => state.players,
             turn: state => state.game.turn,
             pawns: state => state.game.pawn_count,
             board: state => state.board,
         }
    },
    // created () {
    //     // Draw the game board applying the appropriate row and column
    //     console.log('created')
    // },
    events: {
        move (data) {
            console.log(data)
            alert('Move ' + data.column + ":" + data.row + ":" + data.move);
        },
        wall (data) {
            console.log(data)
            alert('Wall ' + data.column + ":" + data.row + ":" + data.wall);
        }
    },
    methods: {
        init () {
            
        },
        drawMoves () {
            let pawn = this.findPawn(this.turn);
        },
        placeWall (column, row, orientation) {
            
        }
    }
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
    background-image: url('../assets/wood.jpg');
    border-top: .75vh solid blue;
    border-bottom: .75vh solid red;
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
</style>
