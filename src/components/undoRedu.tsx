import React, { useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
type UndoRedoProps = {
    pattern: any;
    colorList: any;
    selectColor: number;
    setPattern: any;
    setColorList: any;
    setSelectColor: any;
};

let history: any = [];
let current = 0;
// var pointreUpRegistered = false;
const UndoRedo: React.FC<UndoRedoProps> = ({ pattern, colorList, selectColor, setPattern, setColorList, setSelectColor }) => {

    const stateRef = useRef({ pattern, colorList, selectColor });
    useEffect(() => {
        stateRef.current = { pattern, colorList, selectColor };
    }, [pattern, colorList, selectColor]);

    if (history.length == 0) {
        history.push(copy(stateRef.current))
        current += 1
    }
    function copy(obj: any) {
        return JSON.parse(JSON.stringify(obj));
    }
    useEffect(() => {
        // console.log("更新")
        // history.push({ pattern, colorList, selectColor });
        // console.log("追加a")
        // console.log(history)

        const handlePointerUp = (event: any) => {
            requestAnimationFrame(() => {
                // console.log({ color: propsRef.current.selectColor })
                // console.log(JSON.stringify(history[current]), JSON.stringify(stateRef.current), JSON.stringify(history[current]) !== JSON.stringify(stateRef.current))

                // console.log("pointerup", current, history, JSON.stringify(history[current]) !== JSON.stringify(propsRef.current))
                if (JSON.stringify(history[current]) !== JSON.stringify(stateRef.current)) {

                    // history.push({ pattern, colorList, selectColor })
                    current += 1
                    // console.log("bedore", history)
                    history = history.slice(0, current);
                    // console.log("after", history)
                    history.push(copy(stateRef.current))
                    // history.splice(current, 0, copy(propsRef.current));
                    // console.log("追加")
                    // console.log(history)
                }
            });
        };


        window.addEventListener('pointerup', handlePointerUp);

        return () => {
            window.removeEventListener('pointerup', handlePointerUp);
        };

    }, []);
    // if (!pointreUpRegistered) {
    //     pointreUpRegistered = true;

    // console.log("登録")


    // イベントリスナーを追加


    // クリーンアップ関数を返して、アンマウント時や依存関係が変更されたときにリスナーを削除
    // return () => {
    //     // console.log("登録解除")
    //     window.removeEventListener('pointerup', handlePointerUp);
    // };


    // }


    return (
        <>
            <Button variant="primary" style={{

                height: '50px',
                width: "10%"

            }}
                disabled={current === 0}
                onClick={() => {
                    current -= 1
                    console.log("undo", current, history[current].selectColor)
                    setPattern(history[current].pattern)
                    setColorList(history[current].colorList)
                    setSelectColor(history[current].selectColor)
                }}
            >👈</Button>
            <Button variant="secondary" style={{

                height: '50px',
                width: "10%"

            }}
                disabled={current >= history.length - 1}
                onClick={() => {
                    current += 1
                    console.log("redo", current, history[current].selectColor)
                    setPattern(history[current].pattern)
                    setColorList(history[current].colorList)
                    setSelectColor(history[current].selectColor)
                }}
            >👉</Button>
            {/* {current}/ {history.length} */}
        </>
    );

}


export default UndoRedo;