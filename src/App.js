import React from 'react';
import { WebSocketProvider } from './context/WebSocketContext';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';

function App() {
    return (
        <WebSocketProvider>
            <div className="modern-sf">
                <Header />
                <MainContent />
                <Footer />
            </div>
        </WebSocketProvider>
    );
}

export default App;