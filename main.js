const fs = require("fs");
const _ = require("lodash");
const Aimastering = require("aimastering");
const program = require("commander");
const srs = require("secure-random-string");

// load environment variables
require("dotenv").config();

// parse command line arguments --- for the input and output files
program
  .option("-i, --input <s>", "Input audio file path")
  .option("-o, --output <s>", "Output audio file path")
  .parse(process.argv);
if (program.input.length === 0) {
  program.help();
}

// Call API with promise interface
const callApiDeferred = async function (api, method) {
  const apiArgments = Array.prototype.slice.call(arguments, 2);

  return new Promise((resolve, reject) => {
    const callback = (error, data, response) => {
      if (error) {
        reject(error, response);
      } else {
        resolve(data, response);
      }
    };
    const args = _.flatten([apiArgments, callback]);

    method.apply(api, args);
  });
};

const sleep = async function (ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const main = async function () {
  // configure API client
  const client = Aimastering.ApiClient.instance;
  const bearer = client.authentications["bearer"];
  bearer.apiKey = process.env.AIMASTERING_ACCESS_TOKEN;

  // API key must be 'guest_' + [arbitrary string]
  bearer.apiKey = "guest_" + srs({ length: 32 });

  // create api
  const audioApi = new Aimastering.AudioApi(client);
  const masteringApi = new Aimastering.MasteringApi(client);

  // upload input audio
  const inputAudioData = fs.createReadStream(program.input);
  const inputAudio = await callApiDeferred(audioApi, audioApi.createAudio, {
    file: inputAudioData,
  });
  console.error("\nInput Audio:", inputAudio);

  // start mastering
  let mastering = await callApiDeferred(
    masteringApi,
    masteringApi.createMastering,
    inputAudio.id,
    {
      mode: "default",
    }
    // {
    //   mode: "custom",
    //   target_loudness: -6,
    //   target_loudness_mode: "loudness",
    //   output_format: "wav",
    //   bit_depth: 16,
    //   sample_rate: 44100,
    //   mastering_reverb: false,
    //   mastering_reverb_gain: -36,
    //   mastering_algorithm: "v2",
    //   ceiling_mode: "peak",
    //   ceiling: -0.1,
    // }
  );
  console.error("\nMASTERING:", mastering);

  // wait for the mastering completion
  while (mastering.status === "waiting" || mastering.status === "processing") {
    mastering = await callApiDeferred(
      masteringApi,
      masteringApi.getMastering,
      mastering.id
    );
    console.error(
      "\nWaiting for the mastering completion progression: " +
        (100 * mastering.progression).toFixed() +
        "%"
    );
    await sleep(5000);
  }

  // download output audio to local folder
  const outputAudioData = await callApiDeferred(
    audioApi,
    audioApi.downloadAudio,
    mastering.output_audio_id
  );
  fs.writeFileSync(program.output, outputAudioData);

  console.error("\nThe output file was written to " + program.output);
};

main();
