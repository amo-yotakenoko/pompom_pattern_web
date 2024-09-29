
import React, { useState } from 'react';
import { Button, ProgressBar, Form } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';

import ButtonGroup from 'react-bootstrap/ButtonGroup';
function ValueSlider({ value, setValue, label }: any) {
    // スライダーの内部状態を作成
    const [internalValue, setInternalValue] = useState(value);

    const handleRangeChange = (event: any) => {
        let newValue = parseFloat(event.target.value); // 文字列をfloatに変換

        // 値を0.1から1の範囲に制限
        newValue = Math.max(0.01, Math.min(1, newValue));

        setInternalValue(newValue); // 内部状態を更新
    };

    const handleRangeMouseUp = () => {
        console.log("handleRangeMouseUp", internalValue)
        setValue(internalValue); // スライダーを離したときに親に通知
    };

    const handleInputChange = (event: any) => {
        const newValue = Math.max(0.01, Math.min(1, parseFloat(event.target.value))); // 文字列をfloatに変換
        setInternalValue(newValue); // 内部状態を更新
        setValue(newValue); // 親コンポーネントに即時反映
    };

    return (
        <div>
            {label}
            <div className="d-flex align-items-center">
                <Form.Range
                    value={internalValue} // 内部状態を使用
                    onChange={handleRangeChange}
                    onMouseUp={handleRangeMouseUp}
                    onTouchEnd={handleRangeMouseUp}
                    min={0.01}    // 最小値を0に設定
                    max={1}    // 最大値を1に設定
                    step={0.01} // ステップを0.01に設定
                />
                <Form.Control
                    type="number"
                    value={internalValue} // 内部状態を使用
                    onChange={handleInputChange}
                    className="ms-2"
                    style={{ width: '100px' }}
                />
            </div>
        </div>
    );
}
export default ValueSlider;


