import React, { useRef } from 'react';
import useVisibility from '../hooks/useVisibility';

const planetsData = [
    { name: 'Mars', distance: '1.67 L.Y.', percent: 100 },
    { name: 'Earth', distance: '1.62 L.Y.', percent: 100 },
    { name: 'Saturn', distance: '2.22 L.Y.', percent: 100 },
];

function Planets() {
    const planetsRef = useRef();
    const isVisible = useVisibility(planetsRef);

    return (
        <div className="block" ref={planetsRef}>
            <div className="block-header overflow-hidden">
                <h2 className={`block-title ${isVisible ? 'animated fadeInDown' : 'visibility-hidden'}`}>Planets</h2>
            </div>
            <div className="block-content">
                {planetsData.map((planet, index) => (
                    <div className="row items-push overflow-hidden" key={index}>
                        <div className={`col-xs-4 text-center ${isVisible ? 'animated fadeInLeft' : 'visibility-hidden'}`} data-timeout={100 * (index + 1)}>
                            <div className="js-pie-chart pie-chart" data-percent={planet.percent} data-line-width="20" data-size="45" data-bar-color="rgba(255, 255, 255, .2)" data-track-color="#c07635">
                                <span className="font-s16 font-w600"></span>
                            </div>
                        </div>
                        <div className={`col-xs-8 ${isVisible ? 'animated fadeInRight' : 'visibility-hidden'}`} data-timeout={400 + (100 * index)}>
                            <div className="text-uppercase font-w600 text-white-op">{planet.name}</div>
                            <div className="font-s36 font-w300">{planet.distance}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Planets;