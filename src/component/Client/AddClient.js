import * as React from 'react';
import AlertMessage from "../common/AlertMessage"
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {useState,useEffect} from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ClientService from '../../services/Client.service'
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width:500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


 export default function AddClientModal(props) {
 
  const [alertMessage, setAlertMessage] = useState({ isOpen: false, status: "info", msg: "" })
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const[cities,setCities]=useState([]);
  const[banks,setBanks]=useState([]);
  const[bankBranches,setBankBranches]=useState([]);
const [identityerrorvalidation,setidentityerrorvalidation]=useState(false);
  const [ customer,setCustomer]=useState({  fullName:'',
                                            fullNameEng:'',
                                            dateBirth:new Date(),
                                            identityCard:'',
                                            cityCode:0,
                                            bank: 0,
                                            bankBranches:0,
                                            BankAccountNumber:0});
  
  

 
  const addClient = () => {
      
    
if(identityerrorvalidation===true)
{
  setAlertMessage({
    isOpen: true,
    status: "error",
    msg: "לא ניתן לשמור- פרטים שגויים"
});
 
  return;
}
    let responseObj=ClientService.insertNewClient(customer)
   
    console.log("responseObj",responseObj);
    responseObj.then(function(result) {
      if(result.iserror) {
        setAlertMessage({
          isOpen: true,
          status: "error",
          msg:  result.data 
      });
      props.parentCallback(false);
      }
      else{
        
        setAlertMessage({
          isOpen: true,
          status: "success",
          msg: "הלקוח נוצר בהצלחה"        
      });
      
        const timer = setTimeout(() => {
          
          handleClose();
          props.parentCallback(true);
        }, 3000);
        //return () => clearTimeout(timer);
       
       
     
    }
   
  })
}
useEffect(() => {
 
}, []);

const handleChange=(e)=>{

     setCustomer((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value,
       }));
}
 
 const handleChangeWithValidation = (num,regex,event) => {
   
    if(event.target.value.length<=num)
    {
     const validation = event.target.value.replace(regex, '');
     setCustomer((prevState) => ({
         ...prevState,
         [event.target.name]: validation,
       }));
    }
 };
 useEffect(() => {

    async function init  () {
      let cities=await ClientService.fetchCities()
      let banks=await ClientService.fetchBanks();
      setCities(cities);
      setBanks(banks["Data"]["Banks"]);
      setBankBranches(banks["Data"]["BankBranches"]);
     console.log(banks);
    }
  init()
 
}, [])
const checkLength=(e)=>{
  setidentityerrorvalidation( e.target.value.length!=9?true:false)
}

  return (
      <div>
        
           <Button endIcon={<AddIcon/>} variant="contained"onClick={handleOpen} sx={{backgroundColor:'#6bc0b2','&:hover': {backgroundColor: '#e0871b',color: '#fff'}}} > הוספת לקוח</Button>
       <Modal
        open={open}
        onClose={handleClose}
      
      >
        <>
    <AlertMessage
                alertMessage={alertMessage}
                setAlertMessage={setAlertMessage}
            />
        <Box dir="rtl" sx={style}>
        <Grid  container spacing={2}  direction="column"
  alignItems="center"
  justifyContent="center" >
        <Grid item xs={12}>
            <h2>הוספת לקוח חדש</h2>
            </Grid>
            <Grid item xs={6}>
            <FormControl sx={{ m: 1, width: 300 }}>
            <TextField name="fullName" value={customer.fullName} onChange={handleChangeWithValidation.bind(this,20,/[^\u0590-\u05fe '-]/g)} label="שם מלא" variant="outlined"></TextField>
            </FormControl>
            </Grid>
            <Grid item xs={6}>
            <FormControl sx={{ m: 1, width: 300 }}>
            <TextField name="fullNameEng" value={customer.fullNameEng} onChange={handleChangeWithValidation.bind(this,15,/[^a-zA-Z '-]/g)} label="שם מלא באנגלית" variant="outlined"></TextField>
            </FormControl>
            </Grid>
            <Grid item xs={6}>
            <FormControl sx={{ m: 1, width: 300 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                inputFormat='dd/MM/yyyy'
                label="תאריך לידה"
                value={customer.dateBirth}
                onChange={(newValue) => {
                    setCustomer((prevState) => ({
                        ...prevState,
                        dateBirth: newValue,
                    }));
                
                }}
                renderInput={(params) => <TextField {...params} />}
            />
            </LocalizationProvider>
            </FormControl>
            </Grid>
            <Grid item xs={6}>
            <FormControl sx={{ m: 1, width: 300 }}>
            <TextField name="identityCard" value={customer.identityCard} onChange={handleChangeWithValidation.bind(this,9,/[^0-9]/g)}  onBlur={checkLength} error={identityerrorvalidation===true?true:false}  label="תעודת זהות" variant="outlined"></TextField>
            </FormControl>
            </Grid>
            <Grid item xs={6}>
            <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="city-label">עיר</InputLabel>
        <Select
          labelId="city-label"
          id="select-city"
          name="cityCode"
          label="עיר"
          value={customer.cityCode}
          onChange={handleChange}
          MenuProps={MenuProps}
         
        >
          {cities.map((row,index) => (
            <MenuItem key={index} value={row.code}>{row.description}</MenuItem>
          ))}
        </Select>
      </FormControl>

            </Grid>
            <Grid item xs={6}>
            <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="bank-label">בנק</InputLabel>
        <Select
          labelId="bank-label"
          id="select-bank"
          name="bank"
          label="בנק"
          value={customer.bank}
          onChange={handleChange}
          MenuProps={MenuProps}
         
        >
          {banks
           .map((row,index) => (
            <MenuItem key={index} value={row.Code}>{row.Description}</MenuItem>
          ))}
        </Select>
      </FormControl>

            </Grid>
            <Grid item xs={6}>
            <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="bankBranches-label">סניף</InputLabel>
        <Select
          labelId="bankBranches-label"
          id="select-bankBranches"
          name="bankBranches"
          label="סניף"
          value={customer.bankBranches}
          onChange={handleChange}
          MenuProps={MenuProps}
         disabled={customer.bank!=0?false:true} 
        >
          {bankBranches
           .filter(row => row.BankCode===customer.bank)
           .map((row,index) => (
            <MenuItem key={index} value={row.BranchNumber}>{row.BranchName}</MenuItem>
          ))}
        </Select>
      </FormControl>

            </Grid>
            <Grid item xs={6}>
            <FormControl sx={{ m: 1, width: 300 }}>
            <TextField name="BankAccountNumber" value={customer.BankAccountNumber} onChange={handleChangeWithValidation.bind(this,10,/[^0-9]/g)} label=" מספר חשבון" variant="outlined"></TextField>
            </FormControl>
            </Grid>
            </Grid>

            <Grid  container spacing={7} justifyContent="center">
          <Grid item >
          <Button endIcon={<SaveIcon/>} variant="contained"onClick={addClient} sx={{backgroundColor:'#6bc0b2','&:hover': {backgroundColor: '#e0871b',color: '#fff'}}} >  שמירה</Button>
            </Grid>
           
            </Grid>
        
       
          
    
    
         
    </Box>
    
    
    
    </></Modal>
          </div>

    
     
   
   
  )
  }

