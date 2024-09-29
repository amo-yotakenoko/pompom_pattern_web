import React, { useState } from 'react';
import { Button, ProgressBar, Form } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ValueSlider from './ValueSlider';
import Card from 'react-bootstrap/Card';
// const KalmanConfig = ({ minHandDetectionConfidence, setMinHandDetectionConfidence, minHandPresenceConfidence, setMinHandPresenceConfidence, minTrackingConfidence, setMinTrackingConfidence }: any) => {
const KalmanConfig = ({ kalmanSettings, setKalmanSettings }: any) => {
    if (!kalmanSettings) {
        return <div>設定がない</div>; // エラーメッセージやローディング状態
    }
    return (
        <>
            <Card.Title> カルマンフィルタの設定</Card.Title>
            {/* カルマンフィルタの設定<br /> */}
            <ValueSlider
                value={kalmanSettings.process_var}
                setValue={(value: any) => setKalmanSettings((prev: any) => ({ ...prev, process_var: value }))}
                label={"プロセスモデルの分散"}
            />
            <ValueSlider
                value={kalmanSettings.sensor_var}
                setValue={(value: any) => setKalmanSettings((prev: any) => ({ ...prev, sensor_var: value }))}
                label={"センサーの分散"}
            />

        </>
    )
}

export default KalmanConfig;


