import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SickServiceProvider } from './context/sickContext';
import { SickService } from './service/sickService';
import axiosClient from './client/axiosClient';
import store from './redux/store';
import { Provider } from 'react-redux';
import { LocalRecentQueryRepository } from './repository/localStorageRepository';
import { localStorageQueryListName } from './utils/sickUtility';
import RecentQueryProvider from './context/recentQueryContext';

const baseURL = 'http://localhost:4000/';
const sickService = new SickService(axiosClient(baseURL));
const recentQueryRepository = new LocalRecentQueryRepository(localStorageQueryListName);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <SickServiceProvider sickService={sickService}>
    <RecentQueryProvider localStorageRepository={recentQueryRepository}>
      <Provider store={store}>
        <App />
      </Provider>
    </RecentQueryProvider>
  </SickServiceProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
