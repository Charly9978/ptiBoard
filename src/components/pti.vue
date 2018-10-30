<template>
    <div>
        <v-layout row>
            <v-flex xs12 md7 lm7 xl7>
                <mappti v-bind:nbr='selected' v-bind:id="id" />
            </v-flex>


            <v-flex xs12 md5 lm5 xl5>
                <v-layout column>


                    <v-card class="my-3" v-show="device.alarme.type">
                        <v-toolbar color="error">
                            <v-icon>warning</v-icon>
                            <v-toolbar-title>Alarme:</v-toolbar-title>
                            <span>{{device.alarme.type}}</span>
                            <v-spacer></v-spacer>
                            <v-btn @click="alarmeBellOff" icon>
                                <v-icon>notifications_off</v-icon>
                            </v-btn>
                            <v-btn @click="dialogConfirm=true" icon>
                                <v-icon>cancel</v-icon>
                            </v-btn>
                        </v-toolbar>
                    </v-card>








                    <v-card class="my-3">
                        <v-toolbar color="cyan" dark>
                            <v-toolbar-title>Information sur le bip "{{device.name}}"</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-toolbar-tile-action>
                                <v-btn v-on:click="openDialogue" icon ripple>
                                    <v-icon>person_add</v-icon>
                                </v-btn>
                            </v-toolbar-tile-action>
                        </v-toolbar>
                        <v-list>
                            <v-list-tile>
                                <v-list-tile-content>
                                    <v-list-tile-title>Téléphone du bip</v-list-tile-title>
                                    <v-list-tile-sub-title>{{device.telBip}}</v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>

                            <v-list-tile v-if="!device.user.name">
                                <v-list-tile-content>
                                    <v-list-tile-title>Zone d'utilisation</v-list-tile-title>
                                    <v-list-tile-sub-title>{{device.useArea}}</v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>

                            <v-list-group v-else>
                                <v-list-tile slot="activator">
                                    <v-list-tile-content>
                                        <v-list-tile-title>Utilisateur</v-list-tile-title>
                                        <v-list-tile-sub-title>{{device.user.name}}</v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                                <v-list-tile>
                                    <v-list-tile-content>
                                        <v-list-tile-title>Entreprise</v-list-tile-title>
                                        <v-list-tile-sub-title>{{device.user.company}}</v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                                <v-list-tile>
                                    <v-list-tile-content>
                                        <v-list-tile-title>Zone d'utilisation</v-list-tile-title>
                                        <v-list-tile-sub-title>{{device.user.useArea}}</v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                                <v-list-tile>
                                    <v-list-tile-content>
                                        <v-list-tile-title>Téléphone</v-list-tile-title>
                                        <v-list-tile-sub-title>{{device.user.tel}}</v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                                <v-list-tile>
                                    <v-list-tile-content>
                                        <v-list-tile-title>Date de début d'utilistion</v-list-tile-title>
                                        <v-list-tile-sub-title>coucoubis</v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </v-list-tile>


                            </v-list-group>

                            <v-list-tile>
                                <v-list-tile-content>
                                    <v-list-tile-title>Situation</v-list-tile-title>
                                    <v-list-tile-sub-title>{{device.inCharge.status?'En cours de charge':`En cours d'utilisation`}}</v-list-tile-sub-title>
                                    <v-spacer></v-spacer>
                                    <v-list-tile-sub-title>{{device.levelBattery}}%</v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                    </v-card>

                    <v-card class="my-3">

                        <v-toolbar color="cyan" dark>
                            <v-toolbar-title>Historique des positions</v-toolbar-title>
                        </v-toolbar>
                        <v-list>
                            <v-list-tile>
                                <v-select v-model="selected" :items="nbrs" placeholder="nombre de positions" full-width></v-select>
                            </v-list-tile>
                        </v-list>
                    </v-card>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-layout row justify-center>
            <v-dialog v-model="dialog" persistent max-width="500px">
                <v-card>
                    <v-card-title>
                        <span class="headline">Ajouter un utilisateur du bip</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12>
                                    <v-text-field v-model="newUser.name" label="Nom" required></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field v-model="newUser.company" label="Entreprise"></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field v-model="newUser.tel" label="Téléphone"></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field v-model="newUser.useArea" label="Zone d'utilisation" hint="BerninX, bat X, NivX, precision"></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click.native="dialog = false">Annuler</v-btn>
                        <v-btn color="blue darken-1" flat @click.native="sendNewUser">Enregistrer</v-btn>
                        <v-btn color="blue darken-1" flat @click.native="clearUser">Effacer</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>


        <v-layout row justify-center>
            <v-dialog v-model="dialogConfirm" persistent max-width="350">
                <v-card>
                    <v-card-title class="headline">Etes-vous sur de vouloir acquitter cette alarme?</v-card-title>
                    <v-card-text>Attention, l'acquittement est définitif, l'information d'une alarme en cours sur ce
                        bip sera effacée</v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn flat @click.native="dialogConfirm = false">Non</v-btn>
                        <v-btn flat @click.native="alarmeOff">Oui</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
    </div>
</template>

<script>
    import mappti from "@/components/mapPTI.vue";
    import {
        db
    } from "@/main.js";

    export default {
        components: {
            mappti
        },
        data() {
            return {
                selected: 1,
                nbrs: [1, 10, 20],
                alarm: "true",
                newUser: {
                    name: null,
                    company: null,
                    useArea: null,
                    tel: null
                },
                id: this.$route.params.id,
                dialog: false,
                dialogConfirm: false
            }

        },
        methods: {
            openDialogue() {
                this.newUser.name = this.device.user.name;
                this.newUser.company = this.device.user.company;
                this.newUser.tel = this.device.user.tel;
                this.newUser.useArea = this.device.user.useArea;
                this.dialog = true;
            },
            sendNewUser() {
                db.collection('Devices').doc(this.id).update({
                        user: this.newUser
                    })
                    .then(() => {
                        console.log(`Nouvel User enregistrer pour le bip ${this.id}`);
                        this.dialog = false
                    })
                    .catch(() => console.error(`echec d'enregistrement du nouvel utilisateur pour le bip ${this.id}`))
            },
            clearUser() {
                this.newUser.name = null;
                this.newUser.company = null;
                this.newUser.tel = null;
                this.newUser.useArea = null;
                db.collection('Devices').doc(this.id).update({
                        user: this.newUser
                    })
                    .then(() => {
                        console.log(`User effacé pour le bip ${this.id}`);
                        this.dialog = false
                    })
                    .catch(() => console.error(`echec d'enregistrement du nouvel utilisateur pour le bip ${this.id}`))

            },
            alarmeOff() {
                db.collection('Devices').doc(this.id).update({
                        'alarme.date': null,
                        'alarme.type': null
                    })
                    .then(() => {
                        console.log(`Alarme effacée pour le bip ${this.id}`);
                        this.dialogConfirm = false
                    })
                    .catch(() => {
                        console.error(`echec de l'effacement de l'alarme pour le bip ${this.id}`)
                        this.dialogConfirm = false
                    })
            },
            alarmeBellOff(){
                this.$store.commit('setAlarmeOff')
            }
        },
        computed: {
            device() {
                return this.$store.getters.getDeviceById(this.id)
            }
        }

    };
</script>