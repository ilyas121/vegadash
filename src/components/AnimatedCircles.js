import React, { useRef } from 'react';
import useVisibility from '../hooks/useVisibility';

function AnimatedCircles() {
    const circlesRef = useRef();
    const isVisible = useVisibility(circlesRef);

    return (
        <div className="col-lg-6 col-lg-push-3 overflow-hidden push-20" ref={circlesRef}>
            <div className="circles push-50">
                {[...Array(7)].map((_, index) => (
                    <div key={index} className={`circle circle-${index} ${isVisible ? 'animated fadeIn' : 'visibility-hidden'}`}>
                        <span></span>
                    </div>
                ))}
                <div className={`visibility-hidden ${isVisible ? 'animated fadeIn' : ''}`} data-toggle="appear" data-class="animated fadeIn" data-timeout="800">
                    <span className="circle circle-over-1 hidden-xs">
                        <span data-toggle="countTo" data-to="798" data-speed="100000"></span>
                    </span>
                    <span className="circle circle-over-2 hidden-xs"></span>
                    <span className="circle circle-over-3 hidden-xs"></span>
                </div>
                <span className={`circle circles-main-content ${isVisible ? 'animated fadeIn' : 'visibility-hidden'}`}>
                    <span data-toggle="countTo" data-to="16540" data-speed="60000"></span><br />
                    <span className="text-crystal">km/h</span>
                </span>
            </div>
            <div className="row">
                {['SEND_HOME', 'MISSION_PLANNING', 'FPV', 'AUTO_PILOT'].map((label, index) => (
                    <div className={`col-xs-6 ${isVisible ? 'animated fadeIn' : 'visibility-hidden'}`} key={label}>
                        <button className="btn btn-xl btn-block btn-sf push-10">{label}</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AnimatedCircles;