import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { useState,useEffect } from 'react';
import { postData } from '../../services/FetchNodeServices';

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  const [recentBills,setRecentBills]=useState([]);

  const getDate=(data)=>{
    const m=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    const date=(data).slice(0,data.indexOf('T'));
    const arrDate=date.split("-");
    const rightDate=(Number(arrDate[2])+1)+" "+m[Number(arrDate[1])-1]+", "+arrDate[0]
    // alert(m[arrDate[1]])
    return rightDate;
  }

  const fetchRecentbills=async()=>{
    const result=await postData('billing/fetch_recent_bill')
    setRecentBills(result.data);
  };

  useEffect(function(){
    fetchRecentbills();
    
  },[]);

  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>

            <TableCell>Bill No</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Customer Name</TableCell>
            <TableCell>Table No</TableCell>
            <TableCell>Server Name</TableCell>
            <TableCell align="right">Amount</TableCell>
 
          </TableRow>
        </TableHead>
        <TableBody>
          {recentBills.map((row) => (
            <TableRow key={row.billno}>

              <TableCell>{row.billno}</TableCell>
              <TableCell>{getDate(row.billdate)}</TableCell>
              <TableCell>{row.billtime}</TableCell>
              <TableCell>{row.customername}</TableCell>
              <TableCell>{row.tableno}</TableCell>
              <TableCell>{row.server}</TableCell>
              <TableCell align="right">{`₹ ${parseFloat(row.totalamount).toFixed(2)}`}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}