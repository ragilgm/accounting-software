import React, { useState, useEffect } from 'react'

function Profile(props) {

   const [data, setData] = useState("");
   const [identity, setIdentity] = useState("");
   const [billingAddress, setBillingAddress] = useState([])
   const [shippingAddress, setShippingAddress] = useState([])
   const [bankAccount, setBankAccount] = useState([])
   const [contactMappings, setContactMapping] = useState([])

   useEffect(() => {
      console.log(props.data);
      setData(props.data)
      setIdentity(props.data.identity)
      setBillingAddress(props.data.billingAddresses)
      setShippingAddress(props.data.shippingAddresses)
      setBankAccount(props.data.bankAccount)
      setContactMapping(props.data.mappings)
      console.log(props.data.mappings);
   }, [])

   console.log(identity);


   return (
      <>
         {data === "" ?
            <>
               <h5 className="text-center">please wait....</h5>
            </> :
            <>

               <div className="container mr-3 mt-3">
                  <div className="h5"><i className="fas fa-briefcase mt-3"></i>General Information</div>
                  <div className="col-lg-12 col-sm-10 row">
                     <div className="col-lg-4 col-sm-10 mt-3">
                        <small>Contact Name :</small>
                        <p>{data.fullname}</p>
                     </div>
                     <div className="col-lg-4 col-sm-10">
                        <small>Telephone :</small>
                        <p>{data.telephone}</p>
                     </div>
                     <div className="col-lg-4 col-sm-10">
                        <small>NPWP :</small>
                        <p>{data.npwp}</p>
                     </div>
                     <div className="col-lg-4 col-sm-10">
                        <small>Company Name :</small>
                        <p>{data.companyName}</p>
                     </div>
                     <div className="col-lg-4 col-sm-10">
                        <small>Fax :</small>
                        <p>{data.fax}</p>
                     </div>
                     <div className="col-lg-4 col-sm-10">
                        <small>Identity :</small>
                        <p>{identity.identityName}</p>
                     </div>
                     <div className="col-lg-4 col-sm-10">
                        <small>Email :</small>
                        <p>{data.email}</p>
                     </div>
                     <div className="col-lg-4 col-sm-10">
                        <small>Billing Address :</small>
                        {billingAddress.map(billing =>
                           <p className="mb-2" key={billing.id}>{billing.billingAddress} {billing.number} {billing.neigbourhood} {billing.hamlet} {billing.urbanVillage} {billing.subDistrict} {billing.district} {billing.postalCode} {billing.province}</p>
                        )}
                     </div>
                     <div className="col-lg-4 col-sm-10">
                        <small>Information :</small>
                        <p>{data.information}</p>
                     </div>
                     <div className="col-lg-4 col-sm-10">
                        <small>Handphone :</small>
                        <p>{data.handphone}</p>
                     </div>
                     <div className="col-lg-4 col-sm-10">
                        <small>Shipping Address :</small>
                        {shippingAddress.map(shipping => 
                           <p className="mb-2" key={shipping.id}>{shipping.shippingAddress} No. {shipping.number} {shipping.neigbourhood} {shipping.hamlet} {shipping.urbanVillage} {shipping.subDistrict} {shipping.district} {shipping.postalCode} {shipping.province}</p>
                        )}
                     </div>
                  </div>
                  <hr />
                  <div className="h5"><i className="fas fa-briefcase mr-3 mt-3"></i>Bank Account</div>
                  <div className="col-lg-12 col-sm-10 row">
                     {bankAccount.map(bank =>
                        <div className="col-lg-4 col-sm-10" key={bank.id}>
                           <div className="col-lg-12 col-sm-10" >
                              <small>Bank Name :</small>
                              <p>{bank.bankName}</p>
                           </div>
                           <div className="col-lg-12 col-sm-10">
                              <small>Bank Branch :</small>
                              <p>{bank.branchOffice}</p>
                           </div>
                           <div className="col-lg-12 col-sm-10">
                              <small>Bank Holder Name :</small>
                              <p>{bank.accountName}</p>
                           </div>
                           <div className="col-lg-12 col-sm-10">
                              <small>Account Number :</small>
                              <p>{bank.accountNumber}</p>
                           </div>
                        </div>

                     )}
                  </div>
                  <hr />
                  <div className="h5"><i className="fas fa-briefcase mr-3 mt-3"></i>Account Mapping </div>
                  <div className="col-lg-12 col-sm-10 row">
                     <div className="col-lg-4 col-sm-10">
                        {contactMappings.map((maping, idx) =>
                           <div className="col-lg-12 col-sm-10" key={idx}>
                              {idx === 0 ?
                                 <>
                                  <div><small>Account Receivable :</small></div>
                                    <div><button className="btn btn-link">({maping.account.account_code}) - {maping.account.account_name}</button></div>
                                 </> :
                                 <>
                                     <div><small>Account Payable :</small></div>
                                    <div><button className="btn btn-link">({maping.account.account_code}) - {maping.account.account_name}</button></div>
                                 </>}
                           </div>
                        )}


                     </div>


                  </div>
               </div>
            </>}
      </>
   )
}

export default Profile
