import { Component, OnInit } from '@angular/core';
import {Content} from '../content-card/content-card-helper';
import {ContentService} from '../services/content.service';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.scss']
})
export class ContentListComponent implements OnInit {
contentArray: Content[];
checkTitle: string;

    constructor(private contentService: ContentService) { this.contentArray=[];}
    ngOnInit() {
        this.contentService.informCloneChange.subscribe(
            _ => {this.cloneMe();}
        )
       this.contentService.getContent().subscribe(contentArray=>
       {
           this.contentArray=contentArray;
           this.cloneMe();
       });

    }
    public cloneMe(): void {
      this.contentArray  = Object.assign([], this.contentArray);
  }
  public Edit(item: Content) {
        this.contentService.passContentTo(item);
 }
 public DeleteContent(item: Content){
        this.contentArray = this.contentArray.filter(h=>h!==item);
        this.contentService.deleteContent(item.id).subscribe(_ => {this.cloneMe();});
 }




  public  getTag(item: Content): string {
      if(item.tags!== undefined) {
          return 'Tags: '+ item.tags + '';
      } else {return '';}
    }
    OutputToConsole(item: Content) {
      console.log(item.id);
    }
    CheckTitle() {
      console.log(this.checkTitle);
      let   isExist = false;
      for(const i of this.contentArray) {
            if(i.title === this.checkTitle) { isExist = true;}
        }
      if(isExist) {confirm('Congratulation!\nTitle:\"' + this.checkTitle + ' \"exists');}
      else {confirm('Sorry! , Title\"' + this.checkTitle + ' \"does not exist');}
    }


}
