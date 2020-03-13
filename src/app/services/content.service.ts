import {Injectable, Output , EventEmitter} from '@angular/core';
import {Content} from '../content-card/content-card-helper';
import {CONTENT} from '../contentDb';
import {MessagesService} from '../messages.service';
import {Observable, of} from 'rxjs';
import {HttpClient , HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  // constructor(private messageServie: MessagesService) { }
  //   getContent():Observable<Content[]> {
  //     this.messageServie.add("Content retrieved!");
  //     //this.messageServie.add("you can add another message here");
  //     return of(CONTENT);
  //   }
    newContentArray: Content[];
    private contentURL = 'api/content';
    private httpOptions = {
        headers: new HttpHeaders({ 'Content-type':
                'application/json' })
    };
    @Output() editChange: EventEmitter<Content> = new EventEmitter();
    @Output() informCloneChange: EventEmitter<any> = new EventEmitter();
    constructor(private http: HttpClient) {
  }
  getContent(): Observable<Content[]> {
      return this.http.get<Content[]>('api/content');
  }
  addContent(newContent: Content): Observable<Content>{
      return this.http.post<Content>(`${this.contentURL}`,newContent,this.httpOptions);
  }
  updateContent(c: Content,id: number): Observable<any> {
      return this.http.put(`${this.contentURL}/${id}`, c);
    }
    deleteContent(id: number): Observable<Content>{
      return this.http.delete<Content>(`${this.contentURL}/${id}`,this.httpOptions);
    }
   passContentTo(contentItem: Content){
     this.editChange.emit(contentItem);
  }

  informToCloneNewArray() {
      this.informCloneChange.emit();
  }

}
