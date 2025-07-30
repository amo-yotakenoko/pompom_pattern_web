import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Edit from "./Edit/Edit"
import IndexPage from "./Index/IndexPage"
import Tutorial from './Tutorial';

import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
  <BrowserRouter basename="/pompom_pattern_web">
    <Routes>
      <Route path={`/`} element={<IndexPage />} />
      <Route path={`/edit`} element={<Edit />} />
      <Route path={`/workshop`} element={<Navigate to="/?camera=disable&decoration=disable&colors=FFFFFF,111111,F58220" replace />} />
      <Route path="*" element={<IndexPage />} />
    </Routes>
    {/* <Tutorial></Tutorial> */}
  </BrowserRouter>

  // </React.StrictMode>
);

reportWebVitals();
serviceWorkerRegistration.register();