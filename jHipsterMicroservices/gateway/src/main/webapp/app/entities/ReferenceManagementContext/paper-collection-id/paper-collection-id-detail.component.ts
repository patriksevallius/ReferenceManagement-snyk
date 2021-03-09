import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPaperCollectionId } from 'app/shared/model/ReferenceManagementContext/paper-collection-id.model';

@Component({
  selector: 'jhi-paper-collection-id-detail',
  templateUrl: './paper-collection-id-detail.component.html',
})
export class PaperCollectionIdDetailComponent implements OnInit {
  paperCollectionId: IPaperCollectionId | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ paperCollectionId }) => (this.paperCollectionId = paperCollectionId));
  }

  previousState(): void {
    window.history.back();
  }
}
