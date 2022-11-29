import React, { useEffect ,useState} from "react";
import ClientService from '../services/Client.service'
import TextField from '@mui/material/TextField';
import validator from 'validator'
export default function UserDetail(props) {
    const [data,setData]=useState({});
    const [emailError, setEmailError] = useState('')
    const validateEmail = (e) => {
      var email = e.target.value
    console.log(email);
      if (!validator.isEmail(email)) {
        
        setEmailError('Enter valid Email!');
      }
    }
    const handleChangeWithValidation = (e) => {
        var email = e.target.value
        if (!validator.isEmail(email)) {
        
            setEmailError('Enter valid Email!');
          }
    else{ 
        setEmailError('');
         setData((prevState) => ({
             ...prevState,
             [e.target.name]: email,
           }));
        }
        
     };
    useEffect(() => {
        async function init  () {
            console.log("id",props.id)
          let user=await ClientService.fetchUser(props.id)
          setData(user);
        }
      init()
    }, [])

    return(
        <div>
            <label>Name</label>
            <input value={data.name}></input>
            
            <label>Website</label>
            <input value={data.website}></input>
            
            <label>Email</label>
          <br />
        
            <TextField name="email" value={data.email} onChange={handleChangeWithValidation.bind(this)}  variant="outlined"></TextField>
            <span style={{
          fontWeight: 'bold',
          color: 'red',
        }}>{emailError}</span>
<br/>
            <label>Phone</label>
            <input value={data.phone}></input>
        </div>
    )
}