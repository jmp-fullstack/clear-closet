import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import PhotoCameraRoundedIcon from "@mui/icons-material/PhotoCameraRounded";

import "./CameraSellPage.css";

function CameraSellPage() {
  const [source, setSource] = useState("");
  const navigate = useNavigate();

  const handleCapture = (target) => {
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }
      const newUrl = URL.createObjectURL(file);
      console.log("Generated URL: ", newUrl);
      setSource(newUrl);
      navigate("/sell", { state: { imageUrl: newUrl } });
    }
  };

  return (
    <div className="CameraSell-page">
      <Grid container>
        <Grid item xs={12}>
          <h5>Capture your image</h5>
          {source ? (
            <Box className="imgBox">
              <img src={source} alt="snap" className="img" />
            </Box>
          ) : (
            <div className="message">
              아이콘을 클릭해서 이미지를 업로드 해주세요
            </div>
          )}
          <input
            accept="image/*"
            id="icon-button-file"
            type="file"
            capture="environment"
            onChange={(e) => handleCapture(e.target)}
            className="input"
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCameraRoundedIcon fontSize="large" color="primary" />
            </IconButton>
          </label>
        </Grid>
      </Grid>
    </div>
  );
}

export default CameraSellPage;
