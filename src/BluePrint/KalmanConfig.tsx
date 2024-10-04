import React, { useState, useRef } from 'react';
import { Button, ProgressBar, Form } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ValueSlider from './ValueSlider';
import Card from 'react-bootstrap/Card';
import Help from "../Help"
import { Overlay, Tooltip, OverlayTrigger } from 'react-bootstrap';
// const KalmanConfig = ({ minHandDetectionConfidence, setMinHandDetectionConfidence, minHandPresenceConfidence, setMinHandPresenceConfidence, minTrackingConfidence, setMinTrackingConfidence }: any) => {
const KalmanConfig = ({ kalmanSettings, setKalmanSettings }: any) => {
    // const targetRef = useRef(null);
    if (!kalmanSettings) {
        return <div>設定がない</div>; // エラーメッセージやローディング状態
    }


    return (
        <>
            {/* <Overlay target={targetRef.current} show={true} placement={"right"} >
                {(props) => ( */}

            {/* //     )}
            // </Overlay > */}

            <Card.Title>
                <div id="KalmanConfigTitle" style={{ display: 'flex', alignItems: 'center' }}>
                    <h5 style={{ marginRight: '5px' }}>カルマンフィルタの設定</h5>
                    <div style={{ fontSize: '16px', color: 'gray' }}>(下げるとカウントされやすくなります)</div>
                </div>
            </Card.Title>


            {/* カルマンフィルタの設定<br /> */}
            < ValueSlider
                max={0.5}
                value={kalmanSettings.process_var}
                setValue={(value: any) => setKalmanSettings((prev: any) => ({ ...prev, process_var: value }))}
                label={"プロセスモデルの分散"}
            />
            <ValueSlider
                max={0.5}
                value={kalmanSettings.sensor_var}
                setValue={(value: any) => setKalmanSettings((prev: any) => ({ ...prev, sensor_var: value }))}
                label={"センサーの分散"}
            />

        </>
    )
}

export default KalmanConfig;


