# DevOps Project: Advanced Project Structure

## Project Architecture
This project is organized into three main components:
* **Frontend**: A service containing the basic HTML/CSS structure.
* **Backend**: An Express server handling MySQL database connections.
* **Orchestration**: Managed by Docker Compose to run all services simultaneously.

## Setup Instructions

### Environment Configuration
1. Create a `.env` file in the root directory.
2. Add your database secrets using the template provided.

### Running the Project
To start the frontend and backend services together, run:
```bash
docker-compose up --build
