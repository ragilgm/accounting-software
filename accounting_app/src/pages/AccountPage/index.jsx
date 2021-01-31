import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import { connect } from 'react-redux'
import AccountServices from '../../services/AccountServices'
import CategoryAccountServices from '../../services/CategoryAccountServices'
import ModalImportAccount from './ModalImportAccount'
import ModalResetAccount from './ModalResetAccount'
import JournalImport from './JournalImport'

function AccountPage(props) {

  const history = useHistory()

  var [listAccount, setListAccount] = useState([]);
  var [render, setRemder] = useState(false);
  var [loading, setLoading] = useState(false);
  const [isImport, setIsImport] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [accountList, setAccountList] = useState([])
  const [categoryList, setCategoryList] = useState([])

  const setupImportHandler = () => {
    setIsImport(!isImport)
    setIsReset(false)
  }

  const setupResetHandler = () => {
    setIsReset(!isReset)
    setIsImport(false)
  }

  useEffect(() => {
    setLoading(true)

    AccountServices.AccountList(props.company.id)
      .then(res => {
        setAccountList(res.data)

      })
    
    CategoryAccountServices.listCategoryAccount()
      .then(res => { 
        console.log(res.data);
        setCategoryList(res.data)
      })
    
    AccountServices.listAccount(props.company.id)
      .then(res => {
        setListAccount(res.data)
        console.log(res.data);
        setLoading(false)
      }).catch(err => {
        console.log(err);
        setLoading(false)
      })
  }, [render])




  const addNewAccountHandler = () => {
    history.push("/account/new")
  }



  const CreateJourneyPageHandler = () => {
    history.push("/general-journey/new");
  }


  const [setupOpen, setSetupOpen] = useState(false)


  const handleSetupOpen = () => {
    setSetupOpen(true);
  }
  const handleSetupClose = () => {
    setSetupOpen(false);
    setIsImport(false)
    setIsReset(false)
  }


  const [q, setQ] = useState("")




  const [searchAccount, setSearchAccount] = useState([])

  const searhAccountHandler = (q) => {
    setQ(q)
    AccountServices.searchAccount(props.company.id, q)
      .then(res => {
        setSearchAccount(res.data)
      })
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
      history.push("/account/transaction/" + id)
    }


  }

  const showListCategoryHandler = (category) => {
    setQ(category)
    AccountServices.searchAccount(props.company.id, category)
      .then(res => {
        setSearchAccount(res.data)
      })

  }

  const conversionBalanceHandler = () => {
    history.push("/account/conversion-balance")
  }

  return (
    <>
          {loading ?
            <>
              <div id="bg-loading" className="bg-loading" >
                <div id="loading" className="loading"></div>
              </div>
            </>
            :
            <>
              <ModalResetAccount  listAccount={accountList} listCategory={categoryList} />
          <ModalImportAccount listAccount={accountList} listCategory={categoryList}/>
              <JournalImport />
        


              <div className="col-lg-12 ">
                <div className="d-flex justify-content-between">
                  <h3>List Of Accounts</h3>
                  <div>
                    <input type="button" className="btn btn-primary button mr-3" onClick={CreateJourneyPageHandler} value="   Create Journal +" />
                    <input type="button" variant="contained" className="btn btn-primary button" onClick={addNewAccountHandler} value="Add New Account +" />


                  </div>
                </div>
                <hr />
              </div>
              <div className="col-lg-12 add-account d-flex justify-content-between">
                <div className="form-group">
                  <div className="col-lg-12 col-sm-10">
                    <input type="text" className="form-control" id="nickname" name="nickname"
                      placeholder="Seach Account " value={q} onChange={(e) => searhAccountHandler(e.target.value)} />
                  </div>
                </div>
                <div>
                  <button type="button" class="btn btn-secondary dropdown-toggle" id="action" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                    style={{ height: 30, textAlign: "center", width: 100, fontSize: 12, backgroundColor: '#4269f5' }}>
                    Action
                 </button>

                  <Dialog
                    open={setupOpen}
                    onClose={handleSetupClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">{"Setup Chart Of Account"}</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        <div className="col-lg-12 row mb-3">
                          <div className="col-lg-5"
                            style={{
                              height: "200px",
                              width: "200px",
                              border: "1px solid black",
                              margin: "1rem",
                              padding: "1rem",
                              borderRadius: "1rem"

                            }}
                            onClick={setupImportHandler}
                          >

                            <div className="col-lg-12 text-center"
                              style={{

                                borderTopLeftRadius: "1rem",
                                borderTopRightRadius: "1rem"
                              }}
                            >

                              Add Account Via Import</div>
                            <div className="col-lg-12 text-center">
                              {isImport ? <>
                                <i className="fas fa-check-circle"
                                  style={{ position: "absolute", fontSize: "50px", color: "green" }}></i>
                              </> : <></>}
                              <i className="fas fa-paste"
                                style={{ fontSize: "50px", color: "grey" }}></i>
                            </div>
                            <div className="col-lg-12 text-center"
                              style={{

                                borderBottomLeftRadius: "1rem",
                                borderBottomRightRadius: "1rem",
                              }}>
                              <small>
                                Add more accounts based on your needs via Import</small>
                            </div>
                          </div>

                          <div className="col-lg-5"
                            style={{
                              height: "200px",
                              width: "200px",
                              border: "1px solid black",
                              margin: "1rem",
                              padding: "1rem",
                              borderRadius: "1rem"
                            }}
                            onClick={setupResetHandler}>
                            <div className="col-lg-12 text-center"
                              style={{

                                borderTopLeftRadius: "1rem",
                                borderTopRightRadius: "1rem"
                              }}
                            >Reset
                            Chart of Accounts</div>
                            <div className="col-lg-12 text-center">
                              {isReset ? <>
                                <i className="fas fa-check-circle"
                                  style={{ position: "absolute", fontSize: "50px", color: "green" }}></i>
                              </> : <></>}
                              <i className="far fa-copy"
                                style={{ fontSize: "50px", color: "grey" }}></i>
                            </div>
                            <div className="col-lg-12 text-center"
                              style={{

                                borderBottomLeftRadius: "1rem",
                                borderBottomRightRadius: "1rem",
                              }}>
                              <small>
                                Replace existing accounts & Import new account</small>
                            </div>
                          </div>
                        </div>
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <small>*You are unable to reset chart of accounts if you already have transactions, products, contacts or closing the books.</small>
                      <input type="button" value="Cancel" className="btn btn-danger" onClick={handleSetupClose} />
                      {isImport === true || isReset === true ? <>
                        {isReset === true ?
                          <>
                            <input type="button" value="Next" className="btn btn-primary" data-toggle="modal" data-target="#resetAccount" onClick={handleSetupClose} />
                          </> : <></>}
                        {isImport === true ? <>

                          <input type="button" value="Next" className="btn btn-primary" data-toggle="modal" data-target="#importAccount" onClick={handleSetupClose} />
                        </> : <></>}


                      </> : <>
                          <input type="button" value="Next" className="btn btn-primary" disabled />
                        </>}
                    </DialogActions>
                  </Dialog>



                  <div class="dropdown-menu" aria-labelledby="action">
                    <div class="dropdown-item" onClick={handleSetupOpen}> Setup Account</div>
                    <div class="dropdown-item" onClick={conversionBalanceHandler}> Set Conversion Balance</div>
                    <div class="dropdown-item">
                      Close the Book</div>

                    <div class="dropdown-item" data-toggle="modal" data-target="#importJournal">
                      Import Journal Entry</div>
                    <div class="dropdown-item">
                      Export Account</div>
                  </div>
                </div>
              </div>
              {listAccount.length !== 0 || listAccount === undefined ?
                <div className="col-lg-12 cpl-sm-12 col-12 table-account">
                  <table className="table">
                    <TableHead className="table">
                      <TableRow className="text-white">
                        <TableCell align="center" className="text-white">Account Code</TableCell>
                        <TableCell align="center" className="text-white">Account Name</TableCell>
                        <TableCell align="center" className="text-white">Category</TableCell>
                        <TableCell align="center" className="text-white">Tax</TableCell>
                        <TableCell align="center" className="text-white">Description</TableCell>
                        <TableCell align="center" className="text-white">Balance ( {listAccount[0].currency_code})
                        </TableCell>
                        <TableCell align="center" className="text-white">Lock</TableCell>
                      </TableRow>
                    </TableHead>
                    <tbody>
                      {q !== "" && searchAccount.length !== 0 ?
                        <>
                          {searchAccount.map((account) => (
                            <>
                              <tr key={account.id}>
                                <td>{account.number_account}
                                </td>
                                <td><div className="text-primary font-weight-bold" onClick={() => accountDetailHandler(account.id, account.category_id)}>{account.name}</div></td>
                                <td><div className="text-primary font-weight-bold" onClick={() => showListCategoryHandler(account.category)}>{account.category}</div></td>
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

                            </>
                          ))}
                        </>
                        :
                        <>
                          {listAccount.map((account, idx) => (
                            <>
                              <tr key={account.id}>
                              {account.is_parennt ?
                                    <>
                                    <td><b>{account.number_account}

                                
                                      {children.id === account.id && children.open ? <ExpandLess name={account.id} className="ml-5" onClick={() => ChildrenCloseHandler(account.id)} /> : <ExpandMore name={account.id} className="ml-5" onClick={() => ChildrenOpenHandler(account.id)} />}
                                      </b>
                                    </td>
                                  </> : <>
                                         <td>{account.number_account}
                                    </td>
                                  </>}
                                {account.is_parennt ? <>
                                 <td><div className="text-primary font-weight-bold" onClick={() => ChildrenOpenHandler(account.id)}>{account.name}</div></td>
                              </> :
                                 <>
                                   <td><div className="text-primary font-weight-bold" onClick={() => accountDetailHandler(account.id, account.category_id)}>{account.name}</div></td>
                                 </>}
                                <td><div className="text-primary font-weight-bold" onClick={() => showListCategoryHandler(account.category)}>{account.category}</div></td>
                                <td>{account.taxName}</td>
                                <td>{account.description}</td>
                                <td>{account.balance_ammount}</td>
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
                                      <td style={{ textIndent: "20px" }}><div className="text-primary font-weight-bold" onClick={() => showListCategoryHandler(account.category)}>{child.category}</div></td>
                                      <td style={{ textIndent: "20px" }}>{child.taxName}</td>
                                      <td style={{ textIndent: "20px" }}>{child.description}</td>
                                      <td style={{ textIndent: "20px" }}>{child.balance_ammount}</td>
                                  
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
                        </>}

                    </tbody>
                  </table>
                </div>
                :
                <div className="col-lg-12">
                  <h5 className="text-center text-secondary">Waiting for connection..</h5>
                </div>

              }
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
export default (connect(mapStateToProps, mapDispatchToProps)(AccountPage));
