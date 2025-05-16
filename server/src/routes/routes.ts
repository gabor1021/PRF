import { Router, Request, Response, NextFunction } from 'express';
import { PassportStatic } from 'passport';
import { User, IUser } from '../model/User';
import { Rdate } from '../model/Rdate';
import { Gdate } from '../model/Gdate';
import bcrypt from 'bcrypt';
import { isAdmin, isAdmin2 } from '../auth/auth';
import { Pref } from '../model/Pref';

export const configureRoutes = (passport: PassportStatic, router: Router): Router => {

    router.post('/login', (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate('local', (error: string | null, user: typeof User) => {
            if (error) {
                console.log(error);
                res.status(500).send(error);
            } else {
                if (!user) {
                    res.status(400).send('User not found.');
                } else {
                    req.login(user, (err: string | null) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send('Internal server error.');
                        } else {
                            res.status(200).send(user);
                        }
                    });
                }
            }
        })(req, res, next);
    });

    router.post('/register', (req: Request, res: Response) => {
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;
        const phone = req.body.phone;
        const user = new User({email: email, password: password, name: name, phone: phone});
        user.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        })
    });

    router.put('/profile', async(req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const user = req.user as IUser;
            const {email, password, name, phone} = user
            let updatedUser: Partial<IUser> = {};
            if(req.body.email){
                updatedUser.email = req.body.email;
            }else updatedUser.email = email;
            if(req.body.password){
                try {
                    const salt = await bcrypt.genSalt(10);
                    const hashedPassword = await bcrypt.hash(req.body.password, salt);
                    updatedUser.password = hashedPassword;
                } catch (err) {
                    res.status(500).send(err);
                }
            }else updatedUser.password = password;
            if(req.body.name){
                updatedUser.name = req.body.name;
            }else updatedUser.name = name;
            if(req.body.phone){
                updatedUser.phone = req.body.phone;
            }else updatedUser.phone = phone;
            
            await User.findByIdAndUpdate(user,updatedUser,{new: true}).then(data => {
                res.status(200).send(data);
            }).catch(error => {
                res.status(500).send(error);
            })
        }else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.delete('/delete/:id', isAdmin, (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const id = req.params['id'];
            User.findByIdAndDelete(id).then(data => {
                res.status(200).send(data);
            }).catch(error => {
                res.status(500).send(error);
            })
        }else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.post('/logout', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            req.logout((error) => {
                if (error) {
                    console.log(error);
                    res.status(500).send('Internal server error.');
                }
                res.status(200).send('Successfully logged out.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.get('/getAllUsers', isAdmin, (req: Request, res: Response) => {
        if(req.isAuthenticated()){
            const query = User.find();
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error');
            })
        }else{
            res.status(500).send('User is not logged in');
        }
    });

    router.get('/checkAuth', (req: Request, res: Response) => {
        if(req.isAuthenticated()){
            res.status(200).send(true);
            
        }else{
            res.status(500).send(false);
        }
    });

    router.get('/checkAdmin', isAdmin2, (req: Request, res: Response) => {});

    router.get('/getAllRdates', (req: Request, res: Response) => {
        if(req.isAuthenticated()){
            const query = Rdate.find();
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error');
            })
        }else{
            res.status(500).send('User is not logged in');
        }
    });

    router.get('/getHist', (req: Request, res: Response) => {
        if(req.isAuthenticated()){
            const query = Gdate.find({guest: req.user});
            query.then(data => {
                console.log(data);
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error');
            })
        }else{
            res.status(500).send('User is not logged in');
        }
    });

    router.post('/addDate', (req: Request, res: Response) => {
        const date = req.body.date;
        let guestnum = req.body.guestnum;
        try{
            guestnum = parseInt(guestnum);
        }catch(err){
            console.log(err);
        }
        const rdate = new Rdate({date,guestnum});
        rdate.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        })
    });

    router.post('/genDates', (req: Request, res: Response) => {
        console.log(req.body.date)
        const rdate = new Rdate({date: req.body.date});
        rdate.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        })
    });

    router.post('/reserveTable', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const id = req.body.id;
            const user_id = req.user;
            const query = Rdate.findById(id);
            query.then(data => {
                if(data){
                    if(data.guestnum === 0){
                        res.status(500).send('Reservation unavailable.')
                    }else{
                        Rdate.findByIdAndUpdate(id,{ $inc:{guestnum: -1}},{new: true}).catch(error => {
                            res.status(500).send(error);
                        });
                        const gdate = new Gdate({date: data.date,guest: user_id});
                        gdate.save().then(data =>{
                            res.status(200).send(data);
                        }).catch(error =>{
                            res.status(500).send(error);
                        });
                    }
                }else{
                    console.log("Reservation unavailable.");
                }
            }).catch(error => {
                res.status(500).send(error);
            });
        }else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.delete('/deleteDate/:id', isAdmin, (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const id = req.params['id'];
            Rdate.findByIdAndDelete(id).then(data => {
                res.status(200).send(data);
            }).catch(error => {
                res.status(500).send(error);
            })
        }else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.post('/addPref', (req: Request, res: Response) => {
        const spec_request = req.body.spec_request;
        const description = req.body.description;
        
        const pref = new Pref({spec_request,description});
        pref.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        })
    });

    router.get('/getAllPrefs', (req: Request, res: Response) => {
        if(req.isAuthenticated()){
            const query = Pref.find();
            query.then(data => {
                console.log(data);
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error');
            })
        }else{
            res.status(500).send('User is not logged in');
        }
    });

    router.delete('/deletePref/:id', isAdmin, (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const id = req.params['id'];
            Pref.findByIdAndDelete(id).then(data => {
                res.status(200).send(data);
            }).catch(error => {
                res.status(500).send(error);
            })
        }else {
            res.status(500).send('User is not logged in.');
        }
    });

    return router;
}