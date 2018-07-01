import Vue from 'vue'
import Vuex from 'vuex'
import * as api from '@/api/user'

Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        userProfile: {},
        access: {
            resolve: null,
            reject: null
        }
    },
    actions: {
        getUserProfile: ({ commit }) => {
            return new Promise((resolve, reject) => {
                api.getUserProfile().then((res) => {
                    commit('userProfile', res.data)
                    resolve(res.data)
                }).catch((err) => {
                    reject(err)
                })
            })
        }
    },
    mutations: {
        userProfile: (state, data) => {
            state.userProfile = data
        },
        SET_ACCESS (state, { reject, resolve }) {
            state.access.reject = reject
            state.access.resolve = resolve
        }
    }
})
export default store
