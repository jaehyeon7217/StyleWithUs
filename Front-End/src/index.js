import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { createStore } from "redux";
import { BrowserRouter } from 'react-router-dom';
import reducer from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";

const root = ReactDOM.createRoot(document.getElementById('root'));
// store 생성(reducer,devtools 연결)
const store = createStore(reducer, composeWithDevTools());

root.render(
  // 스토어 연결, 라우터 연결
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
);

reportWebVitals();