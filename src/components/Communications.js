import React from 'react';
import useCountTo from '../hooks/useCountTo';

function Communications() {
    const xCount = useCountTo(95, 4000);
    const yCount = useCountTo(49, 4000);
    const zCount = useCountTo(59, 4000);
    const vCount = useCountTo(60, 4000);

    return (
        <div className="block">
            <div className="block-header overflow-hidden">
                <h2 className="block-title visibility-hidden" data-toggle="appear" data-class="animated fadeInDown">COMMUNICATIONS</h2>
            </div>
            <div className="block-content block-content-full overflow-hidden">
                <div className="font-w600 text-white-op push-5">X: {xCount}</div>
                <div className="progress">
                    <div className="progress-bar progress-bar-sf progress-bar-striped active" role="progressbar" aria-valuenow={xCount} aria-valuemin="0" aria-valuemax="100" style={{ width: `${xCount}%` }}></div>
                </div>
                <div className="font-w600 text-white-op push-5">Y: {yCount}</div>
                <div className="progress">
                    <div className="progress-bar progress-bar-sf progress-bar-striped active" role="progressbar" aria-valuenow={yCount} aria-valuemin="0" aria-valuemax="100" style={{ width: `${yCount}%` }}></div>
                </div>
                <div className="font-w600 text-white-op push-5">Z: {zCount}</div>
                <div className="progress">
                    <div className="progress-bar progress-bar-sf progress-bar-striped active" role="progressbar" aria-valuenow={zCount} aria-valuemin="0" aria-valuemax="100" style={{ width: `${zCount}%` }}></div>
                </div>
                <div className="font-w600 text-white-op push-5">V: +{vCount}</div>
                <div className="progress">
                    <div className="progress-bar progress-bar-sf progress-bar-striped active" role="progressbar" aria-valuenow={vCount} aria-valuemin="0" aria-valuemax="100" style={{ width: `${vCount}%` }}></div>
                </div>
            </div>
        </div>
    );
}

export default Communications;