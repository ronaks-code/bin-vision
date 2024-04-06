from flask import Flask, send_file, jsonify, after_this_request
import os
import time
from flask_cors import CORS

# Import the picamera2 library
# This is hypothetical; please check the actual picamera2 documentation
from picamera2 import Picamera2

app = Flask(__name__)
CORS(app)

# Initialize camera
camera = Picamera2()
capture_config = camera.create_still_configuration(main={"format": 'RGB888', "size": (1920, 768)})
camera.configure(capture_config)
camera.start()  # Adjust based on actual usage in picamera2
print("success")

def take_snapshot():
   snapshots_dir = 'snapshots'
   os.makedirs(snapshots_dir, exist_ok=True)
  
   filename = os.path.join(snapshots_dir, "snapshot.jpg")
   # Use picamera2 to capture an image
   print('hi')
   camera.capture_file(filename)
   print(f"Snapshot saved as {filename}")
   return filename

@app.route('/hi')
def hi():
    return jsonify({"message" : "Hi"})

@app.route('/picture')
def picture():
    snapshot_path = take_snapshot()
    print(snapshot_path)
    if snapshot_path and os.path.exists(snapshot_path):
        @after_this_request
        def remove_snapshot(response):
            try:
                os.remove(snapshot_path)
                print(f"Snapshot {snapshot_path} deleted.")
            except Exception as error:
                print(f"Error deleting snapshot {snapshot_path}: {error}")
            return response

        return send_file(snapshot_path, mimetype='image/jpeg')
    else:
        return jsonify({"message": "Failed to capture the image."}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
