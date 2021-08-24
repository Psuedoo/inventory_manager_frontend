Vue.component('search', {
    props: ['tableFilter'],
    template:`
    <div class="input-group nb3">
        <slot></slot>
    
        <select class="form-select form-select-lg" name="values" id="values" v-model="tableFilter.property">
            <option value="make">Make</option>
            <option value="model">Model</option>
            <option value="service_tag">Service Tag</option>
            <option value="asset_tag">Asset Tag</option>
            <option value="assigned_to">Assigned To</option>
            <option value="computer_location">Location</option>
            <option value="class_location">Class Location</option>
            <option value="checker">Checker</option>
            <option value="time_checked">Last Time Checked</option>
            <option value="notes">Notes</option>
        </select>
        
        <input type="text" v-model="tableFilter.search" placeholder="Type here">
    </div>
    `
})

Vue.component('computerTable', {
    template: ''
})

Vue.component('add-computer-form',{
    data : function () {
        return {
            make: '',
            model: '',
            service_tag: '',
            asset_tag: '',
            issued: false,
            assigned_to: '',
            on_hand: false,
            on_location: false,
            computer_location: '',
            class_location: '',
            checker: '',
            notes: '',
        }
    },
    props: ['locations'],
    methods: {
        postComputer: function () {
            axios
            .post('http://localhost:8000/inventory/add/', {
                make: this.make,
                model: this.model,
                service_tag: this.service_tag,
                asset_tag: this.asset_tag,
                issued: this.issued,
                assigned_to: this.assigned_to,
                on_hand: this.on_hand,
                on_location: this.on_location,
                computer_location: this.computer_location,
                class_location: this.class_location,
                checker: this.checker,
                notes: this.notes

            })
            .then((res) => {
                location.reload()
            })
            // .then(response => (parent.response = response.statusCode))
        }    
    },
    template: `
    <div>
        <div class="form-floating mb-3">
            <input type="text" class="form-control" id="make" placeholder="">
            <label for="make">Make</label>
        </div>
        <div class="form-floating mb-3">
            <input type="text" class="form-control" id="model" placeholder="">
            <label for="model">Model</label>
        </div>
        <div class="form-floating mb-3">
            <input type="text" class="form-control" id="serviceTag" placeholder="">
            <label for="serviceTag">Service Tag</label>
        </div>
        <div class="form-floating mb-3">
            <input type="text" class="form-control" id="assetTag" placeholder="">
            <label for="assetTag">Asset Tag</label>
        </div>
        <div class="form-check form-switch">
            <label class="form-check-label" for="issuedSwitch">Issued</label>
            <input class="form-check-input" type="checkbox" id="issuedSwitch">
        </div>
        <div class="form-floating mb-3">
            <input type="text" class="form-control" id="assignedTo" placeholder="">
            <label for="assignedTo">Assigned To</label>
        </div>
        <div class="form-check form-switch">
            <label class="form-check-label" for="onHandSwitch">On Hand</label>
            <input class="form-check-input" type="checkbox" id="onHandSwitch" checked>
        </div>
        <div>
            <div class="form-floating mb-3">
                <input class="form-control" id="locationInput" list="locationDataList">

                <datalist id="locationDataList">
                    <option v-for="location in locations">{{ location }}</option>
                </datalist>

            </div>
        </div>
        <div class="form-floating mb-3">
            <input type="text" class="form-control" id="checker" placeholder="">
            <label for="checker">Checker</label>
        </div>
    </div>
    `
    // template:`
    // <div>
    //     <slot></slot>
    //     <form @submit.prevent="postComputer" action="" method="post">
    //     <input type="submit" @click="return True">

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
        locationList: [],
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
        },
        getLocations(){
            var array = [];
            for(var id in this.computerList) {
                var location = this.computerList[id].computer_location
                if(!array.includes(location)) {
                    array.push(this.computerList[id].computer_location);
                }
            }
            return array
        }
    }
})

Vue.prototype.moment = moment;
