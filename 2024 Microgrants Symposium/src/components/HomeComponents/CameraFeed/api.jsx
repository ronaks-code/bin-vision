import axios from "axios";

export const fetchPicture = async () => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/picture?${Date.now()}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const blob = await response.blob();
    return blob; // Return the blob directly for further processing
  } catch (error) {
    console.error("Failed to fetch the picture:", error);
    return null;
  }
};


export const uploadImage = async (imageBlob) => {
  try {
    const formData = new FormData();
    // Directly append the blob without converting it to a data URL and back
    formData.append("file", imageBlob, "image.jpg");

    const axiosResponse = await axios.post(
      "http://35.174.109.144:5000/predict",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return axiosResponse.data;
  } catch (error) {
    console.error("Error uploading the image:", error);
    throw error;
  }
};

