import * as TextRecognition from 'expo-text-recognition';

export async function recognizeText(imageUri) {
  const result = await TextRecognition.recognize(imageUri);
  const blocks = result.blocks;
  if (!blocks.length) return '';
  return blocks[0].text.trim().toUpperCase();
}