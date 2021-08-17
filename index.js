Vue.component('computer-item', {
    props: ['computer'],
    template: '<li>Make: {{ computer.make }} Model: {{ computer.model }} Asset Tag: {{ computer.asset_tag }} Service Tag: {{ computer.service_tag }}</li>'
})

var app = new Vue({
    el: '#app',
    data: {
        computerList: [
        ]
    },
    mounted () {
        axios
        .get('http://localhost:8000/inventory/?make=Dell')
        .then(response => (this.computerList = response['data']))
    }
})

