import React, { useState } from 'react';
import { Button, ProgressBar } from 'react-bootstrap';
import CameraCounter from './CameraCounter';
// type SelectRollingHandProps = {
//     rollingHand: string;
//     setRollingHand: React.Dispatch<React.SetStateAction<string>>;
// };

const RollCounter = ({ selectingFrame, rollProgress, setRollProgress, frames }: any) => {

    let widthCount = 0
    let progress = 0
    let completeNumber = 0
    function addCounter(value: number) {

        let added = progress + value
        added = Math.max(0, Math.min(completeNumber, added));
        setRollProgress(rollProgress.map((progress: any, i: any) => (i === selectingFrame ? added : progress)))
    };


    try {


        // console.log("frames", frames)
        if (frames.length < selectingFrame) {
            console.log("ない")
            return (
                <div>準備中</div>
            )
        }
        widthCount = frames[selectingFrame].widthCount
        progress = rollProgress[selectingFrame]
        completeNumber = frames[selectingFrame].piled * frames[selectingFrame].widthCount


        console.log(frames[selectingFrame])


        return (
            <div>
                {completeNumber}
                <Button onClick={() => addCounter(-1)} disabled={progress <= 0}>-1</Button>
                <Button onClick={() => addCounter(1)} disabled={progress >= completeNumber}>+1</Button>


                <Button onClick={() => addCounter(- widthCount)} disabled={progress <= 0}>-1段</Button>
                <Button onClick={() => addCounter(widthCount)} disabled={progress >= completeNumber}>+1段</Button>


                <CameraCounter addCounter={addCounter}></CameraCounter>
            </div >
        );
    } catch {
        return (
            <div>エラー!!</div>
        )
    }



};

export default RollCounter;