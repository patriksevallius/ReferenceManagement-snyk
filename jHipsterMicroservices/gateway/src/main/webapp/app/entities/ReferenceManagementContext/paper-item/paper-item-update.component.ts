import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IPaperItem, PaperItem } from 'app/shared/model/ReferenceManagementContext/paper-item.model';
import { PaperItemService } from './paper-item.service';
import { IPaperItemId } from 'app/shared/model/ReferenceManagementContext/paper-item-id.model';
import { PaperItemIdService } from 'app/entities/ReferenceManagementContext/paper-item-id/paper-item-id.service';
import { IPaperCollection } from 'app/shared/model/ReferenceManagementContext/paper-collection.model';
import { PaperCollectionService } from 'app/entities/ReferenceManagementContext/paper-collection/paper-collection.service';

type SelectableEntity = IPaperItemId | IPaperCollection;

@Component({
  selector: 'jhi-paper-item-update',
  templateUrl: './paper-item-update.component.html',
})
export class PaperItemUpdateComponent implements OnInit {
  isSaving = false;
  paperitemids: IPaperItemId[] = [];
  papercollections: IPaperCollection[] = [];

  editForm = this.fb.group({
    id: [],
    title: [],
    authors: [],
    venue: [],
    paperitemIdId: [],
    paperCollectionId: [],
  });

  constructor(
    protected paperItemService: PaperItemService,
    protected paperItemIdService: PaperItemIdService,
    protected paperCollectionService: PaperCollectionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ paperItem }) => {
      this.updateForm(paperItem);

      this.paperItemIdService
        .query({ filter: 'paperitem-is-null' })
        .pipe(
          map((res: HttpResponse<IPaperItemId[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IPaperItemId[]) => {
          if (!paperItem.paperitemIdId) {
            this.paperitemids = resBody;
          } else {
            this.paperItemIdService
              .find(paperItem.paperitemIdId)
              .pipe(
                map((subRes: HttpResponse<IPaperItemId>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IPaperItemId[]) => (this.paperitemids = concatRes));
          }
        });

      this.paperCollectionService.query().subscribe((res: HttpResponse<IPaperCollection[]>) => (this.papercollections = res.body || []));
    });
  }

  updateForm(paperItem: IPaperItem): void {
    this.editForm.patchValue({
      id: paperItem.id,
      title: paperItem.title,
      authors: paperItem.authors,
      venue: paperItem.venue,
      paperitemIdId: paperItem.paperitemIdId,
      paperCollectionId: paperItem.paperCollectionId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const paperItem = this.createFromForm();
    if (paperItem.id !== undefined) {
      this.subscribeToSaveResponse(this.paperItemService.update(paperItem));
    } else {
      this.subscribeToSaveResponse(this.paperItemService.create(paperItem));
    }
  }

  private createFromForm(): IPaperItem {
    return {
      ...new PaperItem(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      authors: this.editForm.get(['authors'])!.value,
      venue: this.editForm.get(['venue'])!.value,
      paperitemIdId: this.editForm.get(['paperitemIdId'])!.value,
      paperCollectionId: this.editForm.get(['paperCollectionId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPaperItem>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
