import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { ucs2 } from 'punycode';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html',
  styleUrls: ['./fetch-data.component.css']
})
export class FetchDataComponent {
  private Http: HttpClient;
  private Url: string;
  public responses: number[] = new Array();
  public instructions: Instructions[] = new Array();
  public iterations: number = 0;
  public matrixLenght: number = 0;
  public matrixOperations: number = 0;
  inputForm = new FormGroup({
    input: new FormControl('', {
        validators: Validators.required,
    }),
  });
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.Http = http;
    this.Url = baseUrl;
    let seize = 4;
    let instructions = [
      { x: 2, y: 2, z: 2, W: 4 } ,
     { x1: 1, y1: 1, z1: 1, x2: 3, y2: 3, z2: 3 } ,
      { x: 1, y: 1, z: 1, W: 23 } ,
      { x1: 2, y1: 2, z1: 2, x2: 4, y2: 4, z2: 4 } ,
       { x1: 1, y1: 1, z1: 1, x2: 3, y2: 3, z2: 3 }
    ];
    http.put<number[]>(baseUrl + 'api/SampleData/' + seize, instructions).subscribe(result => {
      result.forEach(e => this.responses.push(e));
    }, error => console.error(error));

  }
  public onSubmit() {
    this.initValues();
    let lines: string[] = this.inputForm.value.input.split(/\n/);
    let currentOperation: number = -1;
    try {
      lines.forEach((el, idx) => {
        switch (this.ValidateLine(el)) {
          case "type1":
            this.IntructionsField(el);
            break;
          case "type2":
            currentOperation++;
            this.SeizeIntructionsField(el, currentOperation);
            break;
          case "type3":
            this.Operations(el, currentOperation);
            break;
        }

      });
      if (this.instructions.length != this.iterations) throw new Error("Index Out of Bounds");
      this.instructions.forEach(el => {
        if (el.numberOp != el.operations.length)
          throw new Error("Index Out of Bounds");
      });
    }
    catch (ex) {
      //this.inputForm.setErrors({ "forbiddenInput": true });
      this.inputForm.controls['input'].setErrors({ "required": true });
      alert("Input format error, try again.");
    }
    
    this.sendIntructionsAsync();
  }
  initValues() {
  this.responses = new Array();
  this.instructions = new Array();
  this.iterations = 0;
  this.matrixLenght = 0;
  this.matrixOperations = 0;
  }
  async sendIntructionsAsync() {
    this.responses = new Array();
    for (const itm in this.instructions) {
    }
   for (const itm in this.instructions) {
     let el = +itm;
     let response = await this.Http.put<number[]>(this.Url + 'api/SampleData/' + this.instructions[el].sieze, this.instructions[el].operations).toPromise()

     response.forEach(e => this.responses.push(e))
   }
  }
  ValidateLine(line: string): string {
    let type: string = "";
    line = line.trim();
    let lineArr = line.split(/ /);
    switch (lineArr.length) {
      case 1:
        type = "type1";
        break;
      case 2:
        type = "type2";
        break;
      default:
        type = "type3";
        break;
    }
    return type;
  }
  UpdateOperation(array: string[]): Update {
    let update: Update = {
      x : +array[1].trim(),
      y : +array[2].trim(),
      z : +array[3].trim(),
      W : +array[4].trim()
    };
   
    return update;
  }
  QueryOperation(array: string[]): Query {
    let query: Query = {
    x1 : +array[1].trim(),
    y1 : +array[2].trim(),
    z1 : +array[3].trim(),
    x2 : +array[4].trim(),
    y2 : +array[5].trim(),
    z2 : +array[6].trim()
  };
    return query;
}
  Operations(value: string, position : number) {
    let array = value.split(/ /);
    switch (array[0]) {
      case "UPDATE":
          let update: Update = this.UpdateOperation(array);
        this.instructions[position].operations.push(update);
        break;
      case "QUERY":
          let query: Query = this.QueryOperation(array);
        this.instructions[position].operations.push(query);
        break
    }
  }
  SeizeIntructionsField(value: string, position: number) {
    let arr = value.split(/ /);
    this.matrixLenght = +arr[0].trim();
    this.matrixOperations = +arr[1].trim();
    this.instructions[position] = {"sieze":this.matrixLenght,"numberOp":this.matrixOperations,"operations":new Array()}
  }
  IntructionsField(value : string) {
    this.iterations = +value.trim();
    for (let x = 1; x <= this.iterations; x++) {
      this.instructions.push(new Array());
    }
  }
  
}

interface Query {
        x1: number,
        y1:number,
        z1:number,
        x2:number,
        y2:number,
        z2:number
}
interface Update {
        x : number,
        y : number,
        z : number,
        W : number
}
interface Instructions {
  sieze: number,
  numberOp: number,
  operations: []
}
