import React, { useState, createContext, useContext, useEffect } from 'react';
import * as Icon from 'react-bootstrap-icons';
import { enableHelpContext } from './Edit/Edit';
import { useLocation } from "react-router-dom";

// type SelectRollingHandProps = {
//     rollingHand: string;
//     setRollingHand: React.Dispatch<React.SetStateAction<string>>;
// };
import { Overlay, Tooltip } from 'react-bootstrap';
// import Tooltip from 'react-bootstrap/Tooltip';
const Tutorial = ({ }: any) => {
    const elements: any = document.querySelectorAll('[tutorial-item="colorPallete"]');
    console.log("チュートリアル", useLocation().pathname, elements)
    useEffect(() => {
 

        for (let i = 0; i < elements.length; i++) {
            // elements[i].style.backgroundColor = "blue";
            //  elements[i].style.zIndex = 2050;
     
        }
    },  []);


    return (
        <>
            <div style={{
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
                clipPath: "inset(20% 20% 20% 20%)",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
             }}></div>
        </>
    )
}
export default Tutorial;