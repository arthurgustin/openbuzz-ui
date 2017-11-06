import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CrawlStateService {

  // Observable sources
  private announceStateChange = new Subject<any>();
  // Observable streams
  stateChanging = this.announceStateChange.asObservable();

  // Service message commands
  stateChanged() {
    this.announceStateChange.next();
  }
}
