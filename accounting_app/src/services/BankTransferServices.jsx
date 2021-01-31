import Axios from 'axios'

const BASE_URL = "http://localhost:8080/api/v1/"

class BankTransferServices {

   addBankTransfer = (payload) => { 
     return Axios.post(BASE_URL+"accounts/bankTransfers",payload)
   }
   getBankTransferById = (id) => { 
     return Axios.get(BASE_URL+"accounts/bankTransfers/"+id)
   }

   uploadAttachment = (payload) => { 
      return Axios.post(BASE_URL + "accounts/bankTransfers/attachment", payload, {
         onUploadProgress: progressEvent => {
            console.log('====================================');
            console.log("uploading :" + ((progressEvent.loaded / progressEvent.total) * 100).toString() + "%");
            console.log('====================================');
         }
      });
   }


}

export default new BankTransferServices();