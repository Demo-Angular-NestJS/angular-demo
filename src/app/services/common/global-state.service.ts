import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class GlobalStateService {
  public isAsidebarOpen$ = new BehaviorSubject(false);
}
