#!/bin/bash

# Omnitratech Backend & Frontend Setup Script
# This script sets up and runs both backend and frontend

set -e

echo "🚀 Omnitratech Setup Script"
echo "============================"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo -e "${GREEN}✓ Node.js found: $(node --version)${NC}"

# Install backend dependencies
echo -e "\n${BLUE}Installing backend dependencies...${NC}"
cd backend
npm install
echo -e "${GREEN}✓ Backend dependencies installed${NC}"

# Build backend
echo -e "\n${BLUE}Building backend...${NC}"
npm run build
echo -e "${GREEN}✓ Backend build complete${NC}"

# Go back to root
cd ..

# Install frontend dependencies
echo -e "\n${BLUE}Installing frontend dependencies...${NC}"
npm install
echo -e "${GREEN}✓ Frontend dependencies installed${NC}"

# Create .env if it doesn't exist
if [ ! -f .env ]; then
    echo -e "\n${BLUE}Creating .env file...${NC}"
    cat > .env << EOF
VITE_API_URL=http://localhost:3001/api
EOF
    echo -e "${GREEN}✓ .env file created${NC}"
fi

if [ ! -f backend/.env ]; then
    echo -e "\n${BLUE}Creating backend/.env file...${NC}"
    cat > backend/.env << EOF
PORT=3001
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
ADMIN_USER=admin
ADMIN_PASSWORD=admin123
JWT_SECRET=dev-secret-key
EOF
    echo -e "${GREEN}✓ backend/.env file created${NC}"
fi

echo -e "\n${GREEN}════════════════════════════════════════${NC}"
echo -e "${GREEN}✓ Setup Complete!${NC}"
echo -e "${GREEN}════════════════════════════════════════${NC}"

echo -e "\n${YELLOW}Next steps:${NC}"
echo -e "1. Start backend:  ${BLUE}cd backend && npm run dev${NC}"
echo -e "2. Start frontend: ${BLUE}npm run dev${NC}"
echo -e "3. Admin panel:    ${BLUE}http://localhost:3001/admin${NC}"
echo -e "4. Frontend:       ${BLUE}http://localhost:5173${NC}"

echo -e "\n${YELLOW}Or use Docker Compose:${NC}"
echo -e "   ${BLUE}docker-compose up --build${NC}"

echo -e "\n${YELLOW}Default Admin Credentials:${NC}"
echo -e "   Username: ${BLUE}admin${NC}"
echo -e "   Password: ${BLUE}admin123${NC}"
