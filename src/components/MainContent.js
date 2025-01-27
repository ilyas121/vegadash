import React from 'react';
import AnimatedCircles from './AnimatedCircles';
import IMUData from './IMUData';
import Communications from './Communications';
import GPSDataStream from './GPSDataStream';
import ReceiverValues from './ReceiverValues';

function MainContent() {
    return (
        <main id="page-main" className="modern-sf">
            <div className="row">
                <div className="col-sm-6 col-lg-3">
                    <ReceiverValues />
                    <Communications />
                </div>
                <div className="col-lg-6">
                    <AnimatedCircles />
                </div>
                <div className="col-sm-6 col-lg-3">
                    <IMUData />
                    <GPSDataStream />
                </div>
            </div>
        </main>
    );
}

export default MainContent;