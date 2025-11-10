@echo off
echo Starting Hashing Techniques Comparison Project...
echo.
echo Installing dependencies...
call npm install
cd client
call npm install
cd ..
echo.
echo Starting servers...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
start cmd /k "node server/index.js"
timeout /t 3
cd client
start cmd /k "npm start"
cd ..
echo.
echo Both servers are starting...
echo Open http://localhost:3000 in your browser
pause