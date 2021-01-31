import Axios from 'axios'

const BASE_URL = "http://localhost:8080/api/v1/"

class UsersServices {

   LoginUser = (companyId, user) => {
      return Axios.post(BASE_URL + "company/" + companyId + "/users/login", user);
   }
   
   RegisterUser = (companyId, user) => {
      return Axios.post(BASE_URL + "company/" + companyId + "/users/register", user)
   }

   GetUserById = (userId) => {
      return Axios.get(BASE_URL + "company/users/" + userId)
   }
   updateUser = (userId,request) => {
      return Axios.put(BASE_URL + "users/" + userId, request)
   }
   deleteUser = (userId) => {
      return Axios.delete(BASE_URL + "users/" + userId)
   }

}
export default new UsersServices();