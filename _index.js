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
        
        <input class="form-control me-2" type="search" v-model="tableFilter.search" placeholder="Type here">
    </div>
    `
})

Vue.component('computer-table', {
    props: ['computerList', 'invertShowModal', 'isAdding', 'setIsAdding'],
    template: `
    <table style="width: 100%; overflow-x: auto" class="table table-striped table-hover">
        <thead class="table-dark">
            <tr>
                <th scope="col">Make</th>
                <th scope="col">Model</th>
                <th>Service Tag</th>
                <th>Asset Tag</th>
                <th>Issued</th>
                <th>Assigned To</th>
                <th>On Hand</th>
                <th>On Location</th>
                <th>Location</th>
                <th>Class Location</th>
                <th>Checker</th>
                <th>Last Time Checked</th>
                <th>Notes</th>
            </tr>
        </thead>
        <tbody>
            <tr
            @dblclick="setIsAdding('update'); invertShowModal(computer);"
            v-for="computer in computerList"
            >
                <td>{{ computer.make }}</td>
                <td>{{ computer.model }}</td>
                <td>{{ computer.service_tag }}</td>
                <td>{{ computer.asset_tag }}</td>
                <td>{{ computer.issued }}</td>
                <td>{{ computer.assigned_to }}</td>
                <td>{{ computer.on_hand }}</td>
                <td>{{ computer.on_location }}</td>
                <td>{{ computer.computer_location }}</td>
                <td>{{ computer.class_location }}</td>
                <td>{{ computer.checker }}</td>
                <td>{{ moment(computer.time_checked).fromNow() }}</td>
                <td>{{ computer.notes }}</td>
            </tr>
        </tbody>
    </table>
    `
})

Vue.component('add-computer-modal',{
    props: [
        'makeList',
        'modelList',
        'assignedToList',
        'locationList',
        'classLocationList',
        'invertShowModal',
        'showModal',
        'computerObj',
        'isAdding',
    ],
    data : function () {
        return {
            id: '',
            make: '',
            model: '',
            service_tag: '',
            asset_tag: '',
            issued: true,
            assigned_to: '',
            on_hand: true,
            on_location: false,
            computer_location: '',
            class_location: '',
            checker: '',
            notes: '',
        }
    },
    methods: {
        postComputer: function (event) {
            const {id, make, model, service_tag, asset_tag, issued, assigned_to, on_hand, computer_location, class_location, checker, notes}
            = Object.fromEntries(new FormData(event.target));
            console.log(issued);
            this.id = id
            this.make = make
            this.model = model
            this.service_tag = service_tag
            this.asset_tag = asset_tag
            issued == undefined ? this.issued = false : this.issued = true
            this.assigned_to = assigned_to
            this.on_hand = on_hand
            this.on_location =  !on_hand
            this.computer_location = computer_location
            this.class_location = class_location
            this.checker = checker
            this.notes = notes            
            console.log(event);
            console.log(make);
            axios
            .post('http://localhost:8000/inventory/add/', {
                make: this.make,
                model: this.model,
                service_tag: this.service_tag,
                asset_tag: this.asset_tag,
                issued: this.issued,
                assigned_to: this.assigned_to,
                on_hand: this.on_hand,
                on_location:  this.on_location,
                computer_location: this.computer_location,
                class_location: this.class_location,
                checker: this.checker,
                notes: this.notes
                
            })
            .then((res) => {
                location.reload()
            })
            // .then(response => (parent.response = response.statusCode))
        },
        updateComputer: function (computer_id) {
            axios
            .put('http://localhost:8000/inventory/update/', computer_id, {
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
        },
        getTitle: function () {
            if(this.isAdding) {return 'Add Computer'} else {return 'Update Computer'}
        },
        chooseRequest: function (event, isAdding, computer) {
            if(isAdding) {this.postComputer(event)}
            if(!isAdding) {this.updateComputer(computer)}
        }
    },
    template: `
    <div v-if="showModal">
    <form @submit.prevent="postComputer">
        <div id="add-computer-modal" class="modal show" tabindex="-1" aria-hidden="false" style="display: block;">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">{{ getTitle() }}</h5>
                            <button type="button" class="btn-close" @click="invertShowModal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                        <div>
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="make" list="makeDataList" placeholder="" :value="computerObj.make" name="make">
                                <label for="make">Make</label>
                    
                                <datalist id="makeDataList">
                                        <option v-for="make in makeList">{{ make }}</option>
                                </datalist>
                            </div>
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="model" list="modelDataList" placeholder="" :value="computerObj.model" name="model">
                                <label for="model">Model</label>
                    
                                <datalist id="modelDataList">
                                        <option v-for="model in modelList">{{ model }}</option>
                                </datalist>
                            </div>
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="serviceTag" placeholder="" :value="computerObj.service_tag" name="service_tag">
                                <label for="serviceTag">Service Tag</label>
                            </div>
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="assetTag" placeholder="" :value="computerObj.asset_tag" name="asset_tag">
                                <label for="assetTag">Asset Tag</label>
                            </div>
                            <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" id="issuedSwitch" false-value="false" :value="computerObj.issued" name="issued">
                            <label class="form-check-label" for="issuedSwitch">Issued</label>
                            </div>
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="assignedTo" list="assignedToDataList" placeholder="" :value="computerObj.assigned_to" name="assigned_to">
                                <label for="assignedTo">Assigned To</label>
                    
                                <datalist id="assignedToDataList">
                                    <option v-for="assignedTo in assignedToList">{{ assignedTo }}</option>
                            </datalist>
                            </div>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="onHandSwitch" checked :value="computerObj.on_hand" name="on_hand">
                                <label class="form-check-label" for="onHandSwitch">On Hand</label>
                            </div>
                            <div>
                                <div class="form-floating mb-3">
                                    <input class="form-control" id="locationInput" list="locationDataList" placeholder="" :value="computerObj.computer_location" name="computer_location">
                                    <label for="locationInput">Location</label>
                    
                                    <datalist id="locationDataList">
                                        <option v-for="location in locationList">{{ location }}</option>
                                    </datalist>
                    
                                </div>
                                <div class="form-floating mb-3">
                                    <input class="form-control" id="classLocationInput" list="classLocationDataList" placeholder="" :value="computerObj.class_location" name="class_location">
                                    <label for="classLocationInput">Class Location</label>
                    
                                    <datalist id="classLocationDataList">
                                        <option v-for="classLocation in classLocationList">{{ classLocation }}</option>
                                    </datalist>
                    
                                </div>
                            </div>
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="checker" placeholder="" :value="computerObj.checker" name="checker">
                                <label for="checker">Checker</label>
                            </div>
                            <div class="form-floating mb-3">
                                <textarea class="form-control" id="notes" placeholder="" :value="computerObj.notes" name="notes"></textarea>
                                <label for="notes">Notes</label>
                            </div>
                        </div>
                        </div>
                        <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="invertShowModal">Close</button>
                        <button type="submit" class="btn btn-primary">{{ getTitle() }}</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
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
        computer: {
            id: '',
            make: '',
            model: '',
            service_tag: '',
            asset_tag: '',
            issued: false,
            assigned_to: '',
            on_hand: true,
            on_location: true,
            computer_location: '',
            checker: '',
            time_checked: '',
            notes: ''
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
        showModal: false,
        isAdding: false,
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
    },
    methods: {
        invertShowModal: function (computer=null){
            if(computer) {
                this.computer.id = computer.id
                this.computer.make = computer.make
                this.computer.model = computer.model
                this.computer.service_tag = computer.service_tag
                this.computer.asset_tag = computer.asset_tag                
                this.computer.issued = computer.issued                
                this.computer.assigned_to = computer.assigned_to                
                this.computer.on_hand = computer.on_hand                
                this.computer.on_location = computer.on_location                
                this.computer.location = computer.location                
                this.computer.class_location = computer.class_location                
                this.computer.checker = computer.checker                
                this.computer.time_checked = computer.time_checked                
                this.computer.notes = computer.notes                

            }
            this.showModal = !this.showModal;
            return this.showModal
        },
        setIsAdding: function (x) {
            if(x == 'add') {this.isAdding = true } 
            if(x == 'update') { this.isAdding = false }
            return this.isAdding;
        }
    },
})

Vue.prototype.moment = moment;
