var braintree = require("braintree");

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "sfy95p7fvftt2mrd",
  publicKey: "8dbkk5pbcgjjjn9r",
  privateKey: "08d454fa97601430102abfbe2c4d813a"
});


exports.getToken =(req,res)=>{
    gateway.clientToken.generate({}, function (err, response) {
        if (err) {
            res.status(500).send(err)
        }else{
            res.send(response);
        }
      });
}

exports.processPayment = (req,res)=>{
    let nonceFromTheClient = req.body.paymentMethodNonce

    let amountFromTheClient = req.body.amount
    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, function (err, result) {
          if(err){
            res.status(500).json(err)
          }else{
              res.json(result)
          }
      });
        
}