import React, { useEffect, useRef, useState } from 'react';
import ImageSave from '../Edit/ImageSave'
import RollCounter from './RollCounter';
import SelectedHighlight from './SelectedHighlight';
import Help from "../Help"
import { Overlay, Tooltip } from 'react-bootstrap';
import VerticalMenu from '../Edit/VerticalMenu';
// type BluePrintProps = {
//     pattern: any;
//     colorList: any;
//     rollWidth: number;
//     pitchWidth: number;
//     activeMenu: any;

// };
var cancel = false;
let frames: any = []


const BluePrint = ({ pattern, colorList, rollWidth, pitchWidth, activeMenu, setActiveMenu }: any) => {

    const [rollProgress, setRollProgress] = useState<any[]>([]);



    const [progress, setProgress] = useState(0);
    const propsRef = useRef({ pattern, colorList });
    useEffect(() => {
        propsRef.current = { pattern, colorList };
    }, [pattern, colorList]);
    let canvas: any;
    let bluePrintMemo: any;

    const activeMenuRef = useRef(activeMenu);
    useEffect(() => {
        activeMenuRef.current = activeMenuRef;
    }, [activeMenu]);
    function getR(pitch: any) {
        // return (canvas.width / 2 * 0.3) + (pitch / pitchWidth) * (canvas.width / 2 * 0.65)
        return (1024 / 2 * 0.3) + (pitch / pitchWidth) * (1024 / 2 * 0.65)
    }


    function getTheta(roll: any) {
        return (2 * Math.PI) * (roll / rollWidth)
    }
    var ctx: any;
    const [selectingFrame, setSelectingFrame] = useState(0);
    useEffect(() => {
        cancel = false;
        console.log(activeMenu)
        if (activeMenu != "bluePrint") return;
        canvas = document.getElementById('bluePrint') as HTMLCanvasElement;
        bluePrintMemo = document.getElementById('bluePrintMemo') as HTMLCanvasElement;
        bluePrintMemo.addEventListener('mousedown', (event: any) => { selectFrame(event) });
        bluePrintMemo.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        // if (!canvas || !canvas.getContext || !canvasParent) return;

        ctx = canvas.getContext('2d');
        if (ctx == null) return;

        // console.log(propsRef.current.pattern)
        // const bluePrintImg = document.getElementById('bluePrintImg') as HTMLImageElement;
        const pompomCanvas = document.getElementById("edit3d") as HTMLCanvasElement;

        // });
        (async function () {
            // bluePrintImg.src = "";

            // ctx.fillStyle = "#FFFFFF";
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            await new Promise(resolve => setTimeout(resolve, 100));
            await drawPompom(ctx, canvas, pompomCanvas)
            // console.log("かきこみ1")
            await drawbluePrint(ctx, canvas);
            // console.log("かきこみ2")

            // console.log("かきこみ3")
            // convartDownloadble(bluePrintImg);
            // ctx.clearRect(0, 0, canvas.width, canvas.height);


        })();

        // window.addEventListener('resize', () => draw());
        return () => {

            bluePrintMemo.removeEventListener('mousedown', (event: any) => { selectFrame(event) });
            console.log("おわり")
            cancel = true;
        };

    }, [activeMenu]);


    async function drawPompom(ctx: any, canvas: HTMLCanvasElement, pompomCanvas: HTMLCanvasElement) {
        await new Promise(resolve => setTimeout(resolve, 10));

        console.log("pompomかきこみ", pompomCanvas)
        // const pompomCtx = pompomCanvas.getContext('2d');
        // console.log({ pompomCtx })

        const targetWidth = canvas.width;
        const targetHeight = canvas.height;


        const sourceWidth = pompomCanvas.width;
        const sourceHeight = pompomCanvas.height;

        let r = getR(-1)
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(targetWidth / 2, targetHeight / 2, getR(-1) - 5, 0, 2 * Math.PI);
        ctx.fillStyle = '#111111';
        ctx.fill();

        // ctx.imageSmoothingEnabled = true;
        // ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(pompomCanvas, 0, 0, sourceWidth, sourceHeight, targetWidth / 2 - r, targetHeight / 2 - r, r * 2, r * 2);

    }


    async function drawbluePrint(ctx: any, canvas: HTMLCanvasElement) {


        // canvas.width = canvasParent.clientWidth;
        // canvas.height = canvasParent.clientHeight;
        // console.log("draw");







        // ctx.fillText("aa", 100, 100);
        function countPiled(pitch: any, roll: any, i: any, center: any, color: any) {
            let piled = 0;
            for (piled = 0; (pitch + piled) < pitchWidth; piled++) {
                for (let roll_i = roll; roll_i > roll - i; roll_i--) {

                    // ctx.beginPath();
                    // ctx.arc(center.x + Math.cos(t) * r, center.y + Math.sin(t) * r, 5, 0, Math.PI * 2);
                    // ctx.closePath();
                    if (color !== propsRef.current.pattern[roll_i][(pitch + piled)]) {
                        return piled;

                    }

                    ctx.strokeStyle = propsRef.current.pattern[roll][pitch] == propsRef.current.pattern[roll_i][(pitch + piled)] ? 'black' : 'red';
                    ctx.lineWidth = 2;
                    ctx.stroke();
                    // await new Promise(requestAnimationFrame);
                }

            }
            return piled;
        }


        for (let pitch = 0; pitch < pitchWidth; pitch++) {
            for (let roll = 0; roll < rollWidth; roll++) {
                try {

                    // console.log(pattern)
                    // console.log(canvas)
                    const p = roll + pitch;
                    const color = propsRef.current.pattern[roll][pitch];
                    const i = p % propsRef.current.colorList[color].length;
                    ctx.fillStyle = propsRef.current.colorList[color][i];
                    ctx.strokeStyle = "#000000";
                    ctx.lineWidth = 2;
                    const center = { x: canvas.width / 2, y: canvas.height / 2 };

                    // console.log({ x, y })
                    // ctx.fillRect(x, y, 10, 10);
                    let theta = getTheta(roll);

                    let thetaWidth = (2 * Math.PI) * (1 / rollWidth);
                    let r = getR(pitch);
                    let rWidth = getR(pitch + 1) - getR(pitch);
                    center.y += (theta >= Math.PI ? -1 : 1) * 15;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();

                    ctx.moveTo(center.x + Math.cos(theta) * (r), center.y + Math.sin(theta) * (r));
                    ctx.lineTo(center.x + Math.cos(theta + thetaWidth) * (r), center.y + Math.sin(theta + thetaWidth) * (r));
                    ctx.lineTo(center.x + Math.cos(theta + thetaWidth) * (r + rWidth), center.y + Math.sin(theta + thetaWidth) * (r + rWidth));
                    ctx.lineTo(center.x + Math.cos(theta) * (r + rWidth), center.y + Math.sin(theta) * (r + rWidth));
                    ctx.lineTo(center.x + Math.cos(theta) * (r), center.y + Math.sin(theta) * (r));
                    ctx.stroke();
                    ctx.closePath();
                    ctx.fill();
                } catch (e) {
                    console.log(e)
                }

            }
            await new Promise(requestAnimationFrame);
            if (cancel) return;
        }



        // await new Promise(resolve => setTimeout(resolve, 1000));
        let puted: any = [];
        for (let i = 0; i < rollWidth; i++) {
            puted[i] = [];
            for (let j = 0; j < pitchWidth; j++) {
                puted[i][j] = false;
            }
        }

        // await new Promise(resolve => setTimeout(resolve, 1000));
        ctx.beginPath();
        // ctx.moveTo(center.x + Math.cos(getTheta(roll + 1)) * getR(pitch), center.y + Math.sin(getTheta(roll + 1)) * getR(pitch));
        // ctx.lineTo(center.x + Math.cos(getTheta(roll + 1)) * getR(pitch + piled), center.y + Math.sin(getTheta(roll + 1)) * getR(pitch + piled));
        ctx.moveTo(0, 0);
        let widthCount = 0;
        frames = []

        for (let pitch = 0; pitch < pitchWidth; pitch++) {
            for (let roll = 0; roll < rollWidth; roll++) {
                // ctx.clearRect(0, 0, canvas.width, canvas.height);
                const color = propsRef.current.pattern[roll][pitch];
                let frameColor = isNearBlack(propsRef.current.colorList[color][0]) ? 'white' : 'black';
                let theta = getTheta(roll);
                let thetaWidth = (2 * Math.PI) * (1 / rollWidth);
                let r = getR(pitch);
                const center = { x: canvas.width / 2, y: canvas.height / 2 + (0.5 <= roll / rollWidth ? -1 : 1) * 15 };

                let isChange = false;

                //上下の分かれ目なら
                if (roll == rollWidth - 1 || 0.5 <= roll / rollWidth !== 0.5 <= (roll + 1) / rollWidth)
                    isChange = true;
                else if (puted[roll + 1][pitch])
                    isChange = true;
                else if (propsRef.current.pattern[roll][pitch] !== propsRef.current.pattern[roll + 1][pitch])
                    isChange = true;
                if (puted[roll][pitch]) {
                    continue;
                }
                widthCount += 1;
                // console.log("ああああああ")
                if (isChange) {


                    let piled = countPiled(pitch, roll, widthCount, center, color);

                    for (let pitch_i = pitch; pitch_i < pitch + piled; pitch_i++) {
                        for (let roll_i = roll; roll_i > roll - widthCount; roll_i--) {
                            puted[roll_i][pitch_i] = true;
                        }
                    }
                    console.log({ widthCount })
                    frames.push({ center: center, roll: roll, pitch: pitch, widthCount: widthCount, piled: piled, frameColor, thetaWidth, theta, color: propsRef.current.colorList[color] })


                    // await new Promise(resolve => setTimeout(resolve, 1000));
                    // drawFrame(center, roll, pitch, piled);

                    // drawCountNumber(piled, center, theta, pitch, roll, thetaWidth);

                    // await new Promise(requestAnimationFrame);
                    // await new Promise(resolve => setTimeout(resolve, 1000));
                    if (cancel) return;
                }

                if (isChange) widthCount = 0;
            }
            setRollProgress(Array.from({ length: frames.length }, () => 0))

        }

        for (const frame of frames) {
            drawFrame(ctx, frame.center, frame.roll, frame.pitch, frame.piled, frame.widthCount);
            ctx.lineWidth = 1;
            ctx.stroke();
            await new Promise(resolve => setTimeout(resolve, 1));
            console.log("かきこみ")
        }
        for (const frame of frames) {

            drawCountNumber(frame.piled, frame.center, frame.theta, frame.pitch, frame.roll, frame.thetaWidth, frame.widthCount, frame.frameColor);
            await new Promise(resolve => setTimeout(resolve, 1));
        }



        function drawCountNumber(piled: number, center: { x: number; y: number; }, theta: number, pitch: number, roll: number, thetaWidth: number, widthCount: any, frameColor: any) {
            let fontsize = 20;
            ctx.font = `${fontsize}px Arial`;
            let textHeight = fontsize / 2;
            ctx.fillStyle = frameColor;
            console.log({ thetaWidth })
            if (piled > 1) {
                piledText(piled, ctx, center, theta, pitch, roll, rollWidth, textHeight, thetaWidth, canvas);
            }
            if (widthCount > 1) {
                widthCountText(theta, widthCount, rollWidth, ctx, center, thetaWidth, roll, pitch, colorList, pattern);
            }

            function piledText(piled: number, ctx: any, center: { x: number; y: number; }, theta: number, pitch: number, roll: number, rollWidth: number, textHeight: number, thetaWidth: number, canvas: any) {
                let text = `${piled}`;
                const textWidth = ctx.measureText(text).width;
                ctx.save();
                let textTheta = getTheta(roll + 1);
                let x = center.x + Math.cos(textTheta) * getR(pitch + piled / 2);
                let y = center.y + Math.sin(textTheta) * getR(pitch + piled / 2);
                ctx.translate(x, y);
                let textY = textHeight * 2;
                textTheta = getTheta(roll + 0.5);
                if (Math.cos(getTheta(roll + 0.5)) > 0) {
                    textTheta += Math.PI;
                    textY = 0;
                }
                ctx.rotate(textTheta + (2 * Math.PI) / 2);
                ctx.fillText(text, -(textWidth / 2), textY);
                ctx.restore();
            }

            function widthCountText(theta: number, widthCount: number, rollWidth: number, ctx: any, center: { x: number; y: number; }, thetaWidth: number, roll: number, pitch: number, colorList: any, pattern: any) {
                theta -= (2 * Math.PI) * ((widthCount) / rollWidth) / 2;
                let text = `${widthCount}`;
                let colorLength = colorList[pattern[roll][pitch]].length;
                if (colorLength > 1) {
                    text = `${Math.ceil(widthCount / colorLength)}(*${colorLength})`;
                }
                const textWidth = ctx.measureText(text).width;
                ctx.save();
                let x = center.x + Math.cos(theta + thetaWidth) * getR(pitch);
                let y = center.y + Math.sin(theta + thetaWidth) * getR(pitch);
                ctx.arc(x, y, 10, 0, 2 * Math.PI);
                console.log("widthcount", theta, thetaWidth)
                ctx.translate(x, y);
                let textHeight = 0
                if (0.5 >= roll / rollWidth) {
                    theta += Math.PI;
                    textHeight = ctx.measureText(text).actualBoundingBoxAscent;
                }
                ctx.rotate(theta + thetaWidth + (2 * Math.PI) / 4);
                ctx.fillText(text, -(textWidth / 2), textHeight / 1);
                ctx.restore();
            }
        }



        function isNearBlack(color: string): boolean {

            let r = parseInt(color.substring(1, 3), 16);
            let g = parseInt(color.substring(3, 5), 16);
            let b = parseInt(color.substring(5, 7), 16);

            let brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;

            return brightness > 256 / 2 ? false : true;
        }
    }
    function drawFrame(ctx: any, center: { x: number; y: number; }, roll: number, pitch: number, piled: number, widthCount: number) {
        ctx.beginPath();
        widthCount = Math.floor(widthCount);
        roll = Math.floor(roll);
        // console.log(center)
        ctx.moveTo(center.x + Math.cos(getTheta(roll + 1)) * getR(pitch), center.y + Math.sin(getTheta(roll + 1)) * getR(pitch));
        for (let i = 0; i <= widthCount; i += 1) {
            ctx.lineTo(center.x + Math.cos(getTheta(roll + 1 - i)) * getR(pitch), center.y + Math.sin(getTheta(roll + 1 - i)) * getR(pitch));
            // ctx.arc(center.x + Math.cos(getTheta(roll + 1 - i)) * getR(pitch), center.y + Math.sin(getTheta(roll + 1 - i)) * getR(pitch), 10, 0, 2 * Math.PI);
        }
        for (let i = widthCount; i >= 0; i -= 1) {
            ctx.lineTo(center.x + Math.cos(getTheta(roll + 1 - i)) * getR(pitch + piled), center.y + Math.sin(getTheta(roll + 1 - i)) * getR(pitch + piled));
        }

        ctx.closePath();

    }

    function frameShapeEx(ctx: any, frame: any, progress: number) {
        ctx.beginPath();
        // if (progress == undefined) {
        //     progress = frame.piled * frame.widthCount
        // }
        let piled = Math.floor(progress / frame.widthCount)
        let roll = frame.roll
        // ctx.moveTo(frame.center.x + Math.cos(getTheta(roll + 1)) * getR(frame.pitch), frame.center.y + Math.sin(getTheta(roll + 1)) * getR(frame.pitch));
        drawFrame(ctx, frame.center, roll, frame.pitch, piled, frame.widthCount);
        ctx.closePath();
        ctx.fillStyle = 'rgba(10, 10, 10, 0.5)';
        ctx.fill()

        let restroll = progress - frame.widthCount * piled
        console.log("pitch", frame.pitch + piled, frame.pitch + piled % 2 == 0)
        if ((frame.pitch + piled) % 2 == 0) {

            drawFrame(ctx, frame.center, roll, frame.pitch + piled, 1, restroll);
        } else {
            drawFrame(ctx, frame.center, roll + restroll - frame.widthCount, frame.pitch + piled, 1, restroll);
        }
        ctx.closePath();
        ctx.fillStyle = 'rgba(10, 10, 10, 0.5)';
        ctx.fill()

    }



    function selectFrame(event: any) {
        for (let i = 0; i < frames.length; i++) {
            const frame = frames[i];
            if (frame == null) continue;

            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;


            const x = (event.clientX - rect.left) * scaleX;
            const y = (event.clientY - rect.top) * scaleY;

            if (frame === undefined) continue;

            let center_x = frame.center.x + Math.cos(getTheta(frame.roll + 1 - frame.widthCount / 2)) * getR(frame.pitch + frame.piled / 2);
            let center_y = frame.center.y + Math.sin(getTheta(frame.roll + 1 - frame.widthCount / 2)) * getR(frame.pitch + frame.piled / 2);

            if (isPointInFrame(frame, x, y)) {
                console.log(`Frame Index: ${i}`, frame);
                setSelectingFrame(i);
            }
        }
    }


    useEffect(() => {
        console.log("メモ")
        let bluePrintMemo = document.getElementById('bluePrintMemo') as HTMLCanvasElement;
        let memoctx = bluePrintMemo.getContext('2d')
        if (memoctx) {
            // console.log("メモ2")

            memoctx.clearRect(0, 0, bluePrintMemo.width, bluePrintMemo.height);
            // if (!memoctx) return
            let i = 0
            let progress = 0

            for (const frame of frames) {
                if (frame == null) continue;
                // console.log("メモ3")
                memoctx.fillStyle = 'rgba(255, 0, 0, 0.1)';
                // ctx.fill();
                // frame(frame.center, frame.roll, frame.pitch, frame.piled, frame.widthCount);
                const rect = bluePrintMemo.getBoundingClientRect();
                const scaleX = bluePrintMemo.width / rect.width;
                const scaleY = bluePrintMemo.height / rect.height;



                if (frame == undefined) continue
                // console.log("メモ4")
                // memoctx.beginPath();
                // memoctx.arc(x, y, 1, 0, 2 * Math.PI);
                // memoctx.fillStyle = 'rgba(0, 0, 0, 0.5)'; 
                // memoctx.fill();
                // // memoctx.strokeStyle = '#000'; 
                // memoctx.stroke();

                // memoctx.beginPath();
                // memoctx.fillStyle = 'rgba(10, 10, 10, 0.5)';
                // frameShapeEx(memoctx, frame);


                // console.log(frame)
                let center_x = frame.center.x + Math.cos(getTheta(frame.roll + 1 - frame.widthCount / 2)) * getR(frame.pitch + frame.piled / 2)
                let center_y = frame.center.y + Math.sin(getTheta(frame.roll + 1 - frame.widthCount / 2)) * getR(frame.pitch + frame.piled / 2)
                // memoctx.closePath(); 

                // if (isPointInFrame(frame, x, y)) {
                //     // console.log(i, "を反転")
                //     rollProgress[i] += 1
                // }



                if (rollProgress[i] > 0 && bluePrintMemo) {

                    progress += frame.widthCount * frame.piled
                    let size = 30
                    // memoctx.fill();
                    const ctx = bluePrintMemo.getContext('2d');

                    frameShapeEx(memoctx, frame, rollProgress[i])



                    memoctx.beginPath();
                    memoctx.arc(center_x, center_y, size, 0, 2 * Math.PI);
                    memoctx.fillStyle = 'rgba(5, 5, 5, 0.5)';
                    // memoctx.fill(); 
                    memoctx.strokeStyle = '#000';
                    memoctx.lineWidth = 3;
                    memoctx.stroke();
                    memoctx.fill();

                    memoctx.font = `${size}px Arial`;
                    memoctx.fillStyle = "#dddddd";
                    memoctx.textAlign = 'center';
                    memoctx.textBaseline = 'middle';
                    const iscomplete = frame.widthCount * frame.piled <= rollProgress[i]
                    memoctx.fillText(iscomplete ? "済" : rollProgress[i], center_x, center_y);
                }

                i += 1
                // if (isPointInFrame(frame.center, frame.roll, frame.pitch, frame.piled, frame.widthCount, x, y)) console.log("当たった")
                // await new Promise(resolve => setTimeout(resolve, 100));
            }
            setProgress(progress)
            console.log(rollProgress)
        }
    }, [rollProgress]);


    // function Drawprogress(event: any, bluePrintMemo: any) {
    //     console.log("メモ")

    //     let memoctx = bluePrintMemo.getContext('2d')
    //     memoctx.clearRect(0, 0, canvas.width, canvas.height);
    //     // if (!memoctx) return
    //     let i = 0
    //     let progress = 0

    //     for (const frame of frames) {
    //         if (frame == null) continue;
    //         ctx.fillStyle = 'rgba(255, 0, 0, 0.1)';
    //         // ctx.fill();
    //         // frame(frame.center, frame.roll, frame.pitch, frame.piled, frame.widthCount);
    //         const rect = canvas.getBoundingClientRect();
    //         const scaleX = canvas.width / rect.width;
    //         const scaleY = canvas.height / rect.height;

    //         
    //         const x = (event.clientX - rect.left) * scaleX;
    //         const y = (event.clientY - rect.top) * scaleY;
    //         if (frame == undefined) continue
    //         // memoctx.beginPath();
    //         // memoctx.arc(x, y, 1, 0, 2 * Math.PI);
    //         // memoctx.fillStyle = 'rgba(0, 0, 0, 0.5)'; 
    //         // memoctx.fill();
    //         // // memoctx.strokeStyle = '#000'; // 黒色の線
    //         // memoctx.stroke();

    //         // memoctx.beginPath();
    //         // memoctx.fillStyle = 'rgba(10, 10, 10, 0.5)';
    //         // frameShapeEx(memoctx, frame);


    //         // console.log(frame)
    //         let center_x = frame.center.x + Math.cos(getTheta(frame.roll + 1 - frame.widthCount / 2)) * getR(frame.pitch + frame.piled / 2)
    //         let center_y = frame.center.y + Math.sin(getTheta(frame.roll + 1 - frame.widthCount / 2)) * getR(frame.pitch + frame.piled / 2)
    //         // memoctx.closePath(); // 最初の点に戻る

    //         // if (isPointInFrame(frame, x, y)) {
    //         //     // console.log(i, "を反転")
    //         //     rollProgress[i] += 1
    //         // }



    //         if (rollProgress[i] > 0) {
    //             progress += frame.widthCount * frame.piled
    //             let size = 30
    //             // memoctx.fill();
    //             const ctx = canvas.getContext('2d');

    //             frameShapeEx(memoctx, frame, rollProgress[i])



    //             memoctx.beginPath();
    //             memoctx.arc(center_x, center_y, size, 0, 2 * Math.PI);
    //             memoctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
    //             // memoctx.fill(); 
    //             memoctx.strokeStyle = '#000';
    //             memoctx.lineWidth = 3;
    //             memoctx.stroke();

    //             memoctx.font = `${size}px Arial`;
    //             memoctx.fillStyle = "#dddddd";
    //             memoctx.textAlign = 'center';
    //             memoctx.textBaseline = 'middle';
    //             memoctx.fillText(rollProgress[i], center_x, center_y);
    //         }

    //         i += 1
    //         // if (isPointInFrame(frame.center, frame.roll, frame.pitch, frame.piled, frame.widthCount, x, y)) console.log("当たった")
    //         // await new Promise(resolve => setTimeout(resolve, 100));
    //     }
    //     setProgress(progress)
    //     console.log(rollProgress)


    //     // drawFrameに追加で巻き数を指定できる




    // }

    const rollCountSum = rollProgress.reduce((accumulator: any, currentValue: any) => accumulator + currentValue, 0);

    const [completeTextEnable, setCompleteTextEnable] = useState(false);
    useEffect(() => {
        if (rollWidth * pitchWidth - rollCountSum <= 0) {
            setCompleteTextEnable(true);


            setTimeout(() => {
                setCompleteTextEnable(false);
            }, 5000);

            // return () => clearTimeout(timer);
        }
    }, [rollWidth, pitchWidth, rollCountSum]);





    function isPointInFrame(frame: any, x: any, y: any) {
        drawFrame(ctx, frame.center, frame.roll, frame.pitch, frame.piled, frame.widthCount);
        // if (memoctx.isPointInPath(x, y)) {

        //     console.log(memoctx.getImageData(x, y, 1, 1).data[3])
        //     memoctx.fill();
        // }
        return ctx.isPointInPath(x, y);
    }
    console.log("aaa2")
    return (
        <>
            {/* {`${colorList}`} */}
            {/* <div id="canvasParent" style={{
                border: '1px solid black',
                width: '100vw',
                height: '100vw',
                aspectRatio: '1 / 1',
            }}> */}
            {/* <div style={{ width: '100vw', height: 'auto', position: 'relative' }}> */}

            <div className="col-12 col-lg-6 " style={{
                position: "relative",
                width: '100%',
                paddingBottom: "100%",
                // right: "15px"

                // padding: 0
                // background: "#FF000"
            }}>


                <canvas id="bluePrint" className="no-margin" width="1024" height="1024" style={{
                    // background: "#FFF000",
                    // border: "2px solid black",
                    width: '100%',
                    paddingBottom: "100%",
                    // position: 'absolute', top: 0, left: 0,
                    // pointerEvents: 'none',
                    // // display: "block",
                    // margin: "auto"
                    position: "absolute",
                    // padding: 0,
                    // margin: 0
                    // top: 0;           
                    // left: 0;           
                    // width: 100 %;        
                    // height: 100 %;  

                }} />

                <canvas id="bluePrintMemo" width="1024" height="1024" style={{

                    // border: "2px solid black",
                    width: '100%',
                    // position: 'absolute', top: 0, left: 0,
                    // pointerEvents: 'none',
                    // // display: "block",
                    // margin: "auto"
                    position: "absolute",
                    padding: 0,
                    margin: 0
                    // top: 0;            
                    // left: 0;           
                    // width: 100 %;      
                    // height: 100 %;  

                }} />


                <SelectedHighlight drawFrame={drawFrame} selectingFrame={selectingFrame} frames={frames} ></SelectedHighlight>


                {/* <div style={{
                            position: "absolute",
                            top: "0",
                            right: "0",
                            // width: "5%",
                            // height: "5%"
                        }}> */}

                <ImageSave data={{ pattern, colorList, rollWidth, pitchWidth }}></ImageSave>
                {/* </div> */}

                <div style={{
                    position: "absolute",
                    top: "5px",
                    left: "5px",
                    fontSize: '16px',
                    fontWeight: 'bold',
                    pointerEvents: "none"
                }} id="allProgress">
                    残り{rollWidth * pitchWidth - rollCountSum}巻き　{(rollCountSum / (rollWidth * pitchWidth) * 100).toFixed(0)}%
                </div >
                <Help id="allProgress" placement="bottom">全体の進捗</Help>


            </div>
            <div className="col-12 col-lg-6" >
                <VerticalMenu activeMenu={activeMenu}
                    setActiveMenu={setActiveMenu}
                    isConfirmation={rollCountSum > 0}
                ></VerticalMenu>
                <div className="row no-margin" style={{ width: "calc(100vw - 1em)", overflowY: "auto", maxHeight: "calc(100vh - 100vw )" }}>

                    <RollCounter frames={frames} selectingFrame={selectingFrame} rollProgress={rollProgress} setRollProgress={setRollProgress}></RollCounter>

                    <Overlay target={() => document.getElementById("share")} show={completeTextEnable} >
                        {(props) => (
                            <Tooltip  {...props}>
                                おめでとうございます!
                                SNS等でシェアしていただけると励みになります!
                            </Tooltip>
                        )}
                    </Overlay >

                </div>

            </div >

        </>
    )





}
export default BluePrint;

