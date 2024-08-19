import React from 'react';

// 型定義
interface ImageSaveProps {
    data: any;
    // canvas: any;
}

// ボタンクリック時にログを表示するコンポーネント
const ImageSave: React.FC<ImageSaveProps> = ({ data }) => {
    // ボタンがクリックされたときに呼ばれる関数
    function handleClick() {
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
        for (let i = 0; i < bin.length; i += 1) {
            ImageData.data[i] = bin[i]
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

    return (
        <div>
            {/* ボタンクリック時にhandleClick関数を呼び出す */}
            <button onClick={handleClick}>クリックしてログを表示</button>

            <input type="file" name="example" accept=".png"></input>
        </div>
    );
};

export default ImageSave;