import  Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export const store =new Vuex.Store({
    state:{
        isCollapse:false
    },
    getters:{

    },
    mutations:{
        CHANGE(state,data){
            state.isCollapse = !state.isCollapse
        }
    },
})