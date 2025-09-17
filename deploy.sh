#!/bin/bash

# Deployment script for blogging site
set -e

echo "🚀 Starting deployment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Check if Docker Compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed."
    exit 1
fi

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ .env file not found. Please create one based on .env.production"
    exit 1
fi

echo "📦 Pulling latest changes..."
git pull origin main

echo "🛑 Stopping existing containers..."
docker-compose down

echo "🔨 Building images..."
docker-compose build --no-cache

echo "🏗️ Creating uploads directory..."
mkdir -p uploads

echo "🚀 Starting services..."
docker-compose up -d

echo "🧹 Cleaning up unused Docker resources..."
docker system prune -f

echo "⏳ Waiting for services to be ready..."
sleep 30

# Check if services are healthy
echo "🔍 Checking service health..."
if curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
    echo "✅ Backend is healthy"
else
    echo "❌ Backend health check failed"
    docker-compose logs backend
fi

if curl -f http://localhost:8080 > /dev/null 2>&1; then
    echo "✅ Frontend is healthy"
else
    echo "❌ Frontend health check failed"
    docker-compose logs frontend
fi

echo "📊 Service status:"
docker-compose ps

echo "🎉 Deployment completed!"
echo "🌐 Frontend: http://localhost:8080"
echo "🔧 Backend: http://localhost:3000"
echo "📊 MongoDB: External (Atlas/Cloud)"

echo ""
echo "📝 To view logs:"
echo "  docker-compose logs -f"
echo ""
echo "🛑 To stop services:"
echo "  docker-compose down"
