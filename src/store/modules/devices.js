
import {db} from '@/main.js'

// initial state
const state = {
  all: []
}

// getters
const getters = {
    getDeviceById:(state)=>(id)=>{
       return state.all.find(device=>device.id ===id)
    }
}

// actions
const actions = {
  getAllDevices ({ commit }) {
    db.collection("Devices").onSnapshot((querySnapshot) => {
        const datas = []
      querySnapshot.forEach((doc) => {
        const data={id:doc.id,name:doc.data().name,telBip:doc.data().telBip,useArea:doc.data().useArea,alarme:doc.data().alarme,inCharge:doc.data().inCharge,user:doc.data().user};
        console.log(data)
        datas.push(data);
        })
        commit('setDevices', datas)
    })

  }
}

// mutations
const mutations = {
  setDevices (state, datas) {
    state.all = datas
  },

}

export default {
  //namespaced: true,
  state,
  getters,
  actions,
  mutations
}