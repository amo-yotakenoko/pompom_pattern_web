import React, { useState, useRef, useEffect } from 'react';
import { Button, ProgressBar } from 'react-bootstrap';
import Camera from './Camera';
import CameraSelect from './CameraSelect';
import HandTracker from './HandTracker';
import KalmanFilter from './KalmanFilter';
const CameraCounter = ({ addCounter }: any) => {


    const [devices, setDevices] = useState<{ label: string; deviceId: string }[]>([]);


    const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);

    const videoRef = useRef<HTMLVideoElement>(null);
    const [videoOk, setVideoOk] = useState<boolean>(false);

    const trajectoryCanvasRef = useRef<HTMLCanvasElement>(null)

    const handLandmarkerRef = useRef<any>(null);
    const [fingerHistory, setsingerHistory] = useState([]);

    // console.log("cameracounter")

    return (
        <>



            <CameraSelect devices={devices} setSelectedDeviceId={setSelectedDeviceId} selectedDeviceId={selectedDeviceId}></CameraSelect>
            < KalmanFilter fingerHistory={fingerHistory} addCounter={addCounter}></KalmanFilter>
            <div style={{ position: 'relative', width: '90%', height: '500px' }}>
                <video autoPlay playsInline={true} ref={videoRef} style={{ position: 'absolute', width: '100%' }} />
                <Camera videoRef={videoRef}
                    devices={devices}
                    setDevices={setDevices}
                    setSelectedDeviceId={setSelectedDeviceId}
                    selectedDeviceId={selectedDeviceId}
                    setVideoOk={setVideoOk}></Camera>
                <HandTracker selectedDeviceId={selectedDeviceId} videoRef={videoRef} fingerHistory={fingerHistory} setsingerHistory={setsingerHistory}></HandTracker>
                {/* <canvas ref={trajectoryCanvasRef} style={{ position: 'absolute', border: '2px solid black', width: '100%' }} /> */}
            </div>
        </>
    )




};

export default CameraCounter;