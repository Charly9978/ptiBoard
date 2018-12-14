
import {db} from '@/main.js'

// initial state
const state = {
  all: [],
  alarme:false,
}

// getters
const getters = {
    getDeviceById:(state)=>(id)=>{
       return state.all.find(device=>device.id ===id)
    },
    getAlarme:(state)=>{
      return state.alarme
    },
    getDevices:(state)=>{
      return state.all

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
          lastConnectionDate:doc.data().lastConnectionDate,
          inCharge:doc.data().inCharge,
          levelBattery:doc.data().levelBattery,
          user:doc.data().user,
          lostConnection:doc.data().lostConnection
        
        };
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
  },
  setLostConnection(state,id){
    const device = state.all.find(device=>device.id === id);
    device.lostConnection = true
  },
  setGetConnection(state,id){
    const device = state.all.find(device=>device.id === id);
    device.lostConnection = false
  }

}

export default {
  state,
  getters,
  actions,
  mutations
}