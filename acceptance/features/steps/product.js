const { Given, When, Then } = require("cucumber");
const openUrl = require("../support/action/openUrl");
const checkUrlContains = require("../support/check/checkUrlContains");
const checkHasFocus = require("../support/check/checkHasFocus");

//######################################### Senaryo 1 #############################
Given("that User goes to Video Site Project's HomePage", async function () {
  await openUrl.call(this, "http://localhost:8080/Home");
});

When(/^page is loaded$/, async function () {
  await checkUrlContains.call(this, false, "/Home");
});

Then(
  /^User can see some of videos' title like$/,
  async function (productTitle) {
    const selector = ".products-container";

    var responseProduct = await this.page.$$eval(
      selector,
      async (items, productTitle) => {
        var products = items.map(
          (item) => item.querySelector(".title-container .title").textContent
        );
        return products.filter(
          (x) =>
            x === productTitle.rawTable[0][0] ||
            x === productTitle.rawTable[1][0] ||
            x === productTitle.rawTable[2][0]
        );
      },
      productTitle
    );
  }
);
//######################################### Senaryo 2 #############################
Given("that User is on Video Site Project's HomePage", async function () {
  await openUrl.call(this, "http://localhost:8080/Home");
});

When(/^User clicks "Vue JS Crash Course" video$/, async function () {
  const selector = ".products-container";
  const titleName = "Vue JS Crash Course";
  this.dataId = await this.page.$$eval(
    selector,
    async (items, titleName) => {
      const productObj = items.find(
        (item) => item.querySelector(".title").textContent === titleName
      );
      const product = productObj.querySelector(".images");
      await product.click();
      return product.getAttribute("id");
    },
    titleName
  );
});

Then(/^User should see watch url correctly$/, async function () {
  await checkUrlContains.call(this, false, "/watch/" + this.dataId);
});

//######################################### Senaryo 3 #############################

Given("that User is on Video Site Project HomePage", async function () {
  await openUrl.call(this, "http://localhost:8080/Home");
});

When(
  /^User hovers "Vue.js Explained in 100 Seconds" video$/,
  async function () {
    const selector = ".products-container";
    const titleName = "Vue JS Crash Course";
    this.dataId1 = await this.page.$$eval(
      selector,
      async (items, titleName) => {
        const productObj = items.find(
          (item) => item.querySelector(".title").textContent === titleName
        );
        const product = productObj.querySelector(".images");
        product.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
        return productObj.querySelector(".image1").getAttribute("style");
      },
      titleName
    );
  }
);
