Vue.component('computer-table', {
    props: ['computers'],
    data: function () {
        return {
            search: '',
            headers: [
            {
                text: 'Make',
                align: 'start',
                sortable: 'false',
                value: 'make'
            },
            { text: 'Model', value: 'model' },
            { text: 'Service Tag', value: 'service_tag', sortable: 'true'},
            { text: 'Asset Tag', value: 'asset_tag' },
            { text: 'Issued', value: 'issued' },
            { text: 'Assigned To', value: 'assigned_to' },
            { text: 'On Hand', value: 'on_hand' },
            { text: 'On Location', value: 'on_location' },
            { text: 'Location', value: 'computer_location' },
            { text: 'Class Location', value: 'class_location' },
            { text: 'Checker', value: 'checker' },
            { text: 'Last Time Checked', value: 'time_checked' },
            { text: 'Notes', value: 'notes' },
        ],
        }
    },
    template: `
    <div>
        <v-data-table
        :headers="this.headers"
        :items="this.computers"
        :search="search"
        :items-per-page="1500"
        class="elevation-1"
        loading-text="Loading... Please wait"
        no-data-text="No data"
        >
            <template v-slot:item.issued="{ item }">
                <v-simple-checkbox
                    v-model="item.issued"
                    disabled
                ><v-simple-checkbox>
            </template>
            <template v-slot:item.on_hand="{ item }">
                <v-simple-checkbox
                    v-model="item.on_hand"
                    disabled
                ><v-simple-checkbox>
            </template>
            <template v-slot:item.on_location="{ item }">
                <v-simple-checkbox
                    v-model="item.on_location"
                    disabled
                ><v-simple-checkbox>
            </template>
            <template v-slot:item.time_checked="{ item }">
                <v-chip
                    :color="getColor(item.time_checked)"
                    dark
                >
                    {{ formatDate(item.time_checked) }}
                </v-chip>
            </template>
        </v-data-table>
    </div>
    `,
    methods: {
        formatDate(value) {
            return moment(value).fromNow()
        },
        getColor(time) {
            var timeObj = moment(time);
            var now = moment();
            var duration = moment.duration(now.diff(timeObj, 'days'));
            if (duration > 30) return 'red'
            if (duration > 15) return 'yellow'
            else return 'green'
        }
    }
})
var app = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: function () {
        return {
            computers: [],
        }
    },
    mounted () {
        axios
        .get('http://localhost:8000/inventory/')
        .then(response => (this.computers = response.data))
        .catch(error => {
            console.log(error)
            this.errored = true
        })
        .finally(() => {
            this.loading = false;
        });
    },
})

Vue.prototype.moment = moment;
