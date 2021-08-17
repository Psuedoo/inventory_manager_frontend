var app = new Vue({
    el: '#app',
    data () {
        return {
            info: null
        }
    },
    mounted () {
        axios
        .get('http://localhost:8000/inventory/?make=Dell')
        .then(response => (this.info = response))
    }
})

