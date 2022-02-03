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
        logger_1.default.info("New Contact is created!!");
    }
    getAllContacts(callback) {
        let sql = "select * from Contact order by name ASC";
        connect_1.default.query(sql, callback);
    }
    getContactByName(name, callback) {
        let sql = "select * from Contact where name like $1";
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
        let sql = "INSERT INTO Contact (name, email , image ,phoneNumber, country_code, isFavorite) VALUES ($1,$2,$3,$4,$5 , $6)";
        connect_1.default.query(sql, [this.name, this.email, this.image, this.phoneNumber, this.country_code, this.isFavorite], callback);
    }
    deleteContact(id, callback) {
        const sql = "DELETE FROM Contact WHERE id = $1";
        connect_1.default.query(sql, [id], callback);
    }
    updateContact(id, callback) {
        let sql = "UPDATE Contact SET name = $1 ,email = $2 , image = $3 ,phoneNumber = $4 , country_code = $5 , isFavorite = $6 WHERE ID= $7";
        connect_1.default.query(sql, [this.name, this.email, this.image, this.phoneNumber, this.country_code, this.isFavorite, id], callback);
    }
    toggleIsFavorite(status, id, callback) {
        let sql = "UPDATE Contact SET isFavorite = $1 where ID = $2";
        connect_1.default.query(sql, [status, id], callback);
    }
}
exports.default = Contact;
