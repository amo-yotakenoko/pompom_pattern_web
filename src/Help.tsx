import React, { useState, createContext, useContext, useEffect } from 'react';
import * as Icon from 'react-bootstrap-icons';
import { enableHelpContext } from './Edit/Edit';
// type SelectRollingHandProps = {
//     rollingHand: string;
//     setRollingHand: React.Dispatch<React.SetStateAction<string>>;
// };
import { Overlay, Tooltip } from 'react-bootstrap';
// import Tooltip from 'react-bootstrap/Tooltip';
const HelpButton = ({ id, placement, children }: any) => {
    const { enableHelp, setEnableHelp } = useContext(enableHelpContext);
    console.log({ enableHelp })
    const [target, setTarget] = useState<HTMLElement | null>(null);
    useEffect(() => {

        setTarget(document.getElementById(id) as HTMLElement);

    }, [id]);

    return (
        <>
            <Overlay target={target} show={enableHelp} placement={placement} >
                {(props) => (
                    <Tooltip  {...props}>
                        {children}
                    </Tooltip>
                )}
            </Overlay >
        </>
    )
}
export default HelpButton;