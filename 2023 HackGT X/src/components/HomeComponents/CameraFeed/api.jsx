import axios from "axios";

export const uploadImage = async (dataURL) => {
  try {
    const formData = new FormData();
    const response = await fetch(dataURL);
    const blob = await response.blob();

    formData.append("file", blob, "image.jpg");

    const axiosResponse = await axios.post(
      "http://127.0.0.1:5000/predict",
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
