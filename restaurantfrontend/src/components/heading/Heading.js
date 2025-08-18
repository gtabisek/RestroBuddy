import logo from '../../assets/logo.png';
import list from '../../assets/list.png'
import { useNavigate } from 'react-router-dom';

export default function Heading({title,myroute})
{  const navigate = useNavigate()
  return(
    <div style={{fontFamily:"Kanit",
    fontWeight:"bold",
    fontSize:20,
    letterSpacing:1,
    display:"flex",
    justifyContent:'space-between',
    alignItems:"center"}}>
      <div style={{display:'flex',alignItems:'center'}}>
      <img src={logo} width="60" />
      <div>{title}</div></div>
      <img src={list} width="40" style={{cursor:'pointer'}} onClick={()=>navigate(`${myroute}`)}/>
    </div>
  )
}