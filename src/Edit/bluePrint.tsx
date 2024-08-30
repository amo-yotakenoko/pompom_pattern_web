import React, { useEffect, useRef, useState } from 'react';
import ImageSave from './ImageSave'


type BluePrintProps = {
    pattern: any;
    colorList: any;
    rollWidth: number;
    pitchWidth: number;
    activeMenu: any;

};
var cancel = false;
let frames: any = []
let isMemo: any = []
const BluePrint: React.FC<BluePrintProps> = ({ pattern, colorList, rollWidth, pitchWidth, activeMenu }) => {

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
        return (canvas.width / 2 * 0.3) + (pitch / pitchWidth) * (canvas.width / 2 * 0.65)
    }


    function getTheta(roll: any) {
        return (2 * Math.PI) * (roll / rollWidth)
    }
    var ctx: any;
    useEffect(() => {
        cancel = false;
        console.log(activeMenu)
        if (activeMenu != "bluePrint") return;
        canvas = document.getElementById('bluePrint') as HTMLCanvasElement;
        bluePrintMemo = document.getElementById('bluePrintMemo') as HTMLCanvasElement;
        bluePrintMemo.addEventListener('mousedown', (event: any) => { memoBluePrint(event, bluePrintMemo) });
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
            console.log("かきこみ1")
            await drawbluePrint(ctx, canvas);
            console.log("かきこみ2")

            console.log("かきこみ3")
            // convartDownloadble(bluePrintImg);
            // ctx.clearRect(0, 0, canvas.width, canvas.height);


        })();

        // window.addEventListener('resize', () => draw());
        return () => {
            bluePrintMemo.removeEventListener('mousedown', (event: any) => { memoBluePrint(event, bluePrintMemo) });
            console.log("おわり")
            cancel = true;
        };

    }, [activeMenu]);


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

            <div className="col-12 col-lg-6">
                <div style={{ position: "relative" }}>

                    <canvas id="bluePrint" width="1024" height="1024" style={{

                        // border: "2px solid black",
                        width: '100%',
                        // position: 'absolute', top: 0, left: 0,
                        // pointerEvents: 'none',
                        // // display: "block",
                        // margin: "auto"
                        position: "absolute"
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
                        position: "absolute"
                        // top: 0;            
                        // left: 0;           
                        // width: 100 %;      
                        // height: 100 %;  

                    }} />

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
                    }}>
                        残り{rollWidth * pitchWidth - progress}巻き　{(progress / (rollWidth * pitchWidth) * 100).toFixed(0)}%
                    </div >
                </div >

            </div>



        </>
    )




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


        //使い終わった
        for (let pitch = 0; pitch < pitchWidth; pitch++) {
            for (let roll = 0; roll < rollWidth; roll++) {
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
        isMemo = []
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
                    frames.push({ center: center, roll: roll, pitch: pitch, widthCount: widthCount, piled: piled, frameColor, thetaWidth, theta })
                    isMemo.push(false)
                    // await new Promise(resolve => setTimeout(resolve, 1000));
                    // drawFrame(center, roll, pitch, piled);

                    // drawCountNumber(piled, center, theta, pitch, roll, thetaWidth);

                    await new Promise(requestAnimationFrame);
                    // await new Promise(resolve => setTimeout(resolve, 1000));
                    if (cancel) return;
                }

                if (isChange) widthCount = 0;
            }
        }

        for (const frame of frames) {
            drawFrame(frame.center, frame.roll, frame.pitch, frame.piled, frame.widthCount);
            await new Promise(resolve => setTimeout(resolve, 100));
            console.log("かきこみ")
        }
        for (const frame of frames) {

            drawCountNumber(frame.piled, frame.center, frame.theta, frame.pitch, frame.roll, frame.thetaWidth, frame.widthCount, frame.frameColor);
            await new Promise(resolve => setTimeout(resolve, 100));
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

        function drawFrame(center: { x: number; y: number; }, roll: number, pitch: number, piled: number, widthCount: number) {
            ctx.beginPath();

            ctx.moveTo(center.x + Math.cos(getTheta(roll + 1)) * getR(pitch), center.y + Math.sin(getTheta(roll + 1)) * getR(pitch));
            for (let i = 0; i <= widthCount; i++) {
                ctx.lineTo(center.x + Math.cos(getTheta(roll + 1 - i)) * getR(pitch), center.y + Math.sin(getTheta(roll + 1 - i)) * getR(pitch));
                // ctx.arc(center.x + Math.cos(getTheta(roll + 1 - i)) * getR(pitch), center.y + Math.sin(getTheta(roll + 1 - i)) * getR(pitch), 10, 0, 2 * Math.PI);
            }
            for (let i = widthCount; i >= 0; i--) {
                ctx.lineTo(center.x + Math.cos(getTheta(roll + 1 - i)) * getR(pitch + piled), center.y + Math.sin(getTheta(roll + 1 - i)) * getR(pitch + piled));
            }

            ctx.closePath();
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        function isNearBlack(color: string): boolean {

            let r = parseInt(color.substring(1, 3), 16);
            let g = parseInt(color.substring(3, 5), 16);
            let b = parseInt(color.substring(5, 7), 16);

            let brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;

            return brightness > 256 / 2 ? false : true;
        }
    }

    function memoBluePrint(event: any, bluePrintMemo: any) {
        console.log("メモ")

        let memoctx = bluePrintMemo.getContext('2d')
        memoctx.clearRect(0, 0, canvas.width, canvas.height);
        // if (!memoctx) return
        let i = 0
        let progress = 0

        for (const frame of frames) {
            if (frame == null) continue;
            ctx.fillStyle = 'rgba(255, 0, 0, 0.1)';
            // ctx.fill();
            // frame(frame.center, frame.roll, frame.pitch, frame.piled, frame.widthCount);
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;

            // スケールを考慮したx, y座標を計算
            const x = (event.clientX - rect.left) * scaleX;
            const y = (event.clientY - rect.top) * scaleY;
            if (frame == undefined) continue
            // memoctx.beginPath();
            // memoctx.arc(x, y, 1, 0, 2 * Math.PI);
            // memoctx.fillStyle = 'rgba(0, 0, 0, 0.5)'; 
            // memoctx.fill();
            // // memoctx.strokeStyle = '#000'; // 黒色の線
            // memoctx.stroke();

            memoctx.beginPath();
            memoctx.fillStyle = 'rgba(10, 10, 10, 0.5)';
            memoctx.moveTo(frame.center.x + Math.cos(getTheta(frame.roll + 1)) * getR(frame.pitch), frame.center.y + Math.sin(getTheta(frame.roll + 1)) * getR(frame.pitch));
            for (let i = 0; i <= frame.widthCount; i++) {
                memoctx.lineTo(frame.center.x + Math.cos(getTheta(frame.roll + 1 - i)) * getR(frame.pitch), frame.center.y + Math.sin(getTheta(frame.roll + 1 - i)) * getR(frame.pitch));
                // ctx.arc(center.x + Math.cos(getTheta(roll + 1 - i)) * getR(pitch), center.y + Math.sin(getTheta(roll + 1 - i)) * getR(pitch), 10, 0, 2 * Math.PI);
            }
            for (let i = frame.widthCount; i >= 0; i--) {
                memoctx.lineTo(frame.center.x + Math.cos(getTheta(frame.roll + 1 - i)) * getR(frame.pitch + frame.piled), frame.center.y + Math.sin(getTheta(frame.roll + 1 - i)) * getR(frame.pitch + frame.piled));
            }
            console.log(frame)
            let center_x = frame.center.x + Math.cos(getTheta(frame.roll + 1 - frame.widthCount / 2)) * getR(frame.pitch + frame.piled / 2)
            let center_y = frame.center.y + Math.sin(getTheta(frame.roll + 1 - frame.widthCount / 2)) * getR(frame.pitch + frame.piled / 2)
            memoctx.closePath(); // 最初の点に戻る
            if (memoctx.isPointInPath(x, y)) {
                console.log(i, "を反転")
                isMemo[i] = !isMemo[i]
            }
            if (isMemo[i]) {
                progress += frame.widthCount * frame.piled
                let size = 30
                memoctx.fill();
                const ctx = canvas.getContext('2d');

                memoctx.beginPath();
                memoctx.arc(center_x, center_y, size, 0, 2 * Math.PI);
                memoctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
                // memoctx.fill(); 
                memoctx.strokeStyle = '#000';
                memoctx.lineWidth = 3;
                memoctx.stroke();

                memoctx.font = `${size}px Arial`;
                memoctx.fillStyle = "#dddddd";
                memoctx.textAlign = 'center';
                memoctx.textBaseline = 'middle';
                memoctx.fillText("済", center_x, center_y);
            }

            i += 1
            // if (isPointInFrame(frame.center, frame.roll, frame.pitch, frame.piled, frame.widthCount, x, y)) console.log("当たった")
            // await new Promise(resolve => setTimeout(resolve, 100));
        }
        setProgress(progress)
        console.log(isMemo)



        function isPointInFrame(center: { x: number; y: number; }, roll: number, pitch: number, piled: number, widthCount: number, x: any, y: any) {
            memoctx.beginPath();
            memoctx.fillStyle = 'rgba(255, 0, 0, 0.1)';
            memoctx.moveTo(center.x + Math.cos(getTheta(roll + 1)) * getR(pitch), center.y + Math.sin(getTheta(roll + 1)) * getR(pitch));
            for (let i = 0; i <= widthCount; i++) {
                memoctx.lineTo(center.x + Math.cos(getTheta(roll + 1 - i)) * getR(pitch), center.y + Math.sin(getTheta(roll + 1 - i)) * getR(pitch));
                // ctx.arc(center.x + Math.cos(getTheta(roll + 1 - i)) * getR(pitch), center.y + Math.sin(getTheta(roll + 1 - i)) * getR(pitch), 10, 0, 2 * Math.PI);
            }
            for (let i = widthCount; i >= 0; i--) {
                memoctx.lineTo(center.x + Math.cos(getTheta(roll + 1 - i)) * getR(pitch + piled), center.y + Math.sin(getTheta(roll + 1 - i)) * getR(pitch + piled));
            }

            memoctx.closePath();
            // if (memoctx.isPointInPath(x, y)) {

            //     console.log(memoctx.getImageData(x, y, 1, 1).data[3])
            //     memoctx.fill();
            // }
            return ctx.isPointInPath(x, y);
        }
    }
}
export default BluePrint;

