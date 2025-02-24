const mongoose = require("mongoose");
const InvoiceCounter = require("../model/InvoiceCounterModel");
const Invoice = require("../model/InvoiceModel");
const connectDb = require("../db/mongoConnection");
const invoiceData = require("./InvoiceData");
const policyDataArray = require("./policyData");
const Counter = require("../model/policyCounter");
const Policy = require("../model/Policies");

// const generateInvoiceId = async () => {
//   const counter = await InvoiceCounter.findOneAndUpdate(
//     { name: "invoiceId" },
//     { $inc: { count: 1 } },
//     { new: true, upsert: true }
//   );

//   const prefix = "WS-360";
//   const paddedCount = String(counter.count).padStart(3, "0");
//   return `${prefix}-${paddedCount}`;
// };

// const insertInvoices = async () => {
//   await connectDb()
//   try {
//     const invoices = await Promise.all(
//       invoiceData.map(async (invoiceData) => {
//         const invoiceId = await generateInvoiceId();
//         console.log(`Generated Invoice ID: ${invoiceId}`);
//         const { createdAt, ...otherData } = invoiceData;
//         const isoCreatedAt = new Date(createdAt.split("-").reverse().join("-")).toISOString();

//         return {
//           invoiceId,
//           invoicestatus: "approved",
//           createdAt: isoCreatedAt,
//           createdBy: "66e14cd3abf17b2cf9cebb94",
//           ...otherData,
//         };
//       })
//     );

//     console.log("Inserting invoices into the database...");
//     await Invoice.insertMany(invoices);
//     console.log("Invoices added successfully.");
//     return { success: true, message: "Invoices added successfully" };
//   } catch (error) {
//     console.error("Error inserting invoices:", error);
//     return { success: false, message: error.message };
//   } finally {
//     console.log("Closing database connection...");
//     mongoose.connection.close();
//   }
// };
// insertInvoices()


// const generatePolicyId = async () => {
//   const currentYear = new Date().getFullYear();
//   const counter = await Counter.findOneAndUpdate(
//     { name: "policyId" },
//     { $inc: { count: 1 } },
//     { new: true, upsert: true }
//   );

//   const nextPolicyNumber = counter.count;
//   return `360-RG-${currentYear}-${nextPolicyNumber.toString().padStart(4, "0")}`;
// };

// const insertPolicies = async () => {
//   await connectDb();
//   console.log("Mongoose Connection State:", mongoose.connection.readyState);

//   try {
//     const policies = [];
//     for (const policyData of policyDataArray) {
//       const policyId = await generatePolicyId();
//       console.log("Generated Policy ID:", policyId);

//       const { createdAt, ...otherData } = policyData;
//       const isoCreatedAt = new Date(createdAt.split("-").reverse().join("-")).toISOString();
//       console.log("Converted createdAt to ISO format:", isoCreatedAt);

//       policies.push({
//         policyId,
//         policyType: "MB",
//         policyStatus: "approved",
//         approvedAt: new Date(),
//         createdAt: isoCreatedAt,
//         userId: "66e14cd3abf17b2cf9cebb94",
//         ...otherData,
//       });
//     }

//     console.log("Final Policies to Insert:", policies.length);

//     const chunkSize = 50;
//     for (let i = 0; i < policies.length; i += chunkSize) {
//       await Policy.insertMany(policies.slice(i, i + chunkSize));
//       console.log(`Inserted batch ${i / chunkSize + 1}/${Math.ceil(policies.length / chunkSize)}`);
//     }

//     console.log("Policies inserted successfully");
//     return { success: true, message: "Policies added successfully" };
//   } catch (error) {
//     console.error("Insertion error:", error.message);
//     return { success: false, message: error.message };
//   } finally {
//     setTimeout(() => {
//       console.log("Closing database connection...");
//       mongoose.connection.close();
//     }, 5000);
//   }
// };

// insertPolicies();
