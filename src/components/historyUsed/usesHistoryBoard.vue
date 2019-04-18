<template>
  <v-container grid-list-md text-xs-center>
  
    <v-layout row wrap>
      <v-flex xs3>
        <v-select :items="items" label="Nom du Bip" v-model="bipName"></v-select>
      </v-flex>
      <v-flex xs3>
        <v-menu v-model="menu1" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
          <v-text-field slot="activator" v-model="dateBegin" label="Date de Début" prepend-icon="event" readonly></v-text-field>
          <v-date-picker v-model="dateBegin" @input="menu1 = false" locale="fr"></v-date-picker>
        </v-menu>
      </v-flex>
      <v-flex xs3>
        <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
          <v-text-field slot="activator" v-model="dateEnd" label="Date de Fin" prepend-icon="event" readonly></v-text-field>
          <v-date-picker v-model="dateEnd" @input="menu2 = false" locale="fr"></v-date-picker>
        </v-menu>
      </v-flex>
      <v-flex xs3>
        <v-btn v-on:click="getDatas()" color="blue-grey" class="white--text" :disabled="!bipName">
          Rechercher
          <v-icon right dark disabled>search</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout v-if="datas" row wrap>
      <v-flex xs12>
        <usesTable :datas="datas" />
      </v-flex>
  
    </v-layout>
<!--      <v-layout v-if="datas" row wrap>
      <v-flex xs6>
        <donutGraph :chartData="chartTypeOfAlarmData" class="graph" />
      </v-flex>
      <v-flex xs6>
        <donutGraph :chartData="chartUseAreaData" class="graph" />
      </v-flex>
  
    </v-layout> -->
  </v-container>
</template>

<script>
  import {db} from '@/main.js'
  import usesTable from './useDatasTable.vue'
  //import donutGraph from './donutGraph.vue'
  
  function getDuree(t) {
    t = t / 1000
    const s = t % 60
    const seconds = s < 10 ? "0" + s : s
    const m = ((t - s) % 3600) / 60
    const minutes = m < 10 ? "0" + m : m
    const h = (t - m * 60 - s) % (3600 * 24) / 3600
    const heures = h < 10 ? "0" + h : h
    const j = (t - h * 3600 - m * 60 - s) / (3600 * 24)
    if (j == 0) {
      return `${heures}:${minutes}:${seconds}`
    } else {
      return `${j} jour(s) et ${heures}:${minutes}:${seconds}`
    }
  }
  
  export default {
    components: {
      usesTable,
      //donutGraph
    },
    data() {
      return {
        dateBegin: new Date().toISOString().substr(0, 10),
        dateEnd: new Date().toISOString().substr(0, 10),
        menu1: false,
        menu2: false,
        isActive: false,
        bipName: null,
        datas: null,
        //nbAlarmByType: [],
        //typeOfAlarmLabels: [],
        //nbAlarmByUseArea: [1],
        //useAreaLabels: [1]
  
      }
    },
    methods: {
      getDatas() {
        console.log("debut de téléchargement des données")
  
        db.collection('Utilisations')
          .where('date', '>', new Date(this.dateBegin))
          .where('date', '<=', new Date(this.dateEnd.concat(' 23:59:59')))
          .get()
          .then((querySnapshot) => {
            this.datas = querySnapshot.docs.map(data => data.data())
            if (this.bipName != 'Tous') {
              this.datas = this.datas.filter(data => data.bipName == this.bipName)
            }
          })
      },
      /*sumByLabel(dataProprity, sum, labels) {
        let sumObject = this.datas.reduce((stat, data) => {
          stat[data[dataProprity]] ? stat[data[dataProprity]] += 1 : stat[data[dataProprity]] = 1;
          return stat
        }, {})
        this[sum] = []
        this[labels] = []
        for (var label in sumObject) {
          this[sum].push(sumObject[label])
          this[labels].push(label)
        }
  
      },
      chartData(data, labels) {
        return {
          datasets: [{
            data: data,
            backgroundColor: [
              '#9d44b5',
              '#b5446e',
              '#00D8FF',
              '#DD1B16'
            ]
          }],
          labels: labels
  
        }
      }*/
  
    },
    computed: {
      devices() {
        return this.$store.getters.getDevices
      },
      items() {
        let devicesName = ['Tous']
        this.devices.forEach(element => {
          devicesName.push(element.name)
        })
        return devicesName;
      },
      datasByDevice(){
        return this.datas
        .reduce((datas, doc) => {
          const EIMI = doc.EIMI
          const deviceIndex = datas.map(deviceObject => deviceObject.device).indexOf(EIMI)
          if (deviceIndex == -1) {
            const newDevice = {
              device: EIMI,
              bipName: doc.bipName,
              useDatas: [{
                date: doc.date,
                duree: doc.duree,
                time: doc.time
              }],
              useResume: ""
            }
            datas.push(newDevice)
          } else {
            datas[deviceIndex].useDatas.push({
              date: doc.date,
              duree: doc.duree,
              time: doc.time
            })
          }
          return datas
        }, [])
  
        .forEach(device => {
          const useDatas = device.useDatas
          const sumUseTime = useDatas.reduce(((sumTime, data) => sumTime + data.time), 0);
          const firstDate = new Date(this.dateBegin)
          const lastDate = new Date(this.dateEnd.concat(' 23:59:59'))
          const sumTime = lastDate - firstDate;
          const purcentUse = Math.round(sumUseTime * 100 / sumTime)
  
          device.useResume = {
            useTime: getDuree(sumUseTime),
            purcentUse: purcentUse
          }
        }) 
      }
      ,
      chartTypeOfAlarmData() {
        return this.chartData(this.nbAlarmByType, this.typeOfAlarmLabels)
      },
      chartUseAreaData() {
        return this.chartData(this.nbAlarmByUseArea, this.useAreaLabels)
      }
  
  
    }
  
  }
</script>

<style>
  .graph {
    margin-top: 100px
  }
</style>
