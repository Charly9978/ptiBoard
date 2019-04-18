<template>
        <v-card pb-3 class="indigo lighten-4" hover :to="`./device/${device.id}`">

            <v-card-title v-if="device.lostConnection" primary-title class="error">
                <div>
                <span class="headline">{{device.name}}</span><br>
                <span class="subheading">Perte de connection depuis {{device.lastConnectionDate.toLocaleString()}}</span>
                </div>
            </v-card-title>

            <v-card-title v-else-if="device.alarme.type && device.alarme.type !== 'lowBattery'" primary-title class="error">
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
import {db} from "@/main.js";

    export default {
        props: ['device'],

        data(){
            return{
             checkTime: 1000*60*15,
             checkData:null
            }

        },

        methods:{
            checkDateLastConnection(){
                this.checkData = setInterval(()=>{
                const date = new Date;
                const now = date.getTime();

                if(this.device.lastConnectionDate.getTime()+this.checkTime<now && this.device.lostConnection===false){
                    this.$store.commit("setAlarmeOn");
                    db.collection('Devices').doc(this.device.id).update({
                        lostConnection: true
                    })
                    .then(() => {
                        console.log(`enregistrement perte connection pour le bip ${this.device.id}`);
                    })
                    .catch(() => console.error(`échec de l'enregistrement de perte de connection pour le bip ${this.device.id}`))

                }

                },1000*60*2)
                

            }
        }
            ,
          mounted(){
              this.checkDateLastConnection();
            },
            beforeDestroy () {
	            clearInterval(this.checkData)
            },


        
    }
</script>