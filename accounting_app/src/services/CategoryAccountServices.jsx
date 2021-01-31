import Axios from 'axios'

const BASE_URL = "http://localhost:8080/api/v1/"

class CategoryAccountServices {

   listCategoryAccount = () => { 
     return Axios.get(BASE_URL+"category_account")
   }
   
   SaveCategoryAccount = (companyId,type_id, category_account) => { 
      return Axios.post(BASE_URL+"/"+companyId+"/type/"+type_id+"/category_account",category_account )
   }

   listCategoryAccountByType = (companyId,type_id) => { 
      return Axios.get(BASE_URL+"/"+companyId+"/type/"+type_id+"/category_account" )
   }
   
   getCategoryByCode = (company_id, code)=>{ 
      return Axios.get(BASE_URL+"/"+company_id+"/category_account/"+code)
   }
   


   editCategoryAccount = (id, category_account) => { 
      return Axios.put(BASE_URL+"/category_account/"+id,category_account )
   }
   findCategoryAccountById = (id) => { 
      return Axios.get(BASE_URL+"/category_account/"+id )
   }

   deleteCategoryAccount = (id) => { 
      return Axios.delete(BASE_URL+"/category_account/"+id )
   }
}

export default new CategoryAccountServices();