import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import UsersServices from '../../../services/UsersServices'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { connect } from 'react-redux'
import swal from "sweetalert"
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function TableUser(props) {

  const history = useHistory()

  const [currentId, setCurrentId] = useState("")

  var initialUser = {
    name: "",
    username: "",
    email: "",
    role: "",
    active: "",
    password: ""
  }

  const [currentUser, setCurrentUser] = useState(initialUser)


  const editHandler = (id, idx) => {
    setCurrentId(id)
    for (let index = 0; index < props.data.length; index++) {
      const element = props.data[index];
      if (element.id === id) {
        var initialUser = {
          name: element.name,
          username: element.username,
          email: element.email,
          role: element.role,
          active: element.active,
          password: element.password
        }
        setCurrentUser(initialUser)
        break;
      }
    }
  }

  const changeValue = e => {
    var { name, value } = e.target
    setCurrentUser({ ...currentUser, [name]: value })
  }

  const cancelHandler = () => {
    setCurrentId("")
  }
  const updateHandler = () => {
    console.log(currentUser);
    UsersServices.updateUser(currentId, currentUser)
      .then(res => {
        swal({
          title: "Update Successfull..",
          icon: "success",
        });
      }).catch(err => {
        swal({
          title: "Update Failed..",
          icon: "error",
        });
      }).finally(() => {
        setCurrentId("")
        props.render()
      })
  }

  const deleteHandler = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover !",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          UsersServices.deleteUser(id)
            .then(res => {

              swal(" User has been Deleted!", {
                icon: "success",
              });
            }).catch(err => {
              swal({
                title: "Delete Failed..",
                icon: "error",
              });
            }).finally(() => {
              setCurrentId("")
              props.render()
            })

        } else {
          swal("Your data still safe!");
        }
      });


  }

  const [userview, setUserView] = useState("")

  const viewUserDetail = (id) => {
    setIstable(false)
    for (let i = 0; i < props.data.length; i++) {
      const element = props.data[i];
      if (element.id === id) {
        setUserView(element)
      }
    }

  }

  const [isTable, setIstable] = useState(true)
  const backHandler = () => {
    setIstable(true)
    setUserView("")
  }
  const classes = useStyles();

  return (
    <>
      {isTable ?
        <>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Username</TableCell>
                  <TableCell align="center">Password</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Role</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {props.data.map((user, idx) =>
                  <TableRow key={user.id}>
                    {currentId === user.id ?
                      <>
                        <TableCell align="right"><input type="text" className="form-control" name="name" value={currentUser.name} onChange={changeValue} /></TableCell>
                        <TableCell align="right"><input type="text" className="form-control" name="username" value={currentUser.username} onChange={changeValue} /></TableCell>
                        <TableCell align="right"><input type="text" className="form-control" name="password" value={currentUser.password} onChange={changeValue} /></TableCell>
                        <TableCell align="right"><input type="text" className="form-control" name="email" value={currentUser.email} onChange={changeValue} /></TableCell>
                        <TableCell align="right">
                          <select name="role" className="form-control" onChange={changeValue}>
                            <option value={currentUser.role}>{currentUser.role}</option>
                            <option value="admin">admin</option>
                            <option value="purchasing">purchasing</option>
                            <option value="supervisor">supervisor</option>
                            <option value="owner">owner</option>
                          </select>
                        </TableCell>
                        <TableCell align="right">
                          <select name="active" className="form-control" onChange={changeValue}>
                            <option value={currentUser.active}>{currentUser.active}</option>
                            {currentUser.active === "active" ?
                              <>
                                <option value="not active">not active</option>
                              </>
                              :
                              <>
                                <option value="active">active</option>
                              </>}
                          </select>
                        </TableCell>
                        <TableCell align="right">
                          <button className="btn btn-link text-danger" onClick={cancelHandler}>Cancel</button>
                          <button className="btn btn-link text-success" onClick={updateHandler}>Update</button>
                        </TableCell>
                      </>
                      :
                      <>
                        <TableCell align="right">{user.name}</TableCell>
                        <TableCell align="right">{user.username}</TableCell>
                        <TableCell align="right">{user.password}</TableCell>
                        <TableCell align="right">{user.email}</TableCell>
                        <TableCell align="right">{user.role}</TableCell>
                        <TableCell align="right">{user.active}</TableCell>

                        <TableCell align="right">
                          <i className="fas fa-eye mr-1" onClick={() => viewUserDetail(user.id)}></i>
                          <i className="fas fa-pencil-alt mr-1" onClick={() => editHandler(user.id, idx)}></i>
                          <i className="fas fa-trash" onClick={() => deleteHandler(user.id)}></i>
                        </TableCell>
                      </>}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </>
        :
        <>
          <div className="container">
            <div className="header">
              <h3>
                <button className="btn btn-link"
                  style={{ fontSize: 30 }}
                  onClick={backHandler}>
                  <i className="fas fa-chevron-left"></i>
                </button> Back</h3>
            </div>
            <div className="card">
              <div className="col-lg-12">
                <h3 className="text-center">User Detail</h3>
                <div className="col-lg-12 row mt-5">
                  <div className="col-lg-3">
                    <h6>Name :</h6>
                  </div>
                  <div className="col-lg-9">
                    <h6>{userview.name}</h6>
                  </div>
                  <div className="col-lg-3">
                    <h6>Username :</h6>
                  </div>
                  <div className="col-lg-9">
                    <h6>{userview.username}</h6>
                  </div>
                  <div className="col-lg-3">
                    <h6>Email :</h6>
                  </div>
                  <div className="col-lg-9">
                    <h6>{userview.email}</h6>
                  </div>
                  <div className="col-lg-3">
                    <h6>Password :</h6>
                  </div>
                  <div className="col-lg-9">
                    <h6>{userview.password}</h6>
                  </div>
                  <div className="col-lg-3">
                    <h6>Status :</h6>
                  </div>
                  <div className="col-lg-9">
                    <h6>{userview.active}</h6>
                  </div>
                  <div className="col-lg-3">
                    <h6>Join At :</h6>
                  </div>
                  <div className="col-lg-9">
                    <h6>{userview.createdDate}</h6>
                  </div>
                  <div className="col-lg-3">
                    <h6>Role :</h6>
                  </div>
                  <div className="col-lg-9">
                    <h6>{userview.role}</h6>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </>}
    </>
  );
}


const mapStateToProps = (state) => ({
  companyId: state.AuthReducer.company,
  userLogin: state.AuthReducer.userLogin,
  isLogin: state.AuthReducer.isLogin
})

const mapDispatchToProps = (dispatch) => ({
  loginUser: (user, company) => dispatch({ type: "LOGIN", payload: user, isLogin: true, company: company }),
})


export default connect(mapStateToProps, mapDispatchToProps)(TableUser);