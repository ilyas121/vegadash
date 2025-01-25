console.log("HIII");

sensor1 = new Sensor("Sensor1", 47);
sensor2 = new Sensor("Sensor2", 89);
sensor3 = new Sensor("Sensor3", 31);

const imu_config = {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: "Random Dataset",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [],
            fill: false,
        }],
    },
    options: {
        animation: {
            duration: 0 // general animation time
        },
        hover: {
            animationDuration: 0 // duration of animations when hovering an item
        },
        responsiveAnimationDuration: 0, // animation duration after a resize
        responsive: true,
        title: {
            display: true,
            text: 'IMU Data'
        },
        legend: {
            display: false
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            xAxes: [{
                display: false,
                scaleLabel: {
                    display: true,
                    labelString: 'Time'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Value'
                }
            }]
        }
    }
};


const pid_config = {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: "Random Dataset",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [],
            fill: false,
        }],
    },
    options: {
        animation: {
            duration: 0 // general animation time
        },
        hover: {
            animationDuration: 0 // duration of animations when hovering an item
        },
        responsiveAnimationDuration: 0, // animation duration after a resize
        responsive: true,
        title: {
            display: true,
            text: 'PID Data'
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Time'
                }
            }],
            yAxes: [{
                display: false,
                scaleLabel: {
                    display: false,
                    labelString: 'Value'
                }
            }]
        }
    }
};


const pid_context = document.getElementById('pid_canvas').getContext('2d');
const imu_context = document.getElementById('imu_canvas').getContext('2d');
const roll_span = document.getElementById("ROLL");
const pitch_span = document.getElementById("PITCH");
const yaw_span = document.getElementById("YAW");
const wroll_span = document.getElementById("wROLL");
const wpitch_span = document.getElementById("wPITCH");
const wyaw_span = document.getElementById("wYAW");

const imu_lineChart = new Chart(imu_context, imu_config);
const pid_lineChart = new Chart(pid_context, pid_config);

// IDS must match server ids for each sensor
var data_ids = {
    data_length: 3, //Plz god fix this when not sleep deprived
    47: sensor1,
    89: sensor2,
    31: sensor3
};

//An attempt to organize code by having a state machine
const app_states = {
    "ping":1, 
    "initialize":2, 
    "collect":3
};

//Hacky enum
var app_state = app_states.ping;
Object.freeze(app_state);

// peer connection
var pc = null;

// data channel
var dc1 = null, dc1Interval = null;
var dc2 = null, dc2Interval = null;

function createPeerConnection() {
    var config = {
        sdpSemantics: 'unified-plan'
    };
    pc = new RTCPeerConnection(config);
    return pc;
}

function negotiate() {
    return pc.createOffer().then(function(offer) {
        return pc.setLocalDescription(offer);
    }).then(function() {
        // wait for ICE gathering to complete
        return new Promise(function(resolve) {
            if (pc.iceGatheringState === 'complete') {
                resolve();
            } else {
                function checkState() {
                    if (pc.iceGatheringState === 'complete') {
                        resolve();
                    }
                }
                pc.addEventListener('icegatheringstatechange', checkState);
            }
        });
    }).then(function() {
        var offer = pc.localDescription;
        var codec;

        codec = 'default';
        offer.sdp = sdpFilterCodec('audio', codec, offer.sdp);
        offer.sdp = sdpFilterCodec('video', codec, offer.sdp);

        return fetch('/offer', {
            body: JSON.stringify({
                sdp: offer.sdp,
                type: offer.type,
                video_transform: 'default' 
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        });
    }).then(function(response) {
        return response.json();
    }).then(function(answer) {
        return pc.setRemoteDescription(answer);
    }).catch(function(e) {
        alert(e);
    });
}

function start() {

    pc = createPeerConnection();

    var parameters = {ordered: true};
    //var parameters = {"ordered": false, "maxRetransmits": 0};
    dc1 = pc.createDataChannel('drone_comms', parameters);
    dc1.onclose = function() {
        clearInterval(dc1Interval);
    };
    dc1.onopen = function() {
        if(app_state == app_states.ping){
            dc1Interval = setInterval(function() {
                var message = 'ping';
                dc1.send(message);
            }, 500);
        }
    };
    dc1.onmessage = function(evt) {
        switch(app_state) {
            case app_states.ping:
                if(evt.data == "CHANNEL STARTED"){
                    console.log("Channel Started");
                    clearInterval(dc1Interval);
                    app_state = app_states.initialize;
                } else{
                    console.log("NOT IN SYNC, MISSED PING, or GETTING EXTRA");
                }
            case app_states.initialize:
                app_state = app_states.collect;
                dc1Interval = setInterval(function() {
                    var message = 'raw_data_plz';
                    dc1.send(message);
                }, 20);
                break;
            case app_states.collect:
                var dv = new DataView(evt.data, 0);
                var num_list = [];
                var i = 0;
                var length_1 = 0;
                for(var j = 0; j < data_ids.data_length; j++){
                    var sensor_id = dv.getUint16(i, true);
                    if(sensor_id in data_ids){
                        console.log("We gucci");
                    }else{
                        console.log("WTFFF");
                        console.log(dv.getUint16(i,true));
                     }
                     i+=2;
                     
                     length_1 = dv.getUint32(i, true) * 8 + i + 4;
                     
                     for(i=i+4; i<length_1; i+=8){
                         var dat = dv.getFloat64(i, true)
                         num_list.push(dat);
                     }
                     console.log(num_list);
                     data_ids[sensor_id].data = num_list;
                     num_list = [];
                }

                updatePage();
                break;
            default:
                console.log("git f*ckd");
        }
    };

    var constraints = {
        audio: false,
        video: false
    };

    negotiate();

}

function stop() {

    // close data channel
    if (dc1) {
        dc1.close();
    }
    if (dc2) {
        dc2.close();
    }

    // close transceivers
    if (pc.getTransceivers) {
        pc.getTransceivers().forEach(function(transceiver) {
            if (transceiver.stop) {
                transceiver.stop();
            }
        });
    }

    // close local audio / video
    pc.getSenders().forEach(function(sender) {
        sender.track.stop();
    });

    // close peer connection
    setTimeout(function() {
        pc.close();
    }, 500);
}

function sdpFilterCodec(kind, codec, realSdp) {
    var allowed = []
    var rtxRegex = new RegExp('a=fmtp:(\\d+) apt=(\\d+)\r$');
    var codecRegex = new RegExp('a=rtpmap:([0-9]+) ' + escapeRegExp(codec))
    var videoRegex = new RegExp('(m=' + kind + ' .*?)( ([0-9]+))*\\s*$')
    
    var lines = realSdp.split('\n');

    var isKind = false;
    for (var i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('m=' + kind + ' ')) {
            isKind = true;
        } else if (lines[i].startsWith('m=')) {
            isKind = false;
        }

        if (isKind) {
            var match = lines[i].match(codecRegex);
            if (match) {
                allowed.push(parseInt(match[1]));
            }

            match = lines[i].match(rtxRegex);
            if (match && allowed.includes(parseInt(match[2]))) {
                allowed.push(parseInt(match[1]));
            }
        }
    }

    var skipRegex = 'a=(fmtp|rtcp-fb|rtpmap):([0-9]+)';
    var sdp = '';

    isKind = false;
    for (var i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('m=' + kind + ' ')) {
            isKind = true;
        } else if (lines[i].startsWith('m=')) {
            isKind = false;
        }

        if (isKind) {
            var skipMatch = lines[i].match(skipRegex);
            if (skipMatch && !allowed.includes(parseInt(skipMatch[2]))) {
                continue;
            } else if (lines[i].match(videoRegex)) {
                sdp += lines[i].replace(videoRegex, '$1 ' + allowed.join(' ')) + '\n';
            } else {
                sdp += lines[i] + '\n';
            }
        } else {
            sdp += lines[i] + '\n';
        }
    }

    return sdp;
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function updatePage(){
    //Update IMU Chart
    var imu_chart_data = sensor1.get_all_data();
    
    var data =  [Math.floor(Math.random() * 10)];
    if (imu_config.data.labels.length === 100) {
        imu_config.data.labels.shift();
        imu_config.data.datasets[0].data.shift();
    }
        imu_config.data.labels.push(Date.now());
        imu_config.data.datasets[0].data.push(data[0]);
        imu_lineChart.update();

    //Update PID Chart
    //var pid_chart_data = sensor1.get_all_data();
    var data =  [Math.floor(Math.random() * 10)];
    if (pid_config.data.labels.length === 100) {
        pid_config.data.labels.shift();
        pid_config.data.datasets[0].data.shift();
    }
        pid_config.data.labels.push(Date.now());
        pid_config.data.datasets[0].data.push(data[0]);
        pid_lineChart.update();
    roll_span.innerHTML = Math.floor(Math.random()*90);
    pitch_span.innerHTML = Math.floor(Math.random()*90);
    yaw_span.innerHTML = Math.floor(Math.random()*90);
    wroll_span.innerHTML = Math.floor(Math.random()*90);
    wpitch_span.innerHTML = Math.floor(Math.random()*90);
    wyaw_span.innerHTML = Math.floor(Math.random()*90);
}
var intervalID = setInterval(updatePage, 100);

window.onload = start;
