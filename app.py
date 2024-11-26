from flask import Flask, render_template, jsonify
import json

app = Flask(__name__)

@app.route('/')

def index():
    return render_template('index.html')


@app.route('/api/data')

def api_data():
    with open('/static/content.json', 'r') as json_file:
        data = json.load(json_file)

    return jsonify(data)



if __name__ == "__main__":
    app.run(debug=True)