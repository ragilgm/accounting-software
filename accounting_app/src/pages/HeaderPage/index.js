import React from 'react';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },

  }),
);

export default function HeaderPage(props) {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);


  const handleDrawerOpen = () => {
    setOpen(true);
  };



  const HandleLogout = () => {
    history.push("/logout")
  }


  const handleDrawerClose = () => {
    setOpen(false);
  };

  const dashboardHandler = () => { 
    history.push("/home")
  }

  const accountHandler = () => {
    history.push("/account")
  }

  const contactPageHandler = () => {
    history.push("/contact")
  }

  const cashBankHandler = () => { 
    history.push("/cashbank")
  }

  const reportHandler = () => { 
    history.push("/report")
  }
  const salesHandler = () => { 
    history.push("/sales")
  }
  const purchaseHandler = () => { 
    history.push("/purchase")
  }
  const expensesHandler = () => { 
    history.push("/expenses")
  }
  const productHandler = () => { 
    history.push("/product")
  }
  const assetsHandler = () => { 
    history.push("/assets")
  }
  const settingHandler = () => { 
    history.push("/setting")
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar style={{ width: '100%', display: "flex" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >

            <MenuIcon />
          </IconButton>
         

        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <div className="logo-company-dashboad">
          <img src="./logo.jpg" alt="logo"/>
          </div>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {/* master */}
          <ListItem button onClick={dashboardHandler}>
            <ListItemIcon>
            <i className="fas fa-home"></i>
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
         
          </ListItem>
          <ListItem button onClick={reportHandler}>
            <ListItemIcon>
            <i className="far fa-file-alt"></i>
            </ListItemIcon>
            <ListItemText primary="Report" />
          </ListItem>

        </List>
        <Divider />
        <List>
          <ListItem button className={classes.nested} onClick={cashBankHandler}>
            <ListItemIcon>
            <i className="fas fa-university"></i>
            </ListItemIcon>
            <ListItemText primary="Cash & Bank"/>
          </ListItem>
          <ListItem button className={classes.nested} onClick={salesHandler}>
            <ListItemIcon>
            <i className="fas fa-dollar-sign"></i>
            </ListItemIcon>
            <ListItemText primary="Sales"  />
          </ListItem>
          <ListItem button className={classes.nested} onClick={purchaseHandler} >
            <ListItemIcon>
            <i className="fas fa-shopping-basket"></i>
            </ListItemIcon>
            <ListItemText primary="Purchase" />
          </ListItem>
          <ListItem button className={classes.nested} onClick={expensesHandler} >
            <ListItemIcon>
            <i className="far fa-credit-card"></i>
            </ListItemIcon>
            <ListItemText primary="Expenses" />
          </ListItem>
          
          <Divider />
          <ListItem button className={classes.nested} onClick={contactPageHandler}>
            <ListItemIcon>
            <i className="fas fa-address-book"></i>
            </ListItemIcon>
            <ListItemText primary="Contact"  />
          </ListItem>
          <ListItem button className={classes.nested}  onClick={productHandler} >
                <ListItemIcon>
                <i className="fab fa-product-hunt"></i>
                </ListItemIcon>
                <ListItemText primary="Product"/>
              </ListItem>
          <ListItem button className={classes.nested} onClick={assetsHandler} >
                <ListItemIcon>
                <i className="far fa-building"></i>
                </ListItemIcon>
                <ListItemText primary="Setting Assets" />
              </ListItem>
          <ListItem button className={classes.nested} onClick={accountHandler}>
                <ListItemIcon>
                <i className="far fa-list-alt"></i>
                </ListItemIcon>
                <ListItemText primary="List Account"  />
              </ListItem>

          <Divider />
          <ListItem button className={classes.nested} onClick={settingHandler}>
            <ListItemIcon>
            <i className="fas fa-cog"></i>
            </ListItemIcon>
            <ListItemText primary="Setting"  />
          </ListItem>
          <ListItem button className={classes.nested} onClick={HandleLogout}>
            <ListItemIcon>
            <i className="fas fa-user"></i>
            </ListItemIcon>
            <ListItemText primary="Logout"  />
          </ListItem>
        </List>
      </Drawer>
    
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <div className="col-lg-12 col-sm-12">
          {props.children}
        </div>
      </main>
    </div>
  );
}
