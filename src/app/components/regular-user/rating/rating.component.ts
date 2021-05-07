import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  
  @Input() rating:number;
  
  roundedRating:number;

  yellow:number;
  white:number;
  half:number=0;

  constructor() { }

  ngOnInit(): void {
    this.calculate_rating();
      
  }

  calculate_rating()
  {
    console.log(this.rating);

    if(this.rating != null || this.rating == undefined)
    {

      this.roundedRating =Math.round(this.rating  *2)/2;

      console.log("rounded rating ",this.roundedRating);
      
      this.yellow = +this.roundedRating.toFixed();
      this.white = 5 - this.yellow; 
      this.half = (+this.roundedRating.toFixed() - +this.roundedRating.toFixed(2));

      if(this.half > 0)
      {
        this.yellow -=1;
      }
        
      console.log("half the star",this.half);
    }
    else{

      this.white = 5;
      console.log('White Rating ',this.white);
    }


  }

  counter(i: number) {

        return new Array(i);
}

}
