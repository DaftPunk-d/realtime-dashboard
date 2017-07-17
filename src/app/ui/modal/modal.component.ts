import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  modalVisible = false;
  @Output() onClose = new EventEmitter();
  @Input() visible = false;

  constructor() { }

  ngOnInit() {
  }

  executeOnClose() {
    this.visible = false;
    this.onClose.emit();
  }
}
