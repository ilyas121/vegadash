import React from 'react';
import AnimatedCircles from './AnimatedCircles';
import Environment from './Environment';
import Planets from './Planets';
import IMUData from './IMUData';
import Communications from './Communications';
import GPSDataStream from './GPSDataStream';

function MainContent() {
    return (
        <main id="page-main">
            <div className="row">
                <AnimatedCircles />
                <div className="col-sm-6 col-lg-3 col-lg-pull-6">
                    <Environment />
                    <Planets />
                </div>
                <div className="col-sm-6 col-lg-3">
                    <IMUData />
                    <Communications />
                    <GPSDataStream />
                </div>
            </div>
        </main>
    );
}

export default MainContent;