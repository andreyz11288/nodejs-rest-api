const express = require('express')
const router = express.Router()
const list = require('../../model/index')
const { validateContact } = require('../../validation/validation')

router.get('/', async (req, res, next) => {
  const readList = await list.listContacts()
  res.json({
    status: 'success',
    code: 200,
    data: readList,
  })
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = await req.params
  const getContactId = await list.getContactById(contactId)
  if (getContactId.length !== 0) {
    res.json({
      status: 'success',
      code: 200,
      data: getContactId,
    })
  } else {
    res.json({
      status: '404',
      code: 404,
      message: 'Not found',
    })
  }
})

router.post('/', validateContact, async (req, res, next) => {
  const listAdd = await list.addContact(req.body)
  res.status(201).json({
    status: 'success',
    code: 201,
    data: listAdd,
  })
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = await req.params
  const deleteContacts = await list.removeContact(contactId)
  if (deleteContacts) {
    res.json({
      status: 'success',
      code: 200,
      message: 'contact deleted',
    })
  } else {
    res.json({
      status: '404',
      code: 404,
      message: 'Not found',
    })
  }
})

router.put('/:contactId', validateContact, async (req, res, next) => {
  const { contactId } = await req.params
  const putContacts = await list.updateContact(contactId, req.body)

  res.json({
    status: 'success',
    code: 200,
    data: putContacts,
  })
})

module.exports = router
