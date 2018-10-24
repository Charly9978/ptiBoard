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
      
            <!-- <dashboard v-for="(data, index) in datas" 
          :key="index" v-bind:datapti="data"/> -->
          <pti/>

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
import pti from './components/pti.vue'

  export default {
    components:{
      dashboard,pti
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
