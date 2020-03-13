import {Component, OnInit, Input, contentQuery} from '@angular/core';
import {Content} from '../content-card/content-card-helper';
import {ContentService} from '../services/content.service';
import {of} from 'rxjs';

// import {ContentListComponent} from '../content-list/content-list.component';

@Component({
  selector: 'app-create-content',
  templateUrl: './create-content.component.html',
  styleUrls: ['./create-content.component.scss']
})
export class CreateContentComponent implements OnInit {
    ID: string;
    Author: string;
    ImageUrl: string;
    ContentType: string;
    body: string;
    ContentTag: string;
    title: string;
    @Input() contentArray: Content[];
    editItem: Content;
    updateItem: Content;

    contentItem: Content;
    constructor(private contentService: ContentService) {
        this.ID = '';
        this.title = '';
        this.Author = '';
        this.ContentType = '';
        this.body = '';
        this.ContentTag = '';
        this.ImageUrl = '';
    }
    
    ngOnInit() {
       this.contentService.editChange.subscribe(item=> {
           this.editItem = item;
           if(this.editItem.title.length !== 0) {
               this.ID = String(this.editItem.id);
               this.title = this.editItem.title;
               this.Author = this.editItem.author;
               this.ContentType = this.editItem.type;
               this.body = this.editItem.body;
               let str='';
               for(let i=0; i<this.editItem.tags.length; i++){
                   str = str + this.editItem.tags[i];
               }
               this.ContentTag = str;
               this.ImageUrl = this.editItem.imgUrl;
           }
       });

    }
    
    AddContent() {
         this.contentArray.push({ contentId: Number(this.ID), author: this.Author, type: this.ContentType,
             imgUrl: this.ImageUrl, body: this.body, tags: [this.ContentTag], title: this.title });
         this.canCreated = true;
    }
    
    CreateContent() {
         if (this.ID.length !== 0 && this.body.length !== 0 && this.Author.length !== 0 && this.title.length !== 0) {
             this.canCreated = true;
         } else {
             this.canCreated = false;
         }
         
         const CreateContentPromise = new Promise((success, fail) => {
             if (this.canCreated) {
                success('the addition is successfu:' + this.title);
             } else {
                fail('Failure :You should fill ID,title ,body and author');
             }
         });
         
         CreateContentPromise.then(successResult => {
             this.AddContent();
             console.log(successResult);
             this.title = '';
             this.Author = '';
             this.ImageUrl = '';
             this.body = '';
             this.ID = '';
             this.ContentTag = '';
             this.ContentType = '';
             this.errorMessage = '';
         }).catch(failResult => {
             this.errorMessage = failResult;
            });
    }
    
    save(): void {

        this.contentItem = { 
            id: Number(this.ID), author: this.Author, type: this.ContentType, imgUrl: this.ImageUrl, body: this.body, tags: [this.ContentTag], title: this.title 
        };
        
        this.contentService.addContent(this.contentItem).subscribe(content=> {
            this.contentArray.push(content);
            this.contentService.informToCloneNewArray();
            this.ID='';
            this.title = '';
            this.Author = '';
            this.ContentType = '';
            this.body = '';
            this.ContentTag = '';
            this.ImageUrl = '';
            console.log('hi');
        });
    }
    
    updateTheItem() {

       this.updateItem = { 
           id: Number(this.ID), author: this.Author, type: this.ContentType, imgUrl: this.ImageUrl, body: this.body, tags: [this.ContentTag], title: this.title 
       };
       const index = this.contentArray.findIndex(item=>item.id === this.editItem.id);
       this.contentService.updateContent(this.updateItem,this.editItem.id).subscribe(item=> {
           this.contentArray[index] = this.updateItem;
           this.contentService.informToCloneNewArray();
       });
       
       this.ID = '';
       this.title = '';
       this.Author = '';
       this.ContentType = '';
       this.body = '';
       this.ContentTag = '';
       this.ImageUrl = '';
       alert('successfully update');
    }
}
