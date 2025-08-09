/* import { UserEntity } from '../entities/UserEntity';

export interface UserRepository {
  findByEmail(email: string): Promise<UserEntity | null>;
  save(user: UserEntity): Promise<UserEntity>;
} */


  import { UserEntity } from '../entities/UserEntity';

export interface UserRepository {
  findByEmail(email: string): Promise<UserEntity | null>;
  findById(userId: string): Promise<UserEntity | null>; // ← método agregado
  save(user: UserEntity): Promise<UserEntity>;
}
