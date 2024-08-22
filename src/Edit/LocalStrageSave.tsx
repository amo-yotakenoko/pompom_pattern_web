import React, { useState } from 'react';
import { useLocation } from "react-router-dom"
import { drawData } from "./ImageSave";
import 'bootstrap/dist/css/bootstrap.min.css';
interface LocalStrageSaveProps {
    data: any;
    activeMenu: any
    // canvas: any;
}

const LocalStrageSave: React.FC<LocalStrageSaveProps> = ({ data, activeMenu }) => {
    const location = useLocation()

    // Function to save data to localStorage
    function saveToLocalStrage() {
        // const key = 'pompoms';
        let value = localStorage.getItem('pompoms');

        if (value !== null) {
            console.log({ value })
        } else {
            console.log("ないので作る")
            value = JSON.stringify({})
        }
        let datas = JSON.parse(value)
        console.log({ datas })

        // datas.push(1)
        if (location.state.saveKeyName == undefined)
            location.state.saveKeyName = `unknown-${new Date().toLocaleTimeString()}`
        console.log(location.state.saveKeyName)
        delete datas[location.state.saveKeyName];
        datas[location.state.saveKeyName] = { img: getThumbnail(900), data: data }
        console.log(datas)

        localStorage.setItem('pompoms', JSON.stringify(datas));

        // localStorage.setItem('pompoms', data);
        // alert('Data saved to localStorage!');
    };


    function getThumbnail(size: any) {

        const canvas = document.createElement('canvas');
        // document.body.appendChild(canvas);
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (ctx == undefined) {
            console.log("ctxがない")
            return
        }
        // ctx.drawImage(bluePrintBaseImage, 0, 0, size, size);
        // console.log("ああああああああああああああ", pompomCanvas.style.getPropertyValue('display'), viewCanvas.style.getPropertyValue('display'))
        if (activeMenu == "pompom") {
            const pompomCanvas = document.getElementById("edit3d") as HTMLCanvasElement;
            ctx.drawImage(pompomCanvas, 0, 0, pompomCanvas.width, pompomCanvas.height, 0, 0, size, size);

        } else {
            let viewCanvas = document.getElementById('bluePrint') as HTMLCanvasElement;
            ctx.drawImage(viewCanvas, 0, 0, viewCanvas.width, viewCanvas.height, 0, 0, size, size);

        }
        // drawData(canvas, data);
        const base64Image = canvas.toDataURL('image/png'); // 'image/png' は画像フォーマットを指定
        console.log(base64Image)
        // console.log(base64Image);
        return base64Image
        // let link = document.createElement("a");
        // link.href = canvas.toDataURL();
        // link.download = `pompom_${new Date().toLocaleTimeString()}.png`;
        // link.click();

    }



    return (
        <>
            <button onClick={saveToLocalStrage}>Save to localStorage</button>
            {/* <button onClick={loadFromLocalStrage}>Load from localStorage</button> */}
        </>

    );
};

export default LocalStrageSave;