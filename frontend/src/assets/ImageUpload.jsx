import React, { useImperativeHandle, forwardRef, useRef } from "react";

const ImageUpload = forwardRef(({ onUploadSuccess }, ref) => {
  const fileInputRef = useRef();

  useImperativeHandle(ref, () => ({
    openFileDialog() {
      fileInputRef.current.click();
    },
  }));

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    if (selectedFiles.length === 0) return;

    const uploadedImages = selectedFiles.map((file) => ({
      image_url: URL.createObjectURL(file),
      file,
    }));

    onUploadSuccess(uploadedImages);
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
