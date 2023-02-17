const BrowserUtil = require("../../../CommonUtils/BrowserUtil");
const ElementUtil = require("../../../CommonUtils/ElementUtil");
const data = require('../Parameters/LoginData');

class LMJLoginPage {



    get txtUserName() { return $('//label[text()="Email Address"]/following::input[1]')}
    get txtPassword() { return $('//label[text()="Password"]/following::input[1]')}
    get btnLogin() { return $('//a[text()="Forgot Password? "]/following::button[1]')}
    get popupDisaplayPrice() { return $('//div[@class="animation-content modal-content"]')}
    get errInvalidEmail() { return $('//p[text()="Invalid Email"]')}
    get errInvalidPassword() { return $('//p[text()="Invalid Password"]')}
    get optHidePrice() { return $('//span[contains(text(),"Hide Prices")]')}
    get optTradePrice() { return $('//span[contains(text(),"Trade Prices")]')}
    get optRRP() { return $('//span[contains(text(),"RRP")]')}
    get btnSubmit() { return $('//button[contains(text(),"Submit")]')}


    submitDisplayPrice(){

        ElementUtil.click(this.optTradePrice,"Select trade price")
        ElementUtil.click(this.btnSubmit,"select submit")
    }

    submitRRPPrice(){
        ElementUtil.click(this.optHidePrice,"Select HidePrice price")
        ElementUtil.click(this.btnSubmit,"select submit")

    }

    submitNoPrice(){
        ElementUtil.click(this.optRRP,"Select RRP price")
        ElementUtil.click(this.btnSubmit,"select submit")

    }


    loginValidUser(){
        ElementUtil.waitForDisplayed(this.btnLogin,25,"wait for page load")
        ElementUtil.sendText(this.txtUserName,data.login.valid.username,"enter username")
        ElementUtil.sendText(this.txtPassword,data.login.valid.password,"enter password")
        ElementUtil.click(this.btnLogin,"select login button")
    }

    loginInValidEmail(){

        ElementUtil.waitForDisplayed(this.btnLogin,25,"wait for page load")
        ElementUtil.sendText(this.txtUserName,data.login.invalidEmail.username,"enter username")
        ElementUtil.sendText(this.txtPassword,data.login.invalidEmail.password,"enter password")
        ElementUtil.click(this.btnLogin,"select login button")

    }


    loginInValidPassword(){

        BrowserUtil.refreshTab()
        ElementUtil.waitForDisplayed(this.btnLogin,25,"wait for page load")
        ElementUtil.sendText(this.txtUserName,data.login.invalidPassword.username,"enter username")
        ElementUtil.sendText(this.txtPassword,data.login.invalidPassword.password,"enter password")
        ElementUtil.click(this.btnLogin,"select login button")

    }

}

module.exports = LMJLoginPage;