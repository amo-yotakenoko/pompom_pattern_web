
import React, { useEffect, useRef } from 'react';
import downloadImg from "../img/designsystem-assets/icon/svg/download_fill.svg"
import bluePrintBase from "../img/bluePrint_base.png"
import * as Icon from 'react-bootstrap-icons';
interface ImageSaveProps {
    data: any;
    // canvas: any;
}

const ImageSave: React.FC<ImageSaveProps> = ({ data }) => {



    const bluePrintBaseImage = new Image();
    bluePrintBaseImage.src = bluePrintBase;
    function download(size: any) {
        console.log("ダウンロード")
        let viewCanvas = document.getElementById('bluePrint') as HTMLCanvasElement;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (ctx == undefined) return
        ctx.drawImage(bluePrintBaseImage, 0, 0, size, size);


        ctx.drawImage(viewCanvas, 0, 0, viewCanvas.width, viewCanvas.height, 0, 0, size, size);

        drawData(canvas, data);
        let link = document.createElement("a");
        link.href = canvas.toDataURL();
        link.download = `pompom_${new Date().toLocaleTimeString()}.png`;
        link.click();

    }






    // https://mclab.uunyan.com/lab/html/canvas004.htm
    function convartDownloadble(bluePrintImg: any) {
        let canvas = document.getElementById('bluePrint') as HTMLCanvasElement;



        var base64 = canvas.toDataURL();


        var blob = Base64toBlob(base64);
        console.log({ blob })
        const imageUrl = window.URL.createObjectURL(blob) //URL生成
        console.log(imageUrl)


        bluePrintImg.src = imageUrl;


    }
    // https://code.st40.xyz/article/133
    // Base64データをBlobデータに変換
    function Base64toBlob(base64: any) {
        // カンマで分割して以下のようにデータを分ける
        // tmp[0] : データ形式（data:image/png;base64）
        // tmp[1] : base64データ（iVBORw0k～）
        var tmp = base64.split(',');
        // base64データの文字列をデコード
        var data = atob(tmp[1]);
        // tmp[0]の文字列（data:image/png;base64）からコンテンツタイプ（image/png）部分を取得
        var mime = tmp[0].split(':')[1].split(';')[0];
        //  1文字ごとにUTF-16コードを表す 0から65535 の整数を取得
        var buf = new Uint8Array(data.length);
        for (var i = 0; i < data.length; i++) {
            buf[i] = data.charCodeAt(i);
        }
        // blobデータを作成
        var blob = new Blob([buf], { type: mime });
        return blob;
    }


    function share(size: any) {

        console.log("ダウンロード")
        let viewCanvas = document.getElementById('bluePrint') as HTMLCanvasElement;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (ctx == undefined) return
        ctx.drawImage(bluePrintBaseImage, 0, 0, size, size);


        ctx.drawImage(viewCanvas, 0, 0, viewCanvas.width, viewCanvas.height, 0, 0, size, size);

        drawData(canvas, data);
        const blob = Base64toBlob(canvas.toDataURL());
        console.log("blob", blob)
        const image = new File([blob], 'tmp.png', { type: 'image/png' })
        const image2 = new File([blob], 'tmp2.png', { type: 'image/png' })
        navigator.share({
            text: '#POMPOM模様',
            url: 'https://amo-yotakenoko.github.io/pompom_pattern_web/',
            files: [image]
        }).then(() => {
            console.log('Share was successful.')
        }).catch((error) => {
            console.log('Sharing failed', error)
        })
    }

    return (
        <>
            <div style={{ position: "absolute", bottom: "10px", right: "10px", display: "flex", alignItems: "center" }}>
                <Icon.Download onClick={() => { download(900) }} style={{
                    fontSize: "2rem",
                    marginRight: "10px" // アイコンの間隔を調整

                }} />
                <Icon.Share
                    onClick={() => share(900)}
                    style={{ fontSize: "2rem" }} // アイコンを大きくして位置を調整
                />
            </div>
            {/* <img src={bluePrintBase}></img> */}
            {/* <img
                id="bluePrintImg"
                style={{
                    width: '100%', height: 'auto', position: 'absolute', top: 0, left: 0
                }}
            /> */}
            {/* <div style={{ width: '30vw', height: 'auto', position: 'relative' }}>
                <img
                    id="bluePrintImg"
                    style={{ width: '100%', height: 'auto' }}
                />
                <p
                    style={{
                        position: 'absolute',
                        top: '0%',
                        left: '0%',
                        transform: 'translate(0%, 0%)',
                        padding: 0,
                        margin: 0,
                        textAlign: 'left',
                        width: '100%',
                        fontSize: '50%',
                    }}
                >
                    保存する際はこの画像を長押し
                </p>
            </div> */}
        </>

        //     <div>
        //         <div style="position: relative; text-align: center;">

        //             <p style="
        //     position: absolute;
        //     top: 50%;
        //     left: 50%;
        //     transform: translate(-50%, -50%);
        //     color: white;
        //     font-size: 2em;
        //     z-index: 2;
        // ">
        //                 ここ長押しまたは右クリックして画像を保存してください
        //             </p>

        //             <img id="bluePrintImg"
        //                 style="
        //         width: 30vw;
        //         height: auto;
        //         position: absolute;
        //         right: 0;
        //         top: 0;
        //         z-index: 1;
        //      "
        //             />
        //         </div>
        //     </div>
    );
};

function drawData(canvas: any, data: any) {
    let json = JSON.stringify(data)
    let bin = new TextEncoder().encode(json);
    // let hexBin = Array.from(bin).map((byte) => {
    //     return byte.toString(16).padStart(2, '0'); 
    // });
    // console.log(hexBin);



    // while (hexBin.length % 3 != 0) {
    //     hexBin.push("00");
    // }
    // let canvas = document.getElementById('bluePrint') as HTMLCanvasElement;
    let ctx = canvas.getContext('2d');
    if (!ctx) return

    // let colors = []
    var ImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let image_i = 0
    for (let i = 0; i < bin.length; i += 1) {
        ImageData.data[image_i++] = bin[i]
        ImageData.data[image_i++] = 0
        ImageData.data[image_i++] = 0
        ImageData.data[image_i++] = 255
        // ImageData.data[image_i + 3] = 255

        // ImageData.data[i] = 0
        // let color = "#"
        // color += `${hexBin[i++]}`;
        // color += `${hexBin[i++]}`;
        // color += `${hexBin[i++]}`;
        // colors.push(color)
        // const image = ctx.getImageData(x, y, 1, 1).data;
    }

    ctx.putImageData(ImageData, 0, 0);
    console.log(bin)


    // (() => {
    //     let i = 0
    //     for (let y = 0; y < canvas.height; y++) {
    //         for (let x = 0; x < canvas.width; x++) {

    //             console.log(x, y, colors[i])
    //             if (colors[i] === undefined) return
    //             ctx.fillStyle = colors[i++];
    //             ctx.fillRect(x, y, 2, 2);

    //             // ctx.beginPath();
    //             // ctx.rect(0, 0, 100, 100); 
    //             // ctx.stroke();               


    //         }

    //     }
    // })();


};



export default ImageSave;
export { drawData };


// Uint8Array(2131) [123, 34, 112, 97, 116, 116, 101, 114, 110, 34, 58, 91, 91, 48, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 93, 44, 91, 48, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 93, 44, 91, 48, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 93, 44, 91, 48, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 93, 44, 91, 48, 44, 48, 44, 48, 44, 48, …]