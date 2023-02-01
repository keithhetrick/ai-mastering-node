# ai-mastering-node

Command Line tool that utilizes the AI Mastering end points to master files from a local folder. This tool is designed to be used in conjunction with the AI Mastering API. The tool will take a file from the input folder, send it to the AI Mastering API, and then save the mastered file to the output folder.

## Installation

```bash
npm install -g ai-mastering-node
```

## Usage

```bash
node main.js --input <input file name>.(wav || mp3|| aiff) --output <output file name>.(wav || mp3|| aiff)
```

## Example

```bash
node main.js --input input.wav --output output.wav
```
