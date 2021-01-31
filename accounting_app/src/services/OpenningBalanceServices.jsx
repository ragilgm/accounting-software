import Axios from 'axios'

const BASE_URL = "http://localhost:8080/api/v1/"

class OpenningBalanceServices {

   listOpenningBalance = (companyId) => { 
     return Axios.get(BASE_URL+"/conversion-balance/"+companyId)
   }

   setConversionBalance = (companyId,payload)=>{
    return Axios.post(BASE_URL+"/conversion-balance/"+companyId,payload)
  }
  
  getOpeningBalanceTransaction = (id) => {
    return Axios.get(BASE_URL + "/opening_balance/"+id)
 }


}

export default new OpenningBalanceServices();