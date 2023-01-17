const RestRequests = require('./RestRequests.js')
const Log = require('./Log.js')

class MailSlurp {
    static BASE_URL = 'https://api.mailslurp.com'
    static emailAddress = ''
    static token = ''
    static emailAlias = ''
    static apiKey = 'fd1850a172d67bd99202d43200187f3f17d25be4ec8489d594ff7cba31fb0b59'


    /**
     * Create an email address/inbox 
     */
    static createEmailAccount() {
        Log.info('Generating random email address')
        let expiryDateTimeUTC = new Date(new Date().getTime() + 60 * 60 * 24 * 1000).toISOString() //adding 24hours to current date and converting to ISOString format
        Log.info("expiryDateTime: " + expiryDateTimeUTC)


        let requestHeaders = { 'x-api-key': this.apiKey }
        let requestBody = {}
        let getEmailAddrUrl = this.BASE_URL + '/inboxes/?expiresAt=' + expiryDateTimeUTC
        let respGetEmailAddr = browser.call(async () => {
            await RestRequests.fetch_post_request(getEmailAddrUrl, requestBody, requestHeaders)
            if (await RestRequests.getResponseStatus() != 201)
                throw new Error(`Error: Get_email_address API returned status: ${RestRequests.getResponseStatus()} - ${RestRequests.getResponseStatusText()}`)
            return await RestRequests.getResponseBodyJson()
        })
        let emailAddress = respGetEmailAddr.emailAddress
        let inboxId = respGetEmailAddr.id

        Log.info("Email Address: " + emailAddress)
        Log.info("Inbox Id: " + inboxId)
        return { emailAddress, inboxId }
    }

    /**
     * Delete an inbox
     * @param {String} inboxId - Id of inbox to delete. Used after createEmailAccount() to delete the inbox
     */
    static deleteInbox(inboxId) {
        if (!inboxId) { throw new Error('Inbox id is required, No Inbox ID was provided.') }
        Log.info('Deleting inbox')
        let requestHeaders = { 'x-api-key': this.apiKey }
        //let requestBody = {}
        let deleteInboxUrl = this.BASE_URL + '/inboxes/' + inboxId
        let respDeleteInbox = browser.call(async () => {
            await RestRequests.fetch_delete_request(deleteInboxUrl, requestHeaders)
            if (await RestRequests.getResponseStatus() != 204)
                throw new Error(`Error: Delete_inbox API returned status: ${RestRequests.getResponseStatus()} - ${RestRequests.getResponseStatusText()}`)
            return await RestRequests.getResponseStatus()
        })

        Log.info("Inbox deletion Status " + respDeleteInbox)
    }

    /**
     * Get latest email(s) send to the created inbox/email address
     * @param {String} inboxId - Id of the inbox 
     * @param {Number} [limit] - Optional, Limit will fetch up to a max of 100 emails. If not passed it will fetch the latest 5 emails
     * @param {String} [sort] - Optional, Sort will return emails in ascending (ASC) or descending order (DESC). Emails will be returned in descending order if sort is not passed
     * @param {String} [retryTimeout] - Optional, Maximum milliseconds to spend retrying inbox database until minCount emails are returned
     * @param {String} [minCount] - Optional, Minimum acceptable email count. Will cause request to hang (and retry) until minCount is satisfied or retryTimeout is reached.
     */
    static getLatestEmailList(inboxId, limit = '5', sort = 'DESC', retryTimeout = '120000', minCount = '1') {
        if (!inboxId) { throw new Error('Inbox id is required, No Inbox ID was provided.') }

        Log.info('Get emails in Inbox ' + inboxId)
        let requestHeaders = { 'x-api-key': this.apiKey }
        let getEmailListUrl = this.BASE_URL + '/inboxes/' + inboxId + '/emails?limit=' + limit + '&sort=' + sort + '&retryTimeout=' + retryTimeout + '&minCount=' + minCount
        let respGetEmailList = browser.call(async () => {
            await RestRequests.fetch_get_request(getEmailListUrl, requestHeaders)
            if (await RestRequests.getResponseStatus() != 200)
                throw new Error(`Error: Get Email list API returned status: ${RestRequests.getResponseStatus()} - ${RestRequests.getResponseStatusText()}`)
            return await RestRequests.getResponseBodyJson()
        })
        return respGetEmailList
    }

