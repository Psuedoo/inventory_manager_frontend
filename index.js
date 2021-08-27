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
        :items-per-page="50"
        class="elevation-1"
        loading-text="Loading... Please wait"
        no-data-text="No data"
        >
        </v-data-table>
    </div>
    `
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
