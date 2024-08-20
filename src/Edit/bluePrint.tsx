import React, { useEffect, useRef } from 'react';
import ImageSave, { drawData, convartDownloadble } from './ImageSave'


type BluePrintProps = {
    pattern: any;
    colorList: any;
    rollWidth: number;
    pitchWidth: number;
    activeMenu: any;

};
var cancel = false;
const BluePrint: React.FC<BluePrintProps> = ({ pattern, colorList, rollWidth, pitchWidth, activeMenu }) => {


    const propsRef = useRef({ pattern, colorList });
    useEffect(() => {
        propsRef.current = { pattern, colorList };
    }, [pattern, colorList]);
    let canvas: any;

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
        // if (!canvas || !canvas.getContext || !canvasParent) return;

        ctx = canvas.getContext('2d');
        if (ctx == null) return;

        // console.log(propsRef.current.pattern)
        const bluePrintImg = document.getElementById('bluePrintImg') as HTMLImageElement;

        // });
        (async function () {
            bluePrintImg.src = "";
            // 関数の内容
            console.log("かきこみ1")
            await drawbluePrint(ctx, canvas, pitchWidth, propsRef, rollWidth, getTheta, getR, colorList, pattern);
            console.log("かきこみ2")
            await drawData({ pattern, colorList, rollWidth, pitchWidth });
            console.log("かきこみ3")
            convartDownloadble(bluePrintImg);
            ctx.clearRect(0, 0, canvas.width, canvas.height);


            //適当な縁
            ctx.lineWidth = 5; // 枠線の太さ
            ctx.beginPath(); // パスの開始
            ctx.arc(0, 0, 300, 0, 2 * Math.PI); // 円を描く (x座標, y座標, 半径, 開始角度, 終了角度)
            ctx.strokeStyle = 'blue'; // 枠線の色
            ctx.stroke(); // 枠線を描く
            ctx.fillStyle = 'lightblue'; // 塗りつぶしの色
            ctx.fill(); // 円を塗りつぶす
        })();

        // window.addEventListener('resize', () => draw());
        return () => {
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
            <div style={{ width: '100vw', height: 'auto', position: 'relative' }}>

                <ImageSave data={{ pattern, colorList, rollWidth, pitchWidth }}></ImageSave>
                <canvas id="bluePrint" width="900" height="900" style={{

                    border: "2px solid black",
                    width: '100%', height: 'auto', position: 'absolute', top: 0, left: 0,
                    pointerEvents: 'none'
                    // // display: "block",
                    // margin: "auto"
                }} />
            </div>

        </>
    )
}
export default BluePrint;




async function drawbluePrint(ctx: any, canvas: HTMLCanvasElement, pitchWidth: number, propsRef: React.MutableRefObject<{ pattern: any; colorList: any; }>, rollWidth: number, getTheta: (roll: any) => number, getR: (pitch: any) => number, colorList: any, pattern: any) {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // canvas.width = canvasParent.clientWidth;
    // canvas.height = canvasParent.clientHeight;
    console.log("draw");

    // //適当な縁
    // ctx.lineWidth = 5; // 枠線の太さ
    // ctx.beginPath(); // パスの開始
    // ctx.arc(512, 512, 150, 0, 2 * Math.PI); // 円を描く (x座標, y座標, 半径, 開始角度, 終了角度)
    // ctx.strokeStyle = 'blue'; // 枠線の色
    // ctx.stroke(); // 枠線を描く
    // ctx.fillStyle = 'lightblue'; // 塗りつぶしの色
    // ctx.fill(); // 円を塗りつぶす







    // ctx.font = '20px Arial';       // フォントとサイズを設定
    // ctx.fillStyle = 'black';        // 塗りつぶしの色を設定
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
    for (let pitch = 0; pitch < pitchWidth; pitch++) {
        for (let roll = 0; roll < rollWidth; roll++) {
            // ctx.clearRect(0, 0, canvas.width, canvas.height);
            const color = propsRef.current.pattern[roll][pitch];
            ctx.fillStyle = isNearBlack(propsRef.current.colorList[color][0]) ? 'white' : 'black'; // 塗りつぶしの色を設定
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
                // await new Promise(resolve => setTimeout(resolve, 1000));
                ctx.beginPath();
                // ctx.moveTo(center.x + Math.cos(getTheta(roll + 1)) * getR(pitch), center.y + Math.sin(getTheta(roll + 1)) * getR(pitch));
                // ctx.lineTo(center.x + Math.cos(getTheta(roll + 1)) * getR(pitch + piled), center.y + Math.sin(getTheta(roll + 1)) * getR(pitch + piled));
                ctx.moveTo(center.x + Math.cos(getTheta(roll + 1)) * getR(pitch), center.y + Math.sin(getTheta(roll + 1)) * getR(pitch));
                for (let i = 0; i <= widthCount; i++) {
                    ctx.lineTo(center.x + Math.cos(getTheta(roll + 1 - i)) * getR(pitch), center.y + Math.sin(getTheta(roll + 1 - i)) * getR(pitch));
                    console.log("up");
                    // ctx.arc(center.x + Math.cos(getTheta(roll + 1 - i)) * getR(pitch), center.y + Math.sin(getTheta(roll + 1 - i)) * getR(pitch), 5, 0, Math.PI * 2);
                }

                for (let i = widthCount; i >= 0; i--) {
                    ctx.lineTo(center.x + Math.cos(getTheta(roll + 1 - i)) * getR(pitch + piled), center.y + Math.sin(getTheta(roll + 1 - i)) * getR(pitch + piled));
                    console.log("down");
                    // ctx.arc(center.x + Math.cos(getTheta(roll + 1 - i)) * getR(pitch + piled), center.y + Math.sin(getTheta(roll + 1 - i)) * getR(pitch + piled), 5, 0, Math.PI * 2);
                }
                // ctx.lineTo(center.x + Math.cos(getTheta(roll + 1 - widthCount)) * getR(pitch), center.y + Math.sin(getTheta(roll + 1 - widthCount)) * getR(pitch));
                // ctx.lineTo(center.x + Math.cos(getTheta(roll + 1 - widthCount)) * getR(pitch + piled), center.y + Math.sin(getTheta(roll + 1 - widthCount)) * getR(pitch + piled));
                ctx.closePath(); // 最初の点に戻る
                ctx.lineWidth = 1;
                ctx.stroke(); // 線を描画






                // drawputed()
                // if (piled == 1) text = `${widthCount}`
                let fontsize = 20;
                ctx.font = `${fontsize}px Arial`; // フォントとサイズを設定



                let textHeight = fontsize / 2;
                if (piled > 1) {
                    piledText(piled, ctx, center, theta, getR, getTheta, pitch, roll, rollWidth, textHeight, thetaWidth, canvas);
                }
                if (widthCount > 1) {
                    widthCoountText(theta, widthCount, rollWidth, ctx, center, thetaWidth, r, roll, pitch, colorList, pattern);
                }


                // ctx.fillText(text, center.x + Math.cos(theta + thetaWidth / 2) * (r + rWidth / 2) - (textWidth / 2), center.y + Math.sin(theta + thetaWidth / 2) * (r + rWidth / 2) + (textHeight / 2));
                console.log("まつ");

                await new Promise(requestAnimationFrame);
                // await new Promise(resolve => setTimeout(resolve, 1000));
                if (cancel) return;
            }

            if (isChange) widthCount = 0;
        }
    }




}

function widthCoountText(theta: number, widthCount: number, rollWidth: number, ctx: any, center: { x: number; y: number; }, thetaWidth: number, r: number, roll: number, pitch: number, colorList: any, pattern: any) {
    theta -= (2 * Math.PI) * ((widthCount) / rollWidth) / 2;
    let text = `${widthCount}`;
    let colorLength = colorList[pattern[roll][pitch]].length
    if (colorLength > 1) {
        text = `${Math.ceil(widthCount / colorLength)}(*${colorLength})`;
    }
    let textHeight = 0;
    const textWidth = ctx.measureText(text).width;
    ctx.save();
    let x = center.x + Math.cos(theta + thetaWidth) * (r); //- (textWidth / 2)
    let y = center.y + Math.sin(theta + thetaWidth) * (r);
    // ctx.arc(x, y, 5, 0, Math.PI * 2);
    // 中心座標に移動

    ctx.translate(x, y);
    if (0.5 >= roll / rollWidth) {
        theta += Math.PI;
        textHeight = ctx.measureText(text).actualBoundingBoxAscent
    }
    ctx.rotate(theta + thetaWidth + (2 * Math.PI) / 4); // `theta` による回転
    ctx.fillText(text, -(textWidth / 2), (textHeight / 1));
    ctx.restore();

}

function piledText(piled: number, ctx: any, center: { x: number; y: number; }, theta: number, getR: (pitch: any) => number, getTheta: (pitch: any) => number, pitch: number, roll: number, rollWidth: number, textHeight: number, thetaWidth: number, canvas: any) {
    let text = `${piled}`;
    // center = { x: canvas.width / 2, y: canvas.height / 2 + (0.5 <= (roll + 0) / rollWidth ? -1 : 1) * 20 }
    // if (rollWidth === roll + 1) {
    //     center.y = canvas.height / 2 - 20
    // }
    const textWidth = ctx.measureText(text).width;
    ctx.save();
    let textTheta = getTheta(roll + 1);
    let x = center.x + Math.cos(textTheta) * getR(pitch + piled / 2); //- (textWidth / 2)
    let y = center.y + Math.sin(textTheta) * getR(pitch + piled / 2);
    // ctx.arc(x, y, 5, 0, Math.PI * 2);
    // 中心座標に移動
    ctx.translate(x, y);
    // textHeight *= 2;
    let textY = textHeight * 2
    textTheta = getTheta(roll + 0.5);
    if (Math.cos(getTheta(roll + 0.5)) > 0) {
        textTheta += Math.PI;
        textY = 0

        // ctx.fillStyle = 'red';
    }
    ctx.rotate(textTheta + (2 * Math.PI) / 2); // `theta` による回転
    ctx.fillText(text, -(textWidth / 2), textY);
    ctx.restore();

}

function isNearBlack(color: any) {
    // カラーコードをR, G, Bに分解
    let r = parseInt(color.substring(1, 3), 16);
    let g = parseInt(color.substring(3, 5), 16);
    let b = parseInt(color.substring(5, 7), 16);

    // 明るさを計算
    let brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    // しきい値128で判定
    return brightness > 128 ? false : true;
}