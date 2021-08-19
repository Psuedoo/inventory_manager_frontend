Vue.component('add-computer-form',{
    props: ['parent'],
    template:`
    <div>
        <slot></slot>
        <form action="index.html">
        <p>
        <input type="text" name="fmake" placeholder="Make" v-model="parent.make">
        </p>
        <p>
        <input type="text" name="fmodel" placeholder="Model" v-model="parent.model">
        </p>
        <p>
        <input type="text" name="fserviceTag" placeholder="Service Tag" v-model="parent.serviceTag">
        </p>
        <p>
        <input type="text" name="fassetTag" placeholder="Asset Tag" v-model="parent.assetTag">
        </p>
        <p>
        <input type="checkbox" name="fissued" placeholder="Issued" v-model="parent.issued">
        </p>
        <p>
        <input type="text" name="fassignedTo" placeholder="Assigned" v-model="parent.assignedTo">
        </p>
        <p>
        <input type="checkbox" name="fonHand" placeholder="On Hand" v-model="parent.onHand">
        </p>
        <p>
        <input type="checkbox" name="fonLocation" placeholder="On Location" v-model="parent.onLocation">
        </p>
        <p>
        <input type="text" name="flocation" placeholder="Location" v-model="parent.location">
        </p>
        <p>
        <input type="text" name="fclassLocation" placeholder="Class Location" v-model="parent.classLocation">
        </p>
        <p>
        <input type="text" name="fchecker" placeholder="Checker" v-model="parent.checker">
        </p>
        <p>
        <input type="textarea" name="fnotes" placeholder="Notes" v-model="parent.notes">
        </p>
        <p>
        <input type="submit">
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
    mounted () {
        axios
        .post('http://localhost:8000/inventory/', this.parentComputer)
        .then(response => (this.response = response.statusCode))
        // .catch(error => {
        //     console.log(error)
        //     this.errored = true
        // })
        // .finally(() => this.loading = false)
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
