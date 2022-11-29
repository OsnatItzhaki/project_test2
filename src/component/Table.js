import React, { useEffect ,useState} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import ClientService from '../services/Client.service'
import UserDetail from './UserDetail'
export default function TableView() {
    const [data,setData]=useState([]);
    const [id,setId]=useState(1);
    useEffect(() => {
console.log("initt");
        async function init  () {
          let users=await ClientService.fetchUsers()
          setData(users);
         
        }
      init() 
    }, [])
    useEffect(() => {
       
              console.log("id change");
            }, [id])
    const handleClickRow = (id) =>
  {
    console.log("idddd",id);
    setId(id);
  }
    return (
        
        <Grid container spacing={2}  >
        <Grid item xs={10} >
        <TableContainer sx={{ maxHeight: 650 }} >
        <Table   sx={{ minWidth: 700 }} stickyHeader aria-label="sticky table" >
          <TableHead>
            <TableRow  sx={{fontWeight:'bold!important'}} >
              <TableCell align="center" style={{fontWeight:'bold'}}>Name</TableCell>
              <TableCell align="center" style={{fontWeight:'bold'}} >WebSite</TableCell>
              <TableCell align="center" style={{fontWeight:'bold'}}>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody  >
            {data
            .map((row,index) => (
              <TableRow
                key={row.id} 
                onClick={handleClickRow.bind(this,row.id)}
              >
                <TableCell align="center" >{row.name}</TableCell>
                <TableCell align="center">{row.website}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                 </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Grid>
      <Grid item  xs={2}>
 <UserDetail id = {id}/>

</Grid>
      </Grid>
    );
}