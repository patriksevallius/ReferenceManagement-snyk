import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { PaperItemIdUpdateComponent } from 'app/entities/ReferenceManagementContext/paper-item-id/paper-item-id-update.component';
import { PaperItemIdService } from 'app/entities/ReferenceManagementContext/paper-item-id/paper-item-id.service';
import { PaperItemId } from 'app/shared/model/ReferenceManagementContext/paper-item-id.model';

describe('Component Tests', () => {
  describe('PaperItemId Management Update Component', () => {
    let comp: PaperItemIdUpdateComponent;
    let fixture: ComponentFixture<PaperItemIdUpdateComponent>;
    let service: PaperItemIdService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [PaperItemIdUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(PaperItemIdUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PaperItemIdUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PaperItemIdService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PaperItemId(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new PaperItemId();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
