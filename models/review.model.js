const { client, ObjectId } = require("../config/db");
const reportCollection = client.db("TechBookDB").collection("reports");

const getAllReports = async () => await reportCollection.find().toArray();
const getReportByProductId = async (productId) => await reportCollection.findOne({ product_id: productId });
const createOrUpdateReport = async (reportItem) => {
  const { product_id, product_name, user_email } = reportItem;
  const existingReport = await reportCollection.findOne({ product_id });

  if (existingReport) {
    return await reportCollection.updateOne(
      { product_id },
      { $addToSet: { user_emails: user_email }, $inc: { reportCount: 1 } }
    );
  } else {
    return await reportCollection.insertOne({
      product_id,
      product_name,
      user_emails: [user_email],
      reportCount: 1,
    });
  }
};
const deleteReportByProductId = async (productId) => await reportCollection.deleteOne({ product_id: productId });

module.exports = { getAllReports, getReportByProductId, createOrUpdateReport, deleteReportByProductId };
