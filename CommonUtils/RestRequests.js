const Log = require("./Log.js");
const qs = require('querystring');
const fetch = require('node-fetch');
const fs = require('fs')
const _ = require("lodash");


class RestRequests {
  static responseBodyText
  static responseBodyJson
  static isResponseOk
  static responseHeaders
  static isResponseRedirected
  static responseStatus
  static responseStatusText
  static responseUrl
  static buffer

  /**
  * Generic function to send POST request
  * @param {*} request_url -request URL
  * @param {*} data -Request Body
  * @param {*} headers - Request Headers
  */
  static async fetch_post_request(request_url, data, headers) {
    Log.info("Post request on: '" + request_url + "' endpoint")
    if (qs.stringify(headers).includes("application%2Fx-www-form-urlencoded")) {
      data = qs.stringify(data);
    }
    else {
      data = JSON.stringify(data);
    }

    return fetch(request_url, { method: 'POST', headers: headers, body: data }).then(response => {
      this.isResponseOk = response.ok
      this.responseHeaders = response.headers
      this.isResponseRedirected = response.redirected
      this.responseStatus = response.status
      this.responseStatusText = response.statusText
      this.responseUrl = response.url
      return response.text()
    }).then(body => {
      this.responseBodyText = body
      let isJsonContentType = ((this.responseHeaders.get('Content-Type') !== null) && this.responseHeaders.get('Content-Type').includes('json')) ? true : false
      try { this.responseBodyJson = (isJsonContentType) ? JSON.parse(body) : {} }
      catch { this.responseBodyJson = {} }
    }).then(() => {
      return this.isResponseOk
    })


  }


  /**
* Generic function to send PATCH request
* @param {*} request_url -request URL
* @param {*} data -Request Body
* @param {*} headers - Request Headers
*/
  static async fetch_patch_request(request_url, data, headers) {
    Log.info("Patch request on: '" + request_url + "' endpoint")
    if (qs.stringify(headers).includes("application%2Fx-www-form-urlencoded")) {
      data = qs.stringify(data);
    }
    else {
      data = JSON.stringify(data);
    }

    return fetch(request_url, { method: 'PATCH', headers: headers, body: data }).then(response => {
      this.isResponseOk = response.ok
      this.responseHeaders = response.headers
      this.isResponseRedirected = response.redirected
      this.responseStatus = response.status
      this.responseStatusText = response.statusText
      this.responseUrl = response.url
      return response.text()
    }).then(body => {
      this.responseBodyText = body
      let isJsonContentType = ((this.responseHeaders.get('Content-Type') !== null) && this.responseHeaders.get('Content-Type').includes('json')) ? true : false
      try { this.responseBodyJson = (isJsonContentType) ? JSON.parse(body) : {} }
      catch { this.responseBodyJson = {} }
    }).then(() => {
      return this.isResponseOk
    })


  }

  /**
  * Generic function to send PUT request
  * @param {*} request_url -request URL
  * @param {*} data -Request Body
  * @param {*} headers - Request Headers
  */
  static async fetch_put_request(request_url, data, headers) {
    Log.info("PUT request on: '" + request_url + "' endpoint")
    if (qs.stringify(headers).includes("application%2Fx-www-form-urlencoded")) {
      data = qs.stringify(data);
    }
    else {
      data = JSON.stringify(data);
    }

    return fetch(request_url, { method: 'PUT', headers: headers, body: data }).then(response => {
      this.isResponseOk = response.ok
      this.responseHeaders = response.headers
      this.isResponseRedirected = response.redirected
      this.responseStatus = response.status
      this.responseStatusText = response.statusText
      this.responseUrl = response.url
      return response.text()
    }).then(body => {
      this.responseBodyText = body
      let isJsonContentType = ((this.responseHeaders.get('Content-Type') !== null) && this.responseHeaders.get('Content-Type').includes('json')) ? true : false
      try { this.responseBodyJson = (isJsonContentType) ? JSON.parse(body) : {} }
      catch { this.responseBodyJson = {} }
    }).then(() => {
      return this.isResponseOk
    })
  }

  /**
    *  UpdatePutBodies
    * @param {*} request_url -request URL
    * @param {*} data -Request Body. Can be NULL or String
    * @param {*} headers - Request Headers
    */
  static updateRequestPutBody(requestBody, update) {
    Log.info("Updating put body with new values " + JSON.stringify(update))
    //Object.assign(requestBody, update)
    _.merge(requestBody, update);
  }

  /**
  *  UpdatePutHeaders
  * @param {*} update - update objects
  * @param {*} headers - Request Headers
  */
  static updateRequestPutHeaders(headers, update) {
    Log.info("Updating put headers with new values " + qs.stringify(update))
    Object.assign(headers, update)
  }

  /**
  * Generic function to send GET request
  * @param {*} request_url -request URL
  * @param {*} data -Request Body. Can be NULL or String
  * @param {*} headers - Request Headers
  */
  static async fetch_get_request(request_url, headers) {
    Log.info("Get request on: '" + request_url + "' endpoint")

    return fetch(request_url, { method: 'GET', headers: headers }).then(response => {
      this.isResponseOk = response.ok
      this.responseHeaders = response.headers
      this.isResponseRedirected = response.redirected
      this.responseStatus = response.status
      this.responseStatusText = response.statusText
      this.responseUrl = response.url
      return response.text()
    }).then(body => {
      this.responseBodyText = body
      let isJsonContentType = ((this.responseHeaders.get('Content-Type') !== null) && this.responseHeaders.get('Content-Type').includes('json')) ? true : false
      try { this.responseBodyJson = (isJsonContentType) ? JSON.parse(body) : {} }
      catch { this.responseBodyJson = {} }
    }).then(() => {
      return this.isResponseOk
    })
  }

  /**
   * Write the response.buffer() to a destination file /or store the response to 'this.buffer'
   * @param {String} request_url - request URL
   * @param {JSON} headers - request headers
   * @param {String} [destinationFile] - output file path, File is not saved on disk when left blank
   */
  static async fetch_download(request_url, headers, destinationFile) {
    Log.info("Get request on: '" + request_url + "' endpoint")

    return fetch(request_url, { method: 'GET', headers: headers }).then(response => {
      this.isResponseOk = response.ok
      this.responseHeaders = response.headers
      this.isResponseRedirected = response.redirected
      this.responseStatus = response.status
      this.responseStatusText = response.statusText
      this.responseUrl = response.url
      return response.buffer()
    }).then(respBuffer => {
      this.buffer = respBuffer
      if (destinationFile)
        fs.writeFileSync(destinationFile, respBuffer, 'binary')
    }).then(() => {
      return this.isResponseOk
    })
  }


  /**
  * Generic function to send DELETE request
  * @param {*} request_url -request URL
  * @param {*} data -Request Body. Can be NULL or String
  * @param {*} headers - Request Headers
  */
  static async fetch_delete_request(request_url, headers) {
    Log.info("Delete request on: '" + request_url + "' endpoint")

    return fetch(request_url, { method: 'DELETE', headers: headers }).then(response => {
      this.isResponseOk = response.ok
      this.responseHeaders = response.headers
      this.isResponseRedirected = response.redirected
      this.responseStatus = response.status
      this.responseStatusText = response.statusText
      this.responseUrl = response.url
      return response.text()
    }).then(body => {
      this.responseBodyText = body
      let isJsonContentType = ((this.responseHeaders.get('Content-Type') !== null) && this.responseHeaders.get('Content-Type').includes('json')) ? true : false
      try { this.responseBodyJson = (isJsonContentType) ? JSON.parse(body) : {} }
      catch { this.responseBodyJson = {} }
    }).then(() => {
      return this.isResponseOk
    })
  }



  /**
  *  UpdatePostBodies
  * @param {*} request_url -request URL
  * @param {*} data -Request Body. Can be NULL or String
  * @param {*} headers - Request Headers
  */
  static updateRequestPostBody(requestBody, update) {
    Log.info("Updating post body with new values " + JSON.stringify(update))
    //Object.assign(requestBody, update)
    _.merge(requestBody, update);
  }

  /**
  *  UpdatePostHeaders
  * @param {*} update - update objects
  * @param {*} headers - Request Headers
  */
  static updateRequestPostHeaders(headers, update) {
    Log.info("Updating post headers with new values " + qs.stringify(update))
    Object.assign(headers, update)
  }

  static getResponseBodyText() {
    return this.responseBodyText
  }

  static getResponseBodyJson() {
    // let isJsonContentType = ((this.responseHeaders.get('Content-Type') !== null) && this.responseHeaders.get('Content-Type').includes('json')) ? true : false
    // try{this.responseBodyJson = (isJsonContentType) ? JSON.parse(this.responseBodyText) : {}}
    // catch{this.responseBodyJson={}}
    return this.responseBodyJson
  }

  static getResponseStatus() {
    return this.responseStatus
  }

  static getResponseStatusText() {
    return this.responseStatusText
  }

  static getResponseHeaders() {
    return this.responseHeaders
  }


  static getResponseBodyKeyValue(key) {
    return this.responseBodyJson[key]
  }

  static getResponseHeaderValue(header) {
    return this.responseHeaders.get(header)
  }

  static getResponseUrl() {
    return this.responseUrl
  }

}

module.exports = RestRequests;