Vue.component('login-form', {
    props: ['token'],
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
            username: '',
            password: '',
            
        }
    },
    methods: {
        login: function () {
            var config = {
                method: 'post',
                url: 'http://localhost:8000/login',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                // auth: {
                //     username: this.username,
                //     password: this.password,
                // },
                data: `username=${this.username}&password=${this.password}`
            }
            // const {username, password} = Object.fromEntries(new formData(event.target));
            // this.username = username
            console.log('USERNAME', this.username);
            // this.password = password
            console.log('PASSWORD', this.password);
            axios(config)
            .then(response => (this.token = response.access_token))
        }
    },
    template:`
    <div>
        <template>
            <v-form ref="form" v-model="valid" @submit.prevent="login" id="loginForm">
                <v-container>
                    <v-row>
                        <v-col
                        cols="12"
                        md="4"
                        >
                            <v-text-field
                            label="Username"
                            :rules="usernameRules"
                            v-model="username"
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
                            v-model="password"
                            required
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-btn
                            type="submit"
                            class="mr-4"
                            form="loginForm"
                            >
                                login
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
        </template>
    </div>
    `
})

var app = new Vue({
    el: '#login',
    vuetify: new Vuetify(),
    token: '',
})