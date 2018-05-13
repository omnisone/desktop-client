import { Component, OnInit } from '@angular/core';

/* Services */
import { ReleaseService } from '../../services/release/release.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(private _releaseService: ReleaseService) { }

  ngOnInit() {
  }

  public releaseFiles() {
    this._releaseService
      .openUploadDialog((fileData: any []) => {
        console.log(fileData)
      })
  }

}
