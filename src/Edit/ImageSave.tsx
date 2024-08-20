
import React, { useEffect, useRef } from 'react';
// 型定義
interface ImageSaveProps {
    data: any;
    // canvas: any;
}

// ボタンクリック時にログを表示するコンポーネント
const ImageSave: React.FC<ImageSaveProps> = ({ data }) => {
    // useEffect(() => {
    //     handleClick()
    // }, []);
    // ボタンがクリックされたときに呼ばれる関数


    return (
        <>
            <img
                id="bluePrintImg"
                style={{
                    width: '100%', height: 'auto', position: 'absolute', top: 0, left: 0
                }}
            />
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
        //     z-index: 2; /* 画像の上に表示されるようにする */
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
        //         z-index: 1; /* テキストの下に配置されるようにする */
        //      "
        //             />
        //         </div>
        //     </div>
    );
};



function drawData(data: any) {
    let json = JSON.stringify(data)
    let bin = new TextEncoder().encode(json);
    // let hexBin = Array.from(bin).map((byte) => {
    //     return byte.toString(16).padStart(2, '0'); // 2桁の16進数表現にパディング
    // }); // 16進数の文字列を結合
    // console.log(hexBin);


    // 配列に要素を追加
    // while (hexBin.length % 3 != 0) {
    //     hexBin.push("00");
    // }
    let canvas = document.getElementById('bluePrint') as HTMLCanvasElement;
    let ctx = canvas.getContext('2d');
    if (!ctx) return

    // let colors = []
    var ImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let image_i = 0
    for (let i = 0; i < bin.length; i += 1) {
        ImageData.data[image_i] = bin[i]
        ImageData.data[image_i + 3] = 255
        image_i += 4
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
    //             // ctx.rect(0, 0, 100, 100); // キャンバス全体の矩形を指定
    //             // ctx.stroke();                 // 縁を描画


    //         }

    //     }
    // })();


};


// https://mclab.uunyan.com/lab/html/canvas004.htm
function convartDownloadble() {
    let canvas = document.getElementById('bluePrint') as HTMLCanvasElement;



    var base64 = canvas.toDataURL();


    var blob = Base64toBlob(base64);
    console.log({ blob })
    const imageUrl = window.URL.createObjectURL(blob) //URL生成
    console.log(imageUrl)

    const imgElement = document.getElementById('bluePrintImg') as HTMLImageElement;
    imgElement.src = imageUrl;


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


export default ImageSave;

// drawData を名前付きエクスポート
export { drawData, convartDownloadble };
// export default drawData;

// Uint8Array(2131) [123, 34, 112, 97, 116, 116, 101, 114, 110, 34, 58, 91, 91, 48, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 93, 44, 91, 48, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 93, 44, 91, 48, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 93, 44, 91, 48, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 93, 44, 91, 48, 44, 48, 44, 48, 44, 48, …]