import React, { useState } from 'react';
import { Button, ProgressBar } from 'react-bootstrap';

// type SelectRollingHandProps = {
//     rollingHand: string;
//     setRollingHand: React.Dispatch<React.SetStateAction<string>>;
// };

const CameraSelect = ({ devices, setSelectedDeviceId, selectedDeviceId }: any) => {

    return (
        <>
            カメラを選択
            {
                devices.map((device: any) => (
                    <button onClick={() => setSelectedDeviceId(device.deviceId)}>  {device.label}</button>


                ))
            }
        </>
    )
}
export default CameraSelect;