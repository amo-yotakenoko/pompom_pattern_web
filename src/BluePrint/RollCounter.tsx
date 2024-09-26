import React, { useState } from 'react';
import { Button, ProgressBar } from 'react-bootstrap';
// type SelectRollingHandProps = {
//     rollingHand: string;
//     setRollingHand: React.Dispatch<React.SetStateAction<string>>;
// };

const RollCounter = ({ selectingFrame, rollProgress, setRollProgress, frames }: any) => {

    const widthCount = frames[selectingFrame].widthCount
    const progress = rollProgress[selectingFrame]
    const completeNumber = frames[selectingFrame].piled * frames[selectingFrame].widthCount

    function addCounter(value: number) {

        let added = progress + value
        added = Math.max(0, Math.min(completeNumber, added));
        setRollProgress(rollProgress.map((progress: any, i: any) => (i === selectingFrame ? added : progress)))
    };
    console.log(frames[selectingFrame])
    return (
        <div>
            {completeNumber}
            <Button onClick={() => addCounter(-1)} disabled={progress <= 0}>-1</Button>
            <Button onClick={() => addCounter(1)} disabled={progress >= completeNumber}>+1</Button>


            <Button onClick={() => addCounter(- widthCount)} disabled={progress <= 0}>-1段</Button>
            <Button onClick={() => addCounter(widthCount)} disabled={progress >= completeNumber}>+1段</Button>
        </div >
    );
};

export default RollCounter;