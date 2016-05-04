<template>
    <div id="gameboard">
        <square column="a" row="9"></square>
        <square column="b" row="9"></square>
        <square column="c" row="9"></square>
        <square column="d" row="9"></square>
        <square column="e" row="9"></square>
        <square column="f" row="9"></square>
        <square column="g" row="9"></square>
        <square column="h" row="9"></square>
        <square column="i" row="9"></square>
        <intersection column="a" row="9" orientation="h" isfirst=true></intersection>
        <intersection column="b" row="9" orientation="h"></intersection>
        <intersection column="c" row="9" orientation="h"></intersection>
        <intersection column="d" row="9" orientation="h"></intersection>
        <intersection column="e" row="9" orientation="h"></intersection>
        <intersection column="f" row="9" orientation="h"></intersection>
        <intersection column="g" row="9" orientation="h"></intersection>
        <intersection column="h" row="9" orientation="h" islast=true></intersection>
        <square column="a" row="8"></square>
        <square column="b" row="8"></square>
        <square column="c" row="8"></square>
        <square column="d" row="8"></square>
        <square column="e" row="8"></square>
        <square column="f" row="8"></square>
        <square column="g" row="8"></square>
        <square column="h" row="8"></square>
        <square column="i" row="8"></square>
        <intersection column="a" row="8" orientation="h" isfirst=true></intersection>
        <intersection column="b" row="8" orientation="h"></intersection>
        <intersection column="c" row="8" orientation="h"></intersection>
        <intersection column="d" row="8" orientation="h"></intersection>
        <intersection column="e" row="8" orientation="h"></intersection>
        <intersection column="f" row="8" orientation="h"></intersection>
        <intersection column="g" row="8" orientation="h"></intersection>
        <intersection column="h" row="8" orientation="h" islast=true></intersection>
        <square column="a" row="7"></square>
        <square column="b" row="7"></square>
        <square column="c" row="7"></square>
        <square column="d" row="7"></square>
        <square column="e" row="7"></square>
        <square column="f" row="7"></square>
        <square column="g" row="7"></square>
        <square column="h" row="7"></square>
        <square column="i" row="7"></square>
        <intersection column="a" row="7" orientation="h" isfirst=true></intersection>
        <intersection column="b" row="7" orientation="h"></intersection>
        <intersection column="c" row="7" orientation="h"></intersection>
        <intersection column="d" row="7" orientation="h"></intersection>
        <intersection column="e" row="7" orientation="h"></intersection>
        <intersection column="f" row="7" orientation="h"></intersection>
        <intersection column="g" row="7" orientation="h"></intersection>
        <intersection column="h" row="7" orientation="h" islast=true></intersection>
        <square column="a" row="6"></square>
        <square column="b" row="6"></square>
        <square column="c" row="6"></square>
        <square column="d" row="6"></square>
        <square column="e" row="6"></square>
        <square column="f" row="6"></square>
        <square column="g" row="6"></square>
        <square column="h" row="6"></square>
        <square column="i" row="6"></square>
        <intersection column="a" row="6" orientation="h" isfirst=true></intersection>
        <intersection column="b" row="6" orientation="h"></intersection>
        <intersection column="c" row="6" orientation="h"></intersection>
        <intersection column="d" row="6" orientation="h"></intersection>
        <intersection column="e" row="6" orientation="h"></intersection>
        <intersection column="f" row="6" orientation="h"></intersection>
        <intersection column="g" row="6" orientation="h"></intersection>
        <intersection column="h" row="6" orientation="h" islast=true></intersection>
        <square column="a" row="5"></square>
        <square column="b" row="5"></square>
        <square column="c" row="5"></square>
        <square column="d" row="5"></square>
        <square column="e" row="5"></square>
        <square column="f" row="5"></square>
        <square column="g" row="5"></square>
        <square column="h" row="5"></square>
        <square column="i" row="5"></square>
        <intersection column="a" row="5" orientation="h" isfirst=true></intersection>
        <intersection column="b" row="5" orientation="h"></intersection>
        <intersection column="c" row="5" orientation="h"></intersection>
        <intersection column="d" row="5" orientation="h"></intersection>
        <intersection column="e" row="5" orientation="h"></intersection>
        <intersection column="f" row="5" orientation="h"></intersection>
        <intersection column="g" row="5" orientation="h"></intersection>
        <intersection column="h" row="5" orientation="h" islast=true></intersection>
        <square column="a" row="4"></square>
        <square column="b" row="4"></square>
        <square column="c" row="4"></square>
        <square column="d" row="4"></square>
        <square column="e" row="4"></square>
        <square column="f" row="4"></square>
        <square column="g" row="4"></square>
        <square column="h" row="4"></square>
        <square column="i" row="4"></square>
        <intersection column="a" row="4" orientation="h" isfirst=true></intersection>
        <intersection column="b" row="4" orientation="h"></intersection>
        <intersection column="c" row="4" orientation="h"></intersection>
        <intersection column="d" row="4" orientation="h"></intersection>
        <intersection column="e" row="4" orientation="h"></intersection>
        <intersection column="f" row="4" orientation="h"></intersection>
        <intersection column="g" row="4" orientation="h"></intersection>
        <intersection column="h" row="4" orientation="h" islast=true></intersection>
        <square column="a" row="3"></square>
        <square column="b" row="3"></square>
        <square column="c" row="3"></square>
        <square column="d" row="3"></square>
        <square column="e" row="3"></square>
        <square column="f" row="3"></square>
        <square column="g" row="3"></square>
        <square column="h" row="3"></square>
        <square column="i" row="3"></square>
        <intersection column="a" row="3" orientation="h" isfirst=true></intersection>
        <intersection column="b" row="3" orientation="h"></intersection>
        <intersection column="c" row="3" orientation="h"></intersection>
        <intersection column="d" row="3" orientation="h"></intersection>
        <intersection column="e" row="3" orientation="h"></intersection>
        <intersection column="f" row="3" orientation="h"></intersection>
        <intersection column="g" row="3" orientation="h"></intersection>
        <intersection column="h" row="3" orientation="h" islast=true></intersection>
        <square column="a" row="2"></square>
        <square column="b" row="2"></square>
        <square column="c" row="2"></square>
        <square column="d" row="2"></square>
        <square column="e" row="2"></square>
        <square column="f" row="2"></square>
        <square column="g" row="2"></square>
        <square column="h" row="2"></square>
        <square column="i" row="2"></square>
        <intersection column="a" row="2" orientation="h" isfirst=true></intersection>
        <intersection column="b" row="2" orientation="h"></intersection>
        <intersection column="c" row="2" orientation="h"></intersection>
        <intersection column="d" row="2" orientation="h"></intersection>
        <intersection column="e" row="2" orientation="h"></intersection>
        <intersection column="f" row="2" orientation="h"></intersection>
        <intersection column="g" row="2" orientation="h"></intersection>
        <intersection column="h" row="2" orientation="h" islast=true></intersection>
        <square column="a" row="1"></square>
        <square column="b" row="1"></square>
        <square column="c" row="1"></square>
        <square column="d" row="1"></square>
        <square column="e" row="1"></square>
        <square column="f" row="1"></square>
        <square column="g" row="1"></square>
        <square column="h" row="1"></square>
        <square column="i" row="1"></square>
    </div>
</template>

<script>
import Square from './Square'
import Intersection from './Intersection'
// import Pawn from './Pawn'

export default {
    components: {
        Square,
        Intersection
        // Pawn
    },
    vuex: {
        getters: {
            players: state => state.players,
            turn: state => state.game.turn
        }
    },
    created () {
        
        // Draw the game board applying the appropriate row and column
        console.log('created')
    },
    events: {
        square (data) {
            console.log(data)
            alert('Square ' + data.column + ":" + data.row);
        },
        wall (data) {
            console.log(data)
            alert('Wal ' + data.column + ":" + data.row + ":" + data.orientation);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#gameboard {
    width: 74vh;
    height: 70vh;
    margin-left: auto;
    margin-right: auto;
    background: gray;
    padding-top: 2vh;
    padding-bottom: 2vh;
    border-radius: 2vh;
    /*background-image: url('../assets/wood.jpg');*/
}

.temp {
    height: 2vh;
    width: 74vh;
    /*background: white;*/
    position: relative;
    float: left;
}
</style>
