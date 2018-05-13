import { Component, OnInit, NgZone } from '@angular/core';

/* Services */
import { ReleaseService } from '../../services/release/release.service'

@Component({
  selector: 'app-release',
  templateUrl: './release.component.html',
  styleUrls: ['./release.component.scss']
})
export class ReleaseComponent implements OnInit {

  public releaseFiles: ReleaseFile [] = []

  constructor(private _releaseService: ReleaseService, private _zone: NgZone) { }

  ngOnInit() {
  }

  public openUploadDialog() {
    this._releaseService
      .openUploadDialog((fileData: ReleaseFile []) => {
        this._zone.run(() => {
          let uniqueFiles: ReleaseFile [] = []

          fileData.forEach((file: ReleaseFile) => {
            let unique: boolean = true
            this.releaseFiles.forEach((releaseFile: ReleaseFile) => {
              if(releaseFile.fileUrl === file.fileUrl) unique = false
            })

            if(unique) uniqueFiles.push(file)
          })

          this.releaseFiles = this.releaseFiles.concat(uniqueFiles)
        })
      })
  }

}

class ReleaseFile {
  public fileUrl: string
  public name: string
}