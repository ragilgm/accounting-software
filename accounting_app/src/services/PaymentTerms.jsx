import Axios from 'axios'

const BASE_URL = "http://localhost:8080/api/v1/terms"

class PaymentTerms {

   getTermins = (company_id) =>{ 
      return Axios.get(BASE_URL + "/" + company_id);
   }



}

export default new PaymentTerms();