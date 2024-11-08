import React, { useState, useRef, useEffect } from 'react';
import { Button, ProgressBar } from 'react-bootstrap';


const Camera = ({ isEnable, setEnableCameraCounter, videoRef, devices, setDevices, setSelectedDeviceId, selectedDeviceId, setVideoOk }: any) => {

    // const canvasRef = useRef<HTMLCanvasElement>(null)
    useEffect(() => {
        const fetchVideoDevices = async () => {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoDevices = devices
                .filter(device => device.kind === 'videoinput')
                .map(device => ({ label: device.label || 'Camera', deviceId: device.deviceId }));
            console.log(videoDevices)
            setDevices(videoDevices);
            if (!selectedDeviceId && videoDevices.length > 0) {
                setSelectedDeviceId(videoDevices[0].deviceId);
            }
        };
        // if(isEnable)
        console.log(isEnable)
        fetchVideoDevices()
    }, [isEnable])

    useEffect(() => {
        setVideoOk(false)
        const openCamera = async () => {
            const video = videoRef.current;
            if (video) {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({
                        audio: false,
                        video: {
                            // width: { min: 1280, ideal: 1920, max: 2560 },
                            // height: { min: 720, ideal: 1080, max: 1440 },
                            // frameRate: { max: 30 },
                            deviceId: selectedDeviceId ? { exact: selectedDeviceId } : undefined,
                        },
                    });
                    video.srcObject = stream;
                    setVideoOk(true)
                    console.log("videook")
                } catch (error) {
                    alert("カメラが起動できませんでした" + error)
                    console.error("Error accessing the camera: ", error);
                    if (setEnableCameraCounter) setEnableCameraCounter(false)
                }
            }
        };
        if (isEnable) {

            openCamera();
            console.log("open")
        }

    }, [selectedDeviceId, isEnable]);


    return (
        <>
            {isEnable}
        </>
        // <canvas ref={canvasRef} style={{ position: 'absolute', border: '2px solid black', width: '100%' }} />
    )

};

export default Camera;