const { addInvoice, editInvoice, getAllInvoice, invoiceApproval, getInvoicesByStatus, invoiceById, invoiceResubmit } = require("../controllers/invoice.Controller")



module.exports = (app) =>{
    app.post('/api/v1/add-invoice', addInvoice);
    app.patch('/api/v1/update-invoice', editInvoice);
    app.patch('/api/v1/update-approval', invoiceApproval);
    app.get('/api/v1/all-invoice-approval', getAllInvoice);
    app.get('/api/v1/invoice-all', getInvoicesByStatus);
    app.get('/api/v1/invoice', invoiceById);
    app.patch('/api/v1/invoice-resubmit', invoiceResubmit);
    



    

}