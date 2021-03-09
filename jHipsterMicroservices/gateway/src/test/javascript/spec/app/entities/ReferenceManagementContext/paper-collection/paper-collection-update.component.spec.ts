import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { PaperCollectionUpdateComponent } from 'app/entities/ReferenceManagementContext/paper-collection/paper-collection-update.component';
import { PaperCollectionService } from 'app/entities/ReferenceManagementContext/paper-collection/paper-collection.service';
import { PaperCollection } from 'app/shared/model/ReferenceManagementContext/paper-collection.model';

describe('Component Tests', () => {
  describe('PaperCollection Management Update Component', () => {
    let comp: PaperCollectionUpdateComponent;
    let fixture: ComponentFixture<PaperCollectionUpdateComponent>;
    let service: PaperCollectionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [PaperCollectionUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(PaperCollectionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PaperCollectionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PaperCollectionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PaperCollection(123);
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
        const entity = new PaperCollection();
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
