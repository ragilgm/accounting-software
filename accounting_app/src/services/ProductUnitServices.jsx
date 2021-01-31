import Axios from 'axios'

const BASE_URL = "http://localhost:8080/api/v1/"

class ProductUnitServices {

   listProductUnit = (companyId) => { 
     return Axios.get(BASE_URL+"company/"+companyId+"/product_unit")
   }
   

   AddProductUnit = (companyId,payload) => { 
     return Axios.post(BASE_URL+"company/"+companyId+"/product_unit",payload)
   }
   
  

   EditProductUnit = (id,payload) => { 
     return Axios.put(BASE_URL+"/product_unit/"+id,payload)
   }
   
  

   DeleteProductUnit = (id) => { 
     return Axios.delete(BASE_URL+"/product_unit/"+id)
   }
   
  
}

export default new ProductUnitServices();