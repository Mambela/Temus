import { ToastType } from './toast.type';
import { filter } from 'rxjs/operators';
import { Toast } from './toast.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';



@Injectable({
    providedIn: 'root'
})

export class ToasterService{
    
    subject:BehaviorSubject<Toast>;
    toast$: Observable<Toast>;

    constructor(){
        this.subject = new BehaviorSubject<Toast>(null);
        this.toast$ = this.subject.asObservable().pipe(filter(toast => toast != null));

    }

    show(type: ToastType, title?: string, body?: string, delay?: number) {
        this.subject.next({ type, title, body, delay });
      }


}