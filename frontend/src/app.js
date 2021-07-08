import React , {useContext} from 'react';
import { Typography, AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import VidStream from './components/VidStream';
import EventBar from './components/EventBar';
import CallReceiveBar from './components/CallReceiveBar';
import MsgBar from './components/MsgBar';
import ChatBox from './components/ChatBox';


const useStyles = makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 100px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '600px',
    border: '2px solid black',

    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
  image: {
    marginLeft: '15px',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
}));

const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <AppBar position="static" color="inherit">
        <Typography variant="h2" align="center">Video Call</Typography>
      </AppBar>
      <VidStream />
      <EventBar>
        <CallReceiveBar />
      </EventBar>
      <MsgBar/>
      <ChatBox />
    </div>
  );
};

export default App;