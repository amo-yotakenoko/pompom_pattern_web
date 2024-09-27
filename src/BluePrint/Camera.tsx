import React, { useState, useRef, useEffect } from 'react';
import { Button, ProgressBar } from 'react-bootstrap';


const Camera = ({ videoRef, devices, setDevices, setSelectedDeviceId, selectedDeviceId, setVideoOk }: any) => {

    const canvasRef = useRef<HTMLCanvasElement>(null)
    useEffect(() => {
        const fetchVideoDevices = async () => {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoDevices = devices
                .filter(device => device.kind === 'videoinput')
                .map(device => ({ label: device.label || 'Camera', deviceId: device.deviceId }));
            console.log(videoDevices)
            setDevices(videoDevices);
            if (videoDevices.length > 0) {
                setSelectedDeviceId(videoDevices[0].deviceId);
            }
        };
        fetchVideoDevices()
    }, [])

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

                } catch (error) {
                    console.error("Error accessing the camera: ", error);
                }
            }
        };
        openCamera();
        console.log("open")
    }, [selectedDeviceId]);
    return (
        <canvas ref={canvasRef} style={{ position: 'absolute', border: '2px solid black', width: '100%' }} />
    )

};

export default Camera;