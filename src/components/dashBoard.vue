<template>


      <v-layout row v-if="devices">
  
        <v-flex ma-3 xs6 md2 lm2 xl2  v-for="(device, index) in devices" :key="index">
            <pticard v-bind:device="device"/>
        </v-flex>

      </v-layout>
  
    
</template>


<script>

import pticard from './ptiCard.vue'

export default{
  components:{
    pticard
  },
  computed:{
    devices(){
    return this.$store.getters.getDevices
    }
  }

}    
</script>