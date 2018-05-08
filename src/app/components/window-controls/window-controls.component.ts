import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-window-controls',
  templateUrl: './window-controls.component.html',
  styleUrls: ['./window-controls.component.scss']
})
export class WindowControlsComponent implements OnInit {

  showControls: boolean

  constructor() { }

  ngOnInit() {
  }

}
