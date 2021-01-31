import Axios from 'axios'

const BASE_URL = "http://localhost:8080/api/v1/"

class JournalEntryServices {

   getJournalEntryByTransactionId = (id) => {
      return Axios.get(BASE_URL + "/journal-entry/transaction-id/"+id)
   }
   saveJournalEntry = (payload) => {
      return Axios.post(BASE_URL + "/journal-entry",payload)
   }
   editJournalEntry = (id,payload) => {
      return Axios.put(BASE_URL + "/journal-entry/"+id,payload)
   }

   importjournalEntry = (payload) => {
      return Axios.post(BASE_URL + "/journal-entry/import",payload)
   }

   addAttachment = (id, attachment) =>  {
      return Axios.post(BASE_URL+`journal-entry/${id}/attachment`, attachment, {
        onUploadProgress: progressEvent => {
          console.log('====================================');
          console.log("uploading :" + ((progressEvent.loaded / progressEvent.total) * 100).toString() + "%");
          console.log('====================================');
        }
      });
   }
   deleteAttachment = (id, attachment) =>  {
      return Axios.delete(BASE_URL+`journal-entry/${id}/attachment/${attachment}`, {
        onUploadProgress: progressEvent => {
          console.log('====================================');
          console.log("uploading :" + ((progressEvent.loaded / progressEvent.total) * 100).toString() + "%");
          console.log('====================================');
        }
      });
   }

   deleteJournalHandler = (id) => { 
      return Axios.delete(BASE_URL + "/journal-entry/"+id)
   }

}
export default new JournalEntryServices();
