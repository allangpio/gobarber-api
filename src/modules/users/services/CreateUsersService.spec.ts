import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(
      fakeUsersRepository
    );

    const user = await createUser.execute({
      name: 'Someone',
      email: 'someone@example.com',
      password: 'test123'
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with an already registered email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(
      fakeUsersRepository
    );

    await createUser.execute({
      name: 'Someone',
      email: 'someone@example.com',
      password: 'test123'
    });

    expect(createUser.execute({
      name: 'Someone',
      email: 'someone@example.com',
      password: 'test123'
    })).rejects.toBeInstanceOf(AppError);
  });
});
