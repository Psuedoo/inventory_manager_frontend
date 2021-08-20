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
            location: '',
            class_location: '',
            checker: '',
            notes: '',
        }
    },
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
                location: this.location,
                class_location: this.class_location,
                checker: this.checker,
                notes: this.notes

            })
            // .then(response => (parent.response = response.statusCode))
        }    
    },
    template:`
    <div>
        <slot></slot>
        <form action="javascript:void(0)">
        <p>
        <input type="text" name="fmake" placeholder="Make" v-model="this.make">
        </p>
        <p>
        <input type="text" name="fmodel" placeholder="Model" v-model="this.model">
        </p>
        <p>
        <input type="text" name="fserviceTag" placeholder="Service Tag" v-model="this.service_tag">
        </p>
        <p>
        <input type="text" name="fassetTag" placeholder="Asset Tag" v-model="this.asset_tag">
        </p>
        <p>
        <input type="checkbox" name="fissued" placeholder="Issued" v-model="this.issued">
        </p>
        <p>
        <input type="text" name="fassignedTo" placeholder="Assigned" v-model="this.assigned_to">
        </p>
        <p>
        <input type="checkbox" name="fonHand" placeholder="On Hand" v-model="this.on_hand">
        </p>
        <p>
        <input type="checkbox" name="fonLocation" placeholder="On Location" v-model="this.on_location">
        </p>
        <p>
        <input type="text" name="flocation" placeholder="Location" v-model="this.location">
        </p>
        <p>
        <input type="text" name="fclassLocation" placeholder="Class Location" v-model="this.class_location">
        </p>
        <p>
        <input type="text" name="fchecker" placeholder="Checker" v-model="this.checker">
        </p>
        <p>
        <input type="textarea" name="fnotes" placeholder="Notes" v-model="this.notes">
        </p>
        <p>
        <input type="submit" v-on:click="postComputer()">
        </p>
        </form>
    </div>
    `
})

var app = new Vue({
    el: '#add-computer',
    data: {
        computerList: [],
        loading: true,
        errored: false,
        postSuccess: '',
        parentComputer: {
            make: '',
            model: '',
            service_tag: '',
            asset_tag: '',
            issued: false,
            assigned_to: '',
            on_hand: false,
            on_location: false,
            location: '',
            class_location: '',
            checker: '',
            notes: '',
        }
    },
    methods: {

    },
})

Vue.prototype.moment = moment;
