import React, { useState } from 'react';
import { Button, ProgressBar } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const RollHandSelect = ({ rollingHand, setRollingHand }: any) => {

    return (
        <>

            {/* <NavDropdown title="カメラ" id="basic-nav-dropdown"> */}
            {/* 巻く際に使う手<br></br> */}
            <Card.Title>     巻く際に使う手 </Card.Title>
            <ButtonGroup >


                <Button onClick={() => setRollingHand("Left")}
                    className={rollingHand === "Left" ? 'active' : ''}>
                    左手
                </Button>
                <Button onClick={() => setRollingHand("Right")}
                    className={rollingHand === "Right" ? 'active' : ''}>
                    右手
                </Button>




            </ButtonGroup>
            {/* </NavDropdown> */}

            {/* カメラを選択 */}
        </>
    )
}
export default RollHandSelect;