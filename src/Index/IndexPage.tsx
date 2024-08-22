import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LocalStrageLoad from './LocalStrageLoad';
import Button from 'react-bootstrap/Button';
import ImageLoad from './ImageLoad'
import { useNavigate } from "react-router-dom";
import SizeSet from './sizeSet'
import New from './New'
import QRCode from '../img/qr.png';
import Alert from 'react-bootstrap/Alert';

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

            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <LayoutAlart />
                    </div>

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


                    <LocalStrageLoad></LocalStrageLoad>


                    {/* <div className="col-12 col-md-6 mb-4 d-flex">
                        <div className="card flex-fill">
                            <div className="card-body">
                                <h5 className="card-title">テスト用</h5>
                                <input type="color" id="colorPicker" name="color" />
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>



        </>
    );
}


function LayoutAlart() {
    return (
        <>
            {window.screen.height / window.screen.width < 1 && (
                <Alert className="d-flex align-items-center justify-content-center " style={{ padding: "0" }} variant='warning'>
                    <div className="d-flex align-items-center justify-content-between w-100" style={{ marginLeft: '15px' }}>
                        このアプリは縦向きのスマートフォン向けです
                        <img src={QRCode} style={{ width: '64px', height: '64px' }} alt="QR Code" />
                    </div>
                </Alert>
            )}
        </>
    )
}
export default IndexPage;



// 123, 34, 112, 97, 116, 116, 101, 114, 110, 34, 58, 91, 91, 49, 44, 49, 44, 48, 44, 49, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 93, 44, 91, 48, 44, 49, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 93, 44, 91, 48, 44, 48, 44, 49, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 93, 44, 91, 48, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 93, 44, 91, 48, 44, 48, 44, 48, 44, 48,