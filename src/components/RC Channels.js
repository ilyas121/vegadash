import React from 'react';
import { useWebSocket } from '../context/WebSocketContext';

function GPSDataStream() {
    const rcREF = useRef();
    const { data } = useWebSocket();

    //Get the websocket data
    const rcValues = data?.rcValues || [0,0,0,0,0,0];
    const [ch1, ch2, ch3, ch4, ch5, ch6] = rcValues;
    return (
        <div className="block" ref={rcREF}>
            <div className="block-header overflow-hidden">
                <h2 className="block-title animated fadeInDown">RC_RAW_DATA</h2>
            </div>
            <div className="block-content">
                <div className="row items-push">
                    <div className="col-xs-4 animated fadeIn" data-toggle="appear" data-class="animated fadeIn" data-timeout="100">
                        <div className="font-s12 text-white-op">Channel 1</div>
                        <div className="font-s18 text-success">{ch1}</div>
                    </div>
                    <div className="col-xs-4 animated fadeIn" data-toggle="appear" data-class="animated fadeIn" data-timeout="300">
                        <div className="font-s12 text-white-op">Channel 2</div>
                        <div className="font-s18 text-success">{ch2}</div>
                    </div>
                    <div className="col-xs-4 animated fadeIn" data-toggle="appear" data-class="animated fadeIn" data-timeout="500">
                        <div className="font-s12 text-white-op">Channel 3</div>
                        <div className="font-s18 text-success">{ch3}</div>
                    </div>
                    <div className="col-xs-4 animated fadeIn" data-toggle="appear" data-class="animated fadeIn" data-timeout="700">
                        <div className="font-s12 text-white-op">Channel 4</div>
                        <div className="font-s18 text-success">{ch4}</div>
                    </div>
                    <div className="col-xs-4 animated fadeIn" data-toggle="appear" data-class="animated fadeIn" data-timeout="900">
                        <div className="font-s12 text-white-op">Channel 5</div>
                        <div className="font-s18 text-success">{ch5}</div>
                    </div>
                    <div className="col-xs-4 animated fadeIn" data-toggle="appear" data-class="animated fadeIn" data-timeout="1100">
                        <div className="font-s12 text-white-op">Channel 6</div>
                        <div className="font-s18 text-success">{ch6}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GPSDataStream;