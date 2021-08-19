Vue.component('search', {
    props: ['parent'],
    template:`
    <div>
        <slot></slot>
        <label for="values">Choose a search value:</label>

        <select name="values" id="values" v-model="parent.property">
            <option value="make">Make</option>
            <option value="model">Model</option>
            <option value="service_tag">Service Tag</option>
            <option value="computer_location">Location</option>
            <option value="asset_tag">Asset Tag</option>
            <option value="checker">Checker</option>
        </select>

        <input type="text" v-model="parent.search" placeholder="Type here">
    </div>
    `
})


var app = new Vue({
    el: '#app',
    data: {
        parentSearch: {
            search: '',
            property: 'make',   
        },
        search: '',
        computerList: [],
        loading: true,
        errored: false,
    },
    mounted () {
        axios
        .get('http://localhost:8000/inventory/')
        .then(response => (this.computerList = response.data))
        .catch(error => {
            console.log(error)
            this.errored = true
        })
        .finally(() => this.loading = false)
    },
    computed: {
        filteredList(){
            return this.computerList.filter(computer => {
                return computer[this.parentSearch.property].includes(this.parentSearch.search)
            })
        }
    }
})

Vue.prototype.moment = moment;
