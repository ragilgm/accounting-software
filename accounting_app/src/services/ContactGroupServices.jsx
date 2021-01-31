import Axios from 'axios'

const BASE_URL = "http://localhost:8080/api/v1/company"

class ContactGroupServices {

   getAllContactGroup = (companyId) => { 
     return Axios.get(BASE_URL+"/"+companyId+"/contact_group")
   }
   getContactGroupById = (company_id, id)=>{ 
      return Axios.get(BASE_URL + "/"+company_id+"/contact_group/groupId/"+id );
   }
   getContactGroupByType = (company_id, type) => { 
      console.log('====================================');
      console.log(type);
      console.log('====================================');
      return Axios.get(BASE_URL + "/"+company_id+"/contact_group/type/"+type );
   }

   addNewContactGroup = (company_id, contactGroup)=>{ 
      return Axios.post(BASE_URL + "/" + company_id + "/contact_group" ,contactGroup);
   }
   editContactGroup = (company_id, contact_group_id, contact_group) => { 
      return Axios.put(BASE_URL + "/" + company_id + "/contact_group/update/"+contact_group_id,contact_group );
   }  
   deleteContactGroup = (contact_group_id) => { 
      return Axios.delete(BASE_URL + "/contact_group/delete/"+contact_group_id );
   }  

}

export default new ContactGroupServices();