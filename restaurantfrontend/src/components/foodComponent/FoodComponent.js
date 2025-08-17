import {useEffect,useState} from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { serverURL,getData,postData } from '../../services/FetchNodeServices';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Paper,Dialog,DialogActions,DialogContent,Button, TextField } from '@mui/material';
import {useDispatch,useSelector} from 'react-redux';


export default function FoodComponent(props) {
  const admin=JSON.parse(localStorage.getItem('ADMIN'));
  const dispatch=useDispatch();

  const foodOrder=useSelector(state=>state.orderData)

  const [listFood,setListFood]=useState([]);
  const [tempListFood,setTempListFood]=useState([]);

  const fetchAllFood=async()=>{
    var result=await postData('fooditem/fetch_all_fooditem_by_category',{restaurantid:admin.restaurantid,categoryid:props.categoryid});
    setListFood(result.data);
    setTempListFood(result.data);
  };

  const searchFood=(e)=>{
    const temp=tempListFood.filter((item)=>item.fooditemname.toLowerCase().includes(e.target.value.toLowerCase()));

    setListFood(temp)
  }

  useEffect(function(){
    fetchAllFood()
  },[props]);

  const handleOrder=(item)=>{
    
    const key=`#${props.floorno}${props.tableno}`;
   
    //foodlist-->foodOrderList
    try{
        let foodOrderList=foodOrder[key];
          try{
            foodOrderList[item.fooditemid].qty=(foodOrderList[item.fooditemid].qty)+1;
          }
          catch(e){
                  item.qty=1;
                  foodOrderList[item.fooditemid]=item;
                  foodOrder[key]=foodOrderList;
          }  
    }
    catch(e)
    {
      var foodOrderList={}
      item.qty=1;
      foodOrderList[item.fooditemid]=item
      foodOrder[key]={...foodOrderList}
    } 
    console.log(foodOrder);

    //dispatch({type:'ADD_ORDER',payload:[key,foodOrder[key]]});
    props.setrefresh(!props.refresh);
  }

  const showFoodInDialog=()=>{
    return listFood.map((item)=>{
      return(
      <div  >
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper',padding:0}}>
          <ListItemButton onClick={()=>handleOrder(item)} alignItems="flex-start" style={{display:'flex',alignItems:'center'}}>

              <ListItemAvatar>
                <Avatar src={`${serverURL}/images/${item.icon}`} sx={{width:30,height:30}}/>
              </ListItemAvatar>

              <ListItemText
                primary={item.fooditemname}
                secondary={ <>{item.price===item.offerprice?<b>&#8377;{item.price}</b>:<><s>&#8377;{item.price}</s><b> &#8377;{item.offerprice}</b></>}</>}
                />

          </ListItemButton>
        </List>
      </div>)
    })  
  }

  const handleDialogClose=()=>{
    props.setopen(false);
  }
  
  const showFoodDialog=()=>{
    return(
     <Dialog maxWidth={'sm'} open={props.open}>
        <DialogContent  >
            <TextField label="Search Food Items..." variant='standard' onChange={(e)=>searchFood(e)}/>
            {showFoodInDialog()}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleDialogClose}>Close</Button>
        </DialogActions>
     </Dialog>
    )}



  return (
    <Paper sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper',boxShadow:'0 0 4px  #222' }}>
      {showFoodDialog()}
    </Paper>
  );
}
