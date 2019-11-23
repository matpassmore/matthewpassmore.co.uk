---
title: "Making Ajax Calls Sequentially using jQuery | Web Niraj"
date: "2019-09-13"
---

A sign-up form I'm working on requires multiple AJAX requests to an API on form submission. The receiving server did not like being hit with parallel requests and the operation failed with "MIME type mismatch errors" in the dev tools console. After much debugging pain, changing course to sequential calls fixed this.

> The code below makes uses of Promises in jQuery to wait for ajax calls to complete before starting the next call in the sequence. All the ajax calls are made to the same API, but the data sent in the call are defined in the items array.

Source: _[Making Ajax Calls Sequentially using jQuery | Web Niraj](https://www.webniraj.com/2018/10/08/making-ajax-calls-sequentially-using-jquery/)_
