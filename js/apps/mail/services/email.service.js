'use strict';

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'

export const emailService = {
    query,
    getPreviewTxt,
    getEmailById,
    getIsReadTxt,
    saveEmail,
    removeEmail
}

const KEY = 'emailDB'

const loggedinUser = { email: 'user@appsus.com', fullname: 'Mahatma Appsus' }

const defaultEmails = [
    { id: 'e102', by: 'Momo', subject: 'Rent', body: 'Youre behind with rent!', isRead: false, sentAt: 1551133930594, to: 'Me', isStarred: true },
    { id: 'e103', by: 'Robert', sendEmail: 'roberto@walla.co.il', subject: 'Vegtables', body: 'Your Vegtables are not selling quick enough, sadly i have to termenate our buisness relationship.. it has been great, i hope you get your rent money!', isRead: true, sentAt: 1551163930594, to: 'Me', isStarred: true },
    { id: 'e101', by: 'Me', senderEmail: 'user@appsus.com', subject: 'Rent', body: 'I dont have money, honey!', isRead: true, sentAt: 1640788195648, to: 'Momo', isStarred: false },
    { id: 'e104', by: 'Me', sendEmail: 'user@appsus.com', subject: 'Finally- Rent!!', body: 'I now have the money, honey!', isRead: true, sentAt: 1751163930594, to: 'Me', isStarred: true }

]

_createEmails();

function _createEmails() {
    var emails = _loadEmailsFromStorage();
    if (!emails || !emails.length) emails = defaultEmails;
    _saveEmailsToStorage(emails);
}

function query(filterBy) {
    const emails = _loadEmailsFromStorage();
    if (!emails || !emails.length) return Promise.resolve(defaultEmails);
    const filteredEmails = _getFilteredEmails(emails, filterBy);
    return Promise.resolve(filteredEmails);
}

function _getFilteredEmails(emails, filterBy) {
    let { category, search } = filterBy;
    var categorizedEmails = [];
    if (category === 'starred') {
        categorizedEmails = emails.filter(email => { return email.isStarred })
    }
    else if (category === 'read') {
        categorizedEmails = emails.filter(email => { return email.isRead })
    }
    else if (category === 'unRead') {
        categorizedEmails = emails.filter(email => { return !email.isRead })
    }
    else if (category === 'inbox' || !category) {
        categorizedEmails = emails.filter(email => { return !(email.by === 'Me') })
    }
    else if (category === 'sentMail') {
        categorizedEmails = emails.filter(email => { return email.by === 'Me' })
    }
    else {
        categorizedEmails = emails.filter(email => { return (email.lable.includes(category)) })
    }
    return categorizedEmails.filter(categorizedEmail => {
        return categorizedEmail.body.includes(search)
    })
}

function saveEmail(email) {
    return email.id ? _updateEmail(email) : _addEmail(email)
}

function _addEmail(emailToSave) {
    let emails = _loadEmailsFromStorage()
    var email = emailToSave
    email.sentAt = Date.now();
    if (!email.subject) email.subject = 'No Subject'
    email.id = utilService.makeId(4)
    emails = [email, ...emails]
    _saveEmailsToStorage(emails);
    return Promise.resolve()
}

function removeEmail(emailId) {
    let emails = _loadEmailsFromStorage()
    emails = emails.filter(email => email.id !== emailId)
    _saveEmailsToStorage(emails);
    return Promise.resolve()
}

function getEmailById(emailId) {
    const emails = _loadEmailsFromStorage()
    var email = emails.find(function (email) {
        return emailId === email.id
    })
    return Promise.resolve(email)
}


function getPreviewTxt(content) {
    if (content.length > 30) return (content.substring(0, 30) + '...')
    return content;
}

function getIsReadTxt(isRead) {
    if (isRead) return 'Read';
    return 'Unread';
}

function _saveEmailsToStorage(emails) {
    storageService.save(KEY, emails)
}

function _loadEmailsFromStorage() {
    return storageService.load(KEY)
}