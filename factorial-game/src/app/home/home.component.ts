import { Component, OnInit } from '@angular/core';
import { MathsService } from "../services/maths.service"
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  numberGrid: any = [];
  cellList: any = []
  cellStyle = ["number-cell", "factor-cell"];
  ncellStyle = ["number-cell", "non-factor-cell"];
  result = ""

  constructor(private mathsService: MathsService) {
    //setup grid array
    this.initGrid();
  }

  initGrid () {
    this.cellList = [];
    //setup grid array of 4 cols, 2 rows
    for (let i = 0; i < 8; i++) {
      let cell = {
        index: i,
        value: i + 2,
        style: ["number-cell", `default-cell-${i + 1}`]
      }
      this.cellList.push(cell);
    }

    //format grid
    this.numberGrid = this.make2dArray(this.cellList);

    console.log(this.numberGrid);

  }

  //make a 4 column 2d array
  make2dArray (cellArray) {
    let gridArray = [];
    //format grid
    let row = 0;
    gridArray.push([]);
    //break at the fourth element
    for (let i = 0; i < cellArray.length; i++) {
      if (i % 4 == 0) {
        gridArray.push([]);
        if (i > 0) {
          row++;
        }
      }
      gridArray[row].push(cellArray[i]);
    }

    return gridArray;
  }

  refreshGrid (factorList) {
    //search cell list and update accordingly
    for (let i = 0; i < this.cellList.length; i++) {
      this.cellList[i].style = ["number-cell", `default-cell-${i + 1}`];

      //identify factor cells
      for (let fact of factorList) {
        if (fact.index == i) {
          this.cellList[i].style = ["number-cell", "blink-div"];
          break;
        }
      }

    }
  }

  ngOnInit (): void {
  }

  cellClick (num) {
    console.log("cell click ... ", num);
    this.result = "";
    let cfactorial = this.mathsService.factorial(num);
    let digSum = this.mathsService.sumDigits(cfactorial);
    let factorList = this.mathsService.findFactors(digSum, this.cellList);

    console.log("result math ... ", cfactorial, digSum, factorList);

    let valueArray = [];
    for (let fact of factorList) {
      valueArray.push(fact.value);
    }

    this.result = `${num}! = ${cfactorial}, Digit Sum = ${digSum}, Factors =${JSON.stringify(valueArray)}`;

    console.log("result", this.result);
    this.refreshGrid(factorList);

  }

}


