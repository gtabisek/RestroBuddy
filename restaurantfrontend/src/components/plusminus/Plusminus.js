import { makeStyles } from "@mui/styles";
import { useState,useEffect } from "react";

const useStyles = makeStyles({      

  plusminuscss:{
                width:20,
                // display:'flex',
                // justifyContent:"center",
                // alignItems:'center',
                fontWeight:'bold',
                cursor:'pointer',
                background:'#eee',
                // fontSize:'16px !important',
                textAlign:"center"
                },
  componentcss:{
                width:80,
                display:'flex',
                flexDirection:'row',
                justifyContent:'flex-end'
  },
  valuecss:{
            width:'auto',
            textAlign:'center',
            marginInline:'5px'
  }
 
});

export default function Plusminus(props) {
  const classes=useStyles();
  const [value,setValue]=useState(props.qty);

  useEffect(function(){
    setValue(props.qty)
  },[props]);
  const handlePlus=()=>{
          const c=value+1;
          setValue(c);
          props.onChange(c);
  }

  const handleMinus=()=>{
        if(value>0){
          const c=value-1;
          setValue(c);
          props.onChange(c);
        }  
  }

  return (
    <div className={classes.componentcss}>
      <div onClick={handleMinus} className={classes.plusminuscss}>-</div>
      <div className={classes.valuecss}>{value}</div>  
      <div onClick={handlePlus} className={classes.plusminuscss}>+</div>
    </div>
  )
}