    /**
     * Get the contents of an email.
     * @param {String} emailId - Id of email to fetch. Use the getLatestEmailList() to get list of valid email ids.
     */
    static getEmailDetails(emailId) {
        if (!emailId) { throw new Error('Email id is required, No email ID was provided.') }
        let requestHeaders = { 'x-api-key': this.apiKey }

        Log.info(`Retrieving Email with emailId : ${emailId}`)
        let fetchEmailUrl = this.BASE_URL + '/emails/' + emailId
        let respFetchEmail = browser.call(async () => {
            if (! await RestRequests.fetch_get_request(fetchEmailUrl, requestHeaders))
                throw new Error(`Error: Fetch_email API returned status: ${RestRequests.getResponseStatus()} - ${RestRequests.getResponseStatusText()}`)
            return await RestRequests.getResponseBodyJson()
        })
        return respFetchEmail
    }



    /**
     * Returns the email attachment as data (buffer). The attachment can also be saved to file by providing 'outputPath'
     * @param {String} emailId -Id of email to download attachement from. Use the getLatestEmailList() to get list of valid email ids
     * @param {String} attachmentId -Id of attachment to download. Use the getEmailDetails() to get list of attachments
     * @param {String} [outputPath] - output file path, File is not saved on disk when left blank
      */

    static downloadAttachment(emailId, attachmentId, outputPath) {
        if (!emailId) { throw new Error('Email id is required, No email ID was provided.') }
        if (!attachmentId) { throw new Error('Attachment Id is required, No Attachment Id was provided.') }
        let requestHeaders = { 'x-api-key': this.apiKey }

        Log.info(`Downloading attachment from emailId : ${emailId} | attachment_id : ${attachmentId} | output_path : ${outputPath}`)
        let downloadAttUrl = `${this.BASE_URL}/emails/${emailId}/attachments/${attachmentId}`
        let respDownloadAtt = browser.call(async () => {
            if (! await RestRequests.fetch_download(downloadAttUrl, requestHeaders, outputPath))
                throw new Error(`Error: Download Attachement API returned status: ${RestRequests.getResponseStatus()} - ${RestRequests.getResponseStatusText()}`)
            return await RestRequests.buffer
        })
        return respDownloadAtt
    }
    static sendEmail(inboxId,requestBody) {
        let requestHeaders = { 'x-api-key': this.apiKey,'Content-Type' : 'application/json' }
        let getSendEmailUrl = this.BASE_URL + '/inboxes/' + inboxId
        let respGetSendEmail = browser.call(async () => {
            await RestRequests.fetch_post_request(getSendEmailUrl, requestBody, requestHeaders)
            if (await RestRequests.getResponseStatus() != 201)
                throw new Error(`Error: Get_email_address API returned status: ${RestRequests.getResponseStatus()} - ${RestRequests.getResponseStatusText()}`)
            return await RestRequests.getResponseBodyJson()
        })

    }
    // static replytoEmail(emailId,requestBody) {
    //     let requestBody1 = {
    //         "body": "Test MailSlurp Reply"
    //     }
    //     let requestHeaders = { 'x-api-key': this.apiKey,'Content-Type' : 'application/json' }
    //     let getSendEmailUrl = this.BASE_URL + '/emails/' + emailId
    //     let respGetSendEmail = browser.call(async () => {
    //         if(!await RestRequests.fetch_put_request(getSendEmailUrl, requestBody1, requestHeaders))
    //         // if (await RestRequests.getResponseStatus() != 201)
    //             throw new Error(`Error: Get_email_address API returned status: ${RestRequests.getResponseStatus()} - ${RestRequests.getResponseStatusText()}`)
    //         return await RestRequests.getResponseBodyJson()
    //     })

    // }

}
module.exports = MailSlurp
