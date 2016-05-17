<template>
    <div class='pawn' v-bind:class="[ color ? color : '' ]"></div>
</template>

<script>
</script>

<style scoped>
.pawn {
    width: 4.5vh;
    height: 4.5vh;
    border-radius: 2.25vh;
    background-color: white;
    float: left;
    margin: .5vh;
    border: .25vh solid white;
}
.green {
    background-color: green;
}

.blue {
    background-color: blue;
}

.red {
    background-color: red;
}

.yellow {
    background-color: yellow;
}
</style>