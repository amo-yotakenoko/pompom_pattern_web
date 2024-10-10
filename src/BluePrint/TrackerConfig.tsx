import React, { useState } from 'react';
import { Button, ProgressBar, Form } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ValueSlider from './ValueSlider';
import Card from 'react-bootstrap/Card';
// const TrakerConfig = ({ minHandDetectionConfidence, setMinHandDetectionConfidence, minHandPresenceConfidence, setMinHandPresenceConfidence, minTrackingConfidence, setMinTrackingConfidence }: any) => {
const TrakerConfig = ({ trackerSettings, setTrackerSettings }: any) => {
    if (!trackerSettings) {
        return <div>設定がない</div>; 
    }
    return (
        <>
            <Card.Title>  手の検出の設定 </Card.Title>
            {/* 手の検出<br /> */}
            <ValueSlider
                value={trackerSettings.minHandDetectionConfidence}
                setValue={(value: any) => setTrackerSettings((prev: any) => ({ ...prev, minHandDetectionConfidence: value }))}
                label={"ハンド検出の最小信頼スコア"}
            />
            <ValueSlider
                value={trackerSettings.minHandPresenceConfidence}
                setValue={(value: any) => setTrackerSettings((prev: any) => ({ ...prev, minHandPresenceConfidence: value }))}
                label={"手のプレゼンス スコアの最小信頼スコア"}
            />
            <ValueSlider
                value={trackerSettings.minTrackingConfidence}
                setValue={(value: any) => setTrackerSettings((prev: any) => ({ ...prev, minTrackingConfidence: value }))}
                label={"ハンドトラッキングの最小信頼スコア"}
            />
        </>
    )
}

export default TrakerConfig;


