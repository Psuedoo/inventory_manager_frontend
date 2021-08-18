Vue.component('computer-item', {
    props: ['computer'],
    template: '<tr><td>{{computer.make}}</td></tr>'
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

Vue.prototype.moment = moment;
