Vue.component('computer-item', {
    props: ['computer'],
    template: '<tr><td> {{ computer.make }} </td><td> {{ computer.model }} </td><td> {{ computer.service_tag }} </td><td> {{ computer.asset_tag }} </td></tr>'
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
        .then(response => (this.computerList = response.data))
    }
})
