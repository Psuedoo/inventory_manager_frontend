Vue.component('computer-table', {
    data: function () {
        return {
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
            computers: [
                {
                    make: 'Dell',
                    model: 'Latitude 1',
                    service_tag: '1',
                    asset_tag: '124654',
                    issued: false,
                    assigned_to: 'Unassigned',
                    on_hand: true,
                    on_location: !this.on_hand,
                    computer_location: 'Storage',
                    checker: 'Tracy',
                    time_checked: '10:00 PM',
                    notes: '',
                },
                {
                    make: 'Dell',
                    model: 'Latitude 2',
                    service_tag: '2',
                    asset_tag: '124654',
                    issued: false,
                    assigned_to: 'Unassigned',
                    on_hand: true,
                    on_location: !this.on_hand,
                    computer_location: 'Storage',
                    checker: 'Tracy',
                    time_checked: '10:00 PM',
                    notes: '',
                },
                {
                    make: 'Dell',
                    model: 'Latitude 3',
                    service_tag: '3',
                    asset_tag: '124654',
                    issued: false,
                    assigned_to: 'Unassigned',
                    on_hand: true,
                    on_location: !this.on_hand,
                    computer_location: 'Storage',
                    checker: 'Tracy',
                    time_checked: '10:00 PM',
                    notes: '',
                },
                {
                    make: 'Dell',
                    model: 'Latitude 4',
                    service_tag: '4',
                    asset_tag: '124654',
                    issued: false,
                    assigned_to: 'Unassigned',
                    on_hand: true,
                    on_location: !this.on_hand,
                    computer_location: 'Storage',
                    checker: 'Tracy',
                    time_checked: '10:00 PM',
                    notes: '',
                },
            ],
        }
    },
    template: `
    <v-data-table
    :headers="this.headers"
    :items="this.computers"
    class="elevation-1"
    ></v-data-table>
    `
})
var app = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
})
