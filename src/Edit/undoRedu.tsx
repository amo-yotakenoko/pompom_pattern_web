import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { enableHelpContext } from './Edit';
import Help from "../Help"
type UndoRedoProps = {
    enable: any;
    pattern: any;
    colorList: any;
    selectColor: number;
    setPattern: any;
    setColorList: any;
    setSelectColor: any;
};
var isundo = false;
const UndoRedo: React.FC<UndoRedoProps> = ({ enable, pattern, colorList, selectColor, setPattern, setColorList, setSelectColor }) => {
    const [history, setHistory] = useState<any[]>([]);
    const [current, setCurrent] = useState<number>(0);

    const stateRef = useRef<any>();
    useEffect(() => {
        stateRef.current = { pattern, colorList, selectColor };
    }, [pattern, colorList, selectColor]);

    useEffect(() => {
        setTimeout(() => {
            if (history.length === 0) {
                console.log("追加判定")
                setHistory([copy(stateRef.current)]);
                setCurrent(1);
            }
        }, 5);
    }, [history]);

    function copy(obj: any) {
        return JSON.parse(JSON.stringify(obj));
    }

    useEffect(() => {
        const handlePointerUp = () => {
            // console.log("pointerup")
            setTimeout(() => {
                if (isundo) {
                    isundo = false
                    console.log("前操作がundoなのでcancel")
                    return
                }
                // console.log("更新チャック\n", JSON.stringify(history[current - 1]), "\n", JSON.stringify(stateRef.current), JSON.stringify(history[current - 1]) != JSON.stringify(stateRef.current))
                if (JSON.stringify(history[current - 1]) != JSON.stringify(stateRef.current)) {
                    // const newHistory = copy(history);
                    console.log("登録")
                    let newHistory = copy(history)
                    newHistory = newHistory.splice(0, current);
                    let nextCurrent = current + 1

                    newHistory.push(copy(stateRef.current))
                    console.log(newHistory.length)
                    setHistory(newHistory)
                    setCurrent(nextCurrent);
                }
            }, 1);
        };

        window.addEventListener('pointerup', handlePointerUp);
        window.addEventListener('pointercancel', handlePointerUp);

        return () => {
            window.removeEventListener('pointerup', handlePointerUp);
            window.removeEventListener('pointercancel', handlePointerUp);
        };
    }, [history, current]);


    let log = []


    return (
        <>
            {/* {current}/{history.length}{`[${history.map(item => item.selectColor)}]`} */}
            {/* ,{new Date().getMilliseconds()} */}
            <UndoButton
                enable={enable}
                history={history}
                current={current}
                setPattern={setPattern}
                setColorList={setColorList}
                setSelectColor={setSelectColor}
                setCurrent={setCurrent}
            />
            <RedoButton
                enable={enable}
                history={history}
                current={current}
                setPattern={setPattern}
                setColorList={setColorList}
                setSelectColor={setSelectColor}
                setCurrent={setCurrent}
            />
        </>
    );
};

export default UndoRedo;


type UndoButtonProps = {
    enable: boolean;
    history: any[];
    current: number;
    setPattern: (pattern: any) => void;
    setColorList: (colorList: any[]) => void;
    setSelectColor: (color: number) => void;
    setCurrent: (current: number) => void;
};
const UndoButton: React.FC<UndoButtonProps> = ({ enable, history, current, setPattern, setColorList, setSelectColor, setCurrent }) => {
    // const undoRef = useRef(null);
    return (
        <Button
            // ref={undoRef}
            id="undoButton"//camerascanのundoで使ってる
            variant="primary"
            style={{
                height: '2em',
                width: "10%",
                borderBottomLeftRadius: '0px',
                borderBottomRightRadius: '0px',
                display: enable ? 'block' : 'none'
            }}
            disabled={current === 1}
            onClick={() => {
                console.log("UNDOする")
                setPattern(history[current - 2]?.pattern);
                setColorList(history[current - 2]?.colorList);
                setSelectColor(history[current - 2]?.selectColor);
                setCurrent(current - 1);
                isundo = true
                console.log({ history })
            }}
        >
            <Icon.Arrow90degLeft />
            <Help id="undoButton" >戻る</Help>
        </Button >
    );
};





const RedoButton: React.FC<UndoButtonProps> = ({ enable, history, current, setPattern, setColorList, setSelectColor, setCurrent }) => {
    // const redoRef = useRef(null);
    return (
        <Button
            id="redoButton"
            // ref={redoRef}
            variant="primary"
            style={{
                height: '2em',
                width: "10%",
                borderBottomLeftRadius: '0px',
                borderBottomRightRadius: '0px',
                display: enable ? 'block' : 'none'
            }}
            disabled={current >= history.length}
            onClick={() => {
                // setTimeout(() => {
                setPattern(history[current]?.pattern);
                setColorList(history[current]?.colorList);
                setSelectColor(history[current]?.selectColor);
                setCurrent(current + 1);
                isundo = true
                // }, 100);
            }}
        >
            <Icon.Arrow90degRight />
            <Help id="redoButton" >進む
            </Help>
        </Button >
    );
};