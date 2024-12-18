import React, { useState, useRef, useEffect } from 'react';
import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";
// import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { Hands, HAND_CONNECTIONS, NormalizedLandmarkListList, Results } from '@mediapipe/hands';
const HandTracker = ({ setIsTracked, selectedDeviceId, videoRef, fingerHistory, setsingerHistory, rollingHand, trackerSettings, setTrackerOk }: any) => {
    const handLandmarkerRef = useRef<any>(null);

    const canvasRef = useRef<HTMLCanvasElement>(null)

    async function initializeHandLandmarker() {
        // if (handLandmarkerRef.current) return;
        try {
            console.log("initializeHandLandmarker初期化", { handLandmarkerRef: handLandmarkerRef.current });
            const vision = await FilesetResolver.forVisionTasks(
                "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
            );
            console.log("initializeHandLandmarker初期化2", { handLandmarkerRef: handLandmarkerRef.current });

            handLandmarkerRef.current = await HandLandmarker.createFromOptions(vision, {
                baseOptions: {
                    modelAssetPath: "./hand_landmarker.task", // .taskファイルを指定する
                    delegate: "GPU", // CPU or GPUで処理するかを指定する
                },
                numHands: 2, // 認識できる手の数
                minHandDetectionConfidence: trackerSettings.minHandDetectionConfidence,  // 検出の精度を上げる
                minHandPresenceConfidence: trackerSettings.minHandPresenceConfidence,
                minTrackingConfidence: trackerSettings.minTrackingConfidence,    // 追跡の精度を上げる
                runningMode: "VIDEO", // ここでビデオモードを指定
            });

            console.log("initializeHandLandmarker初期化2", { handLandmarkerRef: handLandmarkerRef.current });
            console.log("trackerok")
            setTrackerOk(true)

        } catch (error) {
            console.error("Error initializing HandLandmarker: ", error);
        }
    }

    useEffect(() => {
        if (!handLandmarkerRef.current) initializeHandLandmarker()
    }, []);


    useEffect(() => {
        console.log("HandLandmarker更更新", trackerSettings);
        console.log(trackerSettings)
        if (handLandmarkerRef.current) {
            handLandmarkerRef.current.setOptions({
                minHandDetectionConfidence: trackerSettings.minHandDetectionConfidence,
                minHandPresenceConfidence: trackerSettings.minHandPresenceConfidence,
                minTrackingConfidence: trackerSettings.minTrackingConfidence,
                numHands: 2,
            });
            console.log("HandLandmarkerの設定を更新しました", trackerSettings);
        }
    }, [trackerSettings]);




    // const [frameCount, setFrameCount] = useState(0);
    // useEffect(() => {
    //     console.log("loop")
    //     detecthand()
    //     // const frameCountFunc = setTimeout(() => {
    //     //     setFrameCount(prevCount => prevCount + 1);
    //     // }, 1000); // 1秒後に実行
    //     const frameCountFunc = (() => {
    //         setFrameCount(prevCount => prevCount + 1);

    //     })


    //    
    //     // return () => clearTimeout(frameCountFunc);
    //     return () => cancelAnimationFrame(frameCountFunc);

    // }, [frameCount]);

    useEffect(() => {
        let frameId: number;

        const frameCountFunc = () => {
            // setFrameCount(prevCount => prevCount + 1);
            detecthand()
            // console.log("判定")
            frameId = requestAnimationFrame(frameCountFunc);
        };
        frameId = requestAnimationFrame(frameCountFunc);

        return () => cancelAnimationFrame(frameId);
    }, [rollingHand]);





    async function detecthand() {

        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");

        if (!canvas || !context) return;
        // console.log({ width: video.videoWidth })

        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        if (videoRef.current.videoWidth + videoRef.current.videoHeight <= 0) {
            console.log("画面がない")
            return
        }
        // if (!handLandmarkerRef.current) initializeHandLandmarker()
        if (handLandmarkerRef.current == null) return

        // console.log(videoRef.current.videoWidth)
        try {
            // if (handLandmarkerRef.current == null)
            // console.log(handLandmarkerRef.current, videoRef.current, performance.now())
            // console.log(handLandmarkerRef, videoRef.current)
            const results = await handLandmarkerRef.current.detectForVideo(videoRef.current, performance.now());

            handDraw(results)
            drawhistory()
            // console.log(results)
        } catch (error) {
            console.error(error);
        }



    }






    function handDraw(results: any) {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        if (!canvas || !context) return;
        setIsTracked(false)


        results.handedness.forEach((handednes: any, i: number) => {
            // console.log(handednes[0])


            const landmarks = results.landmarks[i]
            // console.log(handednes[0].categoryName, { rollingHand }, handednes[0].categoryName === rollingHand)
            context.lineWidth = handednes[0].categoryName === rollingHand ? 2 : 0.5;

            landmarks.forEach((landmark: any) => {
                context.beginPath();
                const radios = Math.abs(landmark.z + 1) * (handednes[0].categoryName === rollingHand ? 5 : 2)
                context.arc(landmark.x * canvas.width, landmark.y * canvas.height, radios, 0, 2 * Math.PI);
                context.fillStyle = '#00FF11';
                context.fill();
            });



            HAND_CONNECTIONS.forEach((HAND_CONNECTION: any) => {
                const [startIdx, endIdx] = HAND_CONNECTION;
                const startLandmark = landmarks[startIdx];
                const endLandmark = landmarks[endIdx];

                if (startLandmark && endLandmark) {
                    // console.log("線")
                    context.beginPath();
                    context.moveTo(startLandmark.x * canvas.width, startLandmark.y * canvas.height);
                    context.lineTo(endLandmark.x * canvas.width, endLandmark.y * canvas.height);
                    context.strokeStyle = '#00FF00';

                    context.stroke();
                }
                // console.log("landmarks[8]", landmarks[8])

            });


            if (handednes[0].categoryName === rollingHand && landmarks[8]) {
                // console.log(landmarks[8])
                // setsingerHistory((fingerHistory: any) => [...fingerHistory, landmarks[8]]);
                setIsTracked(true)

                setsingerHistory((fingerHistory: any) => {
                    const updatedHistory = [...fingerHistory, landmarks[8]];
                    if (updatedHistory.length > 50) {
                        updatedHistory.shift();
                    }
                    return updatedHistory;
                });



                // addsingerHistory(landmarks[8])

                // console.log(fingerHistory)
            }



        })
    }


    // function addsingerHistory(landmark: any[]) {
    //     const updatedHistory = [...fingerHistory, landmark];

    //     if (updatedHistory.length > 100) {
    //         updatedHistory.shift();
    //     }

    //     setsingerHistory(updatedHistory)
    // }



    function drawhistory() {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        if (!canvas || !context) return;


        context.beginPath();

        fingerHistory.forEach((landmark: any) => {
            context.lineTo(landmark.x * canvas.width, landmark.y * canvas.height);


        });


        context.strokeStyle = '#00FFFF';
        context.lineWidth = 2;
        context.stroke();
        fingerHistory.forEach((landmark: any, index: number) => {

            context.beginPath();
            context.arc(landmark.x * canvas.width, landmark.y * canvas.height, 1, 0, Math.PI * 2);
            context.fillStyle = 'red';
            context.fill();

            context.fillStyle = 'black';
            context.font = '12px Arial';
            context.fillText(index.toString(), landmark.x * canvas.width + 5, landmark.y * canvas.height - 5);
        });
    }




    return (
        <>
            <canvas ref={canvasRef} style={{
                position: 'absolute',
                // border: '2px solid black',
                width: '100%'
            }} />
            {/* {rollingHand} */}
        </>
    )
}
export default HandTracker;