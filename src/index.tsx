import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Edit from "./Edit/Edit"
import IndexPage from "./Index/IndexPage"
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
  <BrowserRouter basename="/pompom_pattern_web">
    <Routes>
      <Route path={`/`} element={<IndexPage />} />
      <Route path={`/edit`} element={<Edit />} />
      <Route path="*" element={<IndexPage />} />
    </Routes>
  </BrowserRouter>

  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
