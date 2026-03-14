#!/bin/bash

# 🚀 Portfolio Deployment Script
# This script helps deploy your portfolio to GitHub Pages

set -e  # Exit on error

echo "🎮 Portfolio Deployment Script"
echo "================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: package.json not found. Please run this script from the frontend directory.${NC}"
    exit 1
fi

# Check if gh-pages is installed
if ! grep -q "gh-pages" package.json; then
    echo -e "${BLUE}📦 Installing gh-pages...${NC}"
    yarn add -D gh-pages
    echo -e "${GREEN}✅ gh-pages installed${NC}"
fi

# Check if homepage is set in package.json
if ! grep -q "homepage" package.json; then
    echo -e "${RED}❌ Error: 'homepage' not found in package.json${NC}"
    echo "Please add the following to your package.json:"
    echo '  "homepage": "https://hemachandrand.github.io",'
    exit 1
fi

# Check if deploy script exists
if ! grep -q "\"deploy\"" package.json; then
    echo -e "${RED}❌ Error: 'deploy' script not found in package.json${NC}"
    echo "Please add the following to your package.json scripts:"
    echo '  "predeploy": "yarn build",'
    echo '  "deploy": "gh-pages -d build",'
    exit 1
fi

echo -e "${BLUE}🔨 Building the application...${NC}"
yarn build

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Build successful${NC}"
else
    echo -e "${RED}❌ Build failed${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}🚀 Deploying to GitHub Pages...${NC}"
yarn deploy

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✅ Deployment successful!${NC}"
    echo ""
    echo "🎉 Your portfolio is now live at:"
    echo -e "${BLUE}https://hemachandrand.github.io${NC}"
    echo ""
    echo "📝 Note: It may take a few minutes for changes to appear."
else
    echo -e "${RED}❌ Deployment failed${NC}"
    exit 1
fi
