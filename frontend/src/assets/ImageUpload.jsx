import React, { useImperativeHandle, forwardRef, useRef } from "react";
import axios from "axios";

const ImageUpload = forwardRef(({ onUploadSuccess }, ref) => {
  const fileInputRef = useRef();

  useImperativeHandle(ref, () => ({
    openFileDialog() {
      fileInputRef.current.click();
    },
  }));

  const handleFileChange = async (event) => {
    const selectedFiles = Array.from(event.target.files);
    if (selectedFiles.length === 0) return;

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const access = localStorage.getItem("access");
      const response = await axios.post(
        "/api/images/upload/product/", // 프록시 설정을 통해 경로를 변경
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${access}`,
          },
        }
      );

      if (response.status === 201) {
        onUploadSuccess(response.data.uploaded_images);
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <input
      type="file"
      multiple
      ref={fileInputRef}
      style={{ display: "none" }}
      onChange={handleFileChange}
    />
  );
});

export default ImageUpload;
