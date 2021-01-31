import Axios from 'axios'

const BASE_URL = "http://localhost:8080/api/v1/"

class CategoryProductServices {

   listCategoryProduct = (companyId) => { 
     return Axios.get(BASE_URL+"company/"+companyId+"/product_Category")
   }
   

   AddCategoryProduct = (companyId,payload) => { 
     return Axios.post(BASE_URL+"company/"+companyId+"/product_Category",payload)
   }
   
  

   EditCategoryProduct = (id,payload) => { 
     return Axios.put(BASE_URL+"/product_Category/"+id,payload)
   }
   
  

   DeleteCategoryProduct = (id) => { 
     return Axios.delete(BASE_URL+"/product_Category/"+id)
   }
   
  
}

export default new CategoryProductServices();