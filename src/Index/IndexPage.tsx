import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ImageLoad from './ImageLoad'
import { useNavigate } from "react-router-dom";
import SizeSet from './sizeSet'
import New from './New'

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


    return (
        <>


            <div className="container mt-4">
                <div className="row">
                    <div className="col-12 col-md-6 mb-4 d-flex">
                        <div className="card flex-fill">
                            <div className="card-body">
                                <h5 className="card-title">新規作成</h5>
                                <New />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 mb-4 d-flex">
                        <div className="card flex-fill">
                            <div className="card-body">
                                <h5 className="card-title">画像から読み込み</h5>
                                <ImageLoad />
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-6 mb-4 d-flex">
                        <div className="card flex-fill">
                            <div className="card-body">
                                <h5 className="card-title">テスト用</h5>
                                <input
                                    type="color"
                                    id="colorPicker"
                                    name="color"

                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </>
    );
}

export default IndexPage;



// 123, 34, 112, 97, 116, 116, 101, 114, 110, 34, 58, 91, 91, 49, 44, 49, 44, 48, 44, 49, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 93, 44, 91, 48, 44, 49, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 93, 44, 91, 48, 44, 48, 44, 49, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 93, 44, 91, 48, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 93, 44, 91, 48, 44, 48, 44, 48, 44, 48,