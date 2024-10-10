import React, { useState, useEffect } from 'react';
// import { Button, ProgressBar } from 'react-bootstrap';
// type SelectRollingHandProps = {
//     rollingHand: string;
//     setRollingHand: React.Dispatch<React.SetStateAction<string>>;
// };

const SelectedHighlight = ({ drawFrame, selectingFrame, frames }: any) => {





    const [blinkCount, setBlinkCount] = useState(0);
    // console.log("aaaa")
    useEffect(() => {

        let selectingFramecanvas = document.getElementById('selectingFrame') as HTMLCanvasElement;

        let selectingFramectx = selectingFramecanvas.getContext('2d');
        const width = selectingFramecanvas.width;
        const height = selectingFramecanvas.height;

        // console.log("selectingFrame変更", selectingFramectx, selectingFrame, frames[selectingFrame])
        if (selectingFramectx == null) return;
        // console.log("selectingFrame変更2")
        selectingFramectx.clearRect(0, 0, width, height);
        const frame = frames[selectingFrame]
        if (frame) {
            // console.log("selectingFrame変更3")
            // console.log("表示")
            selectingFramectx.lineWidth = 5;
            drawFrame(selectingFramectx, frame.center, frame.roll, frame.pitch, frame.piled, frame.widthCount);

            selectingFramectx.closePath();
            // selectingFramectx.strokeStyle = `rgba(255, 0, 0, ${Math.sin(blinkCount / 10) + 1})`;
            selectingFramectx.strokeStyle = `rgba(255, 0, 0, ${Math.sin(blinkCount / 10) + 1})`;
            selectingFramectx.stroke()
        }
        // console.log({ blinkCount })

        const blinkCountFunction = setTimeout(() => {
            setBlinkCount(prevCount => prevCount + 1);
        }, 10);

     
        return () => clearTimeout(blinkCountFunction);


    }, [selectingFrame, blinkCount]);


    return (
        <canvas id="selectingFrame" width="1024" height="1024" style={{
            width: '100%',
            position: "absolute",
            pointerEvents: "none"
        }} />
    )




};

export default SelectedHighlight;