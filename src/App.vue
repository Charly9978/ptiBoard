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
      
          <router-view></router-view>

      </v-container>
  
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>



import { mapState, mapActions } from 'vuex'

  export default {
    created(){
       this.$store.dispatch('getAllDevices')//devices/
       },    
    data(){
      return{
        drawer: false,
        //datas:[],
        //newAlarm:{}
      } 
      },
  //   computed: mapState({
  //   devices: state => state.all //devices.
  // }),
    methods:{
      coucou () {
        this.drawer = !this.drawer;
      } 

    }  
      }

</script>

<style>
</style>
