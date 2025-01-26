import React from 'react';

function IMUData() {
    return (
        <div className="block">
            <div className="block-header overflow-hidden">
                <h2 className="block-title disabled-visibility-hidden" data-toggle="appear" data-class="animated fadeInDown">IMU_RAW_DATA</h2>
            </div>
            <div className="block-content overflow-hidden">
                <div className="row items-push">
                    <div className="col-xs-6 disabled-visibility-hidden" data-toggle="appear" data-class="animated fadeIn" data-timeout="300">
                        <div className="font-s24 font-w300 text-white-op">ROLL [<span className="text-success">40</span>]</div>
                    </div>
                    <div className="col-xs-6 disabled-visibility-hidden" data-toggle="appear" data-class="animated fadeIn" data-timeout="500">
                        <div className="font-s24 font-w300 text-white-op">ω_ROLL [<span className="text-success">60</span>]</div>
                    </div>
                    <div className="col-xs-6 disabled-visibility-hidden" data-toggle="appear" data-class="animated fadeIn" data-timeout="700">
                        <div className="font-s24 font-w300 text-white-op">PITCH [<span className="text-success">80</span>]</div>
                    </div>
                    <div className="col-xs-6 disabled-visibility-hidden" data-toggle="appear" data-class="animated fadeIn" data-timeout="900">
                        <div className="font-s24 font-w300 text-white-op">ω_PITCH [<span className="text-success">90</span>]</div>
                    </div>
                    <div className="col-xs-6 disabled-visibility-hidden" data-toggle="appear" data-class="animated fadeIn" data-timeout="1100">
                        <div className="font-s24 font-w300 text-white-op">YAW [<span className="text-success">20</span>]</div>
                    </div>
                    <div className="col-xs-6 disabled-visibility-hidden" data-toggle="appear" data-class="animated fadeIn" data-timeout="1300">
                        <div className="font-s24 font-w300 text-white-op">ω_YAW [<span className="text-success">30</span>]</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IMUData;