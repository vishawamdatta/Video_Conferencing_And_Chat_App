// material ui is also installed, you can use that as well, preferably use that and plzz ensure page doesnt reload


// material ui is also installed, you can use that as well, preferably use that and plzz ensure page doesnt reload
import { context } from "../sockets";
import React, { useContext, useState,useEffect } from "react";
import { People } from "@material-ui/icons";



function ChatBox() {

  const {msglist,megabool} = useContext(context); // msglist is the object array , each object has 2 attributes SenderName:  and msg:
  console.log(msglist,megabool);
    
  
    return (
      <div>
        <ul>
          {msglist.map((obj)=>{
            return <li key={obj.unique}>{`${obj.SenderName}:${obj.msg}`}</li>
          })
          }
        </ul>
      </div>
    );
 
  
}

export default ChatBox;
