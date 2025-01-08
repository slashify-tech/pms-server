const { getDocumentData, updateDocumentStatus, getStatusRequestForAgent, sendPolicyPdf, CustomerApproval } = require("../controllers/document.controller")



module.exports = (app)=>{
    app.patch('/api/v1/document-status-update', updateDocumentStatus)
    app.patch('/api/v1/customer-document-approval', sendPolicyPdf) // send by admin
    app.patch('/api/v1/customer-approval', CustomerApproval) //approved by customer

    app.get('/api/v1/all-document', getDocumentData)
    app.get('/api/v1/agent-document-approval', getStatusRequestForAgent)



}