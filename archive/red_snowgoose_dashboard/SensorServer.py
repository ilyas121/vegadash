import socket
import threading
import socketserver
from queue import Queue 
import time
import struct
import array
import sys


class ThreadedUDPRequestHandler(socketserver.BaseRequestHandler):
    def handle(self):
        data = self.request[0]
        socket = self.request[1]
        self.server.my_que.put(data)
        print(sys.getsizeof(data))
        socket.sendto(data, self.client_address)

class ThreadedUDPServer(socketserver.ThreadingMixIn, socketserver.UDPServer):
        pass

class SensorServer:
    def __init__(self, flag, port, host=''):
        self.flag=flag
        self.sensor_q = Queue()
        self.udp_port=port
        self.host=host
        self.udpserver = ThreadedUDPServer((host, port), ThreadedUDPRequestHandler)

        #Config server and add it to different thread
        self.udpserver.my_que = self.sensor_q
        self.udp_thread = threading.Thread(target=self.udpserver.serve_forever)
        print("UDP serving at port", port)
        self.udp_thread.start()

    def get_messages(self):
        messages = []

        for _ in range(self.sensor_q.qsize()):
            bin_data = self.sensor_q.get(False) 
            value = struct.unpack('d', bin_data)[0]
            messages.append(value)

        return messages
    
    def get_binary_messages(self):
        flag = self.flag
        q_length = self.sensor_q.qsize()
        bin_flag = flag.to_bytes(2, 'little')
        bin_q_length = q_length.to_bytes(4, 'little')

        messages = [bytearray(bin_flag), bytearray(bin_q_length)]
        messages2 = [flag, q_length]
        for _ in range(q_length): 
            raw_data = self.sensor_q.get(False)
            bin_data = bytearray(raw_data)
            try:
                value = struct.unpack('d', raw_data)[0]
                # print(value)
            except:
                #print(raw_data)
                #print(len(raw_data))
                continue
            messages.append(bin_data)
            messages2.append(value)
        return messages, messages2


if __name__ == "__main__":
    # Port 0 means to select an arbitrary unused port
    sensor = SensorServer(47, 1234)
    sensor2 = SensorServer(89, 4269)
    sensor3 = SensorServer(31, 5050)
    final = []
    while(True):
        time.sleep(0.01)
        try:
            l, li = sensor.get_binary_messages()
            l2, li2 = sensor2.get_binary_messages()
            l3, li3 = sensor3.get_binary_messages()
            #if len(li) > 2:
                #print(li)
                #print(len(li)-2)
            #if len(li2) > 2:
                #print(li2)
                #print(len(li2)-2)
            #if len(li3) > 2:
                #print(li3)
                #print(len(li3)-2)
        except:
            print("Crap")
            continue
            #print(ord(q.get()))
