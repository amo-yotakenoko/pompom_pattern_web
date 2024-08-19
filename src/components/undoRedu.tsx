import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

type UndoRedoProps = {
    pattern: any;
    colorList: any;
    selectColor: number;
    setPattern: any;
    setColorList: any;
    setSelectColor: any;
};
var isundo = false;
const UndoRedo: React.FC<UndoRedoProps> = ({ pattern, colorList, selectColor, setPattern, setColorList, setSelectColor }) => {
    const [history, setHistory] = useState<any[]>([]);
    const [current, setCurrent] = useState<number>(0);

    const stateRef = useRef<any>();
    useEffect(() => {
        stateRef.current = { pattern, colorList, selectColor };
    }, [pattern, colorList, selectColor]);

    useEffect(() => {
        if (history.length === 0) {
            setHistory([copy(stateRef.current)]);
            setCurrent(1);
        }
    }, [history]);

    function copy(obj: any) {
        return JSON.parse(JSON.stringify(obj));
    }

    useEffect(() => {
        const handlePointerUp = () => {
            console.log("pointerup")
            setTimeout(() => {
                if (isundo) {
                    isundo = false
                    console.log("前操作がundoなのでcancel")
                    return
                }
                console.log("更新チャック\n", JSON.stringify(history[current - 1]), "\n", JSON.stringify(stateRef.current), JSON.stringify(history[current - 1]) != JSON.stringify(stateRef.current))
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
                history={history}
                current={current}
                setPattern={setPattern}
                setColorList={setColorList}
                setSelectColor={setSelectColor}
                setCurrent={setCurrent}
            />
            <RedoButton
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
    history: any[];
    current: number;
    setPattern: (pattern: any) => void;
    setColorList: (colorList: any[]) => void;
    setSelectColor: (color: number) => void;
    setCurrent: (current: number) => void;
};

const UndoButton: React.FC<UndoButtonProps> = ({ history, current, setPattern, setColorList, setSelectColor, setCurrent }) => {
    return (
        <Button
            variant="primary"
            style={{
                height: '50px',
                width: "10%",
                borderBottomLeftRadius: '0px',
                borderBottomRightRadius: '0px',
            }}
            disabled={current === 1}
            onClick={() => {

                setPattern(history[current - 2]?.pattern);
                setColorList(history[current - 2]?.colorList);
                setSelectColor(history[current - 2]?.selectColor);
                setCurrent(current - 1);
                isundo = true

            }}
        >
            👈
        </Button >
    );
};



type RedoButtonProps = {
    history: any[];
    current: number;
    setPattern: (pattern: any) => void;
    setColorList: (colorList: any[]) => void;
    setSelectColor: (color: number) => void;
    setCurrent: (current: number) => void;
};

const RedoButton: React.FC<RedoButtonProps> = ({ history, current, setPattern, setColorList, setSelectColor, setCurrent }) => {
    return (
        <Button
            variant="primary"
            style={{
                height: '50px',
                width: "10%",
                borderBottomLeftRadius: '0px',
                borderBottomRightRadius: '0px',
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
            👉
        </Button>
    );
};