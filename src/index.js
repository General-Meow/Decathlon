const bent = require("bent");
const sgMail = require('@sendgrid/mail')

const getJSON = bent("json");
const sendgridkey = process.env.SENDGRID_API_KEY
console.log(`using key ${sendgridkey}`)
sgMail.setApiKey(sendgridkey)

// 20kg weights: https://www.decathlon.co.uk/p/weight-training-dumbbell-kit-20-kg/_/R-p-171339
//
//     sku id: 2524420
//
// store locator:
//     https://www.decathlon.co.uk/en/ajax/rest/model/com/decathlon/cube/commerce/inventory/InventoryActor/getStoreAvailability?storeIds=0070024000240%2C0070207902079%2C0070104001040%2C0070202002020%2C0070097400974%2C0070158801588%2C0070159101591%2C0070208402084%2C0070038700387%2C0070157401574&skuId=2524420&modelId=8491831&displayStoreDetails=false
//
//         surrey quays store id: 0070024000240
//
// stock for 20kg weights: https://www.decathlon.co.uk/en/ajax/rest/model/com/decathlon/cube/commerce/inventory/InventoryActor/getStoreAvailability?storeIds=0070024000240%2C0070207902079%2C0070104001040%2C0070202002020%2C0070097400974%2C0070158801588%2C0070159101591%2C0070208402084%2C0070038700387%2C0070157401574&skuId=2524420&modelId=8491831&displayStoreDetails=false

//10kg weights: https://www.decathlon.co.uk/en/ajax/rest/model/com/decathlon/cube/commerce/inventory/InventoryActor/getStoreAvailability?storeIds=0070024000240%2C0070207902079%2C0070104001040%2C0070202002020%2C0070097400974%2C0070158801588%2C0070159101591%2C0070208402084%2C0070038700387%2C0070157401574&skuId=2524419&modelId=8491830&displayStoreDetails=false

async function checkStockForUrl(product, url) {
  const stockResult = getJSON(url);
  const storeId = '0070024000240';

  return stockResult.then((result) => {
    // console.log(result);
    var dataArray = result.responseTO.data
    for (let i = 0; i < dataArray.length; i++) {
      const storeInfo = dataArray[i];
      if (storeInfo.storeId == storeId) {
        if (storeInfo.availabilityInfo != 'noStock') {
          return {
            instock: true,
            message: `Found store and there is stock! for ${product}`
          };
        } else {
          return {
            instock: false,
            message: `found store but no stock for ${product}`
          };
        }
      }
    }
  })
}

var minutes = 60, the_interval = minutes * 60 * 1000;
setInterval(async function () {
  console.log("I am doing my 5 minutes check");

  const result = [];
  const weightsStockUrl = "https://www.decathlon.co.uk/en/ajax/rest/model/com/decathlon/cube/commerce/inventory/InventoryActor/getStoreAvailability?storeIds=0070024000240%2C0070207902079%2C0070104001040%2C0070202002020%2C0070097400974%2C0070158801588%2C0070159101591%2C0070208402084%2C0070038700387%2C0070157401574&skuId=2524420&modelId=8491831&displayStoreDetails=false"
  const weights10KgSetUrl = "https://www.decathlon.co.uk/en/ajax/rest/model/com/decathlon/cube/commerce/inventory/InventoryActor/getStoreAvailability?storeIds=0070024000240%2C0070207902079%2C0070104001040%2C0070202002020%2C0070097400974%2C0070158801588%2C0070159101591%2C0070208402084%2C0070038700387%2C0070157401574&skuId=2524419&modelId=8491830&displayStoreDetails=false"
  const weight1KgUrl = "https://www.decathlon.co.uk/en/ajax/rest/model/com/decathlon/cube/commerce/inventory/InventoryActor/getStoreAvailability?storeIds=0070024000240%2C0070207902079%2C0070104001040%2C0070202002020%2C0070097400974%2C0070158801588%2C0070159101591%2C0070208402084%2C0070038700387%2C0070157401574&skuId=969842&modelId=1042303&displayStoreDetails=false"
  const weight2KgUrl = "https://www.decathlon.co.uk/en/ajax/rest/model/com/decathlon/cube/commerce/inventory/InventoryActor/getStoreAvailability?storeIds=0070024000240%2C0070207902079%2C0070104001040%2C0070202002020%2C0070097400974%2C0070158801588%2C0070159101591%2C0070208402084%2C0070038700387%2C0070157401574&skuId=969850&modelId=1042303&displayStoreDetails=false"
  const weight5KgUrl = "https://www.decathlon.co.uk/en/ajax/rest/model/com/decathlon/cube/commerce/inventory/InventoryActor/getStoreAvailability?storeIds=0070024000240%2C0070207902079%2C0070104001040%2C0070202002020%2C0070097400974%2C0070158801588%2C0070159101591%2C0070208402084%2C0070038700387%2C0070157401574&skuId=969885&modelId=1042303&displayStoreDetails=false"
  const weight10KgUrl = "https://www.decathlon.co.uk/en/ajax/rest/model/com/decathlon/cube/commerce/inventory/InventoryActor/getStoreAvailability?storeIds=0070024000240%2C0070207902079%2C0070104001040%2C0070202002020%2C0070097400974%2C0070158801588%2C0070159101591%2C0070208402084%2C0070038700387%2C0070157401574&skuId=969931&modelId=1042303&displayStoreDetails=false"
  const curlBarUrl = "https://www.decathlon.co.uk/en/ajax/rest/model/com/decathlon/cube/commerce/inventory/InventoryActor/getStoreAvailability?storeIds=0070024000240%2C0070207902079%2C0070104001040%2C0070202002020%2C0070097400974%2C0070158801588%2C0070159101591%2C0070208402084%2C0070038700387%2C0070157401574&skuId=2526775&modelId=8484124&displayStoreDetails=false";

  result.push(await checkStockForUrl("WEIGHT TRAINING DUMBBELL KIT 20 KG",
      weightsStockUrl));
  result.push(await checkStockForUrl("WEIGHT TRAINING DUMBBELL KIT 10 KG",
      weights10KgSetUrl));
  result.push(
      await checkStockForUrl("CAST IRON WEIGHT TRAINING DISC WEIGHT 28MM 1KG",
          weight1KgUrl));
  result.push(
      await checkStockForUrl("CAST IRON WEIGHT TRAINING DISC WEIGHT 28MM 2KG",
          weight2KgUrl));
  result.push(
      await checkStockForUrl("CAST IRON WEIGHT TRAINING DISC WEIGHT 28MM 5KG",
          weight5KgUrl));
  result.push(await
      checkStockForUrl("CAST IRON WEIGHT TRAINING DISC WEIGHT 28MM 10KG",
          weight10KgUrl));
  result.push(await checkStockForUrl("Curl bar", curlBarUrl));
  // console.log(result)
  var productsInStock = "";
  for (let r of result) {
    if (r.instock) {
      productsInStock = productsInStock + "" + r.message;
    }
  }

  if (productsInStock.length > 0) {
    const msg = {
      to: 'spl.ivalis@gmail.com', // Change to your recipient
      from: 'spl.ivalis@gmail.com', // Change to your verified sender
      subject: 'Decathlon stock checker',
      text: productsInStock,
      // html: '<strong>some text content in html</strong>',
    }
    sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })
  }

}, the_interval);
