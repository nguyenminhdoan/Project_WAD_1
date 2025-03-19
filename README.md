# Project Setup with Docker

This guide will help you set up and run the full-stack application using Docker.

## Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Setup Steps 

1. **Clone the repository**
   ```
   git clone <repository-url>
   cd project_1_WAD
   ```

2. **Set up environment variables**
   ```
   cp .env.example .env
   ```
   Edit the `.env` file with your specific configurations.

3. **Build and start the containers**
   ```
   docker-compose up -d
   ```
   This will build both frontend and backend images and start all services.

4. **Access the application**
    - Frontend: http://localhost:3000
    - Backend API: http://localhost:5000
    - MongoDB: localhost:27017

5. **View logs**
   ```
   # All services
   docker-compose logs -f
   
   # Specific service
   docker-compose logs -f frontend
   docker-compose logs -f backend
   ```

6. **Stop the application**
   ```
   docker-compose down
   ```

## Development Workflow

- Any changes to the frontend or backend code will be automatically reflected as the applications use hot-reloading.
- Database data is persisted in a Docker volume.
- The Vite development server provides fast refresh for the frontend.

## Troubleshooting

- If you encounter issues with dependencies, try rebuilding the images:
  ```
  docker-compose build --no-cache
  ```

- To reset the database data:
  ```
  docker-compose down -v
  ```