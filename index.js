Vue.component('checker-search', {
    props: ['parent'],
    template: `
    <div>
        <slot></slot>
        <input type="text" v-model="parent.checkerSearch" placeholder="Name" >
    `,
})


var app = new Vue({
    el: '#app',
    data: {
        parentSearch: {
            checkerSearch: ''
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
                return computer.checker.includes(this.parentSearch.checkerSearch)
            })
        }
    }
})

Vue.prototype.moment = moment;
