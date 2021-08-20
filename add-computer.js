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
        }    
    },
    template:`
    <div>
        <slot></slot>
        <form @submit.prevent="postComputer" action="" method="post">
        <p>
        <input type="text" name="fmake" placeholder="Make" v-model="make">
        </p>
        <p>
        <input type="text" name="fmodel" placeholder="Model" v-model="model">
        </p>
        <p>
        <input type="text" name="fserviceTag" placeholder="Service Tag" v-model="service_tag">
        </p>
        <p>
        <input type="text" name="fassetTag" placeholder="Asset Tag" v-model="asset_tag">
        </p>
        <p>
        <input type="checkbox" name="fissued" placeholder="Issued" v-model="issued">
        </p>
        <p>
        <input type="text" name="fassignedTo" placeholder="Assigned" v-model="assigned_to">
        </p>
        <p>
        <input type="checkbox" name="fonHand" placeholder="On Hand" v-model="on_hand">
        </p>
        <p>
        <input type="checkbox" name="fonLocation" placeholder="On Location" v-model="on_location">
        </p>
        <p>
        <input type="text" name="fcomputerLocation" placeholder="Location" v-model="computer_location">
        </p>
        <p>
        <input type="text" name="fclassLocation" placeholder="Class Location" v-model="class_location">
        </p>
        <p>
        <input type="text" name="fchecker" placeholder="Checker" v-model="checker">
        </p>
        <p>
        <input type="textarea" name="fnotes" placeholder="Notes" v-model="notes">
        </p>
        <p>
        <input type="submit" @click="return True">
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
    },
    methods: {

    },
})

Vue.prototype.moment = moment;
