<template>
    <div>
        <v-layout row>
            <v-flex xs12 md7 lm7 xl7>
                <mappti v-bind:nbr='selected'/>
            </v-flex>
            <v-flex xs12 md5 lm5 xl5>
                <v-layout column>
                    <v-card class="my-3">

                        <v-alert
                        v-model="alarm"
                        dismissible
                        type="error"
                        >
                        Alarme PTI: fallDown.
                        </v-alert>
                        <v-toolbar color="cyan" dark>
                            <v-toolbar-title>Historique des positions</v-toolbar-title>
                        </v-toolbar>
                        <v-list>
                        <v-list-tile>
                                <v-select
                                    v-model = "selected"
                                    :items="nbrs"
                                    placeholder="nombre de positions"
                                    full-width                                 
                                ></v-select>
                        </v-list-tile>
                        </v-list>
                    </v-card>
                    <v-card class="my-3">
                        <v-toolbar color="cyan" dark>
                            <v-toolbar-title>Information sur le BIP nomdubip</v-toolbar-title>
                        </v-toolbar>
                        <v-list>
                        <v-list-tile>
                            <v-list-tile-content>
                            <v-list-tile-title>Téléphone du Bip</v-list-tile-title>
                            <v-list-tile-sub-title>coucoubis</v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>

                        <v-list-tile>
                            <v-list-tile-content>
                            <v-list-tile-title>Zone d'utilisation</v-list-tile-title>
                            <v-list-tile-sub-title>coucoubis</v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>

                        <v-list-group >
                            <v-list-tile slot="activator">
                                <v-list-tile-content>
                                    <v-list-tile-title>Utilisateur</v-list-tile-title>
                                    <v-list-tile-sub-title>coucoubis</v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile>
                                <v-list-tile-content>
                                    <v-list-tile-title>Entreprise</v-list-tile-title>
                                    <v-list-tile-sub-title>coucoubis</v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile>
                                <v-list-tile-content>
                                    <v-list-tile-title>Zone d'utilisation</v-list-tile-title>
                                    <v-list-tile-sub-title>coucoubis</v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile>
                                <v-list-tile-content>
                                    <v-list-tile-title>Téléphone</v-list-tile-title>
                                    <v-list-tile-sub-title>coucoubis</v-list-tile-sub-title>
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
                            <v-list-tile-title>En cours de charge</v-list-tile-title>
                            <v-list-tile-sub-title>coucoubis</v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        </v-list>


                            
                    </v-card>
                </v-layout>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import mappti from "@/components/mapPTI.vue";
import {db} from "@/main.js";

export default {
  components: {
    mappti
  },
  data(){
      return{
          selected:1,
          nbrs:[1,10,20],
          alarm:"true",
          data:[]
      }

  },
  created(){
      db.collection('Devices').doc(EIMI).get().then()
  }
};
</script>