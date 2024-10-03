import React, { useState, createContext, useContext } from 'react';
import * as Icon from 'react-bootstrap-icons';
import { enableHelpContext } from './Edit';
// type SelectRollingHandProps = {
//     rollingHand: string;
//     setRollingHand: React.Dispatch<React.SetStateAction<string>>;
// };

const HelpButton = ({ }: any) => {
    const { enableHelp, setEnableHelp } = useContext(enableHelpContext);

    return (
        <>
            {/* help{`${useContext(enableHelpContext)}`} */}
            {/* <Icon.QuestionCircle /> */}
            <Icon.QuestionCircle onClick={() => setEnableHelp((prev: any) => !prev)} style={{
                zIndex: 1000,
                top: "5px",
                right: "5px",
                position: 'fixed',
                fontSize: "2em"
            }} />
        </>
    )
}
export default HelpButton;