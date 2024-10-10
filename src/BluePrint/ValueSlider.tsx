
import React, { useState } from 'react';
import { Button, ProgressBar, Form } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';

import ButtonGroup from 'react-bootstrap/ButtonGroup';
function ValueSlider({ value, setValue, label, min, max }: any) {
   
    const [internalValue, setInternalValue] = useState(value);

    const handleRangeChange = (event: any) => {
        let newValue = parseFloat(event.target.value);

        newValue = Math.max(0.01, Math.min(1, newValue));

        setInternalValue(newValue); 
    };

    const handleRangeMouseUp = () => {
        console.log("handleRangeMouseUp", internalValue)
        setValue(internalValue); 
    };

    const handleInputChange = (event: any) => {
        const newValue = Math.max(0.01, Math.min(1, parseFloat(event.target.value)));
        setInternalValue(newValue); 
        setValue(newValue);
    };

    return (
        <div>
            {label}
            <div className="d-flex align-items-center">
                <Form.Range
                    value={internalValue}
                    onChange={handleRangeChange}
                    onMouseUp={handleRangeMouseUp}
                    onTouchEnd={handleRangeMouseUp}
                    min={min || 0.01}   
                    max={max || 1}   
                    step={0.01} 
                />
                <Form.Control
                    type="number"
                    value={internalValue} 
                    onChange={handleInputChange}
                    className="ms-2"
                    style={{ width: '100px' }}
                />
            </div>
        </div>
    );
}
export default ValueSlider;


