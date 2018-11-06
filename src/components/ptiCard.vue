<template>
        <v-card pb-3 class="indigo lighten-4" hover :to="`./device/${device.id}`">
            <v-card-title v-if="device.alarme.type && device.alarme.type !== 'lowBattery'" primary-title class="red darken-2 white--text">
                <div class="headline">Alarme:</div>
                <span>type: {{device.alarme.type}}</span>
                <v-icon medium>
                    alarme
                </v-icon>
            </v-card-title>
            <v-card-title v-else-if="device.alarme.type === 'lowBattery' " primary-title class="orange darken-2 white--text">
                <div class="headline">Alarme:</div>
                <span>type: {{device.alarme.type}}</span>
            </v-card-title>
            <v-card-title v-else-if="device.inCharge.status === false" primary-title class="green darken-2 white--text">
                <div class="headline">En cours d'utilisation</div>
            </v-card-title>
            <v-card-title v-else primary-title class="blue darken-2 white--text">
                <div class="headline">Non utilisé</div>
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