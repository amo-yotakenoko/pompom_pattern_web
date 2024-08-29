import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import size_guide from '../img/size_guide.jpg';
import Input from './Input'
type SizeSetProps = {
    value: number;


    valueSet: any;
};
const SizeSet: React.FC<SizeSetProps> = ({ value, valueSet }) => {
    const [fontSize, setFontSize] = useState<string>('16px');

    useEffect(() => {
        const updateFontSize = () => {

            const inputElement = document.querySelector('input');
            if (inputElement) {
                console.log("大きさ計算");
                const inputWidth = inputElement.offsetWidth;
                setFontSize(`${inputWidth / 5}px`);
            }
        };


        const handleResize = () => {
            requestAnimationFrame(updateFontSize);
        };

        window.addEventListener('resize', handleResize);

        requestAnimationFrame(updateFontSize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [value]);

    return (
        <>
            {/* <div className="container">
                <div className="row align-items-center">
                    <div className="col-6">
                        <img
                            src={size_guide}

                            style={{}}
                        />
                    </div>
                    <div className="col-6">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="入力してください"
                        />
                    </div>
                </div>
            </div> */}

            <input
                type="number"
                min="5"
                max="200"
                step="1"
                className="form-control"
                placeholder="入力してください"
                style={{
                    width: "100%", height: "100%",
                    fontSize: fontSize
                }}
                value={value}
                onChange={(event: any) => {
                    console.log("値", parseFloat(event.target.value))
                    const value = parseFloat(event.target.value);


                    valueSet(value);
                }}
                onBlur={(event: any) => {
                    let value = parseFloat(event.target.value);
                    if (isNaN(value)) value = 0

                    valueSet(clamp(value, 5, 100));
                    function clamp(value: number, min: number, max: number) {
                        return Math.max(min, Math.min(value, max));
                    }

                }}

            />



        </>
    )

};

export default SizeSet;
