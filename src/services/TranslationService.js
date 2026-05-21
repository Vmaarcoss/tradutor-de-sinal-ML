import * as tf from '@tensorflow/tfjs';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';
import dictionary from '../../assets/dictionary.json';

let translatorModel = null;

async function loadModel() {
  const modelJson = require('../../assets/translator_model.json');
  const modelWeights = require('../../assets/translator_model.weights.bin');
  translatorModel = await tf.loadGraphModel(bundleResourceIO(modelJson, modelWeights));
}

export async function translateText(inputText, targetLang = 'pt') {
  const lowerInput = inputText.toLowerCase();
  if (dictionary[lowerInput]) {
    return dictionary[lowerInput][targetLang];
  }

  if (!translatorModel) await loadModel();
  const inputIds = tokenize(inputText);  // função adaptada do Marian tokenizer
  const outputIds = translatorModel.predict(inputIds);
  const translation = decode(outputIds);
  return translation;
}