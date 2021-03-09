import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPaperItem } from 'app/shared/model/ReferenceManagementContext/paper-item.model';

@Component({
  selector: 'jhi-paper-item-detail',
  templateUrl: './paper-item-detail.component.html',
})
export class PaperItemDetailComponent implements OnInit {
  paperItem: IPaperItem | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ paperItem }) => (this.paperItem = paperItem));
  }

  previousState(): void {
    window.history.back();
  }
}
