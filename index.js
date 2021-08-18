Vue.component('computer-item', {
    props: ['computer'],
    template: `
    <tr>
        <td>{{ computer.make }}</td>
        <td>{{ computer.model }}</td>
        <td>{{ computer.service_tag }}</td>
        <td>{{ computer.asset_tag }}</td>
        <td>{{ computer.issued }}</td>
        <td>{{ computer.issuee }}</td>
        <td>{{ computer.on_hand }}</td>
        <td>{{ computer.on_location }}</td>
        <td>{{ computer.location }}</td>
        <td>{{ computer.class_location }}</td>
        <td>{{ computer.checker }}</td>
        <td>{{ moment(computer.time_checked).fromNow() }}</td>
        <td>{{ computer.notes }}</td>
    </tr>
    `

})


// Vue.component('checker-search', {
//     props: ['value'],
//     template: `
//     <input
//         v-bind:value="value"
//         v-on:input="filteredList()"
//     >
//     `
// })

var app = new Vue({
    el: '#app',
    data: {
        search: '',
        title: '',
        computerList: [
        ]
    },
    mounted () {
        axios
        .get('http://localhost:8000/inventory/')
        .then(response => (this.computerList = response.data))
    },
    computed: {
        filteredList(){
            let title = this.title
            return this.computerList.filter(computer => {
                return computer.title.includes(this.search)
            })
        }
    }
})

Vue.prototype.moment = moment;
