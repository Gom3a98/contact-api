"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ContactController_1 = __importDefault(require("./controllers/ContactController"));
const router = express_1.default.Router();
const contactController = new ContactController_1.default;
router.get("/", (req, res) => {
    res.send("Welcome to Contact API");
});
router.get("/getAllContacts", contactController.getAllContacts);
router.get("/getContactByName", contactController.getContactByName);
router.get("/getContactByID", contactController.getContactByID);
router.get("/getContactByPhoneNumber", contactController.getContactByPhoneNumber);
router.delete("/deleteContact", contactController.deleteContact);
router.put("/updateContact", contactController.updateContact);
router.post("/saveContact", contactController.saveContact);
exports.default = router;
