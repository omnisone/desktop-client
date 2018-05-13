import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/* Services */
import { ElectronService } from 'ngx-electron';

@Injectable({
  providedIn: 'root'
})
export class ReleaseService {

  constructor(private _http: HttpClient, private _electronService: ElectronService) { }

  public openUploadDialog(callback: Function) {
    this._electronService.remote.dialog
      .showOpenDialog({
        properties: ['openFile', 'openDirectory', 'multiSelections'],
        filters: [{ name: 'Audio', extensions: ['mp3'] }]
      }, (files: string []) => {
        if(!files) {
          callback([])
          return
        }

        let fileData: any [] = []
        files.forEach((fileUrl: string) => {
          const filename: string = fileUrl.replace(/^.*[\\\/]/, '').slice(0, -4)
          fileData.push({
            name: filename,
            fileUrl: fileUrl
          })
        })

        callback(fileData)
      })
  }
}
