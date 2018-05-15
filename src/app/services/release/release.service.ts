import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/* Models */
import { ReleaseFile } from '../../models/song'

/* Services */
import { ElectronService } from 'ngx-electron';

@Injectable({
  providedIn: 'root'
})
export class ReleaseService {

  private fs
  private mp3duration

  constructor(private _http: HttpClient, private _electronService: ElectronService, private _zone: NgZone) {
    this.fs = this._electronService.remote.require('fs')
    this.mp3duration = this._electronService.remote.require('mp3-duration')
  }

  public openUploadDialog(callback: Function) {
    const input = document.createElement('input')
    input.type = 'file'
    input.setAttribute("multiple", "multiple")
    document.body.onfocus = checkFiles
    input.click()

    const self = this
    function checkFiles() {
      document.body.onfocus = null
      if (input.files.length === 0) {
        callback([])
      } else {
        let fileData: any[] = []
        for (let i = 0; i < input.files.length; i++) {
          const file: File = input.files[i]

          fileData.push({
            name: file.name,
            fileUrl: file.path,
            fileObject: file
          })

          console.log(fileData)

          callback(fileData)
        }
      }
    }

    // this._electronService.remote.dialog
    //   .showOpenDialog({
    //     properties: ['openFile', 'openDirectory', 'multiSelections'],
    //     filters: [{ name: 'Audio', extensions: ['mp3'] }]
    //   }, (files: string[]) => {
    //     if (!files) {
    //       callback([])
    //       return
    //     }

    //     let fileData: any[] = []
    //     files.forEach((fileUrl: string) => {

    //       let file: any = {}
    //       file.name = fileUrl.replace(/^.*[\\\/]/, '').slice(0, -4)
    //       file.fileUrl = fileUrl

    //       fileData.push(file)
    //     })

    //     callback(fileData)
    //   })
  }

  public getDuration(songFile: ReleaseFile) {
    const self: ReleaseService = this
    this.mp3duration(songFile.fileUrl, function (err, duration) {
      if (err) throw err;
      self._zone.run(() => {
        songFile.duration = duration
      })
    })
  }
}
