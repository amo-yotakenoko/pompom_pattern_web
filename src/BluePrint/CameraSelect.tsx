import React, { useState } from 'react';
import { Button, ProgressBar } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
// type SelectRollingHandProps = {
//     rollingHand: string;
//     setRollingHand: React.Dispatch<React.SetStateAction<string>>;
// };

const CameraSelect = ({ devices, setSelectedDeviceId, selectedDeviceId }: any) => {

    return (
        <>

            <NavDropdown title="カメラ" id="basic-nav-dropdown">

                {
                    devices.map((device: any) => (


                        <NavDropdown.Item href="#action/3.4">
                            <button onClick={() => setSelectedDeviceId(device.deviceId)}>  {device.label}</button>
                        </NavDropdown.Item>

                    ))
                }
            </NavDropdown>

            カメラを選択
        </>
    )
}
export default CameraSelect;