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
import AICounterIcon from '../img/AIcounter.png';
import plagIconOn from '../img/plag_on.jpg';
import plagIconOff from '../img/plag_off.jpg';


const defaultConfig = {
    trackerSettings: {
        minHandDetectionConfidence: 0.1,
        minHandPresenceConfidence: 0.2,
        minTrackingConfidence: 0.95,
    },
    kalmanSettings: {
        process_var: 0.2,
        sensor_var: 0.1,
    },
    rollingHand: "Left"
}

const CameraCounter = ({ addCounter }: any) => {
    const { enableHelp, setEnableHelp } = useContext(enableHelpContext);

    const [devices, setDevices] = useState<{ label: string; deviceId: string }[]>([]);


    const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);

    const videoRef = useRef<HTMLVideoElement>(null);
    const [videoOk, setVideoOk] = useState<boolean>(false);

    const trajectoryCanvasRef = useRef<HTMLCanvasElement>(null)

    const handLandmarkerRef = useRef<any>(null);
    const [fingerHistory, setsingerHistory] = useState([]);
    const [cameraCounterisEnable, setCameraCounterIsEnable] = useState(true);

    // console.log("cameracounter")
    // const [minHandDetectionConfidence, setMinHandDetectionConfidence] = useState(0.5);
    // const [minHandPresenceConfidence, setMinHandPresenceConfidence] = useState(0.5);
    // const [minTrackingConfidence, setMinTrackingConfidence] = useState(0.5);

    const [rollingHand, setRollingHand] = useState<any>();
    const [trackerSettings, setTrackerSettings] = useState<any>();
    const [kalmanSettings, setKalmanSettings] = useState<any>();


    useEffect(() => {
        localStorage.setItem("cameraCountersSetting", JSON.stringify({
            rollingHand, trackerSettings, kalmanSettings
        }));
    }, [rollingHand, trackerSettings, kalmanSettings])


    if (!rollingHand) {
        let config: any;
        try {


            config = JSON.parse(localStorage.getItem("cameraCountersSetting") as string);
            setRollingHand(config.rollingHand)
            setTrackerSettings(config.trackerSettings)
            setKalmanSettings(config.kalmanSettings)
            console.log("cameraCountersSetting読込失敗")
        } catch (error) {
            defaultLoad()
        }


    }
    function defaultLoad() {

        setRollingHand(defaultConfig.rollingHand)
        setTrackerSettings(defaultConfig.trackerSettings)
        setKalmanSettings(defaultConfig.kalmanSettings)

    }


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
                    <Button
                        variant="dark"
                        // className="fs-2 mb-3"
                        onClick={() => setEnableCameraCounter(enableCameraCounter === "0" ? "1" : "0")}
                        style={{
                            border: '3px solid gray',
                            padding: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: '20px',
                            // alignItems: 'center', // 縦方向の中央揃え
                            justifyContent: 'center', // 横方向の中央揃え
                            // backgroundColor: 'black',
                            // color: 'white'
                        }}
                    >
                        {/* <Icon.Power style={{ fontSize: '15px' }} /> */}
                        <img src={AICounterIcon} style={{
                            // mixBlendMode: "multiply",
                            height: '22px', marginRight: '2px'
                        }}></img >

                        <br></br>
                        <div style={{ fontSize: '15px', marginLeft: '2px' }}>AI巻きカウンタ</div>
                    </Button>




                </>
            )
            }

            {
                enableCameraCounter == "1" && (
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
                                                    // setIsEnable={setIsEnable}
                                                    isEnable={true}
                                                    setEnableCameraCounter={setEnableCameraCounter}
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
                                            cameraCounterisEnable={cameraCounterisEnable}
                                        />
                                        <div style={{ position: "absolute", top: "1px", right: "1px", display: "flex", alignItems: "center" }}>
                                            <img
                                                src={cameraCounterisEnable ? plagIconOn : plagIconOff}
                                                onClick={() => setCameraCounterIsEnable(prevState => !prevState)}
                                                style={{
                                                    width: "2rem",
                                                    height: "2rem",
                                                    marginRight: "10px"
                                                }}
                                            />
                                            <SoundVolume audiosRef={audiosRef} soundVolume={soundVolume} setSoundVolume={setSoundVolume} />
                                            <Icon.Sliders
                                                id="AIparameters"
                                                onClick={() => setSettingShow(true)}
                                                style={{ fontSize: "2rem", marginRight: "10px" }}
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
                                    kalmanSettings={kalmanSettings} setKalmanSettings={setKalmanSettings} defaultConfig={defaultConfig} >
                                </KalmanConfig>

                                <Button variant="danger" onClick={() => {
                                    defaultLoad();
                                    setSettingShow(false);
                                }
                                }>初期設定に戻す</Button>


                                <Button variant="danger" onClick={() => {
                                    setEnableCameraCounter("0");
                                    setSettingShow(false);
                                }
                                }>AI巻きカウンタを無効化</Button>

                            </Modal.Body>
                        </Modal>
                    </Accordion >
                )
            }
        </>
    )




};

export default CameraCounter;