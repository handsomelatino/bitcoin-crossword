import aes from 'crypto-js/aes';
import { enc } from 'crypto-js/core';

export function decodeMessage(cypher, words) {
  const p = permutateWords(words);

  for (let i = 0; i < p.length; ++i) {
    try {
      const d = aes.decrypt(cypher, p[i].join(''));
      
      if (d.toString(enc.Utf8).length > 128) {
        return(d.toString(enc.Utf8));
      }
    }
    catch (e) {
      // console.log(e)
      // invalid passwords will throw an "Error: Malformed UTF-8 data"
    }
  }

  return null;
}

// grab an array of words, join it into a single string and find all permutations of it:
const permutateWords = words => {

  let permutations = [];

  if (words.length === 1) {
    return words;
  }

  for (let i = 0; i < words.length; ++i) {
    const chosenWord = words[i];
    const otherWords = [...words.slice(0, i), ...words.slice(i + 1, words.length)];

    for (let p of permutateWords(otherWords)) {
      permutations.push(typeof p === 'string' ? [chosenWord, p] : [chosenWord, ...p]);
    }
  }

  return permutations;
}
