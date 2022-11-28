import React, { useEffect ,useState} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import ClientService from '../../services/Client.service'
import AddClientModal from "./AddClient";

const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign: 'center',
  }));


export default function ClientTable() {
    const [data,setData]=useState([]);
    const[refresh,setRefresh]=useState(false)

    useEffect(() => {

          async function init  () {
            let customers=await ClientService.fetchClientData()
            setData(customers);
           
          }
        init()
       
      }, [refresh])

     const handleCallback = (childData) =>{
        if(childData===true)
        {
          setRefresh(true);

        }
    }

  return (
    <Grid container spacing={2}  >
    <Grid item xs={10} >
    <Paper sx={{ width: '100%', overflow: 'hidden ' }} style={{backgroundImage: `url(${Element})`,backgroundPosition: ('center center'),backgroundRepeat: ('no-repeat'), backgroundsize: 'cover', backgroundSize:'contain'}}>
  <TableContainer sx={{ maxHeight: 650 }} >
  <Table   sx={{ minWidth: 700 }} stickyHeader aria-label="sticky table" >
    <TableHead>
      <TableRow  sx={{fontWeight:'bold!important'}} >
        <TableCell align="center" style={{fontWeight:'bold'}}>שם לקוח</TableCell>
        <TableCell align="center" style={{fontWeight:'bold'}} >שם לקוח(אנגלית) </TableCell>
        <TableCell align="center" style={{fontWeight:'bold'}}>תאריך לידה </TableCell>
        <TableCell align="center" style={{fontWeight:'bold'}}> תעודת זהות</TableCell>
        <TableCell align="center" style={{fontWeight:'bold'}}>עיר</TableCell>
        <TableCell align="center" style={{fontWeight:'bold'}}>בנק</TableCell>
        <TableCell align="center" style={{fontWeight:'bold'}}>סניף</TableCell>
        <TableCell align="center" style={{fontWeight:'bold'}}>מס' חשבון</TableCell>
      </TableRow>
    </TableHead>
    <TableBody  >
      {data
     
      .map((row,index) => (
        <TableRow
          key={index} 
        >
          <TableCell align="center" >{row.fullName}</TableCell>
          <TableCell align="center">{row.fullNameEng}</TableCell>
          <TableCell align="center">{row.dateBirth}</TableCell>
          <TableCell align="center">{row.identityCard}</TableCell>
          <TableCell align="center">{row.cityName}</TableCell>
          <TableCell align="center">{row.bank}</TableCell>
          <TableCell align="center">{row.bankBranches}</TableCell>
          <TableCell align="center">{row.BankAccountNumber}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
</Paper>
</Grid>
<Grid item  xs={2}>
 <AddClientModal parentCallback = {handleCallback}/>

</Grid>

</Grid>
  );
}