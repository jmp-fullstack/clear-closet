import React, { useImperativeHandle, forwardRef, useRef } from "react";
import axios from "axios";

const ProfileUpload = forwardRef(({ onUploadSuccess }, ref) => {
  const fileInputRef = useRef();

  useImperativeHandle(ref, () => ({
    openFileDialog() {
      fileInputRef.current.click();
    },
  }));

  const handleFileChange = async (event) => {
    const selectedFiles = Array.from(event.target.files);
    if (selectedFiles.length === 0) return;

    try {
      const access = localStorage.getItem("access");
      const formData = new FormData();
      formData.append("image", selectedFiles[0]);

      const response = await axios.post(
        "/api/images/upload/profile/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${access}`,
          },
        }
      );

      if (response.status === 200) {
        onUploadSuccess(response.data);
      } else {
        console.error("Upload failed:", response.data);
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <input
      type="file"
      ref={fileInputRef}
      style={{ display: "none" }}
      onChange={handleFileChange}
    />
  );
});

export default ProfileUpload;
