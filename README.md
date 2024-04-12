## Description

Minimum reproduction code for nestjs/bull graceful shutdown testing

## Installation

```bash
$ npm install
```

## Running the app

```bash
# watch mode
$ npm run start:dev
```

## Steps to reproduce the `Connection is closed.` error

1. Install and run the app
2. Copy the process ID from `process listening on ...` log
3. Run the script `sh test.sh <pid>`

The test.sh script will publish a job in the "long-job" queue, which will internally start creating a job in the "internal-jobs" queue. It will create one job every second for the next 10 seconds. After 3 seconds the test.sh will kill the node process, which triggers the error.
