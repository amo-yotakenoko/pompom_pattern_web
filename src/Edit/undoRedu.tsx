import React, { useEffect, useRef, useState, useLayoutEffect, useMemo } from 'react';
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
// var isundo = false;
const UndoRedo: React.FC<UndoRedoProps> = ({ enable, pattern, colorList, selectColor, setPattern, setColorList, setSelectColor }) => {
    // const [history, setHistory] = useState<any[]>([]);
    const historyRef = useRef<any>([]);
    const [current, setCurrent] = useState<number>(0);

    const [isundo, setIsundo] = useState(false); //いらない
    const stateRef = useRef<any>();


    useEffect(() => {
        console.log("stateref更新")
        stateRef.current = copy({ pattern, colorList, selectColor });
    }, [pattern, colorList, selectColor]);

    const state = useMemo(() => {
        return copy({ pattern, colorList, selectColor });
    }, [pattern, colorList, selectColor]);

    useEffect(() => {
        setTimeout(() => {
            if (historyRef.current.length === 0) {
                console.log("最初の状態更新")
                historyRef.current.push(copy(stateRef.current))
                // setHistory([copy(stateRef.current)]);
                setCurrent(0);
            }
        }, 100);
    }, []);

    function copy(obj: any) {
        return JSON.parse(JSON.stringify(obj));
    }






    useEffect(() => {
        console.log("更新確認")
        // stateRef.current = copy({ pattern, colorList, selectColor });
        const handlePointerUp = () => {
            // console.log("pointerup")
            setTimeout(() => {
                // if (isundo) {
                //     setIsundo( false)
                //     console.log("前操作がundoなのでcancel")
                //     return
                // }
                console.log("更新", JSON.stringify(historyRef.current))
                console.log("更新チャック\n", JSON.stringify(historyRef.current[current]), "\n", JSON.stringify(state), JSON.stringify(historyRef.current[current]) != JSON.stringify(state))
                if (JSON.stringify(historyRef.current[current]) != JSON.stringify(state)) {
                    // const newHistory = copy(history);
                    let newHistory = copy(historyRef.current)
                    newHistory = newHistory.splice(0, current + 1);
                    let nextCurrent = current + 1

                    newHistory.push(copy(state))
                    console.log("登録", newHistory.length, newHistory)
                    // console.log(newHistory.length)
                    historyRef.current = newHistory

                    setCurrent(nextCurrent);
                }
            }, 100);
        };
        const editingElement = document.getElementById('editing');
        if (editingElement) {
            editingElement.addEventListener('pointerup', handlePointerUp);
            editingElement.addEventListener('pointercancel', handlePointerUp);
        }
        return () => {
            if (editingElement) {
                editingElement.removeEventListener('pointerup', handlePointerUp);
                editingElement.removeEventListener('pointercancel', handlePointerUp);
            }
        };
    }, [current, pattern, colorList, selectColor]);




    let log = []


    return (
        <>
            {current}/{historyRef.current.length - 1}{`[${historyRef.current.map((item: any) => item.selectColor)}]`}
            {/* ,{new Date().getMilliseconds()} */}
            {`${JSON.stringify(historyRef.current.map((x: any) => x.pattern[0]))}`}<br />
            {/* {stateRef.current && JSON.stringify(stateRef.current.pattern[0])}
            {JSON.stringify(state.pattern[0])} */}
            {JSON.stringify(pattern[0])}
            <UndoButton
                setIsundo={setIsundo}
                enable={enable}
                history={historyRef.current}
                current={current}
                setPattern={setPattern}
                setColorList={setColorList}
                setSelectColor={setSelectColor}
                setCurrent={setCurrent}
            />
            <RedoButton
                setIsundo={setIsundo}
                enable={enable}
                history={historyRef.current}
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
const UndoButton = ({ setIsundo, enable, history, current, setPattern, setColorList, setSelectColor, setCurrent }: any) => {
    // const undoRef = useRef(null);
    return (
        <Button
            // ref={undoRef}
            id="undoButton"
            variant="primary"
            style={{
                height: '2em',
                width: "10%",
                borderBottomLeftRadius: '0px',
                borderBottomRightRadius: '0px',
                display: enable ? 'block' : 'none'
            }}
            disabled={current === 0}
            onClick={() => {

                setPattern(history[current - 1]?.pattern);
                setColorList(history[current - 1]?.colorList);
                setSelectColor(history[current - 1]?.selectColor);
                setCurrent(current - 1);
                setIsundo(true)
                console.log({ history })
            }}
        >
            <Icon.Arrow90degLeft />
            <Help id="undoButton" >戻る</Help>
        </Button >
    );
};





const RedoButton = ({ setIsundo, enable, history, current, setPattern, setColorList, setSelectColor, setCurrent }: any) => {
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
            disabled={current >= history.length - 1}
            onClick={() => {
                // setTimeout(() => {
                setPattern(history[current + 1]?.pattern);
                setColorList(history[current + 1]?.colorList);
                setSelectColor(history[current + 1]?.selectColor);
                setCurrent(current + 1);
                setIsundo(true)
                // }, 100);
            }}
        >
            <Icon.Arrow90degRight />
            <Help id="redoButton" >進む
            </Help>
        </Button >
    );
};