<template>
    <div id="app">
        <!--<img class="vuejs-logo" src="./assets/logo.png">-->
        <scoreboard></scoreboard>
        <gameboard></gameboard>
        <poweredby> </poweredby>
    </div>
</template>

<script>
    import Scoreboard from './components/ScoreBoard'
    import Gameboard from './components/GameBoard'
    import Poweredby from './components/PoweredBy'
    
    export default {
        components: {
            Scoreboard,
            Gameboard,
            Poweredby
        }
    }
</script>

<style>
    html {
        height: 100%;
    }

    body {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    #app {
        font-family: Source Sans Pro, Helvetica, sans-serif;
        color: white;
        width: 78vh;
        margin-left: auto;
        margin-right: auto;
        border: 3px solid black;
        border-radius: 20px;
        background-color: black;
    }

    #app a {
        color: #42b983;
        text-decoration: none;
    }

    .vuejs-logo {
        width: 20px;
        height: 20px
    }
    
    .green {
        color: green;
    }
    
    .blue {
        color: blue;
    }
    
    .red {
        color: red;
    }
    
    .yellow {
        color: yellow;
    }
</style>
