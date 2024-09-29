import React, { useEffect, useRef, useState, useCallback } from 'react';



const KalmanFilter = ({ fingerHistory, addCounter }: any) => {


    useEffect(() => {
        console.log(fingerHistory)
        if (fingerHistory[fingerHistory.length - 1]) {

            kalmanFilterUpdate(fingerHistory[fingerHistory.length - 1].y)
            movementDetection()
        }
        // console.log("fingerhistory", fingerHistory[fingerHistory.length - 1])
        // console.log("fingerhistory", fingerHistory[fingerHistory.length - 1])
        drowGraph()
    }, [fingerHistory]);


    const graphCanvasRef = useRef<HTMLCanvasElement>(null)




    const [kalmanFilterResult, setKalmanFilterResult] = useState<any[]>([]);
    const [criterion, setCriterion] = useState<any[]>([]);
    const process_var = 0.2;
    const sensor_var = 0.2;
    const [x, setX] = useState<{ mean: number; var: number }>({ mean: 0, var: 1000 });
    const process_model = { mean: 0, var: process_var };

    function kalmanFilterUpdate(z: any) {
        console.log("z", z)
        const prior = predict(x, process_model);
        const newX = update(prior, { mean: z, var: sensor_var });
        setX(newX); // xを更新

        console.log(newX);

        setKalmanFilterResult((prevResults) => {
            const updatedResults = [...prevResults, newX];
            // 配列が100を超えたら古い要素を削除
            if (updatedResults.length > 100) {
                updatedResults.shift();
            }
            return updatedResults;
        });

    }


    function predict(pos: any, movement: any) {

        console.log({ "mean": pos.mean + movement.mean, "var": pos.var + movement.var })
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
        const nweCritertion = Math.max(min, Math.min(lastCriterion, max))
        criterion.push(nweCritertion)


        setCriterion((prevResults) => {
            const updatedResults = [...prevResults, nweCritertion];

            if (criterion.length > 100) {
                criterion.shift();
            }
            return criterion;
        });



        const move = criterion[criterion.length - 1] - criterion[criterion.length - 2];
        console.log(criterion[criterion.length - 1] - criterion[criterion.length - 2])
        if (criterion.length > 0) {
            if (moveDirection != "up" && move < 0) {

                // setRollCount(prevRollCount => prevRollCount + 0.5);
                console.log("巻いた")
                addCounter(0.5)

                setMoveDirection("up")
                //   setMoveDirection "up"
            } else if (moveDirection != "down" && move > 0) {

                // setRollCount(prevRollCount => prevRollCount + 0.5);
                console.log("巻いた")
                addCounter(0.5)
                // moveDirection = "down"
                setMoveDirection("down")
            }
        }
    }






    function drowGraph() {
        const canvas = graphCanvasRef.current;
        const context = canvas?.getContext("2d");
        if (!context || !canvas) return
        context.clearRect(0, 0, canvas.width, canvas.height); // キャンバスをクリア
        context.fillStyle = 'white'; // 塗りつぶす色を白に設定
        context.fillRect(0, 0, canvas.width, canvas.height); // キャンバスを白で塗りつぶす
        // canvas.width = 1000;  // キャンバスの幅を1000pxに設定
        // canvas.height = 100;
        context.strokeStyle = "#000000";
        //測定点
        for (let i = 0; i < fingerHistory.length; i++) {
            // console.log(fingerHistory)
            const x = canvas.width / 100 * i
            context.beginPath();
            context.arc(x, fingerHistory[i].y * canvas.height, 3, 0, 2 * Math.PI);
            context.stroke(); // 円の輪郭を描画
        }

        // console.log("kalmanFilterResult", kalmanFilterResult)

        //期待値
        context.strokeStyle = "#000000";
        context.beginPath();
        // kalmanFilterResult
        console.log(" kalmanFilterResult", kalmanFilterResult)

        for (let i = 0; i < kalmanFilterResult.length; i++) {
            const x = canvas.width / 100 * i
            const y = kalmanFilterResult[i].mean * canvas.height;
            console.log("線")
            if (i == 0) {
                context.moveTo(x, y);
            } else {
                context.lineTo(x, y);
            }

        }
        context.stroke(); // 円の輪郭を描画


        //分散
        context.strokeStyle = "#000000";
        for (let i = 0; i < kalmanFilterResult.length; i++) {
            const x = canvas.width / 100 * i
            const y = kalmanFilterResult[i].mean * canvas.height;
            context.beginPath();
            context.lineTo(x, y - kalmanFilterResult[i].var * canvas.height);
            context.lineTo(x, y + kalmanFilterResult[i].var * canvas.height);
            context.stroke(); // 円の輪郭を描画


        }


        //基準
        let plotMoveDirection = "none"
        // console.log("criterion", criterion)
        context.strokeStyle = "#FF0000";
        context.beginPath();
        for (let i = 0; i < criterion.length; i++) {
            const x = canvas.width / 100 * i
            const y = criterion[i] * canvas.height;
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
                context.strokeStyle = plotMoveDirection === "up" ? "#FF0000" : "#0000FF"; // 青色に変更
            }


            if (i == 0) {
                context.moveTo(x, y);
            } else {
                context.lineTo(x, y);
            }

            context.stroke();

            context.beginPath(); // 新しいパスを開始
            context.moveTo(x, y); // 青色の線の開始点に移動

        }
        context.stroke(); // 円の輪郭を描画


    }






    return (
        <div>
            <canvas ref={graphCanvasRef} width={1000} // 解像度（内部サイズ）
                height={150} style={{ border: '2px solid black', width: '90%' }} />
        </div>
    );
};

export default KalmanFilter;