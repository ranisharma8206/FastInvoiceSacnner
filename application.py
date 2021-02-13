from flask import Flask, render_template, request, jsonify
from binascii import a2b_base64
import urllib
import string
import random
from flask_socketio import SocketIO

socketMapping = []
currentUID = 1

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")



@socketio.on('connect')
def handle_connect():
    print('Client connected')
    global currentUID
    currentUID = currentUID + 1
    mapping = {"room_id" : request.sid, "UID" : currentUID}
    socketMapping.append(mapping)
    socketio.emit('uid',currentUID)
    print(socketMapping)

def saveImage(imageData):
    response = urllib.request.urlopen(imageData)

    filename=''.join(random.choices(string.ascii_uppercase +
                             string.digits, k = 15))
    file = 'static/assets/raw/'+filename+'.png'
    with open(file, 'wb') as f:
        f.write(response.file.read())
    return filename

def enhance(inPath, outPath):
    return True

@app.route('/')
def home():
    return 'Welcome! Please go to /scanner'

@app.route('/scanner')
def scanner():
    return render_template('scanner.html')


@app.route('/api/uploadImage', methods = ['POST'])
def uploadImage():
    jsonObject=request.json
    clientId=jsonObject['clientId']
    base64Image=jsonObject['base64Image']
    filename = saveImage(base64Image)
    outFilePath = 'static/assets/final/'+filename
    enhance('static/assets/raw/'+filename,outFilePath)

    retData={"message" : "success"}
    return jsonify(retData)


@socketio.on('message')
def handle_message(data):
    print('received message: ' + data)

if __name__ == '__main__':
    socketio.run(app)
