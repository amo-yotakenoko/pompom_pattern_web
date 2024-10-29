import React, { useState } from 'react';
import { Button, ProgressBar, ButtonGroup } from 'react-bootstrap';
import CameraCounter from './CameraCounter';
// type SelectRollingHandProps = {
//     rollingHand: string;
//     setRollingHand: React.Dispatch<React.SetStateAction<string>>;
// };
import Help from "../Help"
const RollCounter = ({ selectingFrame, rollProgress, setRollProgress, frames }: any) => {

    let widthCount = 0
    let progress = 0
    let completeNumber = 0
    function addCounter(value: number, piled = false) {
        if (!piled)
            value *= frames[selectingFrame].color.length
        console.log({ value }, frames[selectingFrame].color.length)
        let added = progress + value
        added = Math.max(0, Math.min(completeNumber, added));
        setRollProgress(rollProgress.map((progress: any, i: any) => (i === selectingFrame ? added : progress)))
        // console.log(frames[selectingFrame].color.length)

        return { rolled: added, isComplete: completeNumber == added }
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
            <div >
                {/* {completeNumber} */}
                <div className="d-flex w-100" >
                    <ButtonGroup className="w-100" id="rollCounter">
                        <Button onClick={() => addCounter(-widthCount, true)} disabled={progress <= 0} className="flex-grow-1">
                            -1段
                        </Button>
                        <Button onClick={() => addCounter(widthCount, true)} disabled={progress >= completeNumber} className="flex-grow-1">
                            +1段
                        </Button>
                    </ButtonGroup>

                    <ButtonGroup className="w-100">
                        <Button onClick={() => addCounter(-1)} disabled={progress <= 0} className="flex-grow-1">
                            -1
                        </Button>
                        <Button onClick={() => addCounter(1)} disabled={progress >= completeNumber} className="flex-grow-1">
                            +1
                        </Button>
                    </ButtonGroup>
                    <Help id="rollCounter" placement="right">巻き数メモ</Help>
                </div >


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