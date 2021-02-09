from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def home():
    return 'Welcome! Please go to /scanner'

@app.route('/scanner')
def scanner():
    return render_template('scanner.html')

if __name__ == "__main__":
    app.run()