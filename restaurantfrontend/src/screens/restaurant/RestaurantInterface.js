import { useState,useEffect } from "react";
import { Avatar,Grid,TextField,Button,Select,FormHelperText } from "@mui/material";
import { makeStyles } from '@mui/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import UploadIcon from '@mui/icons-material/Upload';

import Swal from 'sweetalert2';
import { serverURL,getData,postData} from "../../services/FetchNodeServices";
import Heading from "../../components/heading/Heading";
import { UploadFile } from "@mui/icons-material";

const useStyles = makeStyles({
  root: {
    width:"auto",
    height:"100%",
    background:"#dfe4ea",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    paddingBlock:'10px'
  },
  box:{
    width:"70%",
    height:"auto",
    borderRadius:10,
    background:"#fff",
    padding:15
  },
  center:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  }
});

function RestaurantInterface(){

  const classes=useStyles()
  const [states,setStates]=useState([]);
  const [cities,setCities]=useState([]);
  const [stateid,setStateId]=useState('');

  const [cityid,setCityId]=useState('');
  const [restaurantName,setRestaurantName]=useState('');
  const [ownerName,setOwnerName]=useState('');
  const [phoneNumber,setPhoneNumber]=useState('');
  const [emailid,setEmailid]=useState('');
  const [mobileNumber,setMobileNumber]=useState('');
  const [url,setUrl]=useState('');
  const [fssai,setFssai]=useState('');
  const [gstNo,setGstNo]=useState('');
  const [gstType,setGstType]=useState('')
  const [fileFssai,setFileFssai]=useState({url:'',bytes:''})
  const [fileShopAct,setFileShopAct]=useState({url:'',bytes:''})
  const [fileLogo,setFileLogo]=useState({url:'',bytes:''})
  const [address,setAddress]=useState('');
  const [resError,setResError]=useState({});

  const handleReset=()=>{
    setRestaurantName('')
    setOwnerName('')
    setPhoneNumber('')
    setMobileNumber('')
    setEmailid('')
    setAddress('')
    setStateId('-Select State-')
    setCityId('-Select City-')
    setAddress('')
    setFileLogo({ url: "", bytes: "" })
    setUrl('')
    setFssai('')
    setGstNo('')
    setGstType('-Select Gst Type-')
    setFileShopAct({ url: "", bytes: "" })
    setFileFssai({ url: "", bytes: "" })
   }

   const generatePassword=()=>{
      const pwd=(Math.random()*8999)+1000;
      return parseInt(pwd)
   }

  const handleError = (error,input,message)=>{
    setResError(prevState => ({...prevState,[input]:{'error':error,'message':message}}));
    //console.log("CC",resError);
  }

  function validation(){
    let submitRecord=true;
    if(restaurantName.trim().length===0)
    {
      handleError(true,'restaurantName',"please Input Restaurant Name")
      submitRecord=false
    }
    if(ownerName.trim().length===0)
    {
      handleError(true,'ownerName',"please Input Owner Name")
      submitRecord=false
    }
    if(!mobileNumber || !(/^[0-9]{10}$/).test(mobileNumber))
    {
      handleError(true,'mobileNumber',"Please Input 10 digit Mobile Number")
       
      submitRecord=false
    }
    if(!emailid || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailid)))
    {
      handleError(true,'emailid',"Please Input Correct Email Address")
       
      submitRecord=false 
    }
    if(address.trim().length===0)
    {
      handleError(true,'address',"please input address")

      submitRecord=false;
    }
    if(!stateid)
    {
      handleError(true,'stateid','please select State')

      submitRecord=false
    }
    if(!fileFssai.url)
    {
      handleError(true,'fileFssai','Please Upload Fssai')

      submitRecord=false
    }
    return submitRecord
  }

  const fetchAllStates=async()=>{
     const result=await getData('statecity/fetch_all_states');
     setStates(result.data);
    //  console.log(result.data);
  }

  useEffect(function(){
      fetchAllStates()  
  },[])

  const fillState=()=>{
    return states.map((item)=>{
      return <MenuItem value={item.stateid}>{item.statename}</MenuItem>
    });
  }

  const fetchAllCities=async(stateid)=>{
    const body={stateid:stateid}
    const result=await postData('statecity/fetch_all_cities',body);
    setCities(result.data)
  }

  const fillCities=()=>{
    return cities.map((item)=>{
      return <MenuItem value={item.cityid}>{item.cityname}</MenuItem>
    });
  }

  const handleStateChange=(event)=>{
    setStateId(event.target.value);
    fetchAllCities(event.target.value);
  }

  const handleFssai=(event)=>{
    setFileFssai({url:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
  }
  const handleShopAct=(event)=>{
    setFileShopAct({url:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
  }
  const handleLogo=(event)=>{
    setFileLogo({url:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
  }
  const handleSubmit=async()=>{
      if(validation()){
        const formData=new FormData();
        formData.append('restaurantname',restaurantName);
        formData.append('ownername',ownerName);
        formData.append('phonenumber',phoneNumber);
        formData.append('emailid',emailid);
        formData.append('mobileno',mobileNumber);
        formData.append('address',address);
        formData.append('stateid',stateid);
        formData.append('cityid',cityid);
        formData.append('url',url);
        formData.append('fssai',fssai);
        formData.append('gstno',gstNo);
        formData.append('gsttype',gstType);
        formData.append('filelogo',fileLogo.bytes);
        formData.append('fileshopact',fileShopAct.bytes);
        formData.append('filefssai',fileFssai.bytes);
        formData.append('password',generatePassword())
        const d=new Date();
        const cd=d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
        formData.append('createdat',cd);
        formData.append('updatedat',cd);

        const result=await postData('restaurants/restaurant_submit',formData);
        
        if(result.status)
        {
          Swal.fire({
            icon: 'success',
            title: 'Restaurant Registration',
            text: result.message
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

  return(<div className={classes.root}>
            <div className={classes.box}>
                <Grid container spacing={1.5}>

                    <Grid item xs={12} className={classes.heading}>
                      <Heading title={"Restaurant Register"}/>
                    </Grid>

                    <Grid item xs={6}>
                      <TextField 
                      onFocus={()=>handleError(false,'restaurantName','')}
                      error={resError?.restaurantName?.error}
                      helperText={resError?.restaurantName?.message}
                      label="Restaurant Name" value={restaurantName} onChange={(event)=>setRestaurantName(event.target.value)} fullWidth
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField 
                      onFocus={()=>handleError(false,'ownerName','')}
                      error={resError?.ownerName?.error}
                      helperText={resError?.ownerName?.message}
                      onChange={(event)=>setOwnerName(event.target.value)} 
                      label="Owner Name" value={ownerName} fullWidth/>
                    </Grid>

                    <Grid item xs={4}>
                      <TextField onChange={(event)=>setPhoneNumber(event.target.value)} label="Phone Number" value={phoneNumber} fullWidth/>
                    </Grid>

                    <Grid item xs={4}>
                      <TextField 
                      onFocus={()=>handleError(false,'mobileNumber','')}
                      error={resError?.mobileNumber?.error}
                      helperText={resError?.mobileNumber?.message}
                      onChange={(event)=>setMobileNumber(event.target.value)} 
                      label="Mobile Number" value={mobileNumber} fullWidth/>
                    </Grid>

                    <Grid item xs={4}>
                      <TextField
                      onFocus={()=>handleError(false,'emailid','')}
                      error={resError?.emailid?.error}
                      helperText={resError?.emailid?.message}
                      label="Email Address" value={emailid} onChange={(event)=>setEmailid(event.target.value)} fullWidth/>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                      onFocus={()=>handleError(false,'address','')}
                      error={resError?.address?.error}
                      helperText={resError?.address?.message}
                      onChange={(event)=>setAddress(event.target.value)} label="Address" value={address} fullWidth/>
                    </Grid>

                    <Grid item xs={4}>
                      <FormControl fullWidth>
                        <InputLabel>States</InputLabel>
                        <Select 
                        onFocus={()=>handleError(false,'stateid','')}
                        error={resError?.stateid?.error}
                        helperText={resError?.stateid?.message}
                        onChange={handleStateChange} value={stateid} label="States">
                          <MenuItem>-Select State-
                          </MenuItem>
                          {fillState()}
                        </Select>
                        <FormHelperText style={{color:"#d32f2f"}}>
                        {resError?.stateid?.message}
                        </FormHelperText>
                      </FormControl>
                      {//resError?.stateid?.error?<div>{resError?.stateid?.message}</div>:<></>
                      }
                    </Grid>

                    <Grid item xs={4}>
                      <FormControl fullWidth>
                        <InputLabel>City</InputLabel>
                        <Select label="city" onChange={(event)=>setCityId(event.target.value)} value={cityid}>
                          <MenuItem>-Select City-
                          </MenuItem>
                          {fillCities()}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={4}>
                       <TextField onChange={(event)=>setUrl(event.target.value)} label="URL" value={url}fullWidth/>
                    </Grid>

                    <Grid item xs={4}>
                      <TextField onChange={(event)=>setFssai(event.target.value)} label="Fssai Number" value={fssai} fullWidth/>
                    </Grid>

                    <Grid item xs={4}>
                      <TextField onChange={(event)=>setGstNo(event.target.value)} label="GST Number" value={gstNo} fullWidth/>
                    </Grid>

                    <Grid item xs={4}>
                      <FormControl fullWidth>
                        <InputLabel>GST Type</InputLabel>
                        <Select label="GST Type" value={gstType} onChange={(event)=>setGstType(event.target.value)}>
                          <MenuItem>-Select Gst Type-</MenuItem>
                          <MenuItem value="28">5 Star</MenuItem>
                          <MenuItem value="18">3 Star</MenuItem>
                          <MenuItem value="5">Other</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    
                    <Grid item xs={4}>
                      <Button fullWidth component="label" variant="contained" 
                      endIcon={<UploadIcon/>}>       
                      <input 
                      onFocus={()=>handleError(false,'fileFssai','')}
                      hidden onChange={handleFssai} accept="image/*" multiple type="file"/>
                      Upload Fssai
                      </Button>
                      {
                      resError?.fileFssai?.error?<div style={{color:"#d32f2f",fontFamily:'sans-serif',fontSize:'12px',margin:"4px 14px 0px"}}>{resError?.fileFssai?.message}</div>:<></>
                      }
                    </Grid>

                    <Grid item xs={4}>
                      <Button fullWidth component="label" variant="contained" endIcon={<UploadIcon/>}>
                      <input hidden onChange={handleShopAct} 
                      accept="image/*" multiple type="file"/>
                      Upload Shop Act
                      </Button>
                    </Grid>

                    <Grid item xs={4}>
                      <Button fullWidth component="label" variant="contained" 
                      endIcon={<UploadIcon/>}>
                      <input hidden onChange={handleLogo} accept="image/*" multiple type="file"/>
                      Upload Logo
                      </Button>
                    </Grid>

                    <Grid item xs={4} className={classes.center}>
                      <Avatar
                        variant="rounded"
                        alt="Remy Sharp"
                        src={fileFssai.url}
                        sx={{ width: 56, height: 56 }}
                      />
                    </Grid>

                    <Grid item xs={4} className={classes.center}>
                      <Avatar
                        variant="rounded"
                        alt="Remy Sharp"
                        src={fileShopAct.url}
                        sx={{ width: 56, height: 56 }}
                      />
                    </Grid>

                    <Grid item xs={4} className={classes.center}>
                      <Avatar
                        variant="rounded"
                        alt="Remy Sharp"
                        src={fileLogo.url}
                        sx={{ width: 56, height: 56 }}
                      />
                    </Grid>
                    
                    
                      <Grid item xs={6}>
                        <Button onClick={handleSubmit} variant="contained" fullWidth>Submit</Button> 
                      </Grid>
                      <Grid item xs={6}>
                        <Button variant="contained" fullWidth onClick={handleReset}>Reset</Button>
                      </Grid>
                    

                </Grid>
            </div>
         </div>)
}

export default RestaurantInterface;