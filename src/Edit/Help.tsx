import React, { useState, createContext, useContext } from 'react';
import * as Icon from 'react-bootstrap-icons';
import { enableHelpContext } from './Edit';
// type SelectRollingHandProps = {
//     rollingHand: string;
//     setRollingHand: React.Dispatch<React.SetStateAction<string>>;
// };
import { Overlay, Tooltip } from 'react-bootstrap';
// import Tooltip from 'react-bootstrap/Tooltip';
const HelpButton = ({ target, placement, children }: any) => {
    const { enableHelp, setEnableHelp } = useContext(enableHelpContext);
    console.log({ enableHelp })
    return (
        <>
            <Overlay target={target} show={enableHelp} placement={placement} >
                {(props) => (
                    <Tooltip  {...props}>
                        {children}
                    </Tooltip>
                )}
            </Overlay>
        </>
    )
}
export default HelpButton;