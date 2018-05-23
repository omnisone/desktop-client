import { Injectable } from '@angular/core';

/* Models */
import { ReleaseFile } from '../../models/song'

/* Services */
import { ElectronService } from 'ngx-electron';

declare var WebTorrent: any

@Injectable({
  providedIn: 'root'
})
export class SeedService {

  private shell
  private path

  constructor(private _electronService: ElectronService) {
    this.shell = this._electronService.remote.require('shelljs')
    this.path = this._electronService.remote.require('path')
  }

  public seedFile(song: ReleaseFile, callback: Function) {
    const self = this
    const base64 = (new Buffer(song.fileObject.path)).toString('base64')
    this.shell.exec('which node', (code, stdout, stderr) => {
      self.shell.config.execPath = stdout
      const scriptPath = self.path.join(__dirname, '../src/electron/', 'seed.sh')
      self.shell.chmod('+x', scriptPath)
      self.shell.exec(`${scriptPath} ${base64}`, { silent: true }, (code, stdout, stderr) => {
        console.log('stdout', stdout)
        const data = JSON.parse(stdout)
        callback(data)
      })
    })

  }
}
