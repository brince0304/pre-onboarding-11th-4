import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { SickServiceProvider } from './context/sickContext';
import { SickService } from './service/sickService';
import axiosClient from './client/axiosClient';
import store from './redux/store';
import { Provider } from 'react-redux';
import RecentQueryProvider from './context/recentQueryContext';
import CustomRouterProvider from './router/router';
import { LocalStorageSickCacheRepository } from './repository/localRecentQueryRepository';
import { LocalRecentQueryRepository } from './repository/localSickCacheRepository';

const baseURL = 'http://localhost:4000/';
const cacheRepository = new LocalStorageSickCacheRepository();
const sickService = new SickService(axiosClient(baseURL), cacheRepository);
const recentQueryRepository = new LocalRecentQueryRepository();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <SickServiceProvider sickService={sickService}>
    <RecentQueryProvider localStorageRepository={recentQueryRepository}>
      <Provider store={store}>
        <CustomRouterProvider />
      </Provider>
    </RecentQueryProvider>
  </SickServiceProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
