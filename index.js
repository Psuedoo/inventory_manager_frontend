Vue.component('computer-table', {
    props: ['computers'],
    data: function () {
        return {
            dialog: false,
            dialogDelete: false,
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
            { text: 'Actions', value:'actions', sortable: 'false' }
        ],
        editedIndex: -1,
        editedItem: {
            make: '',
            model: '',
            service_tag: '',
            asset_tag: '',
            issued: false,
            assigned_to: '',
            on_hand: true,
            on_location: false,
            computer_location: '',
            class_location: '',
            checker: '',
            time_checked: '',
            notes: ''
        },
        defaultItem: {
            make: '',
            model: '',
            service_tag: '',
            asset_tag: '',
            issued: false,
            assigned_to: '',
            on_hand: true,
            on_location: false,
            computer_location: '',
            class_location: '',
            checker: '',
            time_checked: '',
            notes: ''
        }
        }},

        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'New Computer' : 'Edit Computer'
            }
        },

        watch: {
            dialog (val) {
                val || this.close()
            },
            dialogDelete (val) {
                val || this.closeDelete()
            }
        },

        methods: {
            initialize () {
                location.reload();
            },
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
            },
            editItem (item) {
                this.editedIndex = this.computers.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
                console.log(item.id);
            },
            deleteItem (item) {
                this.editedIndex = this.computers.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialogDelete = true
            },
            deleteItemConfirm () {
                this.computers.splice(this.editedIndex, 1)
                this.closeDelete()
            },
            close () {
                this.dialog = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
            },
            closeDelete () {
                this.dialogDelete = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
            },
            save () {
                if (this.editedIndex > -1) {
                    Object.assign(this.computers[this.editedIndex], this.editedItem)
                    this.updateComputerInDB(this.editedItem.id, this.editedItem);
                } else {
                    // this.computers.push(this.editedItem)
                    this.addComputerToDB(this.editedItem)
                }
                this.close()
            },
            addComputerToDB (computer) {
                axios
                .post('http://localhost:8000/inventory/add/', {
                    make: computer.make,
                    model: computer.model,
                    service_tag: computer.service_tag,
                    asset_tag: computer.asset_tag,
                    issued: computer.issued,
                    assigned_to: computer.assigned_to,
                    on_hand: computer.on_hand,
                    on_location:  computer.on_location,
                    computer_location: computer.computer_location,
                    class_location: computer.class_location,
                    checker: computer.checker,
                    notes: computer.notes
                }).then((res) => {
                    this.initialize();
                })
            },
            updateComputerInDB: function (computer_id, computer) {
                axios
                .put('http://localhost:8000/inventory/update/' + computer_id, {
                    make: computer.make,
                    model: computer.model,
                    service_tag: computer.service_tag,
                    asset_tag: computer.asset_tag,
                    issued: computer.issued,
                    assigned_to: computer.assigned_to,
                    on_hand: computer.on_hand,
                    on_location: computer.on_location,
                    computer_location: computer.computer_location,
                    class_location: computer.class_location,
                    checker: computer.checker,
                    notes: computer.notes
                })
                .then((res) => {
                    this.initialize();
                })
        },
    },

    template: `
    <div>
        <v-data-table
        :headers="this.headers"
        :items="this.computers"
        :items-per-page="1500"
        class="elevation-1"
        loading-text="Loading... Please wait"
        no-data-text="No data"
        >
            <template v-slot:top>
            <v-toolbar
            flat
            >
            <v-toolbar-title>Computers</v-toolbar-title>
            <v-divider
                class="mx-4"
                inset
                vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog
                v-model="dialog"
                max-width="500px"
            >
                <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                >
                    New Item
                </v-btn>
                </template>
                <v-card>
                <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>
    
                <v-card-text>
                    <v-container>
                    <v-row>
                        <v-col
                        cols="12"
                        sm="6"
                        md="4"
                        >
                        <v-text-field
                            v-model="editedItem.make"
                            label="Make"
                        ></v-text-field>
                        </v-col>
                        <v-col
                        cols="12"
                        sm="6"
                        md="4"
                        >
                        <v-text-field
                            v-model="editedItem.model"
                            label="Model"
                        ></v-text-field>
                        </v-col>
                        <v-col
                        cols="12"
                        sm="6"
                        md="4"
                        >
                        <v-text-field
                            v-model="editedItem.service_tag"
                            label="Service Tag"
                        ></v-text-field>
                        </v-col>
                        <v-col
                        cols="12"
                        sm="6"
                        md="4"
                        >
                        <v-text-field
                            v-model="editedItem.asset_tag"
                            label="Asset Tag"
                        ></v-text-field>
                        </v-col>
                        <v-col
                        cols="12"
                        sm="6"
                        md="4"
                        >
                        <v-checkbox
                            v-model="editedItem.issued"
                            label="Issued"
                        ></v-checkbox>
                        </v-col>
                        <v-col
                        cols="12"
                        sm="6"
                        md="4"
                        >
                        <v-text-field
                            v-model="editedItem.assigned_to"
                            label="Assigned To"
                        ></v-text-field>
                        </v-col>
                        <v-col
                        cols="12"
                        sm="6"
                        md="4"
                        >
                        <v-checkbox
                            v-model="editedItem.on_hand"
                            label="On Hand"
                        ></v-checkbox>
                        </v-col>
                        <v-col
                        cols="12"
                        sm="6"
                        md="4"
                        >
                        <v-checkbox
                            v-model="editedItem.on_location"
                            label="On Location"
                        ></v-checkbox>
                        </v-col>
                        <v-col
                        cols="12"
                        sm="6"
                        md="4"
                        >
                        <v-text-field
                            v-model="editedItem.computer_location"
                            label="Location"
                        ></v-text-field>
                        </v-col>
                        <v-col
                        cols="12"
                        sm="6"
                        md="4"
                        >
                        <v-text-field
                            v-model="editedItem.class_location"
                            label="Class Location"
                        ></v-text-field>
                        </v-col>
                        <v-col
                        cols="12"
                        sm="6"
                        md="4"
                        >
                        <v-text-field
                            v-model="editedItem.checker"
                            label="Checker"
                        ></v-text-field>
                        </v-col>
                        <v-col
                        cols="12"
                        sm="6"
                        md="4"
                        >
                        <v-text-field
                            v-model="editedItem.notes"
                            label="Notes"
                        ></v-text-field>
                        </v-col>
                    </v-row>
                    </v-container>
                </v-card-text>
    
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                    color="blue darken-1"
                    text
                    @click="close"
                    >
                    Cancel
                    </v-btn>
                    <v-btn
                    color="blue darken-1"
                    text
                    @click="save"
                    >
                    Save
                    </v-btn>
                </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">Yes</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
                </v-card>

            </v-dialog>
            </v-toolbar>
        </template>

            <template v-slot:item.actions="{ item }">
                <v-icon
                    small
                    class="mr-2"
                    @click="editItem(item)"
                >
                    mdi-pencil
                </v-icon>
                <v-icon
                    small
                    @click="deleteItem(item)"
                >
                    mdi-delete
                </v-icon>
                </template>
            </template>

            <template v-slot:item.issued="{ item }">
                <v-simple-checkbox
                    v-model="item.issued"
                    disabled
                ></v-simple-checkbox>
            </template>
            <template v-slot:item.on_hand="{ item }">
                <v-simple-checkbox
                    v-model="item.on_hand"
                    disabled
                ></v-simple-checkbox>
            </template>
            <template v-slot:item.on_location="{ item }">
                <v-simple-checkbox
                    v-model="item.on_location"
                    disabled
                ></v-simple-checkbox>
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
