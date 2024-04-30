# Project Installation and Setup

DSN Explorer is a web application that allows you to extract data from files in the format of the "Déclaration Sociale Nominative" (DSN) into Excel format and read the content within a web interface.

## Prerequisites
Before you begin, make sure you have the following installed on your machine:
- Node.js: Next.js requires Node.js. You can download and install it from https://nodejs.org/.
- npm: npm is the package manager for Node.js and is installed with Node.js. You can check that you have it installed by running npm -v in your terminal.
- Docker: If you plan to use Docker for running the project, make sure you have Docker installed. You can download and install it from https://www.docker.com/.

## Installation
1. Clone the repository to your local machine using the git clone command. 

``` bash
    git clone https://github.com/switch-solution/dsn-explorer
```

2. Navigate into the project directory:

``` bash
    cd your-repo
```

3. Install the project dependencies:

``` bash
    npm install
```

## Running the Project
### Using Node.js
Once you have installed the dependencies, you can run the project using the npm run dev command. This will start the Next.js development server:

``` bash
    npm run dev
```

Open http://localhost:3000 in your browser to see the result.


### Using Docker
If you prefer to use Docker, you can build a Docker image and run a container from it. Here's how:

```bash
docker pull ndenis117/dsn-explorer:latest
```
