import React, { useState, useRef, createContext, useContext, useEffect } from 'react';
import { Button, ProgressBar, Dropdown, Accordion, Card, Form, Modal, Spinner } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import Camera from './Camera';
import CameraSelect from './CameraSelect';
import HandTracker from './HandTracker';
import KalmanFilter from './KalmanFilter';
import RollHandSelect from './RollHandSelect';
import TrakerConfig from './TrackerConfig';
import KalmanConfig from './KalmanConfig';
import { enableHelpContext } from '../Edit/Edit';
import Alert from 'react-bootstrap/Alert';
import Help from "../Help"
import SoundVolume from './SoundVolume';

const CameraCounter = ({ addCounter }: any) => {
    const { enableHelp, setEnableHelp } = useContext(enableHelpContext);

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
        minHandDetectionConfidence: 0.05,
        minHandPresenceConfidence: 0.01,
        minTrackingConfidence: 0.01,
    });
    const [kalmanSettings, setKalmanSettings] = useState({
        process_var: 0.1,
        sensor_var: 0.05,
    });

    const [enableCameraCounter, setEnableCameraCounter] = useState("0")
    const [setttingShow, setSettingShow] = useState(false);
    const [isTracked, setIsTracked] = useState(false);
    const [soundVolume, setSoundVolume] = useState(0);
    const audiosRef = useRef<any>({ roll: undefined, end: undefined });



    useEffect(() => {
        setEnableHelp(false)
    }, [setttingShow])
    const [trackerOk, setTrackerOk] = useState(false);
    return (
        <>
            {/* aaa {`${trackerOk}`}{`${videoOk}`} */}
            {/* <Button onClick={() => setEnableCameraCounter(enableCameraCounter == "0" ? "1" : "0")}>AI巻きカウンタ{enableCameraCounter}</Button> */}
            {enableCameraCounter != "1" && (
                <>
                    {/* <Form.Check
                        type="switch"
                        checked={enableCameraCounter == "1"}
                        onChange={() => setEnableCameraCounter(enableCameraCounter == "0" ? "1" : "0")}
                        label="AI巻きカウンタ"
                    /> */}
                    <Button variant="outline-primary"
                        className="fs-2 mb-3"
                        onClick={() => setEnableCameraCounter(enableCameraCounter === "0" ? "1" : "0")}
                        style={{
                            padding: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: '20px'
                        }}
                    >
                        <Icon.Power style={{ fontSize: '15px' }} />
                        <div style={{ fontSize: '15px', marginLeft: '2px' }}>AI巻きカウンタ</div>
                    </Button>
                </>
            )}

            {enableCameraCounter == "1" && (
                <Accordion activeKey={enableCameraCounter}>

                    <Accordion.Collapse eventKey="1">
                        <div>
                            {/* <Card > */}



                            <div className="row  g-0">


                                <div className="col-6">
                                    <div style={{
                                        position: 'relative', width: '100%', justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>

                                        {!(trackerOk && videoOk) && (<Spinner animation="border" role="status" style={{ position: 'absolute', width: '100px', height: '100px' }}>

                                        </Spinner>)}

                                        {(trackerOk && videoOk) && !isTracked && <div style={{ position: 'absolute', width: '100%', color: "#00FF00", }} >  {rollingHand == "Right" ? "右" : "左"}手を画面に映してください</div>}
                                        <div style={{ transform: 'scaleX(-1)' }}>

                                            <video autoPlay playsInline={true} ref={videoRef} style={{ position: 'absolute', width: '100%' }} />
                                            <Camera
                                                videoRef={videoRef}
                                                devices={devices}
                                                setDevices={setDevices}
                                                setSelectedDeviceId={setSelectedDeviceId}
                                                selectedDeviceId={selectedDeviceId}
                                                setVideoOk={setVideoOk}
                                                isEnable={true}
                                            />



                                            <HandTracker
                                                setIsTracked={setIsTracked}
                                                rollingHand={rollingHand}
                                                selectedDeviceId={selectedDeviceId}
                                                videoRef={videoRef}
                                                trackerSettings={trackerSettings}
                                                fingerHistory={fingerHistory}
                                                setsingerHistory={setsingerHistory}
                                                setTrackerOk={setTrackerOk}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6" style={{ position: "relative", overflow: "hidden" }}>
                                    <KalmanFilter
                                        fingerHistory={fingerHistory}
                                        addCounter={addCounter}
                                        kalmanSettings={kalmanSettings}
                                        audiosRef={audiosRef}
                                        soundVolume={soundVolume}
                                    />
                                    <div style={{ position: "absolute", top: "1px", right: "1px", display: "flex", alignItems: "center" }}>
                                        <SoundVolume audiosRef={audiosRef} soundVolume={soundVolume} setSoundVolume={setSoundVolume} />
                                        <Icon.Sliders
                                            id="AIparameters"
                                            onClick={() => setSettingShow(true)}
                                            style={{ fontSize: "2rem", marginRight: "10px" }} // アイコンを大きくし、スライダーとの間に余白を追加
                                        />
                                        {/* {soundVolume} */}
                                    </div>

                                    <Help id="AIparameters" placement="bottom">パラメータ調整<br></br>うまく判定されないときはここをチェック</Help>
                                </div>
                            </div>




                            {/* </Card> */}
                        </div >
                    </Accordion.Collapse >

                    <Modal
                        show={setttingShow}
                        onHide={() => setSettingShow(false)}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>設定</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            < RollHandSelect rollingHand={rollingHand} setRollingHand={setRollingHand}></RollHandSelect>
                            <CameraSelect devices={devices} setSelectedDeviceId={setSelectedDeviceId} selectedDeviceId={selectedDeviceId}></CameraSelect>


                            <TrakerConfig
                                // minHandDetectionConfidence={minHandDetectionConfidence}
                                // setMinHandDetectionConfidence={setMinHandDetectionConfidence}
                                // minHandPresenceConfidence={minHandPresenceConfidence}
                                // setMinHandPresenceConfidence={setMinHandPresenceConfidence}
                                // minTrackingConfidence={minTrackingConfidence}
                                // setMinTrackingConfidence={setMinTrackingConfidence}
                                trackerSettings={trackerSettings} setTrackerSettings={setTrackerSettings}
                            ></TrakerConfig>
                            <KalmanConfig
                                kalmanSettings={kalmanSettings} setKalmanSettings={setKalmanSettings}>
                            </KalmanConfig>

                            <Button variant="danger" onClick={() => {
                                setEnableCameraCounter("0");
                                setSettingShow(false);
                            }
                            }>AI巻きカウンタを無効化</Button>
                        </Modal.Body>
                    </Modal>
                </Accordion >
            )}
        </>
    )




};

export default CameraCounter;