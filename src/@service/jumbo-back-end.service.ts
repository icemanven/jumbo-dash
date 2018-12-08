import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BackEndConst} from '@configs/constantes';
import {Usuario} from '@configs/interfaces';

@Injectable({
  providedIn: 'root'
})
export class JumboBackEndService {

  constructor(
      private http: HttpClient,
  ) { } // getCurrentUser


  public getUserByUsername (username: string): Promise<Usuario> {
      return this.http.get<Usuario>(`${BackEndConst.backEndUrl}${BackEndConst.endPoints.usuarios}/${username}`)
          .toPromise();
  }

  public saveNewUser (usuario: Usuario): Promise<Usuario> {
      return this.http.post<Usuario>(`${BackEndConst.backEndUrl}${BackEndConst.endPoints.usuarios}`,
          usuario).toPromise();
  }
}
