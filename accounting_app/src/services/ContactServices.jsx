import Axios from 'axios'

const BASE_URL = "http://localhost:8080/api/v1/company"

class ContactServices {

   getAllContact = (companyId) => { 
     return Axios.get(BASE_URL+"/"+companyId+"/contacts")
   }

   getContactByType = (company_id, type)=>{ 
      return Axios.get(BASE_URL + "/" + company_id + "/contacts/type/" + type );
   }
   getContactById = (company_id, id)=>{ 
      return Axios.get(BASE_URL + "/" + company_id + "/contacts/id/" + id );
   }
   addNewContact = (company_id, contact)=>{ 
      return Axios.post(BASE_URL + "/" + company_id + "/contacts/new",contact );
   }
   editContact = (company_id, contact_id, contact)=>{ 
      return Axios.put(BASE_URL + "/" + company_id + "/contacts/update/"+contact_id,contact );
   }
   deleteContact = (company_id, contact_id)=>{ 
      return Axios.delete(BASE_URL + "/" + company_id + "/contacts/"+contact_id );
   }

   deleteListContact = (listContact) => { 
      return Axios.put(BASE_URL + "/contacts/delete", listContact);
   }

}

export default new ContactServices();