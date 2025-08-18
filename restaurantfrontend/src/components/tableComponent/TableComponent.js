import { Paper } from "@mui/material";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { postData } from "../../services/FetchNodeServices";
import {useSelector} from 'react-redux';


const useStyles = makeStyles({      

  floorBoxText:{fontFamily:'Kanit',
                fontWeight:'bold',
                fontSize:16,
                color:'#fff'},

  clickedFloorBox:{
    width:80,
        height:80,
        display:'flex',
        justifyContent:"center",
        alignItems:'center',
        padding:5,
        background:'#19703e !important',
        borderRadius:'7px !important',
        boxShadow:"0 0 12px  red !important",
        cursor:'pointer'
  },
  notClickedFloorBox:{
    width:80,
        height:80,
        display:'flex',
        justifyContent:"center",
        alignItems:'center',
        padding:5,
        borderRadius:'4px !important',
        background:'#27ae60 !important',
        cursor:'pointer'
  },
  notClickedTableBox:{width:80,
    height:80,
    display:'flex',
    flexDirection:'column',
    justifyContent:"center",
    alignItems:'center',
    padding:5,
    background:'#ed4f00 !important',
    borderRadius:'4px !important',
    cursor:'pointer'
  },
  clickedTableBox:{width:80,
    height:80,
    display:'flex',
    flexDirection:'column',
    justifyContent:"center",
    alignItems:'center',
    padding:5,
    background:'#984711 !important',
    boxShadow:"0 0 12px  red !important",
    borderRadius:'7px !important',
    cursor:'pointer'
  },

 
});

export default function TableComponent(props){
  const navigate=useNavigate();
  const classes=useStyles();
  const admin=JSON.parse(localStorage.getItem('ADMIN'));
  const foodOrder=useSelector((state)=>state.orderData);

  let foodList=[];  

  function calculate(ftn){
      
      const cart=foodOrder[ftn];
    
      if(cart!==undefined){
        foodList=Object.values(cart);

        const totalPrice=foodList.reduce(calculateTotal,0);
        const totalOffer=foodList.reduce(calculateTotalOffer,0)
        return(totalOffer)
      }
      else{
        return 0;
      }
  }

  function calculateTotal(item1,item2){
     return item1+(item2.price*item2.qty)  
  }

  function calculateTotalOffer(item1,item2){
    return item1+(item2.offerprice*item2.qty)
  }


  const [floor,setFloor]=useState([]);
  const [table,setTable]=useState([]);
  const [selectedFloorIndex,setSelectedFloorIndex]=useState(-1);
  const [selectedTableIndex,setSelectedTableIndex]=useState(-1);

  const fetchAllFloor=async()=>{
     const result=await postData('tablebooking/fetch_all_floor',{restaurantid:admin.restaurantid});
     setFloor(result.data);
  }

  const fetchAllTable=async(clickedfloor,i)=>{
    props.setfloorno(clickedfloor);
    props.settableno('');
    setSelectedFloorIndex(i);
    setSelectedTableIndex(-1);

    const result=await postData('tablebooking/fetch_all_table_by_floor',{restaurantid:admin.restaurantid,floor:clickedfloor});
    setTable(result.data);
  }
  
  const fetchClickedTableIndex=async(clickedTableNo,i)=>{
    props.settableno(clickedTableNo);
    setSelectedTableIndex(i);
  }

  const showTable=()=>{
    return table.map((item,i)=>{
      return(<Paper elevation={3} onClick={()=>fetchClickedTableIndex(item.tableno,i)} className={i===selectedTableIndex?classes.clickedTableBox:classes.notClickedTableBox}>

          <div className={classes.floorBoxText}>  
           Table {item.tableno}
          </div>
          <div className={classes.floorBoxText} style={{fontSize:13,fontWeight:'normal'}}>  
           Chairs {item.noofchairs}
          </div> 
          <div className={classes.floorBoxText} style={{fontSize:14,fontWeight:'bolder'}}>  
          &#8377; {calculate(`#${props.floorno}${item.tableno}`)}
          </div> 

      </Paper>)
    })
  }

  const showFloor=()=>{
    return floor.map((item,i)=>{
      return(<Paper onClick={()=>fetchAllTable(item.floor,i)} elevation={3} className={i===selectedFloorIndex?classes.clickedFloorBox:classes.notClickedFloorBox} >

          <div className={classes.floorBoxText}>  
           {item.floor}
          </div> 
      </Paper>)
    })
  }

  useEffect(function(){
    fetchAllFloor();
  },[]);

  return(<div style={{display:'flex',              flexDirection:'column'}}>
      <div style={{ display:'flex',
                    gap:15,
                    marginBlock:8,
                    flexWrap:'wrap'}}>
          {showFloor()} 
      </div>
      <div style={{ display:'flex',
                    gap:15,
                    marginBlock:8,
                    flexWrap:'wrap'}}>
          {showTable()} 
      </div>
  </div>)
}