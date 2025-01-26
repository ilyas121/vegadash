import React, { useRef } from 'react';
import useVisibility from '../hooks/useVisibility';

function Environment() {
    const environmentRef = useRef();
    const isVisible = useVisibility(environmentRef);

    return (
        <div className="block" ref={environmentRef}>
            <div className="block-header overflow-hidden">
                <h2 className={`block-title ${isVisible ? 'animated fadeInDown' : 'visibility-hidden'}`}>Environment</h2>
            </div>
            <div className="block-content">
                <div className="row items-push overflow-hidden">
                    <div className={`col-xs-4 text-center ${isVisible ? 'animated fadeInLeft' : 'visibility-hidden'}`}>
                        <div className="js-pie-chart pie-chart" data-percent="50" data-line-width="5" data-size="65" data-bar-color="rgba(255, 255, 255, .2)" data-track-color="rgba(255, 255, 255, .1)">
                            <span className="font-s16 font-w600">PSI</span>
                        </div>
                    </div>
                    <div className={`col-xs-8 ${isVisible ? 'animated fadeInRight' : 'visibility-hidden'}`}>
                        <div className="text-uppercase font-w600 text-white-op">Pressure</div>
                        <div className="font-s36 font-w300">15.65</div>
                    </div>
                </div>
                <div className="row items-push overflow-hidden">
                    <div className={`col-xs-4 text-center ${isVisible ? 'animated fadeInLeft' : 'visibility-hidden'}`}>
                        <div className="js-pie-chart pie-chart" data-percent="60" data-line-width="5" data-size="65" data-bar-color="rgba(255, 255, 255, .2)" data-track-color="rgba(255, 255, 255, .1)">
                            <span className="font-s16 font-w600">C&deg;</span>
                        </div>
                    </div>
                    <div className={`col-xs-8 ${isVisible ? 'animated fadeInRight' : 'visibility-hidden'}`}>
                        <div className="text-uppercase font-w600 text-white-op">Temperature</div>
                        <div className="font-s36 font-w300">5.3</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Environment;