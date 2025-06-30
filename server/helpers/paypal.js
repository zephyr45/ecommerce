const paypal = require("paypal-rest-sdk");
paypal.configure({
  'mode': 'sandbox', // or 'live'
  'client_id': 'AenDtjSuehmD8D_5yWqrha33unFROtQPd-nlGyutz4_fcg8F-SXYOjBI31b-DWv5Z6HKItGYBFFQ9jM8',
  'client_secret': 'EOVq94puN7606Sqj6mWDsH2T6ImzkTMUR92KctZQVsNWQPBWXSLs7wy9k6sUUurn4aDZuz0pZwq_4epI'
});
module.exports = paypal;
