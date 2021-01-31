import Axios from 'axios'

const BASE_URL = "http://localhost:8080/api/v1/"

class TransactionNoFormat {

   getListTransactionNoFormatByType = (companyId, typeId) =>{ 
      return Axios.get(BASE_URL +"company/"+1+"/transaction_format/"+typeId);
   }

   AddTransactionFormat = (payload) => { 
     
           return Axios.post(BASE_URL +"company/transaction_format",payload);
   }

   addDefaultFormat = (id) => {
      return Axios.put(BASE_URL +"company/transaction_format/"+id);
   }

   DeleteDefaultFormat = (id) => {
      return Axios.delete(BASE_URL +"company/transaction_format/"+id);
   }


}

export default new TransactionNoFormat();