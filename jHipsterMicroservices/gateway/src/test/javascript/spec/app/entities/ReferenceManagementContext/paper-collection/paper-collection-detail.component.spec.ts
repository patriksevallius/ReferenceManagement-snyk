import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { PaperCollectionDetailComponent } from 'app/entities/ReferenceManagementContext/paper-collection/paper-collection-detail.component';
import { PaperCollection } from 'app/shared/model/ReferenceManagementContext/paper-collection.model';

describe('Component Tests', () => {
  describe('PaperCollection Management Detail Component', () => {
    let comp: PaperCollectionDetailComponent;
    let fixture: ComponentFixture<PaperCollectionDetailComponent>;
    const route = ({ data: of({ paperCollection: new PaperCollection(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [PaperCollectionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(PaperCollectionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PaperCollectionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load paperCollection on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.paperCollection).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
