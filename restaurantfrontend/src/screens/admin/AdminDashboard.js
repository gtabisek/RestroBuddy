import { useStyles } from "./AdminDashboardCss";
import { Avatar,AppBar,Box,Toolbar,Typography,Grid,Paper } from "@mui/material";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import DraftsIcon from '@mui/icons-material/Drafts';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TableBarIcon from '@mui/icons-material/TableBar';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BentoIcon from '@mui/icons-material/Bento';
import AttributionIcon from '@mui/icons-material/Attribution';

import CategoryInterface from "../category/CategoryInterface";
import DisplayAllCategory from "../category/DisplayAllCategory";
import FoodItemInterface from "../fooditem/FoodItemInterface";
import DisplayAllFoodItem from "../fooditem/DisplayAllFoodItem";
import TableBookingInterface from "../tablebooking/TableBookingInterface";
import DisplayAllTable from "../tablebooking/DisplayAllTable";
import WaiterInterface from "../waiter/WaiterInterface";
import DisplayAllWaiter from "../waiter/DisplayAllWaiter";
import WaiterTableInterface from "../waitertable/WaiterTableInterface";
import DisplayAllWaiterTable from "../waitertable/DisplayAllWaiterTable";
import FoodBooking from "../foodbooking/FoodBooking";
import AllSales from "../allsales/AllSales";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

import { Routes,Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { serverURL } from "../../services/FetchNodeServices";
import Summary from "./Summary";

export default function AdminDashboard(props){
  const classes=useStyles();
  const navigate=useNavigate();
  const admin=JSON.parse(localStorage.getItem('ADMIN'));

  const handleLogout=()=>{
    localStorage.clear();
    navigate('/adminlogin');
  }

  return(
    <Box sx={{ flexGrow: 1 }} >
        <AppBar position="sticky"> 
          <Toolbar variant="dense"> 
            <Typography variant="h6" color="inherit" component="div">
              { admin.restaurantname}
            </Typography>
          </Toolbar>
        </AppBar>
        
        <Grid container spaces={3} style={{paddingInlineStart:5}} >

          {/*//! side bar menu starts from here   //////////////////////////////////////////////////////*/}
          <Grid item xs={1.8} >
            <Paper sx={{ bgcolor:'background.paper',boxShadow:'0 0 4px  #222' }}>
              <div className={classes.leftBarStyle}>
                <Avatar src={`${serverURL}/images/${admin.filelogo}`} variant="rounded" style={{width:80,height:80}}/> 
                <div className={classes.nameStyle}>{admin.ownername}</div>
                <div className={classes.emailStyle}>{admin.emailid}</div>
                <div className={classes.phoneStyle}>+91 {admin.mobileno}</div>
              </div>
              <div className={classes.menuStyle}>
                <List>
                   <Divider />

                   {/*//! side bar menu links   /////////////////////////////////////////////////////////*/}
                  <ListItem disablePadding>
                    <ListItemButton onClick={()=>navigate('/admindashboard/Summary')}>
                      <ListItemIcon>
                        <DashboardIcon />
                      </ListItemIcon>
                      <ListItemText primary={<span className={classes.menuItemStyle}>Dashboard</span>} />
                    </ListItemButton>
                  </ListItem>
                                  
                  <ListItem disablePadding>
                    <ListItemButton onClick={()=>navigate('/admindashboard/displayallcategory')}>
                      <ListItemIcon>
                        <BentoIcon />
                      </ListItemIcon>
                      <ListItemText primary={<span className={classes.menuItemStyle}>Category List</span>} />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton onClick={()=>navigate('/admindashboard/displayallfooditem')}>
                      <ListItemIcon>
                        <MenuBookIcon />
                      </ListItemIcon>
                      <ListItemText primary={<span className={classes.menuItemStyle}>Food Item List</span>} />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton onClick={()=>navigate('/admindashboard/displayalltable')}>
                      <ListItemIcon>
                        <TableBarIcon />
                      </ListItemIcon>
                      <ListItemText primary={<span className={classes.menuItemStyle}>Table List</span>} />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton onClick={()=>navigate('/admindashboard/displayallwaiter')}>
                      <ListItemIcon>
                        <AttributionIcon/>
                      </ListItemIcon>
                      <ListItemText primary={<span className={classes.menuItemStyle}>Waiter List</span>} />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton onClick={()=>navigate('/admindashboard/displayallwaitertable')}>
                      <ListItemIcon>
                        <AttributionIcon/>
                      </ListItemIcon>
                      <ListItemText primary={<span className={classes.menuItemStyle}>WaiterTable List</span>} />
                    </ListItemButton>
                  </ListItem>

                  <Divider />
                  <ListItem disablePadding>
                    <ListItemButton onClick={()=>navigate('/admindashboard/foodbooking')}>
                      <ListItemIcon>
                        <ShoppingBasketIcon />
                      </ListItemIcon>
                      <ListItemText primary={<span className={classes.menuItemStyle}>Food Order</span>} />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton onClick={()=>navigate('/admindashboard/allsales')}>
                      <ListItemIcon>
                        <MonetizationOnIcon />
                      </ListItemIcon>
                      <ListItemText primary={<span className={classes.menuItemStyle}>Sales Report</span>} />
                    </ListItemButton>
                  </ListItem>

                  <Divider />
                  <ListItem disablePadding>
                    <ListItemButton onClick={handleLogout}>
                      <ListItemIcon>
                        <LogoutIcon />
                      </ListItemIcon>
                      <ListItemText primary={<span className={classes.menuItemStyle}>Logout</span>} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </div> 
            </Paper>
          </Grid> 

          <Grid item xs={10.2} style={{paddingLeft:5,paddingTop:10,height:'auto'}} >
            
            <Routes>
              <Route element={<Navigate to="/admindashboard/summary" replace={true}/>} path="/"/>
              <Route element={<CategoryInterface/>} path='/categoryinterface'/>
              <Route element={<DisplayAllCategory/>} path='/displayallcategory'/>
              <Route element={<FoodItemInterface/>} path='/fooditeminterface'/>
              <Route element={<DisplayAllFoodItem/>} path='/displayallfooditem'/>
              <Route element={<TableBookingInterface/>} path='/tablebookinginterface'/>
              <Route element={<DisplayAllTable/>} path='/displayalltable'/>
              <Route element={<WaiterInterface/>} path='/waiterinterface'/>
              <Route element={<DisplayAllWaiter/>} path='/displayallwaiter'/>
              <Route element={<WaiterTableInterface/>} path='/waitertableinterface'/>
              <Route element={<DisplayAllWaiterTable/>} path='/displayallwaitertable'/>
              <Route element={<FoodBooking/>} path='/foodbooking'/>
              <Route element={<AllSales/>} path='/allsales'/>
              <Route element={<Summary/>} path='/summary' />
            </Routes> 
          </Grid>
        </Grid>
    </Box>
  )
}