import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import AccountServices from '../../services/AccountServices'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import TableHead from '@material-ui/core/TableHead';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { connect } from 'react-redux'
import LastPageIcon from '@material-ui/icons/LastPage';

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      root: {
         flexShrink: 0,
         marginLeft: theme.spacing(2.5),
      },
   }),
);

interface TablePaginationActionsProps {
   count: number;
   page: number;
   rowsPerPage: number;
   onChangePage: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
   const classes = useStyles();
   const theme = useTheme();
   const { count, page, rowsPerPage, onChangePage } = props;

   const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onChangePage(event, 0);
   };

   const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onChangePage(event, page - 1);
   };

   const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onChangePage(event, page + 1);
   };

   const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
   };

   return (
      <div className={classes.root}>
         <IconButton
            onClick={handleFirstPageButtonClick}
            disabled={page === 0}
            aria-label="first page"
         >
            {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
         </IconButton>
         <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
         </IconButton>
         <IconButton
            onClick={handleNextButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="next page"
         >
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
         </IconButton>
         <IconButton
            onClick={handleLastPageButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="last page"
         >
            {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
         </IconButton>
      </div>
   );
}


const useStyles2 = makeStyles({
   table: {
      minWidth: 1000,
   },
});

function PreviewImport(props) {

   const [listAccountImport, setListAccountImport] = useState([])
   useEffect(() => {
      setListAccountImport(props.listAccount);
      console.log(props.listAccount)
   }, [props.listAccount])

   var request = []
   for (let i = 0; i < listAccountImport.length; i++) {
      var account = listAccountImport[i]
      var payload = {
         account_name: account.account_name,
         account_code: account.account_code,
         description: account.description,
         code: account.category_code,
         categoryName: account.category_name,
         balance: account.balance,
         tax_name: account.tax_name,
         locked: account.locked,
         account_default: account.account_default
      }
      request.push(payload)
   }


   const classes = useStyles2();
   const [page, setPage] = React.useState(0);
   const [rowsPerPage, setRowsPerPage] = React.useState(5);

   const [loading, setLoading] = React.useState(false);
   const emptyRows = rowsPerPage - Math.min(rowsPerPage, listAccountImport.length - page * rowsPerPage);

   const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      setPage(newPage);
   };

   const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
   ) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
   };

   const history = useHistory()

   const cancelHandler = () => {
      props.setClosePreview()
   }
   const saveHandler = () => {
      setLoading(true)
      AccountServices.importAccount(props.company.id, request)
         .then(res => {
            alert("successfull")
            props.setClosePreview()
            setLoading(false)
         })
         .catch(err => {
            alert("failed")
            setLoading(false)
         })
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

               <div className="container">

                  <div className="row">

                     <div className="preview-body col-lg-12">


                        <TableContainer component={Paper} style={{ width: "90vw" }}>
                           <Table className={classes.table} aria-label="custom pagination table">
                              <TableHead>
                                 <TableRow>
                                    <TableCell>Account Name</TableCell>
                                    <TableCell align="center">Account Code</TableCell>
                                    <TableCell align="center">description</TableCell>
                                    <TableCell align="center">Category Id</TableCell>
                                    <TableCell align="center">Category Name</TableCell>
                                    <TableCell align="center">Total</TableCell>
                                    <TableCell align="center">Tax</TableCell>
                                 </TableRow>
                              </TableHead>
                              {listAccountImport.length !== 0 ?
                                 <TableBody>
                                    {(rowsPerPage > 0
                                       ? listAccountImport.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                       : listAccountImport
                                    ).map((row) => (
                                       <TableRow key={row.account_name}>
                                          <TableCell style={{ width: 160, fontSize: 12 }}>
                                             {row.account_name}
                                          </TableCell>
                                          <TableCell style={{ width: 160, fontSize: 12 }} align="center">
                                             {row.account_code}
                                          </TableCell>
                                          <TableCell style={{ width: 160, fontSize: 12 }} align="center">
                                             {row.description}
                                          </TableCell>
                                          <TableCell style={{ width: 160, fontSize: 12 }} align="center">
                                             {row.category_id}
                                          </TableCell>
                                          <TableCell style={{ width: 160, fontSize: 12 }} align="center">
                                             {row.category_name}
                                          </TableCell>
                                          <TableCell style={{ width: 160, fontSize: 12 }} align="center">
                                             {row.Total}
                                          </TableCell>
                                          <TableCell style={{ width: 160, fontSize: 12 }} align="center">
                                             {row.tax_name}
                                          </TableCell>
                                       </TableRow>
                                    ))}
                                    {emptyRows > 0 && (
                                       <TableRow style={{ height: 53 * emptyRows }}>
                                          <TableCell colSpan={6} />
                                       </TableRow>
                                    )}
                                 </TableBody>
                                 :
                                 <div className="col-lg-12">
                                    <h3 className="text-center px-5 py-5">
                                       No Data Record..
             </h3>
                                 </div>
                              }
                              <TableFooter>
                                 <TableRow>
                                    <TablePagination
                                       rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                       colSpan={3}
                                       count={listAccountImport.length}
                                       rowsPerPage={rowsPerPage}
                                       page={page}
                                       SelectProps={{
                                          inputProps: { 'aria-label': 'rows per page' },
                                          native: true,
                                       }}
                                       onChangePage={handleChangePage}
                                       onChangeRowsPerPage={handleChangeRowsPerPage}
                                       ActionsComponent={TablePaginationActions}
                                    />
                                 </TableRow>
                              </TableFooter>
                           </Table>
                        </TableContainer>
                     </div>
                     <div className="col-lg-12 d-flex justify-content-center">
                        <input type="button" value="Cancel" className="mt-5 btn btn-link text-danger mr-3" onClick={cancelHandler} />
                        <input type="button" value="Save" className="mt-5 btn btn-link" onClick={saveHandler} />
                     </div>
                  </div>
               </div>
            </>}
      </>
   );
}

const mapStateToProps = (state) => ({
   company: state.AuthReducer.company,
   userLogin: state.AuthReducer.userLogin,
   isLogin: state.AuthReducer.isLogin
})

const mapDispatchToProps = (dispatch) => ({
   loginUser: (user, company) => dispatch({ type: "LOGIN", payload: user, isLogin: true, company: company }),
})
export default (connect(mapStateToProps, mapDispatchToProps)(PreviewImport));
