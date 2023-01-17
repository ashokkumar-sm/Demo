const BrowserUtil = require('../../../../../CommonUtils/BrowserUtil');
const ElementUtil = require('../../../../../CommonUtils/ElementUtil');
const data = require('../../Parameters/ContactUs.json');

class LiteFuryDemoContactPage {

    get txtName() { return $('//input[@placeholder="Your Name"]') }
    get txtEmail() { return $('//input[@placeholder="Your Email"]') }
    get txtNumber() { return $('//input[@placeholder="Your Number"]') }
    get txtSubject() { return $('//input[@placeholder="Subject"]') }
    get txtMessage() { return $('//textarea[@placeholder="Write A Message"]') }
    get btnSubmit() { return $('//button[@type="submit"]') }
    get lblSuccessMessage() { return $('//div[@class="contact-us-container"]/div[contains(@class,"notification-content")]') }

    enterContactDetails(){
        
        ElementUtil.waitForDisplayed(this.txtName, 15, "wait for form to load")
        ElementUtil.scrollIntoView(this.txtName,"sroll down to form")
        ElementUtil.sendText(this.txtName,data.ContactUs.Name,"Enter Name")
        ElementUtil.sendText(this.txtEmail,data.ContactUs.Email,"Enter Email")
        ElementUtil.sendText(this.txtNumber,data.ContactUs.Number,"Enter Number")
        ElementUtil.sendText(this.txtSubject,data.ContactUs.Subject,"Enter Subject")
        ElementUtil.sendText(this.txtMessage,data.ContactUs.Message,"Enter Message")
        ElementUtil.scrollIntoView(this.txtNumber,"sroll down to submit button")
        BrowserUtil.wait(3)
        ElementUtil.click(this.btnSubmit, "Select submit button")

    }
}
module.exports = LiteFuryDemoContactPage;
