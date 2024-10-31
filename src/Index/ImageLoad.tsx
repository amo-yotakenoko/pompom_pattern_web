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
                                restoredData.saveKeyName = `image-${new Date().toLocaleTimeString()}`;
                                navigate('/edit', { state: restoredData });
                            } catch (error) {
                                console.log("新しい形式だめ", error);
                                try {
                                    let restoredData = binLoad_old();
                                    restoredData.saveKeyName = `image-${new Date().toLocaleTimeString()}`;
                                    navigate('/edit', { state: restoredData });
                                } catch (error) {
                                    console.log("古い形式だめ", error);
                                    alert(`読み取れませんでした: ${error}`);
                                    // const buttonElement = document.getElementById('imageToLoadHelpBUtton') as HTMLElement;
                                    // console.log(buttonElement);
                                    //   buttonElement?.click();

// // 要素が存在するかを確認してからクリック
// if (buttonElement) {
//     buttonElement.click(); // 要素が存在する場合にクリック
// } else {
//     console.error('要素が見つかりませんでした。IDが正しいか確認してください。');
// }
                                }
                            }
                            // binLoad();
                        };
                    }
                };

                function binLoad() {
                    if (!ctx) return;
                    var ImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    console.log({ ImageData })
                    let image_i = 0
                    let bits: any = [];
                    for (let i = 0; i < canvas.width * canvas.height; i += 1) {
                        // if (ImageData.data[image_i + 1] != 0) break;
                        // bin.push(ImageData.data[image_i])
                        bits.push(ImageData.data[image_i] > (255 / 2) ? 1 : 0)
                        image_i += 4
                        const x = (image_i / 4) % 900;
                        if (x >= 32) {
                            image_i += (900 - x) * 4;
                        }

                    }
                    console.log("bits", bits)
                    let bin: any = []
                    for (let i = 0; i < bits.length; i += 8) {
                        // 8ビットを1バイトに変換
                        const byte = parseInt(bits.slice(i, i + 8).join(''), 2);
                        bin.push(byte);
                    }
                    console.log("bin", bin)



                    ctx.putImageData(ImageData, 0, 0);
                    let text = new TextDecoder().decode(new Uint8Array(bin));
                    console.log("text", text)
                    let textEnd = 0;
                    let bracketCount = 0;
                    for (const c of text) {
                        console.log(c);
                        if (c == "{") bracketCount += 1;
                        if (c == "[") bracketCount += 1;
                        if (c == "(") bracketCount += 1;
                        if (c == "}") bracketCount -= 1;
                        if (c == "]") bracketCount -= 1;
                        if (c == ")") bracketCount -= 1;
                        textEnd += 1;
                        if (bracketCount == 0) {
                            console.log("おわり", textEnd)
                            break;
                        }

                    }
                    text = text.substring(0, textEnd);
                    console.log(text)

                    return JSON.parse(text);
                }


                function binLoad_old() {
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
            <input type="file" id="inputFile" className="form-control" accept="image/*" />
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


// [1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0,
// [1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0,
// 元
// [123, 34, 112, 97, 116, 116, 101, 114, 110, 34, 58, 91, 91, 49, 44, 49, 44, 49, 44, 49, 44, 50, 44, 50, 44, 50, 44, 49, 93, 44, 91, 50, 44, 49, 44, 49, 44, 50, 44, 49, 44, 49, 44, 50, 44, 49, 93, 44, 91, 49, 44, 49, 44, 50, 44, 50, 44, 49, 44, 48, 44, 49, 44, 49, 93, 44, 91, 49, 44, 50, 44, 50, 44, 50, 44, 49, 44, 48, 44, 50, 44, 49, 93, 44, 91, 49, 44, 49, 44, 50, 44, 50, 44, 50, 44, 49, 44, 50, 44, 49, 