import React, { useState } from 'react';
import { Button, ProgressBar } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
// type SelectRollingHandProps = {
//     rollingHand: string;
//     setRollingHand: React.Dispatch<React.SetStateAction<string>>;
// };

const CameraSelect = ({ devices, setSelectedDeviceId, selectedDeviceId }: any) => {

    return (
        <>

            {/* <NavDropdown title="カメラ" id="basic-nav-dropdown"> */}
            <Card.Title>カメラの設定</Card.Title>
            {/* カメラの設定<br></br> */}
            <ButtonGroup vertical>
                {
                    devices.map((device: any) => (

                        <Button onClick={() => setSelectedDeviceId(device.deviceId)}
                            className={selectedDeviceId === device.deviceId ? 'active' : ''}>
                            {device.label}
                        </Button>

                    ))
                }

            </ButtonGroup>
            {/* </NavDropdown> */}

            {/* カメラを選択 */}
        </>
    )
}
export default CameraSelect;