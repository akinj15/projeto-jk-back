import { Request, Response} from 'express';
import * as jwt from 'jsonwebtoken';
import config from "../../config"

const secret: string = config.db.tokenSecret || ""
export default (req: any, res: Response, next: any) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({error: 'Login is required'});
  }
  const [, token] = authorization.split(' ');
  try {
    const data: any = jwt.verify(token, secret);
    req.userId = data.id;
    req.userLogin = data.userLogin;
    return next();
  }catch (e) {
    return res.status(401).json({error: 'authorization fail', e})
  }
}
