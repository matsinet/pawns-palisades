<template>
    <div id="app">
        <!--<img class="logo" src="./assets/logo.png">-->
        <scoreboard></scoreboard>
        <gameboard></gameboard>
        <footer></footer>
    </div>
</template>

<script>
    import Scoreboard from './components/ScoreBoard'
    import Gameboard from './components/GameBoard'
    
    export default {
        components: {
            Scoreboard,
            Gameboard
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
        color: #2c3e50;
        margin-top: -100px;
        max-width: 600px;
        font-family: Source Sans Pro, Helvetica, sans-serif;
        text-align: center;
    }

    #app a {
        color: #42b983;
        text-decoration: none;
    }

    .logo {
        width: 100px;
        height: 100px
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
