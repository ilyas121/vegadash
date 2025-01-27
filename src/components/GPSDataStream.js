import React from 'react';
import useCountTo from '../hooks/useCountTo';

function GPSDataStream() {
    const latitude = useCountTo(148, 4000);
    const altitude = useCountTo(30, 4000);
    const velocity = useCountTo(123, 4000);
    const longitude = useCountTo(180, 4000);
    const heading = useCountTo(680, 4000);
    const precisionPdop = useCountTo(15, 4000);

    return (
        <div className="block">
            <div className="block-header overflow-hidden">
                <h2 className="block-title animated fadeInDown">GPS_DATA_STREAM</h2>
            </div>
            <div className="block-content">
                <div className="row items-push">
                    <div className="col-xs-4 animated fadeIn" data-toggle="appear" data-class="animated fadeIn" data-timeout="100">
                        <div className="font-s12 text-white-op">LATITUDE</div>
                        <div className="font-s18 text-success">{latitude}</div>
                    </div>
                    <div className="col-xs-4 animated fadeIn" data-toggle="appear" data-class="animated fadeIn" data-timeout="300">
                        <div className="font-s12 text-white-op">ALTITUDE</div>
                        <div className="font-s18 text-success">{altitude}</div>
                    </div>
                    <div className="col-xs-4 animated fadeIn" data-toggle="appear" data-class="animated fadeIn" data-timeout="500">
                        <div className="font-s12 text-white-op">VELOCITY</div>
                        <div className="font-s18 text-success">{velocity}</div>
                    </div>
                    <div className="col-xs-4 animated fadeIn" data-toggle="appear" data-class="animated fadeIn" data-timeout="700">
                        <div className="font-s12 text-white-op">LONGITUDE</div>
                        <div className="font-s18 text-success">{longitude}</div>
                    </div>
                    <div className="col-xs-4 animated fadeIn" data-toggle="appear" data-class="animated fadeIn" data-timeout="900">
                        <div className="font-s12 text-white-op">HEADING</div>
                        <div className="font-s18 text-success">{heading}</div>
                    </div>
                    <div className="col-xs-4 animated fadeIn" data-toggle="appear" data-class="animated fadeIn" data-timeout="1100">
                        <div className="font-s12 text-white-op">PRECISION_PDOP</div>
                        <div className="font-s18 text-success">{precisionPdop}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GPSDataStream;