import express , { Express , Request , Response, Router } from "express";
import ContactController from "./controllers/ContactController";
const router : Router =  express.Router();
const contactController = new ContactController;
router.get("/" , (req : Request , res : Response)=>{
    res.send("Welcome to Contact API")
});



router.get("/getAllContacts" , contactController.getAllContacts);
router.get("/getContactByName" , contactController.getContactByName)
router.get("/getContactByID" , contactController.getContactByID)
router.get("/getContactByPhoneNumber" , contactController.getContactByPhoneNumber);


router.delete("/deleteContact" , contactController.deleteContact)
router.put("/updateContact" , contactController.updateContact);
router.post("/saveContact" , contactController.saveContact);

export default router;
