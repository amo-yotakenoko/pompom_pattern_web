import React, { useEffect, useRef, useState, useCallback } from 'react';
import Alert from 'react-bootstrap/Alert';


const KalmanFilter = ({ soundVolume, fingerHistory, addCounter, kalmanSettings, audiosRef }: any) => {


    useEffect(() => {
        // console.log(fingerHistory)
        if (fingerHistory[fingerHistory.length - 1]) {

            movementDetection()
            kalmanFilterUpdate(fingerHistory[fingerHistory.length - 1].y)
        }
        // console.log("fingerhistory", fingerHistory[fingerHistory.length - 1])
        // console.log("fingerhistory", fingerHistory[fingerHistory.length - 1])
        drowGraph()
    }, [fingerHistory]);

    const viewPointWidth = 50

    const graphCanvasRef = useRef<HTMLCanvasElement>(null)

    const [canvasWidth, setCanvasWidth] = useState(500);


    const [kalmanFilterResult, setKalmanFilterResult] = useState<any[]>([]);
    const [criterion, setCriterion] = useState<any[]>([]);
    // const process_var = 0.2;
    // const sensor_var = 0.2;
    const [x, setX] = useState<{ mean: number; var: number }>({ mean: 0, var: 10000 });
    const [process_model, setProcessModel] = useState({
        mean: 0,
        var: kalmanSettings.process_var
    });

    useEffect(() => {
        setProcessModel({
            mean: 0,
            var: kalmanSettings.process_var
        })
        setX({ mean: 0, var: 10000 })



    }, [kalmanSettings])


    function kalmanFilterUpdate(z: any) {
        // console.log("z", z)
        const prior = predict(x, process_model);
        const newX = update(prior, { mean: z, var: kalmanSettings.sensor_var });
        setX(newX); 

        // console.log(newX);

        setKalmanFilterResult((prevResults) => {
            const updatedResults = [...prevResults, newX];
          
            if (updatedResults.length > viewPointWidth) {
                updatedResults.shift();
            }
            return updatedResults;
        });

    }


    function predict(pos: any, movement: any) {

        // console.log({ "mean": pos.mean + movement.mean, "var": pos.var + movement.var })
        return { "mean": pos.mean + movement.mean, "var": pos.var + movement.var }
    }

    function gaussian_multiply(g1: any, g2: any) {

        const mean = (g1.var * g2.mean + g2.var * g1.mean) / (g1.var + g2.var)
        const variance = (g1.var * g2.var) / (g1.var + g2.var)
        return { "mean": mean, "var": variance }
    }

    function update(prior: any, likelihood: any) {

        const posterior = gaussian_multiply(likelihood, prior)
        return posterior
    }







    const [moveDirection, setMoveDirection] = useState("none");
    function movementDetection() {
        const x = kalmanFilterResult[kalmanFilterResult.length - 1];
        if (!x) return
        const lastCriterion = criterion[criterion.length - 1]
        if (criterion.length == 0) {
            criterion.push(x.mean)
            return
        }
        // console.log({ x })
        const max = x.mean + x.var
        const min = x.mean - x.var
        const newCriterion = Math.max(min, Math.min(lastCriterion, max));

        setCriterion((prevResults) => {
            const updatedResults = [...prevResults, newCriterion];

            if (updatedResults.length > viewPointWidth) {
                updatedResults.shift();
            }
            return updatedResults;
        });



        const move = criterion[criterion.length - 1] - criterion[criterion.length - 2];
        // console.log(criterion[criterion.length - 1] - criterion[criterion.length - 2])
        if (criterion.length > 0) {
            let progress = null;
            if (moveDirection != "up" && move < 0) {

                // setRollCount(prevRollCount => prevRollCount + 0.5);
                console.log("巻いた")
                progress = addCounter(0.5)

                setMoveDirection("up")
                //   setMoveDirection "up"
            } else if (moveDirection != "down" && move > 0) {

                // setRollCount(prevRollCount => prevRollCount + 0.5);
                console.log("巻いた")
                progress = addCounter(0.5)
                // moveDirection = "down"
                setMoveDirection("down")
            }
            if (progress && progress.rolled % 1 == 0 && soundVolume > 0) {
                playsound(progress.isComplete)
            }
        }
    }


    function playsound(isComplete: boolean) {

        const audios = !isComplete ? audiosRef.current.ends : audiosRef.current.rolls
        console.log(audios)


        // for (const audio of audios) {
        //     if (audio.currentTime >= audio.duration) {
        //         audio.pause();
        //         audio.currentTime = 0;
        //         audio.play();
        //         break; 
        //     }
        // }
        const lestAudio = audios.reduce((max: any, audio: any) => {
            return audio.currentTime > (max ? max.currentTime : -1) ? audio : max;
        }, null);
        lestAudio.pause();
        lestAudio.currentTime = 0;
        lestAudio.volume = soundVolume / 2;
        lestAudio.play();


    }

    // document.body.addEventListener('click', () => {
    //     playsound(true)
    // });



    function drowGraph() {
        const canvas = graphCanvasRef.current;
        const context = canvas?.getContext("2d");
        if (!context || !canvas) return
        context.clearRect(0, 0, canvas.width, canvas.height); 
        context.fillStyle = 'white'; 
        context.fillRect(0, 0, canvas.width, canvas.height);
        // canvas.width = 1000; 
        // canvas.height = 100;
        context.strokeStyle = "#000000";
        //測定点
        for (let i = fingerHistory.length - 1; i >= 0; i--) {
            // console.log(fingerHistory)
            const x = canvas.width / viewPointWidth * i
            context.beginPath();
            context.arc(x, fingerHistory[i].y * canvas.height, 3, 0, 2 * Math.PI);
            context.stroke(); 
        }

        // console.log("kalmanFilterResult", kalmanFilterResult)

        //期待値
        context.strokeStyle = "#000000";
        context.beginPath();
        // kalmanFilterResult
        // console.log(" kalmanFilterResult", kalmanFilterResult)

        for (let i = 0; i < kalmanFilterResult.length; i++) {
            const x = canvas.width / viewPointWidth * i
            const y = kalmanFilterResult[i].mean * canvas.height;
            // console.log("線")
            if (i == 0) {
                context.moveTo(x, y);
            } else {
                context.lineTo(x, y);
            }

        }
        context.stroke(); 


        //分散
        context.strokeStyle = "#000000";
        for (let i = kalmanFilterResult.length - 1; i >= 0; i--) {
            const x = canvas.width / viewPointWidth * i
            const y = kalmanFilterResult[i].mean * canvas.height;
            context.beginPath();
            context.lineTo(x, y - kalmanFilterResult[i].var * canvas.height);
            context.lineTo(x, y + kalmanFilterResult[i].var * canvas.height);
            context.stroke(); 


        }


        //基準
        let plotMoveDirection = "none"
        // console.log("criterion", criterion)
        context.strokeStyle = "#FF0000";
        context.beginPath();
        for (let i = criterion.length - 1; i >= 0; i--) {
            const x = canvas.width / viewPointWidth * i
            const y = criterion[i + 1] * canvas.height;
            // console.log("線")

            if (i > 0) {
                if (criterion[i - 1] < criterion[i]) {
                    plotMoveDirection = "up"
                }
                if (criterion[i - 1] > criterion[i]) {
                    plotMoveDirection = "down"
                }
            }

            if (plotMoveDirection === "none") {
                context.strokeStyle = "#FF00FF";
            } else {
                context.strokeStyle = plotMoveDirection === "up" ? "#FF0000" : "#0000FF"; 
            }

            if (i == 0) {
                context.moveTo(x, y);
            } else {
                context.lineTo(x, y);
            }

            context.stroke();

            context.beginPath(); 
            context.moveTo(x, y);

        }
        context.stroke();


    }






    return (
        <div>
            {/* <button onClick={() => {

                audiosRef.current.roll.play();
                // } else {
                audiosRef.current.end.play();
            }
            }>aaa</button> */}

            {/* <button onClick={playsound}>
                音を鳴らす
            </button> */}
            <canvas ref={graphCanvasRef} width={500} 
                height={500} style={{
                    // border: '2px solid black',
                    width: '100%'
                }} />


            <style>
                {`@keyframes toLeft {
                0% {
                    transform: translateY(-100%);
                    opacity: 0;
                }
                25% {
                    transform: translateY(0%);
                    opacity: 1;
                }
                75% {
                    transform: translateY(0%);
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100%);
                    opacity: 0;
                }
      }`}
            </style>

            <Alert style={{
                position: 'fixed',
                top: "5px",
                left: "5px",
                right: "5px",
                transform: "translateY(-100%)",
                opacity: 0,
                zIndex: 1000,
                animation: `toLeft 5s`,
                pointerEvents: 'none',
            }} key="soundAlert" variant="info">
                カメラの映像が外部に送信されることは構造上ありません
                {/* <br /> */}
                {/* 音が出ます */}
            </Alert>
        </div >
    );
};

export default KalmanFilter;