"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../config/logger"));
const connect_1 = __importDefault(require("../config/connect"));
class Contact {
    constructor(id = 0, name = '', email = '', image = '', phoneNumber = '', country_code = 0, isFavorite = true) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.image = image;
        this.phoneNumber = phoneNumber;
        this.country_code = country_code;
        this.isFavorite = isFavorite;
    }
    getAllContacts(callback) {
        let sql = "select * from Contact order by contact_name ASC";
        connect_1.default.query(sql, callback);
        logger_1.default.info("All Contacts is Retrieved");
    }
    getContactByName(name, callback) {
        let sql = "select * from Contact where contact_name like $1";
        connect_1.default.query(sql, [name], callback);
    }
    getContactById(id, callback) {
        let sql = "select * from Contact where id = $1";
        connect_1.default.query(sql, [id], callback);
    }
    getContactByPhoneNumber(phoneNumber, callback) {
        let sql = "select * from Contact where phone_number = $1";
        connect_1.default.query(sql, [phoneNumber], callback);
    }
    saveContact(callback) {
        let sql = "INSERT INTO Contact (contact_name, email , contact_image ,phone_number, country_code, isfavorite) VALUES ($1,$2,$3,$4,$5 , $6)";
        connect_1.default.query(sql, [this.name, this.email, this.image, this.phoneNumber, this.country_code, this.isFavorite], callback);
    }
    deleteContact(id, callback) {
        const sql = "DELETE FROM Contact WHERE id = $1";
        connect_1.default.query(sql, [id], callback);
    }
    updateContact(id, callback) {
        let sql = "UPDATE Contact SET contact_name = $1 ,email = $2 , contact_image = $3 ,phone_number = $4 , country_code = $5 , isfavorite = $6 WHERE ID= $7";
        connect_1.default.query(sql, [this.name, this.email, this.image, this.phoneNumber, this.country_code, this.isFavorite, id], callback);
    }
    toggleIsFavorite(status, id, callback) {
        let sql = "UPDATE Contact SET isfavorite = $1 where id = $2";
        connect_1.default.query(sql, [status, id], callback);
    }
}
exports.default = Contact;
//# sourceMappingURL=Contact.js.map