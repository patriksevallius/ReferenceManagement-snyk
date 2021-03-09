import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPaperItemId } from 'app/shared/model/ReferenceManagementContext/paper-item-id.model';

type EntityResponseType = HttpResponse<IPaperItemId>;
type EntityArrayResponseType = HttpResponse<IPaperItemId[]>;

@Injectable({ providedIn: 'root' })
export class PaperItemIdService {
  public resourceUrl = SERVER_API_URL + 'services/referencemanagementcontext/api/paper-item-ids';

  constructor(protected http: HttpClient) {}

  create(paperItemId: IPaperItemId): Observable<EntityResponseType> {
    return this.http.post<IPaperItemId>(this.resourceUrl, paperItemId, { observe: 'response' });
  }

  update(paperItemId: IPaperItemId): Observable<EntityResponseType> {
    return this.http.put<IPaperItemId>(this.resourceUrl, paperItemId, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPaperItemId>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPaperItemId[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
