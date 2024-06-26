#!/bin/bash

echo '>>> frontend build start'
echo "Current directory: $(pwd)"
cd /cc_front
echo "Current directory: $(pwd)"
npm install -g npm@10.7.0
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
npm install @mui/icons-material
npm run build
echo '>>> frontend build finish'