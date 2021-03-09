import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPaperCollection } from 'app/shared/model/ReferenceManagementContext/paper-collection.model';

type EntityResponseType = HttpResponse<IPaperCollection>;
type EntityArrayResponseType = HttpResponse<IPaperCollection[]>;

@Injectable({ providedIn: 'root' })
export class PaperCollectionService {
  public resourceUrl = SERVER_API_URL + 'services/referencemanagementcontext/api/paper-collections';

  constructor(protected http: HttpClient) {}

  create(paperCollection: IPaperCollection): Observable<EntityResponseType> {
    return this.http.post<IPaperCollection>(this.resourceUrl, paperCollection, { observe: 'response' });
  }

  update(paperCollection: IPaperCollection): Observable<EntityResponseType> {
    return this.http.put<IPaperCollection>(this.resourceUrl, paperCollection, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPaperCollection>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPaperCollection[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
