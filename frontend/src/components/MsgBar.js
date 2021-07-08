import { context } from '../sockets';
import React, { useContext } from 'react';
import { Button, TextField, Grid, Typography, Container, Paper } from '@material-ui/core';


function MsgBar() {

    const { idToSend,setidToSend,sms,setsms,SendMsg } = useContext(context);
    

    return (
        
            <form className='msg-form' style={FormStyle}>
                <div className='id-toConnect'>
                    <label>Enter the ID</label>
                    <TextField label="ID to connect" value={idToSend} onChange={function(e){
                        setidToSend(e.target.value)
                    }} fullWidth />
                </div>
                
                <div className='msg-text'>
                    <label>Enter message</label>
                    <TextField label="Message" value={sms} onChange={function(e){
                        setsms(e.target.value)
                    }} fullWidth />
                </div>

                <Button variant="contained" color="primary" fullWidth onClick={SendMsg} >
                        Send
                </Button>
            </form>
    )
}


const FormStyle={

    padding: '10px 20px',
    border: '2px solid black',
    width: '35%',

}

export default MsgBar
