import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/* Services */
import { ElectronService } from 'ngx-electron';

@Injectable({
  providedIn: 'root'
})
export class ReleaseService {

  private fs
  private mp3duration

  constructor(private _http: HttpClient, private _electronService: ElectronService) {
    this.fs = this._electronService.remote.require('fs')
    this.mp3duration = this._electronService.remote.require('mp3-duration')
  }

  public openUploadDialog(callback: Function) {
    this._electronService.remote.dialog
      .showOpenDialog({
        properties: ['openFile', 'openDirectory', 'multiSelections'],
        filters: [{ name: 'Audio', extensions: ['mp3'] }]
      }, (files: string[]) => {
        if (!files) {
          callback([])
          return
        }

        let fileData: any[] = []
        files.forEach((fileUrl: string) => {

          let file: any = {}

          this.mp3duration(fileUrl, function (err, duration) {
            if (err) throw err;
            file.duration = duration
          })

          file.name = fileUrl.replace(/^.*[\\\/]/, '').slice(0, -4)
          file.fileUrl = fileUrl

          fileData.push(file)
        })

        callback(fileData)
      })
  }
}
