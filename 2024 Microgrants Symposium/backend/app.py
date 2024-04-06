from flask import Flask, request, jsonify
import os
from predictor import predict_image
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No file selected for uploading"}), 400

    if file:
        # Save the file to a temporary location
        filepath = "temp_image.jpg"
        file.save(filepath)

        # Make a prediction
        result = predict_image(filepath)
        os.remove(filepath)

        return jsonify({"result": result})

    return jsonify({"error": "Something went wrong!"}), 500



if __name__ == '__main__':
    app.run(debug=True)
