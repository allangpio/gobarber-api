import { injectable, inject } from 'tsyringe';

//import User from '../infra/typeorm/entities/User';
//import AppError from '../../../shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IEmailProvider from '@shared/container/providers/MailProvider/models/IEmailProvider';


interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('EMailProvider')
    private emailProvider: IEmailProvider,
  ) { }
  public async execute({ email }: IRequest): Promise<void> {
    this.emailProvider.sendEmail(email, 'Pedido de recuperação de senha recebido.')
  }
}

export default SendForgotPasswordEmailService;
