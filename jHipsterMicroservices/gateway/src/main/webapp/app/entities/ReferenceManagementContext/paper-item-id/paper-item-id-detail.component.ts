import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPaperItemId } from 'app/shared/model/ReferenceManagementContext/paper-item-id.model';

@Component({
  selector: 'jhi-paper-item-id-detail',
  templateUrl: './paper-item-id-detail.component.html',
})
export class PaperItemIdDetailComponent implements OnInit {
  paperItemId: IPaperItemId | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ paperItemId }) => (this.paperItemId = paperItemId));
  }

  previousState(): void {
    window.history.back();
  }
}
