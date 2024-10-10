import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom"
import { drawData } from "./ImageSave";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Icon from 'react-bootstrap-icons';
// import addIcon from '../img/designsystem-assets/icon/png/';
interface LocalStrageSaveProps {
    data: any;
    activeMenu: any
    // canvas: any;
}

const LocalStrageSave: React.FC<LocalStrageSaveProps> = ({ data, activeMenu }) => {
    const location = useLocation()
    const [isSaved, setIsSaved] = useState(true);
    useEffect(() => {
        console.log("dataを更新")


        setIsSaved(false)
    }, [data])

    // useEffect(() => {
    //     if (activeMenu == "bluePrint")
    //         saveToLocalStrage()
    // }, [activeMenu])



    const [timer, setTimer] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            if (timer >= 0) {
                setTimer(timer + 1);
            }
        }, 1000);

        if (timer > 10) {
            saveToLocalStrage()
            setTimer(-1);
        }
        return () => clearInterval(id);
    }, [timer]);

    useEffect(() => {
        setIsSaved(true)
    }, []);




    useEffect(() => {

        const onBeforeUnloadEvent = (event: any) => {
            event.preventDefault();
            event.returnValue = "";
        };


        if (!isSaved) {
            console.log("登録", isSaved)
            window.addEventListener("beforeunload", onBeforeUnloadEvent);
            window.addEventListener("popstate", onBeforeUnloadEvent);
            setTimer(0);
        } else {
            console.log("解除", isSaved)
            window.removeEventListener("beforeunload", onBeforeUnloadEvent);
            window.addEventListener("popstate", onBeforeUnloadEvent);
        }

        return () => {
            console.log("解除", isSaved)

            window.removeEventListener("beforeunload", onBeforeUnloadEvent);
        };
    }, [isSaved]);


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
        try {
            if (location.state.saveKeyName == undefined)
                location.state.saveKeyName = `unknown-${new Date().toLocaleTimeString()}`
            console.log(location.state.saveKeyName)
            delete datas[location.state.saveKeyName];
            datas[location.state.saveKeyName] = { img: getThumbnail(900), data: data }
            console.log(datas)

            localStorage.setItem('pompoms', JSON.stringify(datas));
            setTimeout(() => setIsSaved(true), 1)
        } catch (e) {

            alert('保存容量が無くなりました、設計図タブからダウンロードしてください' + e);
        }


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
        const base64Image = canvas.toDataURL('image/png');
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
            {/* aa{`${isSaved}`} */}

            {/* <i className="bi bi-floppy2" onClick={saveToLocalStrage}></i>
            <i className="bi bi-123"></i> */}
            {(!isSaved && activeMenu == "pompom") &&
                <Icon.Floppy2 onClick={saveToLocalStrage} style={{
                    zIndex: 1000,
                    top: "5px",
                    left: "5px",
                    position: 'fixed',
                }} />
                // <img onClick={saveToLocalStrage}>Save to</button>
            }
            {/* <button onClick={loadFromLocalStrage}>Load from localStorage</button> */}
        </>

    );
};

export default LocalStrageSave;