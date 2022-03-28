import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
// import { Hero } from '../hero';
// import { HEROES } from '../mock-heroes';
// import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})


export class HeroesComponent implements OnInit {
  firstnum = '';     // The first value in the Calculation
  secondnum = '';    // The second value in the Calculation
  symbols = '';      // Operator Symbols in Calculations
  display = '0';     // Computer display value
  memorizeNum = '0';  // Computer memorize value
  variable = '';
  operation = '';

  constructor(
    private location: Location) { }

  ngOnInit(): void {
  }
  //Join the numbers
  addNum(num: string): void {
    if (this.display == '0'){     //  When the display is 0, the display will be empty.
      this.display = ''
    }else if(num == '.' && this.secondnum.includes(num)){ 
      num = '';           // When the value is a decimal, no more decimal points are allowed
    }
    this.secondnum += String(num)  ;
    this.display += String(num)  ;
    // if (this.firstnum !=''){
    //   this.display = Number(this.firstnum).toLocaleString() + this.symbols + Number(this.secondnum).toLocaleString()
    // }else{
    //   this.display = Number(this.secondnum).toLocaleString()
    // }
      
  }
  //Join the Symbol
  addSymbol(sign : string):void{
    if(sign == 'C'){
      this.firstnum = '';
      this.secondnum = '';
      this.symbols = '';
      this.display = '0';
      this.operation ='';
      this.variable = '';
    }else if(sign == '%'){
      this.display = this.firstnum + this.symbols + String(Number(this.secondnum)/100);
      this.secondnum = String(Number(this.secondnum)/100);
    }else if(sign=='x^y'){
      this.secondnum = String(Math.pow(Number( this.secondnum),2)) ;
      if(this.firstnum != '' && this.symbols !=''){
        this.doCount();
      }else{
        this.display = this.secondnum;
      }
      this.symbols = '';
    }else if(sign == 'log' || sign == 'ln' || sign == '√￣'){
      if (this.display == '0'){     //  When the display is 0, the display will be empty.
        this.display = ''
      }
      if(this.operation != ''){ 
        this.display = this.display.substring(0, this.display.length - (this.operation.length));
        // When the value is a decimal, no more decimal points are allowed
      }
      if(this.secondnum != ''){
        this.variable = this.secondnum;
        this.secondnum = '';
        this.display += sign;
        this.operation = sign;
      }else{
        this.display += sign;
        this.operation = sign;
      }
    }else if(this.operation != ''){
      this.other();
      this.doCount();
      this.display += sign;
      this.firstnum = this.secondnum;
      this.secondnum = '';
      this.symbols = sign;
    }else if(this.firstnum == '') {
      this.firstnum = this.secondnum;
      this.secondnum = '';
      this.display += sign;    
      this.symbols = sign;
    }else if(this.secondnum != '' && this.symbols != ''){
      this.doCount();
      this.display += sign;
      this.firstnum = this.secondnum;
      this.secondnum = '';
      this.symbols = sign;
    }else{
      this.symbols = sign
      this.display = this.firstnum + sign;
    }
  }
  // Count
  doCount():void{
    if(this.operation != ''){
      this.other();
    }
    if(this.symbols == '+'){
      this.display = String (Number(this.firstnum) + Number(this.secondnum))
    }else if(this.symbols == '-'){
      this.display = String (Number(this.firstnum) - Number(this.secondnum))
    }else if(this.symbols == '×'){
      this.display = String (Number(this.firstnum) * Number(this.secondnum))
    }else if(this.symbols == '÷'){
      this.display = String (Number(this.firstnum) / Number(this.secondnum))
    }else {
      this.display = this.secondnum;
    }
    this.firstnum = '';
    this.secondnum = this.display;
  }
  // backSpace
  backSpace():void{
    if (this.secondnum != "") {
      this.secondnum = this.secondnum.substring(0, this.secondnum.length - 1);
    }else if(this.operation != ''){
      this.display = this.display.substring(0, this.display.length - (this.operation.length-1));
      this.operation = '';
    }else if(this.variable != ''){
      this.variable = this.variable.substring(0, this.variable.length - 1);
    }else if (this.symbols != "") {
      this.symbols = "";
      this.secondnum = this.firstnum 
      this.firstnum = ''
    }
    this.display = this.display.substring(0, this.display.length - 1);

    if (this.display == ''){
        this.display = '0';
        return ;
      }
  }
  // 
  doSign_bit() : void{
    if(this.firstnum != '' && this.secondnum != ''){
      this.doCount();
      this.display = String (Number(this.display) * (-1));
      this.secondnum = this.display;
      this.symbols = '';
    }else if(this.secondnum != ''){
      this.display = String (Number(this.secondnum) * (-1));
      this.secondnum = this.display; 
      this.symbols = '';
    }
    
  }
  Memorize(sign:string) :void{
    if(this.secondnum != '' && this.symbols != ''){
      this.doCount();
    }else if(this.symbols == ''){
      this.display = this.secondnum;
    }else{
      this.display = this.firstnum;
    }
    this.secondnum = '';
    this.firstnum = '';
    this.symbols = ''
    if(sign == 'M-'){
      this.display = String(Number(this.display) * (-1)) ;
    }
    this.memorizeNum = String(Number(this.memorizeNum)  + Number(this.display));
    this.display = '0'
    if(sign =='MR'){
      this.display = this.memorizeNum;
      this.secondnum = this.memorizeNum
      this.memorizeNum = '0'
    }else if(sign =='MC'){
      this.memorizeNum = '0';
    }
  }
  goBack():void{
    this.location.back();
  }
  other():void{
    if(this.operation == 'ln'){
      if(this.variable != ''){
        this.secondnum = String(Number(this.variable) * Math.log(Number(this.secondnum)));
      }else{
        this.secondnum =  String(Math.log(Number(this.secondnum)));
      }
    }else if(this.operation == 'log'){
      if(this.variable != ''){
        this.secondnum = String(Number(this.variable) * Math.log10(Number(this.secondnum)));
      }else{
        this.secondnum =  String(Math.log10(Number(this.secondnum)));
      }
    }else if(this.operation == '√￣'){
      if(this.variable != ''){
        this.secondnum = String(Number(this.variable) * Math.sqrt(Number(this.secondnum)));
      }else{
        this.secondnum =  String(Math.sqrt(Number(this.secondnum)));
      }
    }
    this.operation = '';
    this.variable ='';
  }
}