import React, { useState, useRef, useEffect } from 'react';
import { Button, ProgressBar, Dropdown, Accordion, Card, Form } from 'react-bootstrap';

import Camera from './Camera';
import CameraSelect from './CameraSelect';
import HandTracker from './HandTracker';
import KalmanFilter from './KalmanFilter';
import RollHandSelect from './RollHandSelect';
import TrakerConfig from './TrackerConfig';
const CameraCounter = ({ addCounter }: any) => {


    const [devices, setDevices] = useState<{ label: string; deviceId: string }[]>([]);


    const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);

    const videoRef = useRef<HTMLVideoElement>(null);
    const [videoOk, setVideoOk] = useState<boolean>(false);

    const trajectoryCanvasRef = useRef<HTMLCanvasElement>(null)

    const handLandmarkerRef = useRef<any>(null);
    const [fingerHistory, setsingerHistory] = useState([]);
    const [rollingHand, setRollingHand] = useState("Right");

    // console.log("cameracounter")
    // const [minHandDetectionConfidence, setMinHandDetectionConfidence] = useState(0.5);
    // const [minHandPresenceConfidence, setMinHandPresenceConfidence] = useState(0.5);
    // const [minTrackingConfidence, setMinTrackingConfidence] = useState(0.5);
    const [trackerSettings, setTrackerSettings] = useState({
        minHandDetectionConfidence: 0.5,
        minHandPresenceConfidence: 0.5,
        minTrackingConfidence: 0.5,
    });

    const [enableCameraCounter, setEnableCameraCounter] = useState("0")

    return (
        <>
            {/* <Button onClick={() => setEnableCameraCounter(enableCameraCounter == "0" ? "1" : "0")}>AI巻きカウンタ{enableCameraCounter}</Button> */}

            <Form.Check
                type="switch"
                checked={enableCameraCounter == "1"}
                onChange={() => setEnableCameraCounter(enableCameraCounter == "0" ? "1" : "0")}
                label="AI巻きカウンタ"
            />



            <Accordion activeKey={enableCameraCounter}>

                <Accordion.Collapse eventKey="1">
                    <div>
                        <Card>
                            <Card.Body>
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        設定
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        {/* <Dropdown.Item > */}
                                        <CameraSelect devices={devices} setSelectedDeviceId={setSelectedDeviceId} selectedDeviceId={selectedDeviceId}></CameraSelect>
                                        <br></br>
                                        < RollHandSelect rollingHand={rollingHand} setRollingHand={setRollingHand}></RollHandSelect>
                                        <br></br>
                                        <TrakerConfig
                                            // minHandDetectionConfidence={minHandDetectionConfidence}
                                            // setMinHandDetectionConfidence={setMinHandDetectionConfidence}
                                            // minHandPresenceConfidence={minHandPresenceConfidence}
                                            // setMinHandPresenceConfidence={setMinHandPresenceConfidence}
                                            // minTrackingConfidence={minTrackingConfidence}
                                            // setMinTrackingConfidence={setMinTrackingConfidence}
                                            trackerSettings={trackerSettings} setTrackerSettings={setTrackerSettings}
                                        ></TrakerConfig>
                                    </Dropdown.Menu>
                                </Dropdown>


                                < KalmanFilter fingerHistory={fingerHistory} addCounter={addCounter}></KalmanFilter>
                                <div style={{ position: 'relative', width: '90%', height: '500px' }}>
                                    <video autoPlay playsInline={true} ref={videoRef} style={{ position: 'absolute', width: '100%' }} />
                                    <Camera videoRef={videoRef}
                                        devices={devices}
                                        setDevices={setDevices}
                                        setSelectedDeviceId={setSelectedDeviceId}
                                        selectedDeviceId={selectedDeviceId}
                                        setVideoOk={setVideoOk}></Camera>
                                    <HandTracker rollingHand={rollingHand}
                                        selectedDeviceId={selectedDeviceId}
                                        videoRef={videoRef}
                                        trackerSettings={trackerSettings}

                                        fingerHistory={fingerHistory}
                                        setsingerHistory={setsingerHistory}
                                    ></HandTracker>
                                    {/* <canvas ref={trajectoryCanvasRef} style={{ position: 'absolute', border: '2px solid black', width: '100%' }} /> */}
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </Accordion.Collapse>

            </Accordion >

        </>
    )




};

export default CameraCounter;