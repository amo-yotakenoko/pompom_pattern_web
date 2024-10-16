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
                    console.error("ファイルがない", file);
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
                                restoredData.saveKeyName = `image-${new Date().toLocaleTimeString()}`
                                navigate('/edit', { state: restoredData });
                            } catch (error) {
                             
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
                        if (ImageData.data[image_i + 1] != 0) break;
                        bin.push(ImageData.data[image_i])
                        image_i += 4

                    }
                    console.log("bin", bin)
                    ctx.putImageData(ImageData, 0, 0);
                    let text = new TextDecoder().decode(new Uint8Array(bin));
                    console.log("text", text)

                    return JSON.parse(text);
                }


            });
        }
    }, []);
    return (
        <div>
            <input type="file" id="inputFile" className="form-control" accept=".png" />
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