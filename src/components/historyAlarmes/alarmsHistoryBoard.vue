<template>
<v-container grid-list-md text-xs-center>
  
    <v-layout row wrap>
      <v-flex xs3 >
          <v-select
          :items="items"
          label="Nom du Bip"
          v-model="bipName"
        ></v-select>
      </v-flex>
      <v-flex xs3 >
          <v-menu
        v-model="menu1"
        :close-on-content-click="false"
        :nudge-right="40"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <v-text-field
          slot="activator"
          v-model="dateBegin"
          label="Date de Début"
          prepend-icon="event"
          readonly
        ></v-text-field>
        <v-date-picker v-model="dateBegin" @input="menu1 = false" locale="fr"></v-date-picker>
      </v-menu>
      </v-flex>
      <v-flex xs3 >
       <v-menu
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <v-text-field
          slot="activator"
          v-model="dateEnd"
          label="Date de Fin"
          prepend-icon="event"
          readonly
        ></v-text-field>
        <v-date-picker v-model="dateEnd" @input="menu2 = false" locale="fr"></v-date-picker>
      </v-menu>
      </v-flex>
      <v-flex xs3>
          <v-btn
      v-on:click="getDatas()"
      color="blue-grey"
      class="white--text"
      :disabled="!bipName"
          >
      Rechercher
      <v-icon right dark disabled>search</v-icon>
    </v-btn>
      </v-flex>
    </v-layout>
    <v-layout v-if="datas" row wrap>
      <v-flex xs12>
        <alarmsTable :datas="datas"/>
      </v-flex>
      
    </v-layout>
        <v-layout v-if="datas" row wrap>
      <v-flex xs6>
        <donutGraph 
        :chartData="chartTypeOfAlarmData"
        class="graph"
        />
      </v-flex>
      <v-flex xs6>
        <donutGraph 
        :chartData="chartUseAreaData"
        class="graph"
        />
      </v-flex>
      
    </v-layout>
</v-container>

    
</template>
<script>
import {db} from '@/main.js'
import alarmsTable from './alarmsDatasTable.vue'
import donutGraph from './donutGraph.vue'
import sumByLabel from './historyAlarmsFunctions.js'

export default {
    components:{
      alarmsTable,
      donutGraph
    },
    data(){
        return {
            dateBegin: new Date().toISOString().substr(0, 10),
            dateEnd : new Date().toISOString().substr(0, 10),
            menu1:false,
            menu2: false,
            isActive:false,
            bipName:null,
            datas:null,
            nbAlarmByType:[],
            typeOfAlarmLabels:[],
            nbAlarmByUseArea:[1],
            useAreaLabels:[1]

        }
    },
    methods:{
      getDatas(){
        console.log("debut de téléchargement des données")

        db.collection('Alarms')
        .where('date','>',new Date(this.dateBegin))
        .where('date','<=',new Date(this.dateEnd.concat(' 23:59:59')))
        .get()
        .then((querySnapshot)=>{
          this.datas = []
          querySnapshot.forEach((doc)=>{
            let data = doc.data()
            data.alarme = data.alarme.join()
            this.datas.push(data)
          })
          if (this.bipName!='Tous'){
            this.datas = this.datas.filter(data=>
              data.bipName == this.bipName
            )
          }
          //compter le nombre d'alarme par type d'alarme
         sumByLabel('alarme','nbAlarmByType','typeOfAlarmLabels')

          //compter le nombre d'alarme par zone de rattachement
        sumByLabel('useArea','nbAlarmByUseArea','useAreaLabels')
        })
      },
      chartData(data,labels){
       return {
            datasets: [{
                data: data,
                backgroundColor: [
                  '#9d44b5',
                  '#b5446e',
                  '#00D8FF',
                  '#DD1B16']
                    }],
                labels: labels
      
              }
      }

    },
    computed:{
    devices(){
    return this.$store.getters.getDevices
    },
    items(){
        let devicesName=['Tous']
         this.devices.forEach(element => {
             devicesName.push(element.name)
         })
         return devicesName;
    },
    chartTypeOfAlarmData(){
      return this.chartData(this.nbAlarmByType,this.typeOfAlarmLabels)
    },
    chartUseAreaData(){
      return this.chartData(this.nbAlarmByUseArea,this.useAreaLabels)
    }

    
    }
    
}
</script>
<style>
.graph{
  margin-top: 100px
}

</style>
