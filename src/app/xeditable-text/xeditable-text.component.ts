import {Component, Input, EventEmitter, Output } from '@angular/core';

@Component({ selector: 'editable-text', template:`
  <span *ngIf='isEditable'> <input type='text' (blur)="updateParent()" [(ngModel)]='writableData.name'></span>
  <span *ngIf='!isEditable' (click)='setEditable(true)'> {{writableData.name}} </span>
  `
})
export class XEditableText {
  writableData = {};
  @Input() data;

  @Output('updateUser') updateUser: EventEmitter<any> = new EventEmitter<any>();

  isEditable:boolean;

  ngOnInit() {
    Object.assign(this.writableData, ...this.data);
    this.isEditable = false;
  }

  setEditable(isEditable){
    this.isEditable = isEditable;
  }

  updateParent() {
    this.setEditable(false);
    this.updateUser.emit(this.writableData);
  }
}
