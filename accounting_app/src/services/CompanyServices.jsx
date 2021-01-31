import Axios from 'axios'

const BASE_URL = "http://localhost:8080/api/v1/"

class CompanyServices {

  
   Companies = () =>{ 
     return Axios.get(BASE_URL+"company")
   }
   
   Company = (companyId) => { 
     return Axios.get(BASE_URL+"company/"+companyId)
   }
  updateCompanySetting = (companyId,request) => { 
     return Axios.put(BASE_URL+"company/"+companyId+"/company_setting",request)
   }
  updateCompanySalesSetting = (companyId,request) => { 
     return Axios.put(BASE_URL+"company/"+companyId+"/sales_setting",request)
   }
   
  updateCompanyPurchaseSetting = (companyId,request) => { 
     return Axios.put(BASE_URL+"company/"+companyId+"/purchase_setting",request)
   }
  updateCompanyProductStockSetting = (companyId,request) => { 
     return Axios.put(BASE_URL+"company/"+companyId+"/product_stock",request)
   }
  updateCompanyMappingAccountSetting = (companyId,request) => { 
     return Axios.put(BASE_URL+"company/"+companyId+"/account_mapping",request)
   }
  deleteLogoCompany = (companyId) => { 
     return Axios.delete(BASE_URL+"company/"+companyId+"/logo")
   }

  imageUploadHandler = (company_id, image) =>  {
    return Axios.post(BASE_URL + "company/" + company_id + "/image_upload", image, {
      onUploadProgress: progressEvent => {
        console.log('====================================');
        console.log("uploading :" + ((progressEvent.loaded / progressEvent.total) * 100).toString() + "%");
        console.log('====================================');
      }
    });
  }
}

export default new CompanyServices();