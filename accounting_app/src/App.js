import React, { Component } from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import {
  PdfViewer,
  ImageViewer,
  LoginPage,
  RegisterPage,
  DashboardPage,
  Form,
  ListItem,
  SystemPage,
  AccountPage,
  HeaderPage,
  Logout,
  CategoryAccountPage,
  GeneralJourneyPage,
  Transaction as JournalTransaction,
  ContactPage,
  AddContact,
  PreviewImport,
  ContactInformation,
  Supplier,
  Customer,
  Employee,
  Others,
  AllType,
  FormAccount,
  ReportPage,
  CashBankPage,
  SalesPage,
  PurchasePage,
  ExpensesPage,
  ProductPage,
  SettingPage,
  AssetPage,
  ProductServices,
  Warehouse,
  PriceRules,
  NewProduct,
  NewWarhouse,
  NewAdjustmnet,
  NewTransferWarehouse,
  NewPriceRules,
  PendingAsset,
  ActiveAsset,
  SoldorReleasedAsset,
  Depreciation,
  AddAsset,
  CreateExpenses,
  BankTransferTransaction,
  EditAccount,
  BankTransfer,
  BankTransferTransactionDetail,
  PrintPreviewJournalEntry,
  OpeningBalance,
  AccountImportValidation,
  ReversalTransaction,
  OpeningBalanceTransaction,
  JournalImportValidation,
  AccountTransaction
} from './pages'
import { ExportPdf } from './components'


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      theme: ""
    }
  }

  setTheme = (theme) => { 
    console.log('====================================');
    console.log(theme);
    console.log('====================================');
    this.props.swithTheme(theme)
    this.setState({theme:theme})

  }

  async componentDidMount() {
    await this.setState({theme: this.props.theme })
     switch (this.state.theme) {
      case "basic":
       await import('./themes/basic.css').then(mod => {
         this.setState({ theme: true })
         
        })
        break;
      case "darcula":
       await import('./themes/dark.css').then(mod => {
          this.setState({ theme : true })
        })
        break;
    
      default:
        break;
    }

    }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div className="preloader">
            <div className="lds-ripple">
              <div className="lds-pos"></div>
              <div className="lds-pos"></div>
            </div>
          </div>
          <div id="main-wrapper" data-navbarbg="skin6" data-theme="light" data-layout="vertical" data-sidebartype="full"
            data-boxed-layout="full">
            <Switch>
              <Route exact path="/"> <LoginPage /> </Route>
              <Route exact path="/login"> <LoginPage /> </Route>
              <Route exact path="/logout"> <Logout /> </Route>
              <Route exact path="/register"> <RegisterPage /> </Route>
              {this.props.isLogin ?
                <HeaderPage>
                    <Route exact path="/attachment/pdf/:file">
                      <PdfViewer />
                      </Route>
                      <Route exact path="/attachment/image/:image">
                    <ImageViewer />
                  </Route>
                  <Route exact path="/home">
                    <DashboardPage />
                  </Route>
                  <Route exact path="/report">
                    <ReportPage />
                  </Route>
                  <Route exact path="/cashbank">
                    <CashBankPage />
                  </Route>
                  <Route exact path="/sales">
                    <SalesPage />
                  </Route>
                  <Route exact path="/import/account-import-validation">
                    <AccountImportValidation />
                  </Route>
                  <Route exact path="/import/journal-entry-validation">
                    <JournalImportValidation />
                  </Route>
                  <Route exact path="/purchase">
                    <PurchasePage />
                  </Route>
                  <Route exact path="/expenses">
                    <ExpensesPage />
                  </Route>
                  <Route exact path="/expenses/create">
                    <CreateExpenses />
                  </Route>
                  <Route exact path="/assets">
                    <AssetPage page="pending">
                      <PendingAsset  />
                    </AssetPage>
                  </Route>
                  <Route exact path="/assets/pending">
                  <AssetPage page="pending">
                      <PendingAsset/>
                    </AssetPage>
                  </Route>
                  <Route exact path="/assets/active">
                  <AssetPage page="active">
                      <ActiveAsset/>
                    </AssetPage>
                  </Route>
                  <Route exact path="/assets/released">
                  <AssetPage page="released">
                      <SoldorReleasedAsset/>
                    </AssetPage>
                  </Route>
                  <Route exact path="/assets/depreciation">
                  <AssetPage page="depreciation">
                      <Depreciation/>
                    </AssetPage>
                  </Route>
                  <Route exact path="/assets/new">
                      <AddAsset/>
                  </Route>
                  <Route exact path="/setting">
                    <SettingPage theme={this.setTheme}/>
                  </Route>
                  <Route exact path="/account">
                    <AccountPage preview={this.previewImportAccount}/>
                  </Route>
                  <Route exact path="/account/transaction/:account_id">
                    <AccountTransaction/>
                  </Route>
                  <Route exact path="/account/cash_and_bank/:account_id">
                    <BankTransferTransaction/>
                  </Route>
                  <Route exact path="/banktransfer/detail/:id">
                    <BankTransferTransactionDetail/>
                  </Route>
               
                  <Route exact path="/account/new">
                    <FormAccount/>
                  </Route>
                  <Route exact path="/account/conversion-balance">
                    <OpeningBalance/>
                  </Route>
                  <Route exact path="/account/edit/:id">
                    <EditAccount/>
                  </Route>
                  <Route exact path="/banktransfer/new">
                    <BankTransfer/>
                  </Route>
                  <Route exact path="/account/import/preview">
                      <PreviewImport listAccount={this.state.listAccount}/>
                  </Route>
                  <Route exact path="/general-journey/new">
                    <GeneralJourneyPage />
                  </Route>
                  <Route exact path="/general-journey/new/duplicateFrom/:duplicateFrom">
                    <GeneralJourneyPage />
                  </Route>
                  <Route exact path="/general-journey/edit/:editJournal">
                    <GeneralJourneyPage />
                  </Route>
                  <Route exact path="/journal-entries/:id">
                    <JournalTransaction />
                  </Route>
                  <Route exact path="/journal-entry/preview/:id">
                    <PrintPreviewJournalEntry />
                  </Route>
                  <Route exact path="/category_account">
                    <CategoryAccountPage />
                  </Route>
                  <Route exact path="/contact">
                  <ContactPage page="customer">
                      <Customer/>
                    </ContactPage>
                  </Route>
                  <Route exact path="/contact/customer">
                    <ContactPage page="customer">
                      <Customer/>
                    </ContactPage>
                  </Route>
                  <Route exact path="/contact/supplier">
                    <ContactPage page="supplier">
                    <Supplier />
                    </ContactPage>
                  </Route>
                  <Route exact path="/contact/employee">
                    <ContactPage page="employee">
                    <Employee />
                    </ContactPage>
                  </Route>
                  <Route exact path="/contact/others">
                    <ContactPage page="others">
                    <Others />
                    </ContactPage>
                  </Route>
                  <Route exact path="/contact/all-type">
                    <ContactPage page="all-type">
                    <AllType />
                    </ContactPage>
                  </Route>
                  <Route exact path="/reversal/:id">
                    <ReversalTransaction/>
                  </Route>
                  <Route exact path="/opening-balance/:id">
                    <OpeningBalanceTransaction/>
                  </Route>
                  <Route exact path="/product">
                    <ProductPage page="services">
                    <ProductServices />
                    </ProductPage>
                  </Route>
                  <Route exact path="/product/new">
                    <NewProduct />
                  </Route>
                  <Route exact path="/services">
                    <ProductPage page="services">
                    <ProductServices />
                    </ProductPage>
                  </Route>
                  <Route exact path="/warehouse">
                    <ProductPage page="warehouse">
                    <Warehouse />
                    </ProductPage>
                  </Route>
                  <Route exact path="/warehouse/new">
                    <NewWarhouse />
                  </Route>
                  <Route exact path="/warehouse-transfers/new">
                    <NewTransferWarehouse />
                  </Route>
                  <Route exact path="/price-rules">
                    <ProductPage page="price-rules">
                    <PriceRules />
                    </ProductPage>
                  </Route>
                  <Route exact path="/price-rules/new">
                    <NewPriceRules/>
                  </Route>
                  <Route exact path="/stock-adjustment/setup">
                  <NewAdjustmnet/>
                  </Route>
                  <Route exact path="/contact/new">
                    <AddContact />
                  </Route>
                  <Route exact path="/contact/edit/:id">
                    <AddContact />
                  </Route>
                  <Route exact path="/contact/info/:id">
                    <ContactInformation />
                  </Route>
                  <Route exact path="/form">
                    <Form />
                  </Route>
               
                  <Route exact path="/item">
                    <ListItem />
                  </Route>
                  <Route exact path="/import">
                    <SystemPage />
                  </Route>
                </HeaderPage>
                    : 
               <Redirect push to="/login" />   
                
                }
            </Switch>
          </div>
        </BrowserRouter>
        </div>
    );
  }
}


const mapStateToProps = (state) => ({
	companyId:state.AuthReducer.company,
	userLogin:state.AuthReducer.userLogin,
  isLogin: state.AuthReducer.isLogin,
  theme:state.ThemeReducer.theme
 })
 
const mapDispatchToProps = (dispatch) => ({
  swithTheme: (themeName) => dispatch({ type: "theme", payload: themeName }),
   loginUser: (user, company) => dispatch({ type: "LOGIN", payload:user, isLogin:true,company:company  }),
})


export default connect(mapStateToProps,mapDispatchToProps)(App);

