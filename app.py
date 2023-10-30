from flask import Flask, jsonify

app = Flask(__name)

@app.route('/')
def hello():
    return "Hello from Flask!"

@app.route('/api/data')
def get_data():
    data = {"message": "Data from Flask"}
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
