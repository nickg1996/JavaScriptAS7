import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-content-card',
  templateUrl: './content-card.component.html',
  styleUrls: ['./content-card.component.scss']
})
export class ContentCardComponent implements OnInit {

    constructor() {

        this.contentInstance.addItem(this.content1);
        this.contentInstance.addItem(this.content2);
        this.contentInstance.addItem(this.content3);
    }

  ngOnInit() {
  }

}


