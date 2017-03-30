'use strict'

var extend = require('xtend')

function create (initial) {
  return extend({
    pristine: true,
    pending: false,
    error: null,
    fields: {}
  }, initial)
}

module.exports = {
  create: create,

  // reset: alias to create a new form
  reset: create,

  submit: function (form) {
    return extend(form, {
      pristine: true,
      pending: true,
      error: null
    })
  },

  error: function (form, error) {
    return extend(form, {
      pristine: false,
      pending: false,
      error: error || null
    })
  },

  success: function (form) {
    return extend(form, {
      pristine: true,
      pending: false,
      error: null
    })
  },

  edit: function (form, fields) {
    return extend(form, {
      fields: extend(form.fields, fields)
    })
  }
}
