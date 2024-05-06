import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
import App from './App.jsx';
import { LoadingProvider } from './providers/LoadingProvider.jsx';

ReactDOM.createRoot(document.getElementById("root")).render(
    <LoadingProvider>
        <App />
    </LoadingProvider>
);

