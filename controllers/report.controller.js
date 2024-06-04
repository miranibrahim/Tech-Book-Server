const {
  getAllReports,
  getReportByProductId,
  createOrUpdateReport,
  deleteReportByProductId,
} = require("../models/report.model");

const getReports = async (req, res) => {
  const result = await getAllReports();
  res.send(result);
};

const getReport = async (req, res) => {
  const id = req.params.id;
  const result = await getReportByProductId(id);
  res.send(result);
};

const addOrUpdateReport = async (req, res) => {
  const reportItem = req.body;
  const result = await createOrUpdateReport(reportItem);
  res.send(result);
};

const removeReport = async (req, res) => {
  const id = req.params.id;
  const response = {};
  response.reportResult = await deleteReportByProductId(id);
  response.productResult = await deleteProduct(id);
  res.send(response);
};

module.exports = { getReports, getReport, addOrUpdateReport, removeReport };
