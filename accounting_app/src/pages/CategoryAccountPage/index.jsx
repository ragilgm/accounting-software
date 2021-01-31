import React, { useState, useEffect } from 'react'
import { TableComponent, } from '../../components'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { InputText } from '../../components'
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import swal from "sweetalert"
import CategoryAccountServices from '../../services/CategoryAccountServices'

import './style.css'
import TypeServices from '../../services/TypeServices';

function CategoryAccountPage(props) {


  const useStyles = makeStyles({
    table: {
      minWidth: 650,

    },
    header: {
      fontSize: '20px',
      height: '40px',
    },
    tableHead: {
      color: "white",
      fontSize: 12
    },
    tableBody: {
      fontSize: 12
    },
    button: {
      marginBottom: "2rem",
      paddingTop: ".5rem",
      paddingBottom: ".5rem",
      paddingRight: "2rem",
      paddingLeft: "2rem",
      color: "white",
      fontWeight: "bold",
      marginRight: "1rem"
    }
  });

  var initialValues = {
    id: "",
    code: "",
    categoryName: ""
  }

  var [loading, setLoading] = useState(false)
  var [categoryAccount, setCategoryAccount] = useState(initialValues)
  var [listCategoryAccount, setListCategoryAccount] = useState([]);
  var [type, setType] = useState([]);

  var [render, setRemder] = useState(false);

  useEffect(() => {
    setLoading(true)
    CategoryAccountServices.listCategoryAccount(props.company.id)
      .then(res => {
        setListCategoryAccount(res.data)
        setLoading(false)
      }).catch(err => {
        alert(err)
        setLoading(false)
      })

    TypeServices.listTypeAccount(props.company.id)
      .then(res => {
        setType(res.data)
        console.log(res.data);
      })

  }, [render])

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [currentType, SetCurrentType] = React.useState("");



  const changeValue = (event) => {
    const { name, value } = event.target
    setCategoryAccount({
      ...categoryAccount,
      [name]: value
    })
  };


  const [select, setSelect] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSelectClose = () => {
    setSelect(false)
  }
  const handleSelectOpen = () => {
    setSelect(true)
  }


  const saveHandler = (e) => {
    e.preventDefault();
    setLoading(true)
    CategoryAccountServices.SaveCategoryAccount(props.company.id, currentType, categoryAccount)
      .then(res => {
        setOpen(false)
        swal({
          title: "Insert Data Successfull..",
          icon: "success",
        });
        setLoading(false)
        setRemder(!render)
      })
  }
  const updateHandler = (e) => {
    e.preventDefault();
    setLoading(true)
    CategoryAccountServices.editCategoryAccount(categoryAccount.id, categoryAccount)
      .then(res => {
        setOpen(false)
        swal({
          title: "Update Data Successfull..",
          icon: "success",
        });
        setRemder(!render)
        setLoading(false)
      })
  }

  const handlerChange = (e) => {
    var { name, value } = e.target
    setCategoryAccount({
      ...categoryAccount,
      "code": value + "-"
    })
    SetCurrentType(e.target.value)
  }

  const cancelHandler = () => {
    setRemder(!render)
    setOpen(false)
  }

  const editHandler = (id) => {
    setLoading(true)
    CategoryAccountServices.findCategoryAccountById(id)
      .then(res => {
        setCategoryAccount(res.data)
        setOpen(true)
      }).catch(err => 
        swal({
          title: err,
          icon: "error",
          buttons: true,
          dangerMode: true,
        })
      ).finally( setLoading(false))
  }
  const deleteHandler = (id) => {
    setLoading(true)
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover !",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          CategoryAccountServices.deleteCategoryAccount(id)
            .then(res => {
              setRemder(!render)
            })
          swal(" Your data file has been deleted!", {
            icon: "success",
          });
          setLoading(false)
        } else {
          setLoading(false)
          swal("Your data still safe!");
        }
      });

  }

  const [q, setQ] = useState("")

  function search(rows) { 
    return rows.filter(row => 
      row.code.toLowerCase().indexOf(q) > -1 ||
      row.categoryName.toLowerCase().indexOf(q) > -1);
  }


  return (
    <>
      {loading ?
        <>
          <div id="bg-loading" className="bg-loading" >
            <div id="loading" className="loading"></div>
          </div>
        </>
        : <>

          <div className="col-lg-12 ">
            <h3>List Of Category Account</h3>
            <hr />
          </div>
          <div className="col-lg-12 add-account d-flex justify-content-between">
            <div>
            <div className="form-group">
                <div className="col-lg-12 col-sm-10">
                  <input type="text" className="form-control" id="nickname" name="nickname"
                    placeholder="Seach Account " value={q} onChange={(e)=>setQ(e.target.value)} />
                </div>
              </div>
            </div>
            <div>
              <button variant="contained" className="btn btn-link" onClick={handleOpen}>
                Add New <i class="fas fa-plus ml-2"></i>
              </button>
            </div>
            <Dialog
              open={open}
              onClose={handleClose}
            >
              <div className="col-lg-12 px-5 py-5 ">
                <DialogTitle id="alert-dialog-title" className="font-weight-bold text-center">Add New Category Account</DialogTitle>
                <DialogContent className="mt-3">
                  <form className="form-row">
                    <div className="col-lg-6 ">
                      <InputText htmlnput="# Auto" disabled={true} />
                    </div>
                    <FormControl className="my-2" fullWidth>
                      <InputLabel id="demo-controlled-open-select-label">Type</InputLabel>
                      <Select
                        labelId="demo-controlled-open-select-label"
                        name="type"
                        open={select}
                        onClose={handleSelectClose}
                        onOpen={handleSelectOpen}
                        onChange={handlerChange}
                      >
                        {type.map(t =>
                          <MenuItem key={t.id} name="type" value={t.code}>{t.categoryName}</MenuItem>
                        )}
                      </Select>
                    </FormControl>
                    <FormControl className="my-2" fullWidth>
                      <InputLabel htmlFor="standard-adornment-amount">Code</InputLabel>
                      <Input
                        name="code"
                        value={categoryAccount.code}
                        onChange={changeValue}
                      />
                    </FormControl>
                    <FormControl className="my-2" fullWidth>
                      <InputLabel htmlFor="standard-adornment-amount">Category Name</InputLabel>
                      <Input
                        name="categoryName"
                        value={categoryAccount.categoryName}
                        onChange={changeValue}
                      />
                    </FormControl>

                    {categoryAccount.id === "" ?
                      <div className="col-lg-6 mt-3">
                        <input type="button" className="btn btn-success btn-block" value="Save" onClick={saveHandler} />
                      </div>
                      :
                      <div className="col-lg-6 mt-3">
                        <input type="button" className="btn btn-success btn-block" value="Update" onClick={updateHandler} />
                      </div>
                    }
                    <div className="col-lg-6 mt-3">
                      <input type="button" className="btn btn-danger btn-block" value="Cancel" onClick={cancelHandler} />
                    </div>

                  </form>
                </DialogContent>
              </div>
            </Dialog>
          </div>
          {console.log(listCategoryAccount.length)}
          {listCategoryAccount.length !== 0 ?
            <div className="col-lg-12 cpl-sm-12 col-12 table-account">
              <TableComponent className="table">
                <TableHead className="table">
                  <TableRow className={classes.tableHead}>
                    <TableCell align="center" className={classes.tableHead}>Code</TableCell>
                    <TableCell align="center" className={classes.tableHead}>Category Name</TableCell>
                    <TableCell align="center" className={classes.tableHead}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {search(listCategoryAccount).map((category) => (
                    <TableRow key={category.id} style={{ width: 50 }} className="table-data">
                      <TableCell align="center" className={classes.tableBody}>{category.code}</TableCell>
                      <TableCell align="center" className={classes.tableBody}>{category.categoryName}</TableCell>
                      <TableCell align="center" className={classes.tableBody}>
                        {category.category_default !== 0 ?
                          <>
                            <i class="fas fa-lock"></i>
                          </>
                          :
                          <>
                            <button className="btn btnpl">
                              <i className="fas fa-edit" style={{ fontSize: 12 }} onClick={() => editHandler(category.id)}></i>
                            </button>
                            <button className="btn btn-link">
                              <i className="fas fa-trash" style={{ fontSize: 12 }} onClick={() => deleteHandler(category.id)}></i>
                            </button>
                          </>}

                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </TableComponent>
            </div>
            :
            <div className="col-lg-12">
              <h5 className="text-center text-secondary">No data Record...</h5>
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
export default (connect(mapStateToProps, mapDispatchToProps)(CategoryAccountPage));
