import {useState,useEffect} from 'react'
import MaterialTable from "@material-table/core"
import { makeStyles } from '@mui/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { Snackbar,Avatar,Grid,TextField,Button,Select,FormHelperText } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import UploadIcon from '@mui/icons-material/Upload';
import Swal from 'sweetalert2';
import { serverURL,getData,postData} from "../../services/FetchNodeServices";
import Heading from "../../components/heading/Heading";
import { UploadFile } from "@mui/icons-material";

//////////////?styles/////////////
const useStyles = makeStyles({
  rootdisplay: {
    width:"auto",
    height:"auto",
    background:"#dfe4ea",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    paddingBlock:'25px'
  },
  boxdisplay:{
    width:"92%",
    height:"auto",
    borderRadius:10,
    background:"#fff",
    padding:8
  },
  root: {
    
    background:"#dfe4ea",
    display:"flex",
    alignItems:"center",
    justifyContent:"center"
  },
  box:{
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

////////////////////? getter & setter for edit/////////
export default function DisplayAllRestaurant()
{ const classes = useStyles();
  const [listRestaurant,setListRestaurant]=useState([]);
  const [open,setOpen]=useState(false)
  ////////? Restaurant data ///////////////////////////
  const [states,setStates]=useState([]);
  const [cities,setCities]=useState([]);
  const [stateid,setStateId]=useState('');

  const [cityid,setCityId]=useState('');
  const [restaurantId,setRestaurantId]=useState('');
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
  const [fileLogo,setFileLogo]=useState({url:'',bytes:''});
  const [tempFile,setTempFile]=useState({fssai:'',shopAct:'',logo:''})
  const [address,setAddress]=useState('')
  const [resError,setResError]=useState({});
  const [btnStatus,setBtnStatus]=useState({fssai:false,shopAct:false,logo:false});



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
    setFileFssai({url:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]});
    setBtnStatus((prev)=>({...prev,fssai:true}));
  }

  const handleShopAct=(event)=>{
    setFileShopAct({url:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]});
    setBtnStatus((prev)=>({...prev,shopAct:true}));
  }

  const handleLogo=(event)=>{
    setFileLogo({url:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]});
    setBtnStatus((prev)=>({...prev,logo:true}));
  };

  //////////?....form data////////////////////////////////////////////

  const handleSubmit=async()=>{

      if(validation()){

        const d=new Date();
        const cd=d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate(); 

        const body={'restaurantname':restaurantName,
        'ownername':ownerName,
        'phonenumber':phoneNumber,
        'emailid':emailid,
        'mobileno':mobileNumber,
        'address':address,
        'stateid':stateid,
        'cityid':cityid,
        'url':url,
        'fssai':fssai,
        'gstno':gstNo,
        'gsttype':gstType,
        'updatedat':cd,
        'restaurantid':restaurantId
        }

        const result=await postData('restaurants/restaurant_edit_data',body);
        
        if(result.status)
        {
          Swal.fire({
            icon: 'success',
            title: 'Restaurant Registration',
            text: result.message,
            position:'top-end',
            timer:5000,
            showConfirmButton:false,
            toast:true
          })
         // setOpen(false)
        }
        else
        {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: result.message,
            position:'top-end',
            timer:5000,
            showConfirmButton:false,
            toast:true
          })
         
        }
      } 
      //fetchAllRestaurant()   
  }
  //////////////////?.////////////////////////////////////
  const handleCancel=(imgStatus)=>{
    if(imgStatus==1)
    {
    setBtnStatus((prev)=>({...prev,fssai:false}));
    setFileFssai({url:tempFile.fssai,bytes:''})
    }
    else if(imgStatus==2)
    {
    setBtnStatus((prev)=>({...prev,shopAct:false}));
    setFileShopAct({url:tempFile.shopAct,bytes:''})
    } 
    else if(imgStatus==3)
    {
    setBtnStatus((prev)=>({...prev,logo:false}));
    setFileLogo({url:tempFile.logo,bytes:''})
    }   
  }

  const editImage=async(imgStatus)=>{
    if(imgStatus==1)
    {
    const formData = new FormData();
    formData.append('restaurantid',restaurantId);
    formData.append('filefssai',fileFssai.bytes);
    
    const result=await postData('restaurants/restaurant_edit_fssai',formData)

    if(result.status)
    {  
      Swal.fire({
        icon:'success',
        title:'Restaurant Registration',
        text:result.message,
        position:'top-end',
            timer:5000,
            showConfirmButton:false,
            toast:true
      })
    }
    else{
      Swal.fire({
        icon:'error',
        title:'Oops........',
        text:result.message,
        position:'top-end',
            timer:5000,
            showConfirmButton:false,
            toast:true
      })
    }
    setBtnStatus((prev)=>({...prev,fssai:false}));
    }
    else if(imgStatus==2)
    {
    const formData = new FormData();
    formData.append('restaurantid',restaurantId);
    formData.append('fileshopact',fileShopAct.bytes);
    
    const result=await postData('restaurants/restaurant_edit_shopact',formData)

    if(result.status)
    {  
      Swal.fire({
        icon:'success',
        title:'Restaurant Registration',
        text:result.message,
        position:'top-end',
            timer:5000,
            showConfirmButton:false,
            toast:true
      })
    }
    else{
      Swal.fire({
        icon:'error',
        title:'Oops........',
        text:result.message,
        position:'top-end',
            timer:5000,
            showConfirmButton:false,
            toast:true
      })
    }
    setBtnStatus((prev)=>({...prev,shopAct:false}));
    }
    else if(imgStatus==3)
    {
    const formData = new FormData();
    formData.append('restaurantid',restaurantId);
    formData.append('filelogo',fileLogo.bytes);
    
    const result=await postData('restaurants/restaurant_edit_logo',formData)

    if(result.status)
    {  
      Swal.fire({
        icon:'success',
        title:'Restaurant Registration',
        text:result.message,
        position:'top-end',
            timer:5000,
            showConfirmButton:false,
            toast:true
      })
    }
    else{
      Swal.fire({
        icon:'error',
        title:'Oops........',
        text:result.message,
        position:'top-end',
            timer:5000,
            showConfirmButton:false,
            toast:true
      })
    }
    setBtnStatus((prev)=>({...prev,logo:false}));
    }
    // fetchAllRestaurant()
}

  const editDeleteButton=(imgStatus)=>{
    return(<div>
      <Button onClick={()=>editImage(imgStatus)}>Edit</Button>
      <Button onClick={()=>handleCancel(imgStatus)}>Cancel</Button>
    </div>)
  }

  const fetchAllRestaurant=async()=>{
    var result=await getData('restaurants/fetch_all_restaurant')
    setListRestaurant(result.data)
  }
  const handleDialogClose=()=>{
    setOpen(false);
    fetchAllRestaurant()
  }

  const handleEdit=(rowData)=>{
    fetchAllCities(rowData.stateid);
    setRestaurantId(rowData.restaurantid);
    setRestaurantName(rowData.restaurantname);
    setOwnerName(rowData.ownername);
    setPhoneNumber(rowData.phonenumber);
    setMobileNumber(rowData.mobileno);
    setEmailid(rowData.emailid);
    setAddress(rowData.address);
    setStateId(rowData.stateid);
    setCityId(rowData.cityid);
    setUrl(rowData.url);
    setFssai(rowData.fssai);
    setGstNo(rowData.gstno);
    setGstType(rowData.gsttype);
    setFileFssai({url:`${serverURL}/images/${rowData.filefssai}`,bytes:''});
    setFileLogo({url:`${serverURL}/images/${rowData.filelogo}`,bytes:''});
    setFileShopAct({url:`${serverURL}/images/${rowData.fileshopact}`,bytes:''});
    setTempFile({fssai:`${serverURL}/images/${rowData.filefssai}`,shopAct:`${serverURL}/images/${rowData.fileshopact}`,logo:`${serverURL}/images/${rowData.filelogo}`})

    setOpen(true)
  }

  const showData=()=>{
    return(<div >
      <div >
          <Grid container spacing={2}>

              <Grid item xs={12} className={classes.heading}>
                <Heading title={"Restaurant Register"}/>
              </Grid>

              <Grid item xs={6}>
                <TextField 
                onFocus={()=>handleError(false,'restaurantName','')}
                error={resError?.restaurantName?.error}
                helperText={resError?.restaurantName?.message}
                label="Restaurant Name" onChange={(event)=>setRestaurantName(event.target.value)} fullWidth
                value={restaurantName}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField 
                onFocus={()=>handleError(false,'ownerName','')}
                error={resError?.ownerName?.error}
                helperText={resError?.ownerName?.message}
                onChange={(event)=>setOwnerName(event.target.value)} 
                label="Owner Name" fullWidth
                value={ownerName}/>
              </Grid>

              <Grid item xs={4}>
                <TextField onChange={(event)=>setPhoneNumber(event.target.value)} label="Phone Number" fullWidth
                value={phoneNumber}/>
              </Grid>

              <Grid item xs={4}>
                <TextField 
                onFocus={()=>handleError(false,'mobileNumber','')}
                error={resError?.mobileNumber?.error}
                helperText={resError?.mobileNumber?.message}
                onChange={(event)=>setMobileNumber(event.target.value)} 
                label="Mobile Number" fullWidth
                value={mobileNumber}/>
              </Grid>

              <Grid item xs={4}>
                <TextField
                onFocus={()=>handleError(false,'emailid','')}
                error={resError?.emailid?.error}
                helperText={resError?.emailid?.message}
                label="Email Address" onChange={(event)=>setEmailid(event.target.value)} fullWidth
                value={emailid}/>
              </Grid>

              <Grid item xs={12}>
                <TextField
                onFocus={()=>handleError(false,'address','')}
                error={resError?.address?.error}
                helperText={resError?.address?.message}
                onChange={(event)=>setAddress(event.target.value)} label="Address" fullWidth
                value={address}/>
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
                 <TextField onChange={(event)=>setUrl(event.target.value)} label="URL" fullWidth
                 value={url}/>
              </Grid>

              <Grid item xs={4}>
                <TextField onChange={(event)=>setFssai(event.target.value)} label="Fssai Number" fullWidth
                value={fssai}/>
              </Grid>

              <Grid item xs={4}>
                <TextField onChange={(event)=>setGstNo(event.target.value)} label="GST Number" fullWidth
                value={gstNo}/>
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
                <div>
                  {btnStatus.fssai?editDeleteButton(1):<></>}
                </div>
              </Grid>

              <Grid item xs={4} className={classes.center}>
                <Avatar
                  variant="rounded"
                  alt="Remy Sharp"
                  src={fileShopAct.url}
                  sx={{ width: 56, height: 56 }}
                />
                <div>
                  {btnStatus.shopAct?editDeleteButton(2):<></>}
                </div>
              </Grid>

              <Grid item xs={4} className={classes.center}>
                <Avatar
                  variant="rounded"
                  alt="Remy Sharp"
                  src={fileLogo.url}
                  sx={{ width: 56, height: 56 }}
                />
                <div>
                  {btnStatus.logo?editDeleteButton(3):<></>}
                </div>
              </Grid>
              
          </Grid>
      </div>
   </div>)
  }

  const showDataForEdit=()=>{
    return(
      <Dialog maxWidth={'lg'}
      open={open}>
          <DialogContent>
            {showData()}
          </DialogContent>
          <DialogActions>
             <Button onClick={handleSubmit}>Update</Button>
             <Button onClick={handleDialogClose}>Close</Button>
          </DialogActions>
      </Dialog>
    )
  }

  const handleDelete=async(rowData)=>{
      Swal.fire({
        title: 'Do you want to delete the record?',
        showDenyButton: true,
        //showCancelButton: true,
        confirmButtonText: 'Delete',
        denyButtonText: `Don't Delete`,
      }).then(async(result) => {
        /* Read more about isConfirmed, isDenied below */
        ///hh
        if (result.isConfirmed) {
          const body={'restaurantid':rowData.restaurantid};
          const result=await postData('restaurants/restaurant_delete',body);
          if(result.status)
          {Swal.fire('Deleted!', '', result.message);
           fetchAllRestaurant()}
          else
          Swal.fire('Fail!', '', result.message);
        } else if (result.isDenied) {
          Swal.fire('Restaurant not Deleted', '', 'info')
        }
      })
       
  }

  useEffect(function(){
    fetchAllRestaurant()
  },[])
  
  function displayAll() {
    return (
      <MaterialTable
        title="Restaurants List"
        columns={[
          { title: 'Restaurant', render:rowData=><><div>{rowData.restaurantname}</div><div>{rowData.ownername}</div></>},
          { title: 'Address',render:rowData=><><div>{rowData.address}</div><div>{rowData.cityname},{rowData.statename}</div></> },
          {title:'Contact',render:rowData=><><div>{rowData.phonenumber}</div><div>{rowData.mobileno}</div><div>{rowData.emailid}</div></>},
          {title:'Documents',render:rowData=><><div>SA:{rowData.gstno}/{rowData.gsttype}</div><div>Fssai:{rowData.fssai}</div><div>{rowData.emailid}</div></>},
          {title:'Website',render:rowData=><><a href="{rowData.url}">Visit</a></>},
          {title:'Logo',
           render:rowData=><div><img src={`${serverURL}/images/${rowData.filelogo}`} style={{width:50,height:50,borderRadius:10}} /></div>}
        ]}
        data={listRestaurant}        
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit Restaurant',
            onClick: (event, rowData) => handleEdit(rowData)
          },
          {
            icon: 'delete',
            tooltip: 'Delete Restaurant',
            onClick: (event, rowData) => handleDelete(rowData)
          },
          {
            icon: 'add',
            tooltip: 'Add Restaurant',
            isFreeAction: true,
            onClick: (event, rowData) => alert("You want to delete " + rowData.name)
          }
        ]}
      />
    )
  }
  return(<div>
    <div className={classes.rootdisplay}>
    <div className={classes.boxdisplay}>
        {displayAll()}
     </div>
        {showDataForEdit()}
     </div> 
  </div>)
}