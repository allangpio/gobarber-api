import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateUserAvatar from './UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {
  it('should be able to update user avatar', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatar(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'Someone',
      email: 'someone@example.com',
      password: 'test123'
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    })

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should not be able to update a non existing user avatar', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatar(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    expect(updateUserAvatar.execute({
      user_id: 'non-existing-user',
      avatarFilename: 'avatar.jpg',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should be delete old avatar on update', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUserAvatar = new UpdateUserAvatar(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'Someone',
      email: 'someone@example.com',
      password: 'test123'
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg')
    expect(user.avatar).toBe('avatar2.jpg');
  });

});
