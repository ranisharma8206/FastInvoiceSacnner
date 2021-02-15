from flask import Flask, render_template, request, jsonify
from binascii import a2b_base64
import urllib
import string
import random
from flask_socketio import SocketIO
from flask_cors import CORS, cross_origin
from docScanner.scan import DocScanner


socketMapping = [0 for i in range(100)]
currentUID = 1

app = Flask(__name__)
# cors = CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")
docscanner = DocScanner()



@socketio.on('connect')
def handle_connect():
    print('Client connected')
    global currentUID
    currentUID = currentUID + 1
    socketMapping[currentUID] = request.sid
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
    docscanner.scan(inPath, outPath)
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
    outFilePath = 'static/assets/final/'+filename+'.png'
    enhance('static/assets/raw/'+filename+'.png',outFilePath)

    jsonString = '{"id":"'+filename+'","url":"'+outFilePath+'","name":"'+filename+'"}'
    print(clientId)
    socketio.emit('documentUpload',jsonString, room=socketMapping[int(clientId)])

    retData={"message" : "success"}
    return jsonify(retData)


@socketio.on('message')
def handle_message(data):
    print('received message: ' + data)

if __name__ == '__main__':
    socketio.run(app)
