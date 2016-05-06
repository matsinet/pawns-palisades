<template>
    <div class='wall'></div>
</template>

<script>
export default {
    props: [
        'column',
        'row',
    ],
    methods: {
        // notify () {
        //     this.$dispatch(
        //         'wall',
        //         {
        //             column: this.column,
        //             row: this.row,
        //             orientation: this.orientation
        //         }
        //     );
        // }
    }
}
</script>

<style>
.wall {
    width: 13.5vh;
    height: 1.75vh;
    /*background-color: rgba(255, 255, 255, 0.8);*/
    background-color: brown;
    border: .25vh outset white;
    border-radius: .5vh;
    margin-left: 6vh;
    position: relative;
    left: -4vh;
    /*top: .2vh;*/
}
</style>