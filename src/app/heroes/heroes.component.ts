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
  firstnum = '';
  secondnum = '';
  symbols = '';
  display = '0';

  constructor(
    private location: Location) { }

  ngOnInit(): void {
  }

  addNum(a: string): void {
    if (this.display == '0'){
      this.display = ''
    }
    this.secondnum += String(a)  ;
    this.display  += String(a)  ;
  }

  addSymbol(b : string):void{
    if(b == 'C'){
      this.firstnum = '';
      this.secondnum = '';
      this.symbols = '';
      this.display = '0';
    }else if(b == '%'){
      this.display = this.firstnum + this.symbols + String(Number(this.secondnum)/100);
      this.secondnum = String(Number(this.secondnum)/100);
    }else if(this.firstnum == '') {
      this.firstnum = this.secondnum;
      this.secondnum = '';
      this.display += b;    
      this.symbols = b;
    }else if(this.secondnum != '' && this.symbols != ''){
      this.doCount();
      this.display += b;
      this.firstnum = this.secondnum;
      this.secondnum = '';
      this.symbols = b;
    }else{
      this.symbols = b
      this.display = this.firstnum + b;
    }
  }

  doCount():void{
    if(this.symbols == '+'){
      this.display = String (Number(this.firstnum) + Number(this.secondnum))
    }else if(this.symbols == '-'){
      this.display = String (Number(this.firstnum) - Number(this.secondnum))
    }else if(this.symbols == '×'){
      this.display = String (Number(this.firstnum) * Number(this.secondnum))
    }else if(this.symbols == '÷'){
      this.display = String (Number(this.firstnum) / Number(this.secondnum))
    }
    this.firstnum = '';
    this.secondnum = this.display;
  }
  backSpace():void{
    if (this.secondnum != "") {
      this.secondnum = this.secondnum.substring(0, this.secondnum.length - 1);
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
  doSign_bit() : void{
    if(this.firstnum != '' && this.secondnum != ''){
      this.doCount();
      this.display = String (Number(this.display) * (-1));
      this.secondnum = this.display;
    }else if(this.secondnum != ''){
      this.display = String (Number(this.secondnum) * (-1));
      this.secondnum = this.display; 
    }
    this.symbols = '';
  }
  goBack():void{
    this.location.back();
  }
}