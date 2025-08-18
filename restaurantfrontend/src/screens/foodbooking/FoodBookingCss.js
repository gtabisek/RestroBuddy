import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  root: {
    width:"auto",
    height:"100%",
    background:"#ededed",
    display:"flex",
    flexDirection:'column',
    alignItems:"center",
    justifyContent:"flex-start",
    paddingBlock:'30px',
    boxSizing:'border-box',
    gap:"25px"
  },
  box:{
    width:"90%",
    height:"auto",
    borderRadius:10,
    background:"#fff",
    padding:15,
    boxShadow:"0 0 15px #222",
  },
  center:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  }
});