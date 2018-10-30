
import {db} from '@/main.js'

// initial state
const state = {
  all: [],
  alarme:false
}

// getters
const getters = {
    getDeviceById:(state)=>(id)=>{
       return state.all.find(device=>device.id ===id)
    },
    getAlarme:(state)=>{
      return state.alarme
    }
}

// actions
const actions = {
  getAllDevices ({ commit }) {
    db.collection("Devices").onSnapshot((querySnapshot) => {
        const datas = []
      querySnapshot.forEach((doc) => {
        const data={
          id:doc.id,
          name:doc.data().name,
          telBip:doc.data().telBip,
          useArea:doc.data().useArea,
          alarme:doc.data().alarme,
          inCharge:doc.data().inCharge,
          levelBattery:doc.data().levelBattery,
          user:doc.data().user
        };
        console.log(data)
        console.log(data.name)
        console.log(data.alarme.type)
        datas.push(data);
        if(data.alarme.type){
          commit('setAlarmeOn')
        }
        commit('setDevices', datas)
        
        })
    })

  }
}

// mutations
const mutations = {
  setDevices (state, datas) {
    state.all = datas
  },
  setAlarmeOn(state) {
    state.alarme = true
  },
  setAlarmeOff(state){
    state.alarme = false
  }

}

export default {
  //namespaced: true,
  state,
  getters,
  actions,
  mutations
}