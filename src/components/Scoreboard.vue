<template>
    <div class="scoreboard">
        <h2>{{ title }}</h2>
        <h3>Turn: <span class="{{ store.turn }}">{{ store.turn | capitalize }}</span></h3>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                // note: changing this line won't causes changes
                // with hot-reload because the reloaded component
                // preserves its current state and we are modifying
                // its initial state.
                title: 'Score Board',
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
