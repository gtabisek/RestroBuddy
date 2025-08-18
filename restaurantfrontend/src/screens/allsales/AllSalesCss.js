import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  rootDisplay: {
    width:"auto",
    height:"100%",
    background:"#dfe4ea",
    display:"flex",
    flexDirection:'column',
    alignItems:"center",
    justifyContent:"flex-start",
    paddingTop:'20px',
    boxSizing:'border-box',
    gap:"25px"
  },
  boxDisplay:{
    width:"84%",
    height:"auto",
    borderRadius:10,
    background:"#fff",
    padding:15,
    // marginBlock:'15px',
    boxShadow:"0 0 15px #222",
  },
  center:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  }
});