import React, { useRef } from 'react';
import { useWebSocket } from '../context/WebSocketContext';

function ReceiverValues() {
    const receiverRef = useRef();
    const { data } = useWebSocket();

    const receiverValues = data?.ReceiverValues || [0,0,0,0,0,0];
    const [ch1, ch2, ch3, ch4, ch5, ch6] = receiverValues;

    return (
        <div className="block" ref={receiverRef}>
            <div className="block-header overflow-hidden">
                <h2 className="block-title animated fadeInDown">RECEIVER VALUES</h2>
            </div>
            <div className="block-content">
                <div className="row items-push">
                    <div className="col-xs-4 animated fadeIn" data-toggle="appear" data-class="animated fadeIn" data-timeout="100">
                        <div className="font-s12 text-white-op">CH 1</div>
                        <div className="font-s18 text-success">{ch1 || '0.00' }</div>
                    </div>
                    <div className="col-xs-4 animated fadeIn" data-toggle="appear" data-class="animated fadeIn" data-timeout="300">
                        <div className="font-s12 text-white-op">CH 2</div>
                        <div className="font-s18 text-success">{ch2 || '0.00' }</div>
                    </div>
                    <div className="col-xs-4 animated fadeIn" data-toggle="appear" data-class="animated fadeIn" data-timeout="500">
                        <div className="font-s12 text-white-op">CH 3</div>
                        <div className="font-s18 text-success">{ch3 || '0.00' }</div>
                    </div>
                    <div className="col-xs-4 animated fadeIn" data-toggle="appear" data-class="animated fadeIn" data-timeout="700">
                        <div className="font-s12 text-white-op">CH 4</div>
                        <div className="font-s18 text-success">{ch4 || '0.00' }</div>
                    </div>
                    <div className="col-xs-4 animated fadeIn" data-toggle="appear" data-class="animated fadeIn" data-timeout="900">
                        <div className="font-s12 text-white-op">CH 5</div>
                        <div className="font-s18 text-success">{ch5 || '0.00' }</div>
                    </div>
                    <div className="col-xs-4 animated fadeIn" data-toggle="appear" data-class="animated fadeIn" data-timeout="1100">
                        <div className="font-s12 text-white-op">CH 6</div>
                        <div className="font-s18 text-success">{ch6 || '0.00' }</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReceiverValues; 