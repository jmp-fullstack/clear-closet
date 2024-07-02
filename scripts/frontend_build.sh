#!/bin/bash

cd ./frontend
echo '>>> frontend build start'

npm install -g npm@10.7.0
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
npm install @mui/icons-material
npm install react-draggable
npm run build

echo '>>> frontend build finish'