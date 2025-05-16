import { Request, Response, NextFunction } from 'express';
import { User } from '../model/User';

export async function isAdmin(req: Request, res: Response, next: NextFunction): Promise<void> {
    if (!req.isAuthenticated()) {
      res.status(401).send("User is not logged in.");
      return;
    }

    const query = User.findById(req.user);
    query.then(user =>{
      if(user){
        if (user.role !== "admin") {
          res.status(403).send("Unauthorized.");
          return;
        }
      }else{
        res.status(500).send("Internal server error");
      }
    });
    
  
    next();
  }

  export async function isAdmin2(req: Request, res: Response, next: NextFunction): Promise<void> {
    if (!req.isAuthenticated()) {
      res.status(401).send(false);
      return;
    }

    const query = User.findById(req.user);
    query.then(user =>{
      if(user){
        if (user.role !== "admin") {
          res.status(403).send(false);
        }else{
          res.status(200).send(true);
        }
      }else{
        res.status(500).send(false);
      }
    });
    
  
    next();
  }