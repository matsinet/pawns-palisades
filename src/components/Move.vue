<template>
    <div class='move' v-bind:class="[ color ? color : '' ]"></div>
</template>

<script>
export default {
    props: [
        'color'
    ],
}
</script>

<style scoped>
.move {
    width: 4.5vh;
    height: 4.5vh;
    border-radius: 2.25vh;
    float: left;
    margin: .5vh;
    border: .25vh dashed white;
}
.green {
    background-color: rgba(0, 255, 0, .4); /* green */
}

.blue {
    background-color: rgba(0, 0, 255, .4); /* blue */
}

.red {
    background-color: rgba(255, 0, 0, .4); /* red */
}

.yellow {
    background-color: rgba(255, 255, 0, .4); /* yellow */
}
</style>