<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <v-list-tile @click="coucou">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Contact</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Tableau de bord Bips PTI</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex v-for="(data, index) in datas" 
          :key="index" 
          ma-3 xs6 md2 lm2 xl2>
            <dashboard v-bind:datapti="data"/>
          </v-flex>
       </v-layout>
       <mappti/>

      </v-container>
  
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>



import dashboard from './components/dashbord.vue'
import { db } from './main'
import mappti from './components/mapPTI.vue'

  export default {
    components:{
      dashboard,mappti
    },
    created:function(){
      db.collection("Devices").onSnapshot((querySnapshot) => {
        this.datas = []
      querySnapshot.forEach((doc) => {
        const data={id:doc.id,telBip:doc.data().telBip,useArea:doc.data().useArea,alarme:doc.data().alarme,inCharge:doc.data().inCharge};
        console.log(data)
        this.datas.push(data);
        })
    });
      },    
    data(){
      return{
        drawer: false,
        datas:[],
        newAlarm:{}
      } 
      },
    methods:{
      coucou () {
        this.drawer = !this.drawer;
      } 

    }  
      }

</script>

<style>
</style>
