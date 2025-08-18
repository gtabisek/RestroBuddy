import {useEffect, useState} from 'react';
import { postData } from '../../services/FetchNodeServices';
import { Avatar,Grid,TextField,Button } from "@mui/material"
import { useStyles } from "./CategoryInterfaceCss";
import Heading from "../../components/heading/Heading";
import UploadFile from '@mui/icons-material/UploadFile';
import Swal from 'sweetalert2'

export default function CategoryInterface()
{ const classes=useStyles();
  const admin=JSON.parse(localStorage.getItem('ADMIN'));

  ///? useStates///////////////////////////
  const [restaurantId,setRestaurantId]=useState("");
  const [categoryName,setCategoryName]=useState("");
  const [icon,setIcon]=useState({url:'',bytes:''});
  const [categoryError,setCategoryError]=useState({});

  useEffect(function(){
    setRestaurantId(admin.restaurantid)
  },[])

  const handleError=(error,input,message)=>{
    setCategoryError(prevState => ({...prevState, [input]:{'error':error,'message':message}}));

  };

  const validation=()=>
  {  let submitRecord=true

     if(restaurantId.length==0)
     {
      handleError(true,'restaurantId',"Pls Input Restaurant Id"); 
      submitRecord=false;
     }

     if(categoryName.trim().length==0)
     //if(!categoryName)
     {
      
      handleError(true,'categoryName',"Pls Input Category Name"); 
      submitRecord=false;
     }
     if(!icon.url)
    {
     handleError(true,'icon',"Pls Upload Icon")
      
     submitRecord=false
    }
    
    return submitRecord
  } 

  const handleIcon=(event)=>{
    setIcon({url:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})  
  }

  ///? formData///////////////////////////
  const handleSubmit=async()=>
  {
    if(validation()){
    var formData=new FormData()
    formData.append('restaurantid',restaurantId);
    formData.append('categoryname',categoryName);
    formData.append('icon',icon.bytes)
    
    var result=await postData('category/category_submit',formData);
    if(result.status)
    {
      Swal.fire({
        icon: 'success',
        title: 'Category Registration',
        text: result.message,
        
      })
      
    }
    else
    {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: result.message,

      })
      
    }
    }
  }

  return(<div className={classes.root} >
    <div className={classes.box}>

    <Grid container spacing={2}>
        
        <Grid item xs={12}>
          <Heading title={"Register Category"} myroute={'/admindashboard/displayallcategory'}/>
        </Grid>

        <Grid item xs={12}>
          <TextField 
           value={admin.restaurantid}
           disabled
            fullWidth/>
        </Grid>

        <Grid item xs={12}>
          <TextField onChange={(event)=>setCategoryName(event.target.value)} 
          onFocus={()=>handleError(false,'categoryName','')}
          error={categoryError?.categoryName?.error}
          helperText={categoryError?.categoryName?.message}
          label="Category Name" fullWidth/>
        </Grid>

        <Grid item xs={6}>     
          <Button fullWidth component="label" variant="contained" endIcon={<UploadFile />}>
          <input hidden onChange={handleIcon}
              accept="image/*"
              type="file"
              onFocus={()=>handleError(false,'icon','')}
          />
            Upload Icon
          </Button>
          {categoryError?.icon?.error?<div style={{color:"#d32f2f",fontFamily:'sans-serif',fontSize:'12px',margin:"4px 14px 0px"}}>{categoryError?.icon?.message}</div>:<></> }
        </Grid>
        <Grid item xs={6}>
            </Grid>

        <Grid item xs={6} className={classes.center}>
            <Avatar
              variant="rounded"
              alt="Remy Sharp"
              src={icon.url}
              sx={{ width: 56, height: 56 }}
            />
          </Grid>

            <Grid item xs={6}>
            </Grid>
        
            <Grid item xs={6}>
            <Button variant="contained" fullWidth onClick={handleSubmit}>Submit</Button>
           </Grid> 
           <Grid item xs={6}>
            <Button variant="contained" fullWidth>Reset</Button>
           </Grid>     

    </Grid>
    </div>
</div>)
}