var app = new Vue({
    el: '#app',
    data () {
        return {
            info: null
        }
    },
    mounted () {
        axios
        .get('http://localhost:8000/inventory/?asset_tag=125700')
        .then(response => (this.info = response))
    }
})

