import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPaperItemId, PaperItemId } from 'app/shared/model/ReferenceManagementContext/paper-item-id.model';
import { PaperItemIdService } from './paper-item-id.service';

@Component({
  selector: 'jhi-paper-item-id-update',
  templateUrl: './paper-item-id-update.component.html',
})
export class PaperItemIdUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
  });

  constructor(protected paperItemIdService: PaperItemIdService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ paperItemId }) => {
      this.updateForm(paperItemId);
    });
  }

  updateForm(paperItemId: IPaperItemId): void {
    this.editForm.patchValue({
      id: paperItemId.id,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const paperItemId = this.createFromForm();
    if (paperItemId.id !== undefined) {
      this.subscribeToSaveResponse(this.paperItemIdService.update(paperItemId));
    } else {
      this.subscribeToSaveResponse(this.paperItemIdService.create(paperItemId));
    }
  }

  private createFromForm(): IPaperItemId {
    return {
      ...new PaperItemId(),
      id: this.editForm.get(['id'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPaperItemId>>): void {
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
}
