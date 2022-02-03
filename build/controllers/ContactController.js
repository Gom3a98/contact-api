"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../config/logger"));
const Contact_1 = __importDefault(require("../models/Contact"));
const formidable_1 = __importDefault(require("formidable"));
const fs_extra_1 = __importDefault(require("fs-extra"));
var contact = new Contact_1.default;
class ContactController {
    getAllContacts(req, res) {
        contact.getAllContacts((error, results) => {
            if (!error) {
                logger_1.default.info("All Contacts is Retrieved");
                res.status(200).json(results.rows);
            }
            else {
                logger_1.default.error(error);
                res.status(500).send(error);
                throw error;
            }
        });
    }
    getContactByName(req, res) {
        contact.getContactByName(req.body.name, (error, results) => {
            if (!error) {
                if (results.rows.length > 0) {
                    logger_1.default.info(`Contact with name ${results.rows[0].name} is retrieved`);
                    res.status(200).json(results.rows[0]);
                }
                else {
                    res.status(200).send("No Contacts is matched");
                }
            }
            else {
                logger_1.default.error(error);
                res.status(500).send(error);
                throw error;
            }
        });
    }
    getContactByID(req, res) {
        contact.getContactById(req.body.ID, (error, results) => {
            if (!error) {
                if (results.rows.length > 0) {
                    logger_1.default.info(`Contact with name ${results.rows[0].name} is retrieved`);
                    res.status(200).json(results.rows[0]);
                }
                else {
                    res.status(200).send("No Contacts is matched");
                }
            }
            else {
                logger_1.default.error(error);
                res.status(500).send(error);
                throw error;
            }
        });
    }
    getContactByPhoneNumber(req, res) {
        contact.getContactByPhoneNumber(req.body.phoneNumber, (error, results) => {
            if (!error) {
                if (results.rows.length > 0) {
                    logger_1.default.info(`Contact with name ${results.rows[0].name} is retrieved`);
                    res.status(200).json(results.rows);
                }
                else {
                    res.status(200).send("No Contacts is matched");
                }
            }
            else {
                logger_1.default.error(error);
                res.status(500).send(error);
                throw error;
            }
        });
    }
    deleteContact(req, res) {
        contact.deleteContact(req.body.ID, (error, results) => {
            if (!error) {
                console.log(results);
                if (results.rowCount > 0) {
                    logger_1.default.info(`there is one Contact is Deleted`);
                    res.status(200).json({ message: "one Contact is deleted" });
                }
                else {
                    res.status(200).json({ message: "No Contacts is matched" });
                }
            }
            else {
                logger_1.default.error(error);
                res.status(500).send(error);
                throw error;
            }
        });
    }
    updateContact(req, res) {
        var form = new formidable_1.default.IncomingForm();
        form.parse(req, function (err, fields, files) {
            var oldpath = files.image.path;
            var newpath = '/public/uploads/' + fields.name + ".jpg";
            var absPath = fields.name + ".jpg";
            fs_extra_1.default.removeSync(newpath);
            contact = new Contact_1.default(fields.ID, fields.name, fields.email, absPath, fields.phoneNumber, fields.countryCode, fields.isFavorite);
            fs_extra_1.default.move(oldpath, newpath, function (err) {
                if (err)
                    throw err;
                contact.updateContact(fields.ID, (error, results) => {
                    if (results.rowCount > 0)
                        res.status(200).json({ message: "Contact Updated Successfuly" });
                    else
                        res.status(200).json({ message: "No Contacts matched" });
                });
            });
        });
    }
    saveContact(req, res) {
        var form = new formidable_1.default.IncomingForm();
        form.parse(req, function (err, fields, files) {
            var oldpath = files.image.filepath;
            var newpath = '/public/uploads/' + fields.name + ".jpg";
            var absPath = fields.name + ".jpg";
            fs_extra_1.default.removeSync(newpath);
            contact = new Contact_1.default(0, fields.name, fields.email, absPath, fields.phoneNumber, fields.countryCode, fields.isFavorite);
            fs_extra_1.default.move(oldpath, newpath, function (err) {
                if (err)
                    throw err;
                contact.saveContact((error, results) => {
                    if (results.rowCount > 0)
                        res.status(200).json({ message: "Contact Created Successfuly" });
                    else
                        res.status(200).json({ message: error });
                });
            });
        });
    }
}
exports.default = ContactController;
