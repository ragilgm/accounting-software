import Axios from 'axios'

const BASE_URL = "http://localhost:8080/api/v1/"

class TaxServices {

   listTax = (id) =>{ 
      return Axios.get(BASE_URL +"/tax");
   }



}

export default new TaxServices();