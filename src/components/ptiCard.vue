<template>
        <v-card pb-3 class="indigo lighten-4" hover :to="`./device/${device.id}`">

            <v-card-title v-if="device.alarme.type && device.alarme.type !== 'lowBattery'" primary-title class="error">
                <div>
                <span class="headline">{{device.name}}</span><br>
                <span class="subheading">Alarme: {{device.alarme.type}}</span>
                </div>
            </v-card-title>

            <v-card-title v-else-if="device.alarme.type === 'lowBattery' " primary-title class="warning">
                <div>
                <span class="headline">{{device.name}}</span><br>
                <span class="subheading">Alarme: {{device.alarme.type}}</span>
                </div>
            </v-card-title>

            <v-card-title v-else-if="device.inCharge.status === false" primary-title class="green darken-2 white--text">
                <div>
                <span class="headline">{{device.name}}</span><br>
                <span class="subheading">En cours d'utilisation</span>
                </div>
            </v-card-title>

            <v-card-title v-else primary-title class="blue darken-2 white--text">
                <div>
                <span class="headline">{{device.name}}</span><br>
                <span class="subheading">Non utilisé</span>
                </div>
            </v-card-title>
            <v-card-text class="subheading">
                <div>Tel du bip: {{device.telBip}}</div>
                <v-divider></v-divider>
                <br>
                <div v-if="!device.user.name">Zone: {{device.useArea}}</div>
                <div v-else> Utilisateur:
                    <ul>
                        <li>nom: {{device.user.name}}</li>
                        <li>tel: {{device.user.tel}}</li>
                        <li>entreprise: {{device.user.company}}</li>
                        <li>zone d'utilisation: {{device.user.useArea}}</li>
                    </ul>
                </div>
            </v-card-text>
        </v-card>
</template>
<script>
    import {db} from '@/main.js'

    export default {
        props: ['device']
    }
</script>