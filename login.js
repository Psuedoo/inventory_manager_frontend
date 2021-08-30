Vue.component('login-form', {
    data: function () {
        return {
            valid: false,
            usernameRules: [
                v => !!v || 'Username is required',
                v => v.length <= 15 || 'Username must be less than 15 characters',
            ],
            passwordRules: [
                v => !!v || 'Password is required'
            ],
        }
    },
    methods: {
        login () {
            console.log('LOGIN');
        }
    },
    template:`
    <div>
        <template>
            <v-form v-model="valid">
                <v-container>
                    <v-row>
                        <v-col
                        cols="12"
                        md="4"
                        >
                            <v-text-field
                            label="Username"
                            :rules="usernameRules"
                            required
                            ></v-text-field>
                        </v-col>
                        <v-col
                        cols="12"
                        md="4"
                        >
                            <v-text-field
                            label="Password"
                            :rules="passwordRules"
                            required
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-btn
                            class="mr-4"
                            @click="login"
                            >
                                login
                            </v-btn>
                        </v-col>
                    <v-row>
                </v-container>
            </v-form>
        </template>
    </div>
    `
})

var app = new Vue({
    el: '#login',
    vuetify: new Vuetify(),
})