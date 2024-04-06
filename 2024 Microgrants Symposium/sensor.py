import RPi.GPIO as GPIO
import time
import subprocess  # Import subprocess
import pyautogui


GPIO.setmode(GPIO.BCM)


TRIG = 23
ECHO = 24


print("Distance Measurement In Progress")


GPIO.setup(TRIG, GPIO.OUT)
GPIO.setup(ECHO, GPIO.IN)


try:
   while True:
       GPIO.output(TRIG, False)
       print("Waiting For Sensor To Settle")
       time.sleep(.3)


       GPIO.output(TRIG, True)
       time.sleep(0.00001)
       GPIO.output(TRIG, False)


       pulse_start = time.time()
       while GPIO.input(ECHO) == 0:
           pulse_start = time.time()


       while GPIO.input(ECHO) == 1:
           pulse_end = time.time()


       pulse_duration = pulse_end - pulse_start


       distance = pulse_duration * 17150


       distance = round(distance, 2)


       print("Distance: ", distance, "cm")
       if distance <= 20:
           pyautogui.press('g')
           print("Object Detected")
except KeyboardInterrupt:  # If there is a KeyboardInterrupt (when you press ctrl+c), exit the program and clean up
   print("Cleaning up!")
   GPIO.cleanup()
