import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import AccountServices from '../../services/AccountServices'
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

function CashBankPage(props) {
   const history = useHistory();
   const [listAccount, setListAccount] = useState([])
   const [loading, setLoading] = useState([])
   useEffect(() => {
      setLoading(true)
      AccountServices.getAccountByCategoryId(props.company.id, 3)
         .then(res => {
            console.log('====================================');
            console.log(res.data);
            console.log('====================================');
            setListAccount(res.data)
         }).catch(err => {
            alert(err)
         }).finally(
            setLoading(false)
         )
   }, [])


   const createNewAccount = () => {
      history.push("/account/new")
   }

   const bankTransferHandler = () => {
      history.push("/banktransfer/new")
   }


  const [children, setChildren] = useState({ id: "", open: true })
  const ChildrenOpenHandler = (id) => {
    setChildren({ id: id, open: true })
  }
  const ChildrenCloseHandler = (id) => {
    setChildren({ id: id, open: false })
  }

  const accountDetailHandler = (id, categoryId) => {
   console.log('====================================');
   console.log(categoryId);
   console.log('====================================');

   if (categoryId === "3") {
     history.push("/account/cash_and_bank/" + id)
   } else { 
     history.push("/account/" + id)
   }


 }


   return (
      <>
         {loading ? <>
            <div id="bg-loading" className="bg-loading" >
               <div id="loading" className="loading"></div>
            </div>
         </> : <>
               <div className="container-fluid">
                  <div className="header">
                     <div className="col lg-12 d-flex justify-content-between">
                        <div className="">
                           <small>Cash & Bank</small>
                           <h3>Accounts</h3>
                        </div>
                        <div className="">
                           <input type="button" className="btn btn-primary" value="Create New Account +" onClick={createNewAccount}/>
      
                        </div>
                     </div>
                  </div>
                  <hr />
                  <div className="expenses-body row col-lg-12 col-sm-10">
                     <div className="col-lg-3">
                        <div className="box-green row">
                           <div className="">
                              <p className="title-box-green">Receiveables Next 30 Days (in IDR)</p>
                           </div>
                           <div className="total">
                              <p>4</p>
                           </div>
                           <div className="line"></div>
                           <div className="col-lg-12 mt-3">
                              <small>Total </small>
                              <h5>Rp. 100.000.000</h5>
                           </div>
                        </div>
                     </div>
                     <div className="col-lg-3">
                        <div className="box-red row">
                           <div className="">
                              <p className="title-box-red">Payables Next 30 Days (in IDR)</p>
                           </div>
                           <div className="total">
                              <p>4</p>
                           </div>
                           <div className="line"></div>
                           <div className="col-lg-12 mt-3">
                              <small>Total </small>
                              <h5>Rp. 100.000.000</h5>
                           </div>
                        </div>
                     </div>
                     <div className="col-lg-3">
                        <div className="box-blue row">
                           <div className="">
                              <p className="title-box">Cash Balance (in IDR)</p>
                           </div>
                           <div className="total">
                              <p>4</p>
                           </div>
                           <div className="line"></div>
                           <div className="col-lg-12 mt-3">
                              <small>Total </small>
                              <h5>Rp. 100.000.000</h5>
                           </div>
                        </div>
                     </div>
                     <div className="col-lg-3">
                        <div className="box-blue row">
                           <div className="">
                              <p className="title-box">Credit Card Balance (in IDR)</p>
                           </div>
                           <div className="total">
                              <p>4</p>
                           </div>
                           <div className="line"></div>
                           <div className="col-lg-12 mt-3">
                              <small>Total </small>
                              <h5>Rp. 100.000.000</h5>
                           </div>
                        </div>
                     </div>
                  </div>

                  <hr />
                  <div className="body row d-flex justify-content-between container-fluid my-4">
                     <div> <h3>List of Accounts</h3></div>
                     <div className="row">
                        <div className="mr-3">
                           <input type="button" class="btn btn-primary dropdown-toggle" id="action" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"

                              value="New Transaction +"
                           />
                           <div class="dropdown-menu" aria-labelledby="action">
                              <div class="dropdown-item" onClick={bankTransferHandler}>
                                 + Transfer Funds
                                    </div>
                              <div class="dropdown-item">
                                 + Receive Money
                                    </div>
                              <div class="dropdown-item">
                                 + Pay Money
                                    </div>
                           </div>
                        </div>
                        <div>
                           <input type="button" class="btn btn-primary dropdown-toggle" value="reconcile"/>
                        </div>
                     </div>
                  </div>

                  <table className="table">
                     <thead>
                        <tr>
                           <th>Account Code</th>
                           <th>Account Name</th>
                           <th>Statement Balance</th>
                           <th>Balance in Journal</th>
                           <th>Action</th>
                        </tr>
                     </thead>
                     <tbody>

                     {listAccount.map((account, idx) => (
                            <>
                              <tr key={account.id}>
                                <td>{account.number_account}

                                  {account.is_parennt ?
                                    <>
                                      {children.id === account.id && children.open ? <ExpandLess name={account.id} className="ml-5" onClick={() => ChildrenCloseHandler(account.id)} /> : <ExpandMore name={account.id} className="ml-5" onClick={() => ChildrenOpenHandler(account.id)} />}
                                    </> : <></>}

                              </td>
                              {account.is_parennt ? <>
                                 <td><div className="text-primary font-weight-bold" onClick={() => ChildrenOpenHandler(account.id)}>{account.name}</div></td>
                              </> :
                                    
                                 <>
                                   <td><div className="text-primary font-weight-bold" onClick={() => accountDetailHandler(account.id, account.category_id)}>{account.name}</div></td>
                                 </>}
                              
                                <td>{account.taxName}</td>
                                <td>{account.balance_ammount}</td>
                                <td>{account.description}</td>
                                {account.lock ?
                                  <>
                                    <td className="text-center">
                                      <i class="fas fa-lock text-primary"></i>
                                    </td>
                                  </> :
                                  <>
                                    <td className="text-center">
                                      <i class="fas fa-unlock text-success"></i>
                                    </td>
                                  </>}
                              </tr>
                              {account.children !== null ? <>
                                {children.id === account.id && children.open ? <>
                                  {account.children.map(child =>
                                    <tr >
                                      <td style={{ textIndent: "20px" }}>{child.number_account}</td>
                                      <td style={{ textIndent: "20px" }}><div className="text-primary font-weight-bold" onClick={() => accountDetailHandler(child.id, child.category_id)}>{child.name}</div></td>
                                      <td style={{ textIndent: "20px" }}>{child.taxName}</td>
                                      <td style={{ textIndent: "20px" }}>{child.balance_ammount}</td>
                                      <td style={{ textIndent: "20px" }}>{child.description}</td>
                                      {child.lock ?
                                        <>
                                          <td className="text-center">
                                            <i class="fas fa-lock text-primary"></i>
                                          </td>
                                        </> :

                                        <>
                                          <td className="text-center">
                                            <i className="fas fa-unlock text-success"></i>
                                          </td>
                                        </>}
                                    </tr>
                                  )}

                                </> : <></>}
                              </> : <></>}
                            </>
                          ))}
                      

                        {/* {listAccount.map(account =>
                           <tr key={account.id}>
                              <td>{account.number_account}</td>
                              <td className="text-primary font-weight-bold" onClick={()=>accountTransactionHandler(account.id)}>{account.name}</td>
                              <td>{account.balance_ammount}</td>
                              <td>{account.balance_ammount}</td>
                           </tr>
                        )} */}
                     </tbody>
                  </table>


               </div>
            </>}
      </>
   )
}



const mapStateToProps = (state) => ({
   company: state.AuthReducer.company,
   userLogin: state.AuthReducer.userLogin,
   isLogin: state.AuthReducer.isLogin
})

const mapDispatchToProps = (dispatch) => ({
   loginUser: (user, company) => dispatch({ type: "LOGIN", payload: user, isLogin: true, company: company }),
})
export default (connect(mapStateToProps, mapDispatchToProps)(CashBankPage));
