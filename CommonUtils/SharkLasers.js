const RestRequests = require('./RestRequests')
const Log = require('./Log')

class SharkLasers {
    static BASE_URL = `http://api.guerrillamail.com`
    static emailAddress = ''
    static token = ''
    static emailAlias = ''

    /**
     * Create an email address, And generate a token 
     * Note: This step is mandatory before any other email operations
     * @param {String} [customEmailAddress] - Optional. This method will generate a random email address if customeEmailAddress is not passed
     */
    static createEmailAccount(customEmailAddress = '', header) {
        Log.info('Generating random email address')
        let requestHeaders = header || {}

        let getEmailAddrUrl = `${this.BASE_URL}/ajax.php?f=get_email_address`
        let respGetEmailAddr = browser.call(async () => {
            if (! await RestRequests.fetch_get_request(getEmailAddrUrl, requestHeaders))
                throw new Error(`Error: Get_email_address API returned status: ${RestRequests.getResponseStatus()} - ${RestRequests.getResponseStatusText()}`)
            return await RestRequests.getResponseBodyJson()
        })
        //save the token and generated email
        this.token = respGetEmailAddr.sid_token
        this.emailAddress = respGetEmailAddr.email_addr
        this.emailAlias = respGetEmailAddr.alias + "@sharklasers.com"

        //if customEmailAddress is preferred
        if (customEmailAddress) {
            Log.info(`Setting email address to Custom email address '${customEmailAddress}'`)
            let setEmailUserUrl = `${this.BASE_URL}/ajax.php?f=set_email_user&email_user=${customEmailAddress}&sid_token=${this.token}`
            let respSetEmailUser = browser.call(async () => {
                if (!await RestRequests.fetch_get_request(setEmailUserUrl, requestHeaders))
                    throw new Error(`Error: Set_email_user API returned status: ${RestRequests.getResponseStatus()} - ${RestRequests.getResponseStatusText()}`)
                return await RestRequests.getResponseBodyJson()
            })
            //replace random emailAddress with customEmailAddress
            this.emailAddress = respSetEmailUser.email_addr
            this.emailAlias = respGetEmailAddr.alias + "@sharklasers.com"
        }

        Log.info(`Email Address: '${this.emailAddress}'`)
        return this.emailAddress
    }




    /**
     * Fetch a list of the first 10 emails starting from offset
     * @param {Number} offset - Offset of 0 will fetch a list of the first 10 emails, offset of 10 will fetch a list of the next 10, and so on.
     */
    static getLatestEmailList(offset = 0, header) {
        if (!this.token) { throw new Error('No token for this email. Maybe you need to call createEmailAccount() to create the account first?') }
        Log.info(`Retrieving Latest Emails starting from offset : ${offset}`)
        let requestHeaders = header || {}

        let getEmailListUrl = `${this.BASE_URL}/ajax.php?f=get_email_list&offset=${offset}&sid_token=${this.token}`
        let respGetEmailList = browser.call(async () => {
            if (! await RestRequests.fetch_get_request(getEmailListUrl, requestHeaders))
                throw new Error(`Error: Get_email_list API returned status: ${RestRequests.getResponseStatus()} - ${RestRequests.getResponseStatusText()}`)
            return await RestRequests.getResponseBodyJson()
        })
        return respGetEmailList.list
    }



    /**
     * Get the contents of an email.
     * @param {String} emailId - Id of email to fetch. Use the getLatestEmailList() to get list of valid email ids.
     */
    static getEmailDetails(emailId, header) {
        if (!this.token) { throw new Error('No token for this email. Maybe you need to call createEmailAccount() to create the account first?') }
        if (!emailId) { throw new Error('Email id is required, No email ID was provided.') }
        let requestHeaders = header || {}

        Log.info(`Retrieving Email with emailId : ${emailId}`)
        let fetchEmailUrl = `${this.BASE_URL}/ajax.php?f=fetch_email&email_id=${emailId}&sid_token=${this.token}`
        let respFetchEmail = browser.call(async () => {
            if (! await RestRequests.fetch_get_request(fetchEmailUrl, requestHeaders))
                throw new Error(`Error: Fetch_email API returned status: ${RestRequests.getResponseStatus()} - ${RestRequests.getResponseStatusText()}`)
            return await RestRequests.getResponseBodyJson()
        })
        return respFetchEmail
    }



    /**
     * Returns the email attachement as data (buffer). The attachement can also be saved to file by providing 'outputPath'
     * @param {String} emailId -Id of email to download attachement from. Use the getLatestEmailList() to get list of valid email ids.
     * @param {String} partId - email Part Id. Use the falue from getEmailDetails() -> att_info.p
     * @param {String} [outputPath] - output file path, File is not saved on disk when left blank
     * @param {JSON} [header] - optional request headers
     */
    static downloadAttachement(emailId, partId, outputPath, header) {
        if (!this.token) { throw new Error('No token for this email. Maybe you need to call createEmailAccount() to create the account first?') }
        if (!emailId) { throw new Error('Email id is required, No email ID was provided.') }
        if (!partId) { throw new Error('Part Id is required, No Part Id was provided.') }
        let requestHeaders = header || {}

        Log.info(`Downloading attachment from emailId : ${emailId} | part_id : ${partId}`)
        let downloadAttUrl = `https://www.guerrillamail.com/inbox?get_att&lang=en&sid_token=${this.token}&email_id=${emailId}&part_id=${partId}`
        let respDownloadAtt = browser.call(async () => {
            if (! await RestRequests.fetch_download(downloadAttUrl, requestHeaders, outputPath))
                throw new Error(`Error: Download Attachement API returned status: ${RestRequests.getResponseStatus()} - ${RestRequests.getResponseStatusText()}`)
            return await RestRequests.buffer
        })
        return respDownloadAtt
    }


    /**
     * Delete an email
     * @param {Number} emailId -Id of email to delete. Use the getLatestEmailList() to get list of valid email ids.
     * @param {JSON} [header] - optional request headers
     */
    static deleteEmail(emailId, header) {
        if (!this.token) { throw new Error('No token for this email. Maybe you need to call createEmailAccount() to create the account first?') }
        if (!emailId) { throw new Error('Email id is required, No email ID was provided.') }
        let requestHeaders = header || {}

        Log.info(`Deleting Email with emailId : ${emailId}`)
        let deleteEmailUrl = `${this.BASE_URL}/ajax.php?f=del_email&email_ids%5B%5D=${emailId}&sid_token=${this.token}`
        let respDeleteEmail = browser.call(async () => {
            if (! await RestRequests.fetch_get_request(deleteEmailUrl, requestHeaders))
                throw new Error(`Error: Fetch_email API returned status: ${RestRequests.getResponseStatus()} - ${RestRequests.getResponseStatusText()}`)
            return await RestRequests.getResponseBodyText()
        })
        if (respDeleteEmail === "") { throw new Error(`Failed to delete email with id ${emailId}`) }
        return true
    }



    /**
     * Forget the current email address. Email address and token will be reset to blank.
     * Call createEmailAccount() again to create a new email and token to continue using the email api
     */
    static forgetMe() {
        if (!this.token) { throw new Error('No token for this email. Maybe you need to call createEmailAccount() to create the account first?') }

        Log.info(`Resetting emailAddress and sid_token`)
        let forgetMeUrl = `${this.BASE_URL}/ajax.php?f=forget_me&email_addr=${this.emailAddress}&sid_token=${this.token}`
        let respForgetMe = browser.call(async () => {
            if (! await RestRequests.fetch_get_request(forgetMeUrl, requestHeaders))
                throw new Error(`Error: Forget_me API returned status: ${RestRequests.getResponseStatus()} - ${RestRequests.getResponseStatusText()}`)
            return await RestRequests.getResponseBodyText()
        })

        //reset email address and token
        this.emailAddress = ''
        this.token = ''
        return respForgetMe
    }

}
module.exports = SharkLasers
