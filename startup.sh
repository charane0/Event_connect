#!/bin/bash

echo ""
echo "========================================"
echo "   Event Connect - Startup Script"
echo "========================================"
echo ""

# Check if MongoDB is installed
if ! command -v mongod &> /dev/null; then
    echo "[ERROR] MongoDB is not installed or not in PATH"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js is not installed or not in PATH"
    exit 1
fi

echo "[1] Starting MongoDB..."
mongod --dbpath ~/mongodb_data &
sleep 2

echo "[2] Starting Backend Server..."
cd "$(dirname "$0")/back_end"
npm run dev &
sleep 3

echo "[3] Starting Frontend Server..."
cd "$(dirname "$0")/front_end"
npm run dev &
sleep 2

echo ""
echo "========================================"
echo "   ✅ All Services Started!"
echo "========================================"
echo ""
echo "MongoDB:     http://localhost:27017"
echo "Backend:     http://localhost:5000"
echo "Frontend:    http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for user input
wait
