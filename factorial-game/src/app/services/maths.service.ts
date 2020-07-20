import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MathsService {

  constructor() { }


  factorial (num) {
    //recursively multiply
    if (num == 0)
      return 1;
    else
      return (num * this.factorial(num - 1));
  }

  //sum up all digits making up num, num is an integer
  sumDigits (num) {
    //num must be an integer
    let sum = 0;
    while (num > 0) {
      //get last digit
      let dig = num % 10;
      sum += num % 10;

      console.log("sum ... ", dig, sum, num);

      //drop the digit
      num = (num - dig) / 10;

    }
    return sum;
  }

  //find factors of num from cellList
  findFactors (num, cellList) {
    let foundCells = [];
    for (let cell of cellList) {
      if (num % cell.value == 0) {
        foundCells.push(cell);
      }
    }
    return foundCells;
  }

}
