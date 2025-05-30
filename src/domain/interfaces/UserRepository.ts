import { UserEntity } from '../entities/UserEntity';

export interface UserRepository {
  findByEmail(email: string): Promise<UserEntity | null>;
  save(user: UserEntity): Promise<UserEntity>;
}
