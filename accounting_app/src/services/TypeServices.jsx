import Axios from 'axios'

const BASE_URL = "http://localhost:8080/api/v1/company/"

class TypeServices {

   listTypeAccount = (id) =>{ 
      return Axios.get(BASE_URL + id + "/type");
   }



}

export default new TypeServices();