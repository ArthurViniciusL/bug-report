#!/bin/bash

cd back-end
npm run dev &

cd ../

cd front-end
npm run dev &

clear

cd ../

clear

echo "Front-end running in: http://localhost:5173/"
echo "Back-end running in: http://localhost:3000/bugs"
