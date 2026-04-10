#!/bin/bash

# Omnitratech Local Development Setup Script
# This script sets up everything needed to run the project locally

echo "🚀 Omnitratech Local Development Setup"
echo "======================================"

# Check Node.js
echo "✓ Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 18+ from https://nodejs.org"
    exit 1
fi
echo "✓ Node.js $(node --version) found"

# Check npm
echo "✓ Checking npm..."
if ! command -v npm &> /dev/null; then
    echo "❌ npm not found"
    exit 1
fi
echo "✓ npm $(npm --version) found"

# Frontend setup
echo ""
echo "📦 Setting up Frontend..."
if [ -f "package.json" ]; then
    npm install
    echo "✓ Frontend dependencies installed"
else
    echo "❌ Frontend package.json not found"
fi

# Backend setup
echo ""
echo "📦 Setting up Backend..."
if [ -f "backend/package.json" ]; then
    cd backend
    npm install
    echo "✓ Backend dependencies installed"
    
    # Copy .env.example to .env if it doesn't exist
    if [ ! -f ".env" ]; then
        cp .env.example .env
        echo "✓ Created .env from template - update with your WordPress URL"
    fi
    cd ..
else
    echo "❌ Backend package.json not found"
fi

# Check Docker
echo ""
echo "🐳 Docker Status:"
if command -v docker &> /dev/null; then
    echo "✓ Docker $(docker --version) found"
    
    if command -v docker-compose &> /dev/null; then
        echo "✓ Docker Compose found"
        echo ""
        echo "💡 To start full stack: docker-compose up -d"
    fi
else
    echo "⚠️  Docker not installed. For WordPress, either:"
    echo "   1. Install Docker: https://docs.docker.com/get-docker/"
    echo "   2. Use managed WordPress hosting"
fi

echo ""
echo "✅ Setup Complete!"
echo ""
echo "📝 Next steps:"
echo "1. Frontend: npm run dev (runs on http://localhost:5175)"
echo "2. Backend:  cd backend && npm run dev (runs on http://localhost:3000)"
echo "3. WordPress: docker-compose up -d (for local development)"
echo ""
echo "📚 Documentation:"
echo "- Architecture: Read ARCHITECTURE.md"
echo "- Backend Setup: Read backend/README.md"
echo "- Deployment: Read DEPLOYMENT.md"
