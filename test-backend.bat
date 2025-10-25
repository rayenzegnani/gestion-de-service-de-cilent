@echo off
echo ================================
echo Testing Backend Connection
echo ================================
echo.

echo 1. Testing server root...
curl http://localhost:5000/
echo.
echo.

echo 2. Testing API routes...
curl http://localhost:5000/api/debug/routes
echo.
echo.

echo ================================
echo Test Complete!
echo ================================
echo.
echo If you see responses above, your backend is working!
echo.
pause
