<template>

  <v-app id="inspire">
    <audio autoplay loop v-if="$store.getters.getAlarme">
  <source src="@/assets/9248.ogg" type="audio/ogg">
  Votre navigateur ne prend pas en charge l'élément <code>audio</code>.
</audio>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <v-list-tile @click="goHome">
          <v-list-tile-action >
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
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



  export default {
    created(){
       this.$store.dispatch('getAllDevices')
       },    
    data(){
      return{
        drawer: false,
      } 
      },
  computed:{
    alarmeOn(){
      return this.$store.getters.getAlarme
    }
  },
    methods:{
      goHome () {
        this.drawer = !this.drawer;
        this.$router.push('/')
      } 

    }  
      }

</script>

<style>
</style>
