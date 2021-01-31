import Axios from 'axios'

const BASE_URL = "http://localhost:8080/api/v1/"

class AccountServices {

   listAccount = (companyId) => { 
     return Axios.get(BASE_URL+"company/"+companyId+"/accounts")
   }
   AccountList = (companyId) => { 
     return Axios.get(BASE_URL+"company/"+companyId+"/listAccount")
   }
   getAccountById = (id) => { 
     return Axios.get(BASE_URL+"accounts/"+id)
   }
   searchAccount = (companyId, search) => { 
     return Axios.get(BASE_URL+"company/"+companyId+"/accounts/search?q="+search)
   }
   getAccountByCategoryName = (companyId, category) => { 
     return Axios.get(BASE_URL+"company/"+companyId+"/accounts/category?category_name="+category)
   }
   getAccountByCategoryId = (companyId, id) => { 
      console.log(id);
     return Axios.get(BASE_URL+"company/"+companyId+"/accounts/category_id/"+id)
   }
   
   editAccount = (id, payload) => { 
      return Axios.put(BASE_URL +"accounts/"+id, payload);
   }

  filterTransactionAccount = (id, from, to) => {
    return Axios.get(BASE_URL +`account/${id}/transaction?from=${from}&&to=${to}`);
   }


   addNewAccount = (company_id, account) => {
      return Axios.post(BASE_URL + "company/" + company_id + "/accounts",account);
   }

   deleteAccount = (id) => { 
      return Axios.delete(BASE_URL +"accounts/"+id);
   }
   
   importAccount = (company_id, account) => {
      console.log(company_id);  
     console.log(account);
      return Axios.post(BASE_URL + `company/${company_id}/account/import`,account);
   }
   
   addNewSubAccount = (company_id, type_id, category_id, header_id, listAccount) => { 
     console.log(BASE_URL + "/" + company_id + "/type/" + type_id + "/category_account/" + category_id + "/sub-account/" + header_id, listAccount);
      return Axios.post(BASE_URL + "/" + company_id + "/type/" + type_id + "/category_account/" + category_id + "/sub-account/" + header_id, listAccount);
   }

}

export default new AccountServices();