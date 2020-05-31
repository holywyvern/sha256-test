# sha256-test

A test for SHA256 output to a file

## Installation

## Linux/OSX

If you don't have Node.js installed, I suggest downloading [nodenv](https://github.com/nodenv/nodenv) to install specific node versions. This project is currently using Node 12.16.1.

## Windows

Windows 10 may use [WSL](https://docs.microsoft.com/en-us/windows/wsl/install-win10) and follow the instructions on Linux.

You may opt for [NVM](https://github.com/coreybutler/nvm-windows), but I don't recommend it.

## Starting up

Do an `npm install` to install dependencies.

## Running and testing

To run the server, do `npm start` and to run tests `npm test`, as usual.

The server is mounted at `http://localhost:8080` by default.

The endpoint is `POST /api/messages` with a JSOn body containing an attribute message, of type `string`.

## Updating environment

The server uses the following environment variables:

### STORAGE_FILE

Contains a location for the text file in which lines are stored, by default it's store.csv on the current working directory.

### LINE_SEPARATOR

Contains the line separation character of the CSV file, by default it's '\n'

### VALUE_SEPARATOR

Contains the value separator of columns on a row, by default it's ','

### PORT

Contains the application port used for running the server, it's 8080 by default.
