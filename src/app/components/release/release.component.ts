import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/* Services */
import { ReleaseService } from '../../services/release/release.service'

@Component({
  selector: 'app-release',
  templateUrl: './release.component.html',
  styleUrls: ['./release.component.scss']
})
export class ReleaseComponent implements OnInit {

  public releaseFiles: ReleaseFile[] = []

  private ETH_USD

  constructor(private _releaseService: ReleaseService,
    private _zone: NgZone,
    private _http: HttpClient) { }

  ngOnInit() {
    this._http.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD')
      .subscribe((data: any) => {
        this.ETH_USD = data.USD
      })
  }

  public openUploadDialog(): void {
    this._releaseService
      .openUploadDialog((fileData: ReleaseFile[]) => {
        this._zone.run(() => {
          let uniqueFiles: ReleaseFile[] = []

          fileData.forEach((file: ReleaseFile) => {
            file.priceUSD = 0.99
            this.USDToETH(file)

            let unique: boolean = true
            this.releaseFiles.forEach((releaseFile: ReleaseFile) => {
              if (releaseFile.fileUrl === file.fileUrl) unique = false
            })

            if (unique) uniqueFiles.push(file)
          })

          this.releaseFiles = this.releaseFiles.concat(uniqueFiles)
        })
      })
  }

  public deleteFile(index: number): void {
    this.releaseFiles.splice(index, 1)
  }

  private USDToETH(releaseFile: ReleaseFile) {
    releaseFile.priceETH = Number((releaseFile.priceUSD / this.ETH_USD).toFixed(6))
  }

  private ETHToUSD(releaseFile: ReleaseFile) {
    releaseFile.priceUSD = Number((releaseFile.priceETH * this.ETH_USD).toFixed(6))
  }

}

class ReleaseFile {
  public fileUrl: string
  public name: string
  public priceUSD?: number
  public priceETH?: number
}