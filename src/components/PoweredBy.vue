<template>
    <div id="powered-by">
        <div class='logo'>
            <a href="http://vuejs.org/" target="blank">
                <img class="vuejs-logo" src="./poweredByAssets/logoVuejs.png" alt="Powered by Vue.js" />
            </a>
        </div>
        <div class='logo'>
            <a href="https://bitbucket.org/matsinet/jquoridor" target="blank">
                <img class="bitbucket-logo" src="./poweredByAssets/logoBitBucket.png" alt="Stored by BitBucket" />
            </a>
        </div>
        <div class='logo'>
            <a href="https://namecheap.com" target="blank">
                <img class="namecheap-logo" src="./poweredByAssets/logoNamecheap.png" alt="Hosted by Namecheap" />
            </a>
        </div>
    </div>
</template>

<script>
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#powered-by {
    height: 30px;
    background: black;
    color: white;
    border-bottom-left-radius: 14px;
    border-bottom-right-radius: 14px;
    margin: 5px;
    text-align: center;
}
.logo {
    width: 33%;
    text-align: center;
    float: left;
}

.logo img {
    height: 20px;
}
</style>
