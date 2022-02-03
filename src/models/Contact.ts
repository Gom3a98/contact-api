import logger from '../config/logger';
import DB from '../config/connect';
export default class Contact {
    private id: Number;
    private name: String;
    private email: String;
    private image: String;
    private phoneNumber: String;
    private country_code: Number;
    private isFavorite: Boolean;

    constructor(id: Number = 0, name: String = '', email: String = '', image: String = '',
        phoneNumber: String = '', country_code: Number = 0, isFavorite: Boolean = true) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.image = image;
        this.phoneNumber = phoneNumber;
        this.country_code = country_code;
        this.isFavorite = isFavorite;
    }
    getAllContacts(callback: Function) {
        let sql = "select * from Contact order by name ASC";
        DB.query(sql, callback)
        logger.info("All Contacts is Retrieved")

    }
    getContactByName(name: String, callback: Function) {
        let sql = "select * from Contact where name like $1";
        DB.query(sql, [name], callback);
        
    }
    getContactById(id: Number, callback: Function) {
        let sql = "select * from Contact where id = $1";
        DB.query(sql, [id], callback);
    }
    getContactByPhoneNumber(phoneNumber: String, callback: Function) {
        let sql = "select * from Contact where phone_number = $1";
        DB.query(sql, [phoneNumber], callback);
    }
    saveContact(callback: Function) {
        let sql = "INSERT INTO Contact (name, email , image ,phone_number, country_code, isFavorite) VALUES ($1,$2,$3,$4,$5 , $6)";
        DB.query(sql, [this.name, this.email, this.image, this.phoneNumber, this.country_code, this.isFavorite], callback)
    }
    deleteContact(id: Number, callback: Function) {
        const sql = "DELETE FROM Contact WHERE id = $1";
        DB.query(sql,[id], callback);
    }
    updateContact(id: Number, callback: Function) {
        let sql = "UPDATE Contact SET name = $1 ,email = $2 , image = $3 ,phone_number = $4 , country_code = $5 , isFavorite = $6 WHERE ID= $7";
        DB.query(sql, [this.name, this.email, this.image, this.phoneNumber, this.country_code, this.isFavorite , id], callback);
    }
    toggleIsFavorite(status: Boolean, id: String, callback: Function) {
        let sql = "UPDATE Contact SET isFavorite = $1 where ID = $2";
        DB.query(sql, [status, id], callback);
    }
}