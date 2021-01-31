import Axios from 'axios'

const BASE_URL = "http://localhost:8080/api/v1/"

class PaymentTermsServices {

   listTerms = (company_id) => {
      return Axios.get(BASE_URL + "/company/"+company_id+"/term")
   }
}
export default new PaymentTermsServices();
