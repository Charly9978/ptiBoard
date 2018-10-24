<template>
        <v-flex ma-3 xs6 md2 lm2 xl2>
        <v-card pb-3 class="indigo lighten-4" hover>
            <v-card-title v-if="datapti.alarme.type && datapti.alarme.type !== 'lowBattery'" primary-title class="red darken-2 white--text">
                <div class="headline">Alarme:</div>
                <span>type: {{datapti.alarme.type}}</span>
                <v-icon
                    medium
                    @click="initAlarme"
                >
                    alarme
                </v-icon>
            </v-card-title>
            <v-card-title v-else-if="datapti.alarme.type === 'lowBattery' " primary-title class="orange darken-2 white--text">
                <div class="headline">Alarme:</div>
                <span>type: {{datapti.alarme.type}}</span>
            </v-card-title>
            <v-card-title v-else-if="datapti.inCharge.status === false" primary-title class="green darken-2 white--text">
                <div class="headline">En cours d'utilisation</div>
            </v-card-title>
            <v-card-title v-else primary-title class="blue darken-2 white--text">
                <div class="headline">Non utilisé</div>
            </v-card-title>
            <v-card-text class="subheading">
                <div>Tel du bip: {{datapti.telBip}}</div>
                <v-divider></v-divider>
                <br>
                <div>Zone: {{datapti.useArea}}</div>
                <v-divider></v-divider>
                <br>
                <div>{{datapti.alarme.type}}</div>
                <div>Utilisateur:
                    <ul>
                        <li>nom</li>
                        <li>tel:</li>
                        <li>entreprise</li>
                    </ul>
                </div>
            </v-card-text>
        </v-card>
        </v-flex>


</template>
<script>
    import {db} from '@/main.js'

    export default {
        props: ['datapti'],
        data() {
            return {

            }
        },
        methods:{
            initAlarme(){
                this.datapti.alarme =[];
                db.collection('Devices').doc(this.datapti.id).update({
                    alarme:{}
                }).then(()=>console.log('mise à jour réussi')).catch((err=>console.error('mise à jour non réussi')))
            }
        }

    }
</script>