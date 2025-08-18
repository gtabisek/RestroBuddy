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
import { Paper } from '@mui/material';
import FoodComponent from '../foodComponent/FoodComponent';

export default function CategoryComponent(props) {
  const admin=JSON.parse(localStorage.getItem('ADMIN'));

  const [listCategory,setListCategory]=useState([]);
  const [categoryId,setCategoryId]=useState('');
  const [open,setOpen]=useState(false);

  const fetchAllCategory=async()=>{
    var result=await postData('category/fetch_all_category',{restaurantid:admin.restaurantid})
    setListCategory(result.data)
  };
   
  const handleFoodListDialog=(cid)=>{
    setCategoryId(cid);
    setOpen(true);
  }

  useEffect(function(){
    fetchAllCategory()
  },[]);

  const showCategoryList=()=>{
    return listCategory.map((item)=>{
      return(
        <div  >
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper',padding:0}}>

            <ListItemButton alignItems="flex-start" style={{display:'flex',alignItems:'center'}} onClick={()=>handleFoodListDialog(item.categoryid)}>

                <ListItemAvatar>
                  <Avatar src={`${serverURL}/images/${item.icon}`} sx={{width:30,height:30}}/>
                </ListItemAvatar>

                <ListItemText
                  primary={item.categoryname} />

            </ListItemButton>
          </List>
        </div>
      )
    })  
  }

  return (
    <Paper sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper',boxShadow:'0 0 4px  #222' }}>
      {showCategoryList()}
      <FoodComponent categoryid={categoryId} setopen={setOpen} open={open} tableno={props.tableno} floorno={props.floorno} refresh={props.refresh} setrefresh={props.setrefresh}/>
    </Paper>
  );
}
