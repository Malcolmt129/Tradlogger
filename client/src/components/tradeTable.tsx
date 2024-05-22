import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface Trade {
  tableID: number; 
  id: number;
  instrument: string;
  price: number;
  openTime: string;
  initialUnits: number;
  initialMarginRequired: number;
  state: string;
  currentUnits: number;
  realizedPL: number;
  closingTransactionIDs: number[];
  financing: number;
  dividendAdjustment: number;
  closeTime: string;
  averageClosePrice: number;
  takeProfitOrder: Order;
  stopLossOrder: Order;
}

interface Order {
  id: string;
  createTime: string;
  replacesOrderID: number;
  type: string;
  tradeID: number;
  price: number;
  timeInForce: string;
  triggerCondition: string;
  triggerMode?: string;  // Optional since it only appears in stopLossOrder
  state: string;
  cancellingTransactionID: number;
  cancelledTime: string;
}

  
let rowData: string[] = ['tradeID', 'EntryDate', 'EntryPrice', 'Units', 'P&L'];

export default function BasicTable() {
  
  const [data, setData] = useState<Trade[]>([])
  

  useEffect(() => {
	fetchData();
  }, []);
  
  const fetchData = async () => {

	try {
	  const response  = await fetch('/trades/data');

	  if(!response.ok) {
		throw new Error('Something went wrong');
	  }

	  const trades = await response.json();
	
	  const tradesWithTableID = trades.map((trade: Trade, index: number) => ({
		...trade,
		tableID: index + 1  // Assuming this component is reloaded for new data sets and tableID starts from 1 each time
      }));	  
	  setData(tradesWithTableID)
	} catch(error) {
	  console.error('There was a problem with the fetch operation', error);
	}
  };
  return (

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650,  }} aria-label="simple table">
        <TableHead>
          <TableRow>
			{ 
				rowData.map((data1, index) => { 
					
					if (index === 0) {
					return <TableCell key={index} sx={{  backgroundColor: 'black', color: 'white'  }}>{data1}</TableCell>
					}
				    return <TableCell key={index} align="right" sx={{  backgroundColor: 'black', color: 'white' }}>{data1}</TableCell>
				})
			}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((trade : Trade) => (
            <TableRow key={trade.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, color: 'white', 
			  backgroundColor: trade.tableID % 2 == 0 ? '#000000' : '#777777'}}>

               <TableCell component="th" scope="row" sx={{  color: 'white' }}>
                {trade.id}
              </TableCell> 
			  <TableCell align="right" sx={{  color: 'white' }}>{trade.openTime}</TableCell>
			  <TableCell align="right" sx={{  color: 'white' }}>{trade.price}</TableCell>
              <TableCell align="right" sx={{  color: 'white' }}>{trade.initialUnits}</TableCell>
              <TableCell align="right" sx={{  color: 'white', backgroundColor: trade.realizedPL > 0 ? '#27632a' : "#932020" }}>{trade.realizedPL}</TableCell>
            </TableRow>
		  ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
