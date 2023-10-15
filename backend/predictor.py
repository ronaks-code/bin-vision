from fastai.vision.all import *
import cv2
import matplotlib.pyplot as plt
import zipfile
import io
import os
from PIL import Image
import fastai 
import utils
from PIL import Image
# import pathlib
# temp = pathlib.PosixPath
# pathlib.PosixPath = pathlib.WindowsPath

learn_loaded = load_learner('waste-classifier/result-resnet34.pkl')
print(type(learn_loaded))
print(learn_loaded.dls.vocab)

def predict_image(filename):
#   uploaded = files.upload()
#   filename = next(iter(uploaded))
  img = Image.open(f'{filename}')
  print("prediction started")
  prediction = learn_loaded.predict(filename)
  print('here')
  num = prediction[1].numpy().tolist()
  print('here2')
  print(f'Classified as {prediction[0]}', f'Class number {num}', f' with probability {prediction[2].numpy()[num]}')
  return prediction[0]


if __name__ == '__main__':
    imagePath = '/Users/arnavp4/Documents/GitHub/bin_vision/sample.jpeg'
    predict_image(imagePath)

