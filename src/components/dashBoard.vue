<template>


      <v-layout row>
  
        <v-flex ma-3 xs6 md2 lm2 xl2 v-if="devices" v-for="(device, index) in devices" :key="index">
            <pticard v-bind:device="device"/>
        </v-flex>

      </v-layout>
  
    
</template>


<script>
import pticard from './ptiCard.vue'
import {mapState} from 'vuex'

export default{
  components:{
    pticard
  },
  data(){
    return {
      mess: 'coucou'
    }
  },
  computed:{
    devices(){
    return this.$store.state.devices.all
    }
  }

}    
</script>