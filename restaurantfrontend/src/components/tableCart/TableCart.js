// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line eqeqeq
// eslint-disable-next-line react-hooks/exhaustive-deps
// eslint-disable-next-line jsx-a11y/alt-text
// eslint-disable-next-line no-unreachable
// eslint-disable-next-line no-useless-escape
import { Button, Divider, Grid, TextField } from "@mui/material";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { postData, serverURL } from "../../services/FetchNodeServices";
import {useSelector,useDispatch} from "react-redux";
import Plusminus from "../plusminus/Plusminus";
import Swal from "sweetalert2";
import { useCallback } from "react";
// import Razorpay JS SDK dynamically

export default function TableCart(props){
  const admin=JSON.parse(localStorage.getItem('ADMIN'));
  const [customername,setCustomername]=useState('');
  const [mobileNo,setMobileNo]=useState('')
  const gst=(admin.gsttype)/2;
  

  const foodOrder=useSelector((state)=>state.orderData);
  const dispatch=useDispatch();

  let foodList=[];
  if(props.floortableno.length !== 1){
    const cart = foodOrder[props.floortableno];
    if(cart !== undefined)
      foodList = Object.values(cart);
  }

  const handleQtyChange=(v,item)=>{
    const foodList=foodOrder[props.floortableno];

    console.log("foodorder",foodOrder);
    console.log("foodlist",foodList);
    if(v === 0){
      delete foodList[item.fooditemid];
      foodOrder[props.floortableno] = foodList;
    }
    else{
      foodList[item.fooditemid].qty = v;
      foodOrder[props.floortableno] = foodList;
    }
    console.log("add qty foodorder",foodOrder);
    dispatch({type:'ADD_ORDER',payload:[props.floortableNo,foodOrder[props.floortableNo]]});
    props.setrefresh(!props.refresh);
  }


  const totalPrice=foodList.reduce(calculateTotal,0);
  const totalOffer=foodList.reduce(calculateTotalOffer,0)

  function calculateTotal(item1,item2){
     return item1+(item2.price*item2.qty)  
  }

  function calculateTotalOffer(item1,item2){
    return item1+(item2.offerprice*item2.qty)
  }

  // Removed unused floor and table state

  const getCurrentDate=()=>{
    const date=new Date();
    const cd=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
    return cd; 
  }

  const getCurrentTime=()=>{
    const time=new Date()
    const ct=time.getHours()+":"+time.getMinutes();
    return ct;
  }

  //!payment API ///////////////////////////////////////


  const handlePayment = useCallback(async (na) => {
    // Load Razorpay script if not already loaded
    if (!window.Razorpay) {
      await new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = resolve;
        document.body.appendChild(script);
      });
    }

    const options = {
      key: "rzp_test_GQ6XaPC6gMPNwH",
      amount: na * 100,
      currency: "INR",
      name: admin.restaurantname,
      description: "Online Payments",
      image: `${serverURL}/images/${admin.filelogo}`,
      handler: (res) => {
        console.log("Payment Details", res);
      },
      prefill: {
        name: customername,
        contact: mobileNo,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#1976d2",
      },
    };

    const rzpay = new window.Razorpay(options);
    rzpay.open();
  }, [admin, customername, mobileNo]);

  //! End payment ///////////////////////////////////

  const handleSave=async()=>{
    const body={billtime:getCurrentTime(), billdate:getCurrentDate(),
      tableno:`${props.floorno}, Table ${props.tableno}`, server:props.waitername,
      fssai:admin.fssai, cnote:'', gst:admin.gstno, billingdetails:JSON.stringify(foodOrder[props.floortableno]), totalamount:totalOffer+(totalOffer*admin.gsttype/100),
      customername, mobileno:mobileNo};  
    //! imp
    const response=await postData('billing/bill_submit',body);
    
    if(response.status){
      Swal.fire({
        title: 'Are you sure to save the Bill?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Save It!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Saved!',
            'Your Bill has been saved.',
            'success'
          )
          dispatch({type:'DEL_ORDER',payload:[props.floortableno]});
          props.setrefresh(!props.refresh);
        }
      })
    }

  }

  const showFoodList=()=>{
    return foodList.map((item,i)=>{
      return(<>
         <Grid item xs={1}>{i+1}</Grid>
         <Grid item xs={2.8}>{item?.fooditemname}</Grid>
         <Grid item xs={2} style={{textAlign:'right'}}>&#8377;{item?.price}</Grid>
         <Grid item xs={2} style={{textAlign:'right'}}>&#8377;{item?.offerprice}</Grid>
         <Grid item xs={2.2} ><Plusminus onChange={(v)=>handleQtyChange(v,item)} qty={item?.qty}/></Grid>
         <Grid item xs={2} style={{textAlign:'right',fontWeight:'bold'}}>&#8377;{item?.offerprice*item?.qty}</Grid>
      </>)
    })
  }

  const showTotalBill=()=>{
    return(<>
        
        <Grid item xs={12}><Divider/></Grid>

        <Grid item xs={6} style={{fontWeight:'bold'}}>Amount:</Grid>
        <Grid item xs={6} style={{fontWeight:'bold',textAlign:'right'}}>&#8377;{totalPrice}</Grid>

        <Grid item xs={6} style={{fontWeight:'bold'}}>Discount:</Grid>
        <Grid item xs={6} style={{fontWeight:'bold',textAlign:'right'}}>&#8377;{totalPrice-totalOffer}</Grid>

        <Grid item xs={6} style={{fontWeight:'bold'}}>Net Amount:</Grid>
        <Grid item xs={6} style={{fontWeight:'bold',textAlign:'right'}}>&#8377;{totalOffer}</Grid> 

        <Grid item xs={6} style={{fontWeight:'bold'}}>CGST:</Grid>
        <Grid item xs={6} style={{fontWeight:'bold',textAlign:'right'}}>&#8377;{totalOffer*gst/100}</Grid>

        <Grid item xs={6} style={{fontWeight:'bold'}}>SGST:</Grid>
        <Grid item xs={6} style={{fontWeight:'bold',textAlign:'right'}}>&#8377;{totalOffer*gst/100}</Grid>

        <Grid item xs={6} style={{fontWeight:'bold'}}>Net Amount:</Grid>
        <Grid item xs={6} style={{fontWeight:'bold',textAlign:'right'}}>&#8377;{totalOffer+(totalOffer*admin.gsttype/100)}</Grid> 

        <Grid item xs={12}><Divider/></Grid> 

        <Grid item xs={6}>
          <Button onClick={handleSave} variant="contained" style={{display:'flex',marginLeft:'auto'}} color="primary" >Save & Print</Button> 
        </Grid>

        <Grid item xs={6}>
          <Button onClick={()=>handlePayment(totalOffer+(totalOffer*admin.gsttype/100))} variant="contained" style={{display:'flex',marginLeft:'auto'}} color="primary" >Payment Online</Button> 
        </Grid>
    </>)
  }
  
  const heading=()=>{
    return(<div>
          <Grid container spacing={1} style={{fontFamily:'kanit'}}>

          <Grid item xs={6}><TextField onChange={(e)=>setCustomername(e.target.value)} label="Customer Name" variant="standard"/></Grid>
          <Grid item xs={6}><TextField onChange={(e)=>setMobileNo(e.target.value)} label="Mobile" variant="standard"/></Grid>

          <Grid item xs={12}><Divider /></Grid>
          <Grid item xs={1} style={{fontWeight:'bold'}}>Sn</Grid>
          <Grid item xs={3} style={{fontWeight:'bold'}}>Name</Grid>
          <Grid item xs={2} style={{fontWeight:'bold',textAlign:'right'}}>Rate</Grid>
          <Grid item xs={2} style={{fontWeight:'bold',textAlign:'right'}}>Offer</Grid>
          <Grid item xs={2} style={{fontWeight:'bold',textAlign:'right',paddingRight:12}}>Qty</Grid>
          <Grid item xs={2} style={{fontWeight:'bold',textAlign:'right'}}>Amount</Grid>
          <Grid item xs={12}><Divider /></Grid>
            {showFoodList()}
            {showTotalBill()}
        </Grid> 
       
    </div>)
  }

  return(<div>
        {heading()}
  </div>)
}  