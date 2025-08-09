import { UserRepository } from '../../domain/interfaces/UserRepository';
import { UserEntity } from '../../domain/entities/UserEntity';
import UserModel from '../../domain/User';

export class MongooseUserRepository implements UserRepository {
  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await UserModel.findOne({ email });
    if (!user) return null;

    return {
      id: user._id.toString(),
      firebaseUid: user.firebaseUid,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      passwordHash: user.passwordHash,
      role: user.role,
      phone: user.phone,
    };
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = await UserModel.findById(id);
    if (!user) return null;

    return {
      id: user._id.toString(),
      firebaseUid: user.firebaseUid,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      passwordHash: user.passwordHash,
      role: user.role,
      phone: user.phone,
    };
  }

  async save(user: UserEntity): Promise<UserEntity> {
    const newUser = new UserModel({
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      passwordHash: user.passwordHash,
      role: user.role,
      firebaseUid: user.firebaseUid,
      phone: user.phone,
    });

    const savedUser = await newUser.save();

    return {
      id: savedUser._id.toString(),
      firebaseUid: savedUser.firebaseUid,
      name: savedUser.name,
      lastName: savedUser.lastName,
      email: savedUser.email,
      passwordHash: savedUser.passwordHash,
      role: savedUser.role,
      phone: savedUser.phone,
    };
  }
}


