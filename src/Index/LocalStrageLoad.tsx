import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ProgressBar } from 'react-bootstrap';
import addIcon from '../img/designsystem-assets/icon/png/add_fill24.png';
import Modal from 'react-bootstrap/Modal';
import * as Icon from 'react-bootstrap-icons';
interface LocalStrageLoadProps { }

const LocalStrageLoad: React.FC<LocalStrageLoadProps> = ({ }) => {
    const [data, setData] = useState<any>({});
    const [strageUsed, setStrageUsed] = useState(0);
    const [items, setItems] = useState<any[]>([]);
    const navigate = useNavigate();
    const [deleteConfirmation, setDeleteConfirmation] = useState<any>(undefined);
    useEffect(() => {
        // const loadData = () => {
        let value = localStorage.getItem('pompoms');
        if (value !== null) {
            let datas = JSON.parse(value);
            console.log({ datas });
            const newItems = [];
            // for (const key in datas) {
            //     const value = datas[key];
            //     newItems.push(
            //         <div key={key} className="col-6 col-md-3 mb-3 d-flex">
            //             <div className="card flex-fill">
            //                 <div className="card-body" style={{ padding: "10px" }}>
            //                     <div style={{ position: 'relative', width: '100%' }}>
            //                         <img
            //                             src={addIcon}
            //                             style={{
            //                                 right: "0px",
            //                                 top: "0px",
            //                                 transform: 'rotate(45deg)',
            //                                 position: 'absolute',
            //                             }}
            //                             onClick={() => setDeleteConfirmation(key)}
            //                             alt="Delete Icon"
            //                         />
            //                         <img src={value.img} style={{ width: '100%' }} alt="Sample" />
            //                         <Button
            //                             style={{
            //                                 position: 'absolute',
            //                                 bottom: '0px',
            //                                 right: '0px',
            //                                 zIndex: 1
            //                             }}
            //                             onClick={() => navigeteEdit(key, value.data)}
            //                         >
            //                             編集
            //                         </Button>
            //                     </div>
            //                 </div>
            //             </div>
            //         </div>
            //     );
            // }
            // setItems(newItems.reverse());
            setData(datas);

        }
        // };
        // loadData();
    }, []);


    useEffect(() => {
        const newItems = [];
        for (const key in data) {
            const value = data[key];
            newItems.push(
                <div key={key} className="col-6 col-md-3 mb-3 d-flex">
                    <div className="card flex-fill">
                        <div className="card-body" style={{ padding: "10px" }}>
                            <div style={{ position: 'relative', width: '100%' }}>
                                <img
                                    src={addIcon}
                                    style={{
                                        right: "0px",
                                        top: "0px",
                                        transform: 'rotate(45deg)',
                                        position: 'absolute',
                                    }}
                                    onClick={() => setDeleteConfirmation(key)}
                                    alt="Delete Icon"
                                />
                                <img src={value.img} style={{ width: '100%' }} alt="Sample" />
                                <Icon.Pencil
                                    style={{
                                        position: 'absolute',
                                        bottom: '0px',
                                        right: '0px',
                                        zIndex: 1,
                                        fontSize: '32px'
                                    }}
                                    onClick={() => navigeteEdit(key, value.data)}
                                >
                                    {/* <Icon.Pencil /> */}
                                </Icon.Pencil>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        setItems(newItems.reverse());
        setStrageUsed(new TextEncoder().encode(JSON.stringify(data)).length / (1024 * 1024))
    }, [data]);

    function navigeteEdit(key: any, data: any) {
        console.log(data);
        data.saveKeyName = key;
        navigate('/edit', { state: data });
    }

    function deleteItem(key: any) {
        console.log(key, "を削除");
        let value = localStorage.getItem('pompoms');
        if (value == null) return;
        let datas = JSON.parse(value);
        delete datas[key];
        localStorage.setItem('pompoms', JSON.stringify(datas));
        setData(datas);
    }

    return (
        <>
            <div className="row">
                {strageUsed > 0.1 && <div className="col-12 my-3">
                    <ProgressBar now={strageUsed / 5 * 100} label={`${strageUsed.toFixed(2)}MB/5MB`} />
                </div>}
                {items}
            </div>
            <Modal show={deleteConfirmation != undefined} onHide={() => { setDeleteConfirmation(undefined) }}>
                <Modal.Header closeButton>
                    <Modal.Title>削除しますか?</Modal.Title>
                </Modal.Header>
                <Modal.Body>{deleteConfirmation}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { deleteItem(deleteConfirmation); setDeleteConfirmation(undefined) }}>
                        OK
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    );
};

export default LocalStrageLoad;