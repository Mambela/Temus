import { DatePipe } from '@angular/common';

import { STOREDCONSTANTS } from './../../../module/constants.service';
import { UserComment } from '../../../data/models/regular-user/UserComment.model';
import { NgForm } from '@angular/forms';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.scss'],
  providers: [DatePipe]
})
export class NewCommentComponent implements OnInit {

  @Output() addCommentEvent: EventEmitter<UserComment> = new EventEmitter();
  @ViewChild('newcomment') newcommentRef;

  currentRating:number=0;
  comment:string ="";

  constructor(config: NgbRatingConfig,private storedValues:STOREDCONSTANTS,private datepipe:DatePipe) {
    config.max = 5;
    config.readonly = false;
   }

  ngOnInit(): void {
    
  }


  onPostNewComment(comment:string)
  {  
    const newComment = comment;

    if(!this.storedValues.userId)
    {
      alert("Por favor, faça o login antes de avaliar!")
      return;
    }
     
    if(!comment.trim || comment==="" || this.currentRating === 0)
    {
      alert("Por-favor avilie e escreva um comentario antes de o publicar ");
      return;
    }
    

    let commentedDateObj = new Date();
    alert(commentedDateObj);
   let commentDate = this.datepipe.transform(commentedDateObj, 'd-M-yy');

    var newComent = new UserComment(this.storedValues.userId,this.currentRating,newComment,commentedDateObj,
    this.storedValues.userInfo.primeiro_nome,this.storedValues.userInfo.ultimo_nome);
     
    this.currentRating = 0;
    comment = "";
    
    this.newcommentRef.nativeElement = ' ';
    
    this.addCommentEvent.emit(newComent);
    


  }

}
