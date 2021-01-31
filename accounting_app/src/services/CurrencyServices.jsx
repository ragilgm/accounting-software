import Axios from 'axios'

const BASE_URL = "https://api.ratesapi.io/api/latest"

class CurrencyServices {

   getCurrency = () =>{ 
      return Axios.get(BASE_URL)
   }



}

export default new CurrencyServices();