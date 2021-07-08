// this file contains the socket logic
import React, { createContext, useState, useRef, useEffect } from 'react';
import {io} from 'socket.io-client';
import Peer from 'simple-peer';
const context=createContext();

const socket = io('http://localhost:5000');

const MegaParent=function({children}){
   
    // creating state feilds
    const[stream,setStream]=useState(null);
    const[me,setMe]=useState('');
    const[call,setCall]=useState({});
    const[accepted,setaccepted]=useState(false);
    const[ended,setend]=useState(false);
    const[name,setname]=useState('');
    const[msglist,setmsglist]=useState([{}]);
    const[idToSend,setidToSend]=useState('');
    const[sms,setsms]=useState('');
    //const[msgno,setmsgno]=useState(0);
    const[megabool,setmegabool]=useState(true);
    const[msgno,setmsgno]=useState(0);
    const myvid=useRef();
    const uservid=useRef();
    const peerref=useRef();


    useEffect(function(){
        // user permission stuff
        navigator.mediaDevices.getUserMedia({video: true ,audio: true}).then(function(currentStream){
            setStream(currentStream);
            myvid.current.srcObject=currentStream;
        });
        socket.on('me',function(id){
            setMe(id);
        });
        
        socket.on('Calling', function({ from, name: caller_name, signal }){
            
            setCall({ Receivecall: true, from, name: caller_name, signal });

        });

        
        socket.on('Chat',function({SenderName,msg}){
            var x = msglist;
            
            //var x = [...MegaArray,{SenderName:SenderName,msg:msg,Unique:msgno}];
            x.push({SenderName:SenderName,msg:msg,Unique:msgno});
            //setmsglist(msglist=>[...x]);
            setmsglist([...x]);
            //setmegabool(!megabool);
            //setmsglist([...msglist,{SenderName,msg,Unique:msgno}]);
            //console.log(msglist);
                
        });
        
    },
    []);


    const Answer=function(){
        
        setaccepted(true);

        
        const peer=new Peer({initiator:false,trickle:false,stream});
        
        peer.on('signal',function(data){
            socket.emit('CallAnswer',{signal:data,to:call.from});
        });

        peer.on('stream',function(inputstream){
            // the stream of the other user not myvid / mystream
            uservid.current.srcObject=inputstream;
        }
        );
        //info from useeffect function from the statement socket.on('Call')
        peer.signal(call.signal);

        // this is the refrence of the peer which was declared earlier 
        peerref.current=peer;
    }


    // much similar to the answer function 
    const Call=function(id){

        // here the initiator is true because we are initiating the peer connection
        const peer=new Peer({initiator:true,trickle:false,stream});        
        
        peer.on('signal',function(data){
            socket.emit('Calling',{ToCall:id,signalstuff:data,from:me,name});
        })

        peer.on('stream',function(currentStream)
        {
            // the stream of the other user not myvid / mystream
            uservid.current.srcObject=currentStream;
        }
        );

        socket.on('Accepted',function(signal){
            setaccepted(true);

            peer.signal(signal);
        })
        peerref.current=peer;
    }


    const SendMsg=function(){

        //setmsglist([...msglist,{SenderName:name,msg:sms}]);
        
       // x = {...x, {SenderName:name,msg:sms,Unique:msgno}};
        //var x = [...msglist,{SenderName:name,msg:sms,Unique:msgno}];
        var x= msglist;
        x.push({SenderName:name,msg:sms,Unique:msgno});
        setmsglist(x);
        //setmegabool(!megabool);
        //setmsglist([...msglist,{SenderName:name,msg:sms,Unique:msgno}]);
        socket.emit("Chat",{idToSend:idToSend,SenderName:name,msg:sms});
        setsms('');
    }

    const End=function(){

        setend(true);
        // stop receiving input from users cam and audio device 
        peerref.current.destroy();

        //reloading the page and then would provide a new ID
        window.location.reload();
    }

    

    return (
        <context.Provider value={{
          call,
          accepted,
          myvid, 
          uservid, 
          stream,
          name,
          setname,
          ended,
          me, 
          Call,
          End, 
          Answer,
          SendMsg,
          setsms,
          sms,
          idToSend,
          setidToSend,
          msglist,
          megabool

        }}
        >
          {children}
        </context.Provider>
      );
    
};

export{MegaParent,context};

// export{ContextProvider,SocketContext};