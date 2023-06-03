import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Route, Routes} from "react-router";
import {collection, getDocs, query} from "@firebase/firestore";
import {styled, createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogOut from "./logout/logOut";
import {db} from "../../../firebaseService";
import AssignmentIcon from '@mui/icons-material/Assignment';
import GarageIcon from '@mui/icons-material/Garage';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {Link} from "react-router-dom";
import selectPng from '../../../assets/images/select.png'
import CarBrands from '../../carDate/brandCar'
import CarModels from "../../carDate/modelCars";
import ListCars from "./list-car/list";
import TypeForm from "./pages/typeform";
import BrandForm from "./pages/brandForm";
import EditAndCreateCar from "./pages/editAndCreateCar";

const drawerWidth = 200;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
  ({theme, open}) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);
const mdTheme = createTheme();

const DashboardContent = () => {

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [showTable, setShowTable] = useState(false);
  const [showModalType, setShowModalType] = useState(false);
  const [showBrandTypes, setShowBrandTypes] = useState(false);
  const [adminName, setAdminName] = useState('');
  const [logOut, setLogOut] = useState(false);

  useEffect(() => {
    (async () => {
      const colRef = await collection(db, "admin");
      let q = await query(colRef);
      const docsSnap = await getDocs(q);
      let admin = {};
      docsSnap.forEach(doc => {
        admin = doc.data();
      });
      setAdminName(admin.name);
    })();
  }, []);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{display: 'flex'}}>
        <CssBaseline/>
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px',
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && {display: 'none'}),
              }}
            >
              <img src={selectPng} alt=""/>
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{flexGrow: 1}}
            >
            </Typography>
            <Box sx={{minWidth: 120, backgroundColor: "while"}}>
              <FormControl fullWidth>
                <Select
                  style={{backgroundColor: 'white', fontSize: 17, height: 35}}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={adminName}
                  onChange={() => setLogOut(true)}
                >
                  <MenuItem style={{fontSize: 17}} selected disabled value={adminName}>{adminName}</MenuItem>
                  <MenuItem style={{fontSize: 17}} value={true}>Log Out</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <img src={selectPng} alt=""/>
            </IconButton>
          </Toolbar>
          <Divider/>
          <List component="nav">
            <Link style={{textDecoration: 'none'}} to="/admin/cars/list">
              <ListItemButton
                style={{color: showTable ? 'red' : 'black'}}
                onClick={() => {
                  setShowTable(true);
                  setShowModalType(false);
                  setShowBrandTypes(false);
                }}
              >
                <ListItemIcon>
                  <AssignmentIcon style={{fontSize: "large"}}/>
                </ListItemIcon>
                <ListItemText sx={{fontSize: 17}} disableTypography>Car List</ListItemText>
              </ListItemButton>
            </Link>
            <Link style={{textDecoration: 'none'}} to="/admin/cars/brands">
              <ListItemButton
                style={{color: showModalType ? 'red' : 'black', fontSize: "large"}}
                onClick={() => {
                  setShowModalType(true);
                  setShowBrandTypes(false);
                  setShowTable(false);
                }}
              >
                <ListItemIcon>
                  <GarageIcon style={{fontSize: "large"}}/>
                </ListItemIcon>
                <ListItemText sx={{fontSize: 17}} disableTypography>Car Brands</ListItemText>
              </ListItemButton>
            </Link>
            <Link style={{textDecoration: 'none'}} to="/admin/cars/models">
              <ListItemButton
                style={{color: showBrandTypes ? 'red' : 'black'}}
                onClick={() => {
                  setShowBrandTypes(true);
                  setShowModalType(false);
                  setShowTable(false);
                }}
              >
                <ListItemIcon>
                  <DepartureBoardIcon style={{fontSize: "large"}}/>
                </ListItemIcon>
                <ListItemText sx={{fontSize: 17}} disableTypography>Car Models</ListItemText>
              </ListItemButton>
            </Link>
            <Divider sx={{my: 1}}/>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar/>
          <Container maxWidth="1000" sx={{mt: 4, mb: 4}}>
            <div>
              <div className='m-0'>
                {logOut && <LogOut logOut={logOut} setLogOut={setLogOut}/>}
              </div>
            </div>
            <Routes>
              <Route path="/list/*" element={<ListCars setShowModalType={setShowModalType}/>}/>
              <Route path="/brands" element={<CarBrands setShowModalType={setShowModalType}/>}/>
              <Route path="/models" element={<CarModels/>}/>
              <Route path='/brands/add' element={<TypeForm/>}/>
              <Route path='/models/add' element={<BrandForm/>}/>
              <Route path='/:id' element={<EditAndCreateCar/>}/>
            </Routes>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

const mapStateToProps = state => {
  return {
    cars: state.car.cars,
    car: state.car.car,
    carDocs: state.car.carDocs,
    type: state.type.types,
    errorMessage: state.car.error
  }
};

export default connect(mapStateToProps, null)(DashboardContent);





