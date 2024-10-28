import axios from "axios";
// use to make http request with advntages like promise handling, json data->object, easy syntax
import { LANGUAGE_VERSIONS } from "./constants";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});




export const executeCode = async (language, sourceCode) => {
  const response = await API.post("/execute", {
    // /execute is on api server
    language: language,
    version: LANGUAGE_VERSIONS[language],
    files: [
      {
        content: sourceCode,
      },
    ],
  });
  return response.data;
};


//api calling for compiler
