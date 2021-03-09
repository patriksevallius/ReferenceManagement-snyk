import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPaperCollection } from 'app/shared/model/ReferenceManagementContext/paper-collection.model';

@Component({
  selector: 'jhi-paper-collection-detail',
  templateUrl: './paper-collection-detail.component.html',
})
export class PaperCollectionDetailComponent implements OnInit {
  paperCollection: IPaperCollection | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ paperCollection }) => (this.paperCollection = paperCollection));
  }

  previousState(): void {
    window.history.back();
  }
}
