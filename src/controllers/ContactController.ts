import { Request , Response , NextFunction } from "express";
import logger from '../config/logger';
import Contact from "../models/Contact";
import formidable from "formidable";
import fs from "fs-extra";
var contact : Contact = new Contact;

export default class ContactController {

    getAllContacts(req : Request , res : Response ){
        contact.getAllContacts((error : String , results : any)=>{
            if (!error){
                res.status(200).json(results.rows);

            }
            else {
                logger.error(error)
                res.status(500).send(error);
                throw error;
            }
        })
    }
    getContactByName(req : Request , res : Response){
        contact.getContactByName(req.body.name , (error : String , results : any)=>{
            if (!error){
                if (results.rows.length > 0){
                    logger.info(`Contact with name ${results.rows[0].contact_name} is retrieved`)
                    res.status(200).json(results.rows[0]);
                }
                else {

                    res.status(200).send("No Contacts is matched")
                }

            }
            else {
                logger.error(error)
                res.status(500).send(error);
                throw error;
            } 
        })
    }
    getContactByID(req : Request , res : Response){
        contact.getContactById(req.body.ID , (error : String , results : any)=>{
            if (!error){
                if (results.rows.length > 0){
                    logger.info(`Contact with name ${results.rows[0].name} is retrieved`)
                    res.status(200).json(results.rows[0]);
                }
                else {
                    res.status(200).send("No Contacts is matched")
                }

            }
            else {
                logger.error(error)
                res.status(500).send(error);
                throw error;
            } 
        })
    }
    getContactByPhoneNumber(req : Request , res : Response){
        contact.getContactByPhoneNumber(req.body.phoneNumber , (error : String , results : any)=>{
            if (!error){
                if (results.rows.length > 0){
                    logger.info(`Contact with name ${results.rows[0].name} is retrieved`)
                    res.status(200).json(results.rows);
                }
                else {
                    res.status(200).send("No Contacts is matched")
                }

            }
            else {
                logger.error(error)
                res.status(500).send(error);
                throw error;
            } 
        })
    }
    deleteContact(req : Request , res : Response){
        contact.deleteContact(req.body.ID , (error : String , results : any)=>{
            if (!error){
                if (results.rowCount > 0){
                    logger.info(`there is one Contact is Deleted`)
                    res.status(200).json({message : "one Contact is deleted"});
                }
                else {
                    res.status(200).json({message : "No Contacts is matched"})
                }

            }
            else {
                logger.error(error)
                res.status(500).send(error);
                throw error;
            } 
        })
    }
    updateContact(req : Request , res : Response){
        var form = new formidable.IncomingForm();
			form.parse(req, function (err : String, fields : any, files : any) {
				var oldpath = files.image.filepath;
				var newpath = 'public/uploads/' + fields.name +".jpg";
				var absPath = fields.name+".jpg";
				fs.removeSync(newpath);
                contact = new Contact(fields.ID , fields.name , fields.email , absPath ,
                                 fields.phoneNumber , fields.countryCode , fields.isFavorite);
				fs.move(oldpath, newpath, function (err : Error) {
					if (err) throw err;
					 	contact.updateContact(fields.ID ,(error : String , results : any)=>{
                            if (results.rowCount > 0){
                                logger.info(`there is one Contact is Updated`)
                                res.status(200).json({message : "Contact Updated Successfuly"});
                            }
                            else
                                res.status(200).json({message : "No Contacts matched"});
                         });
				});
			})
    }
    saveContact(req : Request , res : Response){
        var form = new formidable.IncomingForm();
			form.parse(req, function (err : String, fields : any, files : any) {
				var oldpath = files.image.filepath;
				var newpath = 'public/uploads/' + fields.name +".jpg";
				var absPath = fields.name+".jpg";
				fs.removeSync(newpath);
                contact = new Contact(0,fields.name , fields.email , absPath ,
                                 fields.phoneNumber , fields.countryCode , fields.isFavorite);
				fs.move(oldpath, newpath, function (err : Error) {
					if (err) throw err;
					 	contact.saveContact((error : String , results : any)=>{
                            if (results.rowCount > 0){
                                logger.info(`there is one Contact is Created`)
                                res.status(200).json({message : "Contact Created Successfuly"});

                            }
                            else
                                res.status(200).json({message : error});
                         });
				});
			})
    }


}