import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainContent from './components/MainContent';
import ControlPanel from './components/pages/ControlPanel';
import MissionControl from './components/pages/MissionControl';
import { WebSocketProvider } from './context/WebSocketContext';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
    return (
        <WebSocketProvider>
            <Router>
                <div className="modern-sf">
                    <Header />
                    <Routes>
                        <Route path="/" element={<MainContent />} />
                        <Route path="/control" element={<ControlPanel />} />
                        <Route path="/mission" element={<MissionControl />} />
                    </Routes>
                    <Footer />
                </div>
            </Router>
        </WebSocketProvider>
    );
}

export default App;