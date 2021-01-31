import Axios from 'axios'

const BASE_URL = "http://localhost:8080/api/v1/"

class ReversalServices {

   getReversalById = (id) => {
      return Axios.get(BASE_URL + "/reversal/"+id)
   }
}
export default new ReversalServices();
