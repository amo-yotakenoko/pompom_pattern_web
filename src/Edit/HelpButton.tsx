import React, { useState, createContext, useContext, useRef, useEffect } from 'react';
import * as Icon from 'react-bootstrap-icons';
import { enableHelpContext } from './Edit';
// type SelectRollingHandProps = {
//     rollingHand: string;
//     setRollingHand: React.Dispatch<React.SetStateAction<string>>;
// };

const HelpButton = ({ activeMenu }: any) => {
    const { enableHelp, setEnableHelp } = useContext(enableHelpContext);

    useEffect(() => {
        setEnableHelp(false);
    }, [activeMenu])



    useEffect(() => {
        const mousedown = (event: any) => {
            console.log("id", (event.target as HTMLElement), (event.target as HTMLElement).id)
            const id = (event.target as HTMLElement).id
            if (enableHelp && (id != "QuestionCircle" && id != "hint")) {
                console.log("隠す")
                setEnableHelp(false);
            }
        };

        document.addEventListener('mousedown', mousedown);
        document.addEventListener('touchstart', mousedown);


        return () => {
            document.removeEventListener('mousedown', mousedown);
            document.removeEventListener('touchstart', mousedown);
        };
    }, [setEnableHelp]);


    return (
        // <div id="QuestionCircle">


        <Icon.QuestionCircle id="QuestionCircle" style={{ fontSize: "2.5em" }}
            onClick={() => setEnableHelp((prev: any) => !prev)}

        />

        // </div>
    )
}
export default HelpButton;