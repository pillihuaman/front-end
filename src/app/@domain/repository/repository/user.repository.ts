import { Observable } from 'rxjs';
import { User } from '../../../@data/model/User/user';


export abstract class UserRepository {
  abstract getusers(): Observable<User[]>;
  abstract registerUser(user: User): Observable<User[]>;
}
