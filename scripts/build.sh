#!/bin/bash
echo "Building OmniServe Platform..."

echo "1. Checking Frontend Setup..."
cd "$(dirname "$0")/../frontend"
npm install || echo "Run npm install when Node.js is present."

echo "2. Checking C# .NET Backend..."
cd "../backend"
dotnet build || echo "Install .NET 8 SDK to compile backend binaries."

echo "Build check completed."
