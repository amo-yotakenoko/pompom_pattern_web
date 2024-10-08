import React, { useEffect, useRef, useState, useLayoutEffect, useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { enableHelpContext } from './Edit';
import Help from "../Help"

function copy(obj: any) {
    return JSON.parse(JSON.stringify(obj));
}
// var isundo = false;
const UndoRedo = ({ enable, pattern, colorList, selectColor, setPattern, setColorList, setSelectColor, registerEnable }: any) => {
    const [history, setHistory] = useState<any[]>([]);
    // const historyRef = useRef<any>([]);
    const [current, setCurrent] = useState<number>(0);

    // const [isundo, setIsundo] = useState(false); //いらない
    // const lastStateRef = useRef<any>();


    // useEffect(() => {
    //     console.log("stateref更新")
    //     lastStateRef.current = copy({ pattern, colorList, selectColor });
    // }, [pattern, colorList, selectColor]);

    const state = useMemo(() => {
        return copy({ pattern, colorList, selectColor });
    }, [pattern, colorList, selectColor]);

    useEffect(() => {
        // setTimeout(() => {
        console.log("最初の状態更新するか", history.length === 0, pattern.length, colorList ? true : false, selectColor ? true : false)
        if (history.length === 0 && pattern.length > 0 && colorList && selectColor) {
            // history.push(state)
            setHistory([state])
            console.log("最初の状態更新2", history)
            // history = [copy({ pattern, colorList, selectColor })]
            setCurrent(0);
        }
        // }, 1000);
    }, [pattern]);








    useEffect(() => {


        // stateRef.current = copy({ pattern, colorList, selectColor });

        // console.log("更新", current, JSON.stringify(history));
        const handlePointerUp = () => {
            if (history.length <= 0) return
            const isCeanged = JSON.stringify(history[current]) != JSON.stringify(state);
            console.log("更新チャック\n", isCeanged, current, JSON.stringify(history[current]), "\n", JSON.stringify(state));
            if (isCeanged) {
                addHistory()
            }
        }
        if (registerEnable) {

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
        }
    }, [history, current, pattern, colorList, selectColor, registerEnable]);


    function addHistory() {
        // historyを新しくコピーして、状態を保持
        setHistory((prevHistory) => {
            const newHistory = copy([
                ...prevHistory.slice(0, current + 1), // 現在のインデックスまでの履歴をスライス
                copy(state) // 現在の状態をコピーして追加
            ]);
            console.log("state", JSON.stringify(state)); // newHistoryをログに出力
            return newHistory; // 更新された履歴を返す
        });


        // console.log("登録", newHistory.length, newHistory);

        // currentを更新
        setCurrent((prev) => prev + 1);
    }

    let log = []


    return (
        <>
            {/* <button onClick={addHistory}>addHistory</button>
            {current}/{history.length - 1},{`${history.map((item: any) => item.selectColor)}`}
            {/* ,{new Date().getMilliseconds()} */}
            {/* {`${JSON.stringify(history.map((x: any) => x.pattern[0]))}`}<br /> */}
            {/* {stateRef.current && JSON.stringify(stateRef.current.pattern[0])}
            {JSON.stringify(state.pattern[0])} */}
            {/* {JSON.stringify(pattern[0])}:今} */}

            <div onClick={addHistory} id="addHistory"></div>
            <div id="setCurrentState" onClick={() => {
                setPattern(copy(history[current]?.pattern));
                setColorList(copy(history[current]?.colorList));
                setSelectColor(copy(history[current]?.selectColor));
            }}></div >

            <UndoButton
                // setIsundo={setIsundo}
                enable={enable}
                history={history}
                current={current}
                setPattern={setPattern}
                setColorList={setColorList}
                setSelectColor={setSelectColor}
                setCurrent={setCurrent}
            />
            <RedoButton
                // setIsundo={setIsundo}
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

                setPattern(copy(history[current - 1]?.pattern));
                setColorList(copy(history[current - 1]?.colorList));
                setSelectColor(copy(history[current - 1]?.selectColor));
                setCurrent(current - 1);
                // setIsundo(true)
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
                setPattern(copy(history[current + 1]?.pattern));
                setColorList(copy(history[current + 1]?.colorList));
                setSelectColor(copy(history[current + 1]?.selectColor));
                setCurrent(current + 1);
                // setIsundo(true)
                // }, 100);
            }}
        >
            <Icon.Arrow90degRight />
            <Help id="redoButton" >進む
            </Help>
        </Button >
    );
};