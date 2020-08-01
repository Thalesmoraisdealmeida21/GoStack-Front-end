import {container} from 'tsyringe';
import UpdateUserAvatar from '@modules/users/services/UpdateUserAvatarService';
import {Request, Response} from 'express';



export default class AvatarController {
  public async update(request: Request, response: Response): Promise<Response>{
    const updateUserAvatar = container.resolve(UpdateUserAvatar);

    const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename
    })

    return response.json(user)
  }
}
