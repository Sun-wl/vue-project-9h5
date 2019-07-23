import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const state = {
  payment:'',
  area:[],
  isDefaultArea:[],
  isInsurance: [],  //各产品是否选择保险费，格式：[{value:false},{value:true}]
  remark: [],       //各产品备注，格式：[{value:''},{value:''}]
  delicery: [],     //配送方式
  bill: [],         //开票名称
  amount:0
}
const mutations = {
  paymentSave (state, { paymentSelected }) {
    state.payment = paymentSelected
  },
  areaSave (state, { areaSelected, index }) {
    state.area[index] = areaSelected
  },
  isDefaultAreaSave (state, { isDefaultArea, index }) {
    state.isDefaultArea[index] = isDefaultArea
  },
  confirmInfoSave(state, { isInsurance, remark, delicery, bill, index}){
    state.isInsurance[index] = isInsurance
    state.remark[index] = remark
    state.delicery[index] = delicery
    state.bill[index] = bill
  },
  amountSave(state, { amount}){
    state.amount = amount;
  }

}


const store = new Vuex.Store({
  state,
  mutations
})

export default store
