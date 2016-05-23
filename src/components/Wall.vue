<template>
    <div class='wall'></div>
</template>

<script>
</script>

<style>
.wall {
    width: 13.5vh;
    height: 1.75vh;
    /*background-color: brown;*/
    
    background-color: #652121;
    /* For WebKit (Safari, Chrome, etc) */
    background: #652121 -webkit-gradient(linear, left top, left bottom, from(#654E21), to(#652121)) no-repeat;
    /* Mozilla,Firefox/Gecko */
    background: #652121 -moz-linear-gradient(top, #654E21, #652121) no-repeat;
    /* IE 5.5 - 7 */
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#654E21, endColorstr=#652121) no-repeat;
    /* IE 8 */
    -ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr=#654E21, endColorstr=#654E21)" no-repeat;

    border: .25vh outset black;
    border-radius: .5vh;
    position: relative;
    left: -6vh;  
}

.vertical-wall {
    transform: rotate(90deg);
}
</style>