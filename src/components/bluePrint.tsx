import React, { useEffect, useRef } from 'react';



type BluePrintProps = {
    pattern: any;
    colorList: any;
    rollWidth: number;
    pitchWidth: number;
    activeMenu: any;

};

const BluePrint: React.FC<BluePrintProps> = ({ pattern, colorList, rollWidth, pitchWidth, activeMenu }) => {


    const propsRef = useRef({ pattern, colorList });
    useEffect(() => {
        propsRef.current = { pattern, colorList };
    }, [pattern, colorList]);


    const activeMenuRef = useRef(activeMenu);
    useEffect(() => {
        activeMenuRef.current = activeMenuRef;
    }, [activeMenu]);

    var ctx: any;
    useEffect(() => {
        console.log(activeMenu)
        if (activeMenu != "bluePrint") return;
        let canvas = document.getElementById('bluePrint') as HTMLCanvasElement;
        let canvasParent = document.getElementById("canvasParent") as HTMLCanvasElement;
        // if (!canvas || !canvas.getContext || !canvasParent) return;

        ctx = canvas.getContext('2d');
        if (ctx == null) return;

        console.log(propsRef.current.pattern)


        // });


        function draw() {

            // canvas.width = canvasParent.clientWidth;
            // canvas.height = canvasParent.clientHeight;
            console.log("draw")
            ctx.beginPath(); // パスの開始
            ctx.arc(512, 512, 150, 0, 2 * Math.PI); // 円を描く (x座標, y座標, 半径, 開始角度, 終了角度)
            ctx.strokeStyle = 'blue'; // 枠線の色
            ctx.lineWidth = 5; // 枠線の太さ
            ctx.stroke(); // 枠線を描く
            ctx.fillStyle = 'lightblue'; // 塗りつぶしの色
            ctx.fill(); // 円を塗りつぶす


            // ctx.font = '20px Arial';       // フォントとサイズを設定
            // ctx.fillStyle = 'black';        // 塗りつぶしの色を設定
            // ctx.fillText("aa", 100, 100);


            for (let roll = 0; roll < rollWidth; roll++) {
                for (let pitch = 0; pitch < pitchWidth; pitch++) {
                    // console.log(pattern)
                    // console.log(canvas)
                    ctx.fillStyle = propsRef.current.colorList[propsRef.current.pattern[roll][pitch]];
                    ctx.strokeStyle = "#000000";
                    ctx.lineWidth = 2;
                    const center = { x: canvas.width / 2, y: canvas.height / 2 }

                    // console.log({ x, y })
                    // ctx.fillRect(x, y, 10, 10);
                    let theta = (2 * Math.PI) * (roll / rollWidth)

                    let thetaWidth = (2 * Math.PI) * (1 / rollWidth)
                    let r = 150 + (pitch / pitchWidth) * 330
                    let rWidth = (1 / pitchWidth) * 330 - 1
                    center.y += (theta >= Math.PI ? -1 : 1) * 20
                    ctx.beginPath();

                    ctx.moveTo(center.x + Math.cos(theta) * (r), center.y + Math.sin(theta) * (r));
                    ctx.lineTo(center.x + Math.cos(theta + thetaWidth) * (r), center.y + Math.sin(theta + thetaWidth) * (r));
                    ctx.lineTo(center.x + Math.cos(theta + thetaWidth) * (r + rWidth), center.y + Math.sin(theta + thetaWidth) * (r + rWidth));
                    ctx.lineTo(center.x + Math.cos(theta) * (r + rWidth), center.y + Math.sin(theta) * (r + rWidth));
                    ctx.lineTo(center.x + Math.cos(theta) * (r), center.y + Math.sin(theta) * (r));
                    ctx.stroke()
                    ctx.fill()

                    // ctx.font = '10px Arial';       // フォントとサイズを設定
                    // ctx.fillStyle = 'black';        // 塗りつぶしの色を設定

                    // ctx.fillText(`${x.toFixed(0)},${y.toFixed(0)}`, x, y);

                }
            }



        }
        draw();
        // window.addEventListener('resize', () => draw());


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

            <canvas id="bluePrint" width="1024" height="1024" style={{

                border: "2px solid black",
                width: "100%"
                // // display: "block",
                // margin: "auto"
            }} />

        </>
    )
}
export default BluePrint;