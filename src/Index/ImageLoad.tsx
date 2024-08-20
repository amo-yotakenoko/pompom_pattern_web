import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
const ImageLoad: React.FC = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const selFile = document.getElementById('inputFile') as HTMLInputElement;


        if (selFile) {
            selFile.addEventListener("change", function (evt) {
                const canvas = document.getElementById('canvas') as HTMLCanvasElement;

                const ctx = canvas.getContext('2d');
                if (!ctx) return;

                const target = evt.target as HTMLInputElement;
                if (!target.files) return;

                const file = target.files[0];
                if (!file) {
                    console.error("No file selected or file is not valid.");
                    return;
                }

                console.log(file);

                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function (e) {
                    const dataUrl = e.target?.result as string;
                    if (typeof dataUrl === 'string') {
                        const img = new Image();
                        img.src = dataUrl;
                        img.onload = function () {
                            canvas.width = img.width;
                            canvas.height = img.height;
                            canvas.style.display = 'block';
                            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                            console.log("aaaa")
                            try {
                                let restoredData = binLoad();
                                console.log(restoredData)

                                navigate('/edit', { state: restoredData });
                            } catch (error) {
                                // エラーが発生した場合の処理
                                // console.log("失敗", error);
                                alert(`読み取れませんでした${error}`);
                            }
                            // binLoad();
                        };
                    }
                };


                function binLoad() {
                    let bin = []
                    if (!ctx) return;
                    var ImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    console.log({ ImageData })
                    let image_i = 0
                    for (let i = 0; i < canvas.width * canvas.height * 4; i += 1) {
                        if (ImageData.data[image_i + 3] != 255) break;
                        bin.push(ImageData.data[image_i])
                        image_i += 4

                    }
                    console.log(bin)
                    ctx.putImageData(ImageData, 0, 0);
                    let text = new TextDecoder().decode(new Uint8Array(bin));
                    console.log(text)

                    return JSON.parse(text);
                }


            });
        }
    }, []);
    return (
        <div>
            <input type="file" id="inputFile" accept=".png" />
            <canvas id="canvas" style={{

                border: "2px solid black",
                width: "100%",
                display: 'none'
                // // display: "block",
                // margin: "auto"
            }} ></canvas>
        </div>
    );
};

export default ImageLoad;