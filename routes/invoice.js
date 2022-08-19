"use strict";

const express = require("express");
const router = express.Router();

const InvoiceController = require("../controllers/invoicecontroller");
const invoiceController = new InvoiceController();

router.get("/api/healthcheck/readiness", (req, res) => {
  res.json({
    status: "ok",
  });
});

router.post("/api/invoice", async (req, res) => {
  try {
    const data = {
      external_id: `checkout-demo-${+new Date()}`,
      currency: "Rp.",
      amount: req.body.amount,
      payer_email: "invoice+demo@xendit.co",
      description: "Checkout Demo",
      failure_redirect_url: req.body.redirect_url,
      success_redirect_url: req.body.redirect_url,
    };

    const invoice = await invoiceController.create(data);
    return res.status(200).send(invoice.data);
  } catch (error) {
    return res.status(error.response.status).send(error.response.data);
  }
});

module.exports = router;
