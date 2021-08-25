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
    props: [
        'makeList',
        'modelList',
        'assignedToList',
        'locationList',
        'classLocationList',
    ],
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
                on_location: !this.on_hand,
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
    <div id="add-computer-modal" class="modal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Add Computer</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div>
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="make" list="makeDataList" placeholder="" v-model="make">
                                    <label for="make">Make</label>
                        
                                    <datalist id="makeDataList">
                                            <option v-for="make in makeList">{{ make }}</option>
                                    </datalist>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="model" list="modelDataList" placeholder="" v-model="model">
                                    <label for="model">Model</label>
                        
                                    <datalist id="modelDataList">
                                            <option v-for="model in modelList">{{ model }}</option>
                                    </datalist>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="serviceTag" placeholder="" v-model="service_tag">
                                    <label for="serviceTag">Service Tag</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="assetTag" placeholder="" v-model="asset_tag">
                                    <label for="assetTag">Asset Tag</label>
                                </div>
                                <div class="form-check form-switch">
                                    <label class="form-check-label" for="issuedSwitch">Issued</label>
                                    <input class="form-check-input" type="checkbox" id="issuedSwitch">
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="assignedTo" list="assignedToDataList" placeholder="" v-model="assigned_to">
                                    <label for="assignedTo">Assigned To</label>
                        
                                    <datalist id="assignedToDataList">
                                        <option v-for="assignedTo in assignedToList">{{ assignedTo }}</option>
                                </datalist>
                                </div>
                                <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="onHandSwitch" checked v-model="on_hand">
                                    <label class="form-check-label" for="onHandSwitch">On Hand</label>
                                </div>
                                <div>
                                    <div class="form-floating mb-3">
                                        <input class="form-control" id="locationInput" list="locationDataList" placeholder="" v-model="computer_location">
                                        <label for="locationInput">Location</label>
                        
                                        <datalist id="locationDataList">
                                            <option v-for="location in locationList">{{ location }}</option>
                                        </datalist>
                        
                                    </div>
                                    <div class="form-floating mb-3">
                                        <input class="form-control" id="classLocationInput" list="classLocationDataList" placeholder="" v-model="class_location">
                                        <label for="classLocationInput">Class Location</label>
                        
                                        <datalist id="classLocationDataList">
                                            <option v-for="classLocation in classLocationList">{{ classLocation }}</option>
                                        </datalist>
                        
                                    </div>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="checker" placeholder="" v-model="checker">
                                    <label for="checker">Checker</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <textarea class="form-control" id="notes" placeholder="" v-model="notes"></textarea>
                                    <label for="notes">Notes</label>
                                </div>
                            </div>
                        </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" v-on:click="postComputer">Add Computer</button>
                    </div>
                    </div>
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
        makeList: [],
        modelList: [],
        assignedToList: [],
        locationList: [],
        classLocationList: [],
    },
    mounted () {
        axios
        .get('http://localhost:8000/inventory/')
        .then(response => (this.computerList = response.data))
        .catch(error => {
            console.log(error)
            this.errored = true
        })
        .finally(() => {
            this.loading = false;
            for(var id in this.computerList) {
                var make = this.computerList[id].make;
                var model = this.computerList[id].model;
                var assignedTo = this.computerList[id].assigned_to;
                var location = this.computerList[id].computer_location;
                var classLocation = this.computerList[id].class_location;
                if(!this.makeList.includes(make)) {this.makeList.push(make)}
                if(!this.modelList.includes(model)) {this.modelList.push(model)}
                if(!this.assignedToList.includes(assignedTo)) {this.assignedToList.push(assignedTo)}
                if(!this.locationList.includes(location)) {this.locationList.push(location)}
                if(!this.classLocationList.includes(classLocation)) {this.classLocationList.push(classLocation)}
            }
        });
        


    },
    computed: {
        filteredList(){
            return this.computerList.filter(computer => {
                return computer[this.parentSearch.property].includes(this.parentSearch.search)
            })
        },
    }
})

Vue.prototype.moment = moment;
