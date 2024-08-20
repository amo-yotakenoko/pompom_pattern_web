import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ImageLoad from './ImageLoad'
import { useNavigate } from "react-router-dom";


function testPattern(rollWidth: any, pitchWidth: any) {
    console.log("Pattern書き直し", rollWidth, pitchWidth)
    const _pattern: any = []
    for (let i = 0; i < rollWidth; i++) {
        _pattern[i] = [];
        for (let j = 0; j < pitchWidth; j++) {
            _pattern[i][j] = j % 3 + 1;
        }
    }
    return _pattern

}


function IndexPage() {
    const navigate = useNavigate();
    const newCreate = () => {
        navigate('/edit', {
            state: {
                rollWidth: 20,
                pitchWidth: 20,
                // colorList: [
                //     ["#FF33FF"], // Magenta
                //     ["#FFFFFF"], // white
                //     ["#FF5733",], // Red-Orange
                //     ["#FFBD33", "#FF0033"], // Orange-Yellow
                //     ["#FFFF33"], // Yellow
                //     ["#B6FF33"], // Yellow-Green
                //     ["#33FF57"], // Green
                //     ["#33FFBD"], // Green-Cyan
                //     ["#33FFFF"], // Cyan
                //     ["#33B6FF"], // Cyan-Blue
                //     ["#3357FF"], // Blue
                //     ["#BD33FF"], // Purple
                // ],
                // pattern: testPattern(20, 20)
            }
        });
    };

    return (
        <>
            <Button onClick={newCreate}>新規作成</Button>

            <ImageLoad></ImageLoad>
        </>
    );
}

export default IndexPage;



// 123, 34, 112, 97, 116, 116, 101, 114, 110, 34, 58, 91, 91, 49, 44, 49, 44, 48, 44, 49, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 93, 44, 91, 48, 44, 49, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 93, 44, 91, 48, 44, 48, 44, 49, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 93, 44, 91, 48, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 93, 44, 91, 48, 44, 48, 44, 48, 44, 48,