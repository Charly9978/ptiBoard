import shop from '../../api/shop'
import {db} from '@/main.js'

// initial state
const state = {
  devices: []
}

// getters
const getters = {}

// actions
const actions = {
  getAllDevices ({ commit }) {
    db.collection("Devices").onSnapshot((querySnapshot) => {
        const datas = []
      querySnapshot.forEach((doc) => {
        const data={id:doc.id,telBip:doc.data().telBip,useArea:doc.data().useArea,alarme:doc.data().alarme,inCharge:doc.data().inCharge};
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
    state.devices = datas
  },

  decrementProductInventory (state, { id }) {
    const product = state.all.find(product => product.id === id)
    product.inventory--
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}