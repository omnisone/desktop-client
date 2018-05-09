import { Injectable } from '@angular/core';

declare var WebTorrent: any

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor() {
    console.log(new WebTorrent())
  }
}
