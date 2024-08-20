import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import size_guide from '../img/size_guide.jpg';

type InputProps = {

};
const Input: React.FC<InputProps> = ({ }) => {

    return (
        <>
            <div className="d-flex align-items-center">
                <button className="btn btn-primary" type="button">-</button>
                <input type="text" className="form-control mx-2" placeholder="入力してください" aria-label="Input field" />
                <button className="btn btn-primary" type="button">+</button>
            </div>

        </>
    )

};

export default Input;
