'use strict'

var extend = require('xtend')

function create (initial) {
  return extend({
    pristine: true,
    pending: false,
    success: null,
    error: null,
    fields: {}
  }, initial)
}

module.exports = {
  create: create,

  reset: function (form, data) {
    return create(data)
  },

  submit: function (form) {
    return extend(form, {
      pristine: true,
      pending: true,
      success: null,
      error: null
    })
  },

  error: function (form, error) {
    return extend(form, {
      pristine: false,
      pending: false,
      success: null,
      error: error || null
    })
  },

  success: function (form, data) {
    return extend(form, {
      pristine: true,
      pending: false,
      success: data || true,
      error: null
    })
  },

  edit: function (form, fields) {
    return extend(form, {
      fields: extend(form.fields, fields)
    })
  }
}
