const express = require('express');

const router = express.Router();

const uploadController = require("../Controllers/uploadController");
const authenticateUser = require('../Middleware/authenticateUser');

router.get("/getUploadDocuments",uploadController.getReportDocument);

router.get("/getDocuments",uploadController.getDocuments);

router.post("/uploadClaimMedia",uploadController.uploadClaimMedia);
         
router.post("/uploadDocument",uploadController.uploadDocumentV2);

router.post("/uploadManualDocument",uploadController.uploadDocument);

router.post("/uploadMedia", uploadController.uploadMedia);

router.post("/verifyReportUpload",authenticateUser, uploadController.verifyReportUpload);

module.exports = router;