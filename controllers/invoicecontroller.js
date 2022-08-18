const axios = require("axios");

class InvoiceController {
  constructor() {
    (this.url = "https://api.xendit.co/v2/invoices"),
      (this.headers = {
        "Content-Type": "application/json",
      }),
      (this.auth = {
        username:
          "xnd_development_KSBvwkzCbaXOJLnQzkfN1Od2HxVPuTzoozgsHa42IVC0WUhUHWqGt0Ca4NfodwH",
        password: "",
      });
    this.timeout = 10000;
  }

  async create(data) {
    const options = {
      method: "POST",
      headers: this.headers,
      timeout: this.timeout,
      auth: this.auth,
      url: this.url,
      data,
    };

    try {
      return await axios(options);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = InvoiceController;
