import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import FakeEmailProvider from '@shared/container/providers/MailProvider/fakes/FakeEmailProvider';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

describe('SendForgotPasswordEmailService', () => {
  it('should be able to recover the password sending an email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeEmailProvider = new FakeEmailProvider();

    const sendEmail = jest.spyOn(fakeEmailProvider, 'sendEmail');

    const sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeEmailProvider,
    );

    await fakeUsersRepository.create({
      name: 'Someone',
      email: 'someone@example.com',
      password: '123456'
    })

    await sendForgotPasswordEmailService.execute({
      email: 'someone@example.com',
    });

    expect(sendEmail).toHaveBeenCalled();
  });


});
