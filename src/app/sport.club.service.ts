import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Player} from './model/player';
import {environment} from '../environments/environment';

// dependency injection
@Injectable()
export class SportClubService {

  private apiUrl = environment.url + '/api/player/';

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  // dependency injection
  constructor(private http: HttpClient) {
  }

  getPlayer(id: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'get/' + id);
  }

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.apiUrl + 'all');
  }

  addPlayer(player: Player): Observable<any> {
    return this.http.post(this.apiUrl + 'add', JSON.stringify(player), this.httpOptions);
  }

  updatePlayer(player: Player): Observable<any> {
    return this.http.put(this.apiUrl + 'update/' + player.id, JSON.stringify(player), this.httpOptions);
  }

  deletePlayer(id: any): Observable<any> {
    return this.http.delete(this.apiUrl + 'delete/' + id.toString());
  }

  searchAge(age: any): Observable<Player[]> {
    return this.http.get<Player[]>(this.apiUrl + 'searchAge/' + age);
  }

  searchName(firstName: string, lastName: string): Observable<Player> {
    return this.http.get<Player>(this.apiUrl + 'searchName/' + firstName + '-' + lastName);
  }
}
