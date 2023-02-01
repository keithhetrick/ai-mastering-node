const Aimastering = require("aimastering");
const defaultClient = Aimastering.ApiClient.instance;

const bearer = defaultClient.authentications["bearer"];
bearer.apiKey = process.env.AIMASTERING_ACCESS_TOKEN;
bearer.apiKeyPrefix = "Token";

const apiInstance = new Aimastering.MasteringApi();

// import file form local folder
const fs = require("fs");
const file = fs.readFileSync("./test.wav");

const inputAudioId = file;
// const inputAudioId = 56; // Number | Input audio id

const opts = {
  mode: "default", // String | Mode
  bassPreservation: false, // Boolean | This parameter represents if the bass preservation is enabled.
  mastering: false, // Boolean | This parameter represents if the mastering is enabled. This parameter is effective only when the mode is \"default\" or \"custom\".
  masteringAlgorithm: "v2", // String |
  noiseReduction: false, // Boolean | This parameter represents if the nosie reduction is enabled. This parameter is effective only when the mode is \"custom\".
  preset: "general", // String | This parameter is effective only when the mode is \"custom\".
  targetLoudness: -5, // Number | This parameter represents the target loudness of the output audio in dB. This parameter is effective only when the mode is \"custom\".
  targetLoudnessMode: "loudness", // String |
  masteringMatchingLevel: 0.5, // Number | This parameter represents the mastering reference matching level. This parameter is effective only when the mode is \"custom\" and the mastering is enabled.
  masteringReverb: false, // Boolean | This parameter represents if the mastering reverb is enabled. This parameter is effective only when the mode is \"custom\" and the mastering is enabled.
  masteringReverbGain: -36, // Number | This parameter represents the mastering reverb gain relative to the dry sound in dB. This parameter is effective only when the mode is \"custom\" and the mastering is \"true\" and the mastering_reverb is \"true\".
  referenceAudioId: 56, // Number | Reference audio id. This parameter is effective only when the mode is \"custom\" and the mastering is enabled.
  lowCutFreq: 20, // Number | This parameter represents the low cut freq  of the output audio in Hz. This parameter is effective only when the mode is \"custom\".
  highCutFreq: 20000, // Number | This parameter represents the high cut freq of the output audio in Hz. This parameter is effective only when the mode is \"custom\".
  ceiling: 0, // Number |
  ceilingMode: "0", // String |
  oversample: 1, // Number |
  sampleRate: 44100, // Number | This parameter represents the sample rate of the output audio in dB. This parameter is effective only when the mode is \"custom\".
  bitDepth: 16, // Number | This parameter represents the bit depth of the output audio in dB. This parameter is effective only when the mode is \"custom\".
  outputFormat: "wav", // String | This parameter represents the format of the output audio. This parameter is effective only when the mode is \"custom\".
  forPreview: false, // Boolean | If this is true, the mastering is treated for preview purpose (ex. not purchasable, not publishable, short lifetime).
  startAt: 0, // Number | Partial mastering start at.
  endAt: -1, // Number | Partial mastering end at.
  videoTitle: "", // String | This parameter represents the title of output video.
};

const callback = function (error, data, response) {
  if (error) {
    console.error("\nERROR:", error);
  } else {
    console.log("\nAPI called successfully. Returned data: " + data);
  }
};
apiInstance.createMastering(inputAudioId, opts, callback);
