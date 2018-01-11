import { Component, OnInit } from '@angular/core';
import { cleanStringSort, logger, cleanString, buildCharMap } from '../shared/helper-functions';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent implements OnInit {
  isAnagram: boolean;
  capitalized: string;
  chunked;

  constructor() { }

  ngOnInit() {
    // this.isAnagram = this.anagrams2('    !Hello ? ', 'olleh !@  #$%^  &*(');
    // this.capitalized = this.capitalizeString2('the dog ate the cheese.');
    this.chunked = this.chunkArray2([1,2,3,4,5,6,7,8,9,10], 3);


    logger(this.chunked);
  }

  anagrams(strA, strB) {
    return cleanStringSort(strA) === cleanStringSort(strB);  
  }

  anagrams2(strA, strB) {
    const aCharMap = buildCharMap(strA);
    const bCharMap = buildCharMap(strB);

    let aKeys = Object.keys(aCharMap);
    let bKeys = Object.keys(bCharMap);
    
    if(aKeys.length !== bKeys.length) {
      return false;
    }

    for(let char in aCharMap) {
      if(aCharMap[char] !== bCharMap[char]) {
        return false;
      }
    }
    return true;
  }

  capitalizeString(str) {
    let result = str[0].toUpperCase();
    for(let i = 1; i < str.length; i++) {
      if(str[i - 1] === ' ') {
        result += str[i].toUpperCase();
      } else {
        result += str[i];
      }
    }
    return result;
  }

  capitalizeString2(str) {
    const words = [];

    for(let word of str.split(' ')) {
      words.push(word[0].toUpperCase() + word.slice(1))
    }
    return words.join(' ');
  }

  chunkArray(array, size) {
    const chunked = [];
    let index = 0;

    while(index < array.length) {
      chunked.push(array.slice(index, index + size));
      index += size;
    }
    return chunked;
  }

  chunkArray2(array, size) {
    const chunked = [];

    for(let element of array) {
      const last = chunked[chunked.length - 1];

      if(!last || last.length === size) {
        chunked.push([element]);
      } else {
        last.push(element);
      }
    }
    return chunked;
  }



  

  

}
