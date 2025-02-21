import React, { useRef } from 'react';
import { useWebSocket } from '../context/WebSocketContext';

function IMUData() {
    const imuREF = useRef();
    const { data } = useWebSocket(); // Access WebSocket data

    return (
        <div className="block" ref={imuREF}>
            <div className="block-header overflow-hidden">
                <h2 className="block-title animated fadeInDown">IMU_RAW_DATA</h2>
            </div>
            <div className="block-content">
                <div className="row items-push">
                    <div className="col-xs-4 animated fadeIn" data-toggle="appear" data-class="animated fadeIn" data-timeout="100">
                        <div className="font-s12 text-white-op">PITCH</div>
                        <div className="font-s18 text-success">{data?.IMU[0] || 0}</div>
                    </div>
                    <div className="col-xs-4 animated fadeIn" data-toggle="appear" data-class="animated fadeIn" data-timeout="300">
                        <div className="font-s12 text-white-op">ROLL</div>
                        <div className="font-s18 text-success">{data?.IMU[1] || 0}</div>
                    </div>
                    <div className="col-xs-4 animated fadeIn" data-toggle="appear" data-class="animated fadeIn" data-timeout="500">
                        <div className="font-s12 text-white-op">YAW</div>
                        <div className="font-s18 text-success">{data?.IMU[2] || 0}</div>
                    </div>
                    <div className="col-xs-4 animated fadeIn" data-toggle="appear" data-class="animated fadeIn" data-timeout="700">
                        <div className="font-s12 text-white-op">PITCH VELOCITY</div>
                        <div className="font-s18 text-success">{data?.IMU[3] || 0}</div>
                    </div>
                    <div className="col-xs-4 animated fadeIn" data-toggle="appear" data-class="animated fadeIn" data-timeout="900">
                        <div className="font-s12 text-white-op">ROLL VELOCITY</div>
                        <div className="font-s18 text-success">{data?.IMU[4] || 0}</div>
                    </div>
                    <div className="col-xs-4 animated fadeIn" data-toggle="appear" data-class="animated fadeIn" data-timeout="1100">
                        <div className="font-s12 text-white-op">YAW VELOCITY</div>
                        <div className="font-s18 text-success">{data?.IMU[5] || 0}</div>
                    </div>
                    {/* System Calibration Values */}
                    <div className="col-xs-3 animated fadeIn" data-toggle="appear" data-class="animated fadeIn" data-timeout="1300">
                        <div className="font-s12 text-white-op">SYS CAL</div>
                        <div className="font-s18 text-success">{data?.IMU[6] || 0}</div>
                    </div>
                    <div className="col-xs-3 animated fadeIn" data-toggle="appear" data-class="animated fadeIn" data-timeout="1500">
                        <div className="font-s12 text-white-op">GYRO CAL</div>
                        <div className="font-s18 text-success">{data?.IMU[7] || 0}</div>
                    </div>
                    <div className="col-xs-3 animated fadeIn" data-toggle="appear" data-class="animated fadeIn" data-timeout="1700">
                        <div className="font-s12 text-white-op">ACCEL CAL</div>
                        <div className="font-s18 text-success">{data?.IMU[8] || 0}</div>
                    </div>
                    <div className="col-xs-3 animated fadeIn" data-toggle="appear" data-class="animated fadeIn" data-timeout="1900">
                        <div className="font-s12 text-white-op">MAG CAL</div>
                        <div className="font-s18 text-success">{data?.IMU[9] || 0}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IMUData;