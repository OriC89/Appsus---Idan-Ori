'use strict';

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'

export const emailService = {
    query,
    getPreviewEmail,
    getEmailById,
    getIsReadTxt
}

const KEY = 'emailDB'

const loggedinUser = { email: 'user@appsus.com', fullname: 'Mahatma Appsus' }

const defaultEmails = [
    { id: 'e101', by: 'Me', subject: 'Rent', body: 'I dont have money, honey!', isRead: false, sentAt: 1640788195648, to: 'momo@momo.com', isStarred: false, isRead: true },
    { id: 'e102', by: 'Momo', subject: 'Rent', body: 'Youre behind with rent!', isRead: false, sentAt: 1551133930594, to: 'Me', isStarred: false, isRead: false }
]

_createEmails();

function _createEmails() {
    var emails = _loadEmailsFromStorage();
    if (!emails || !emails.length) emails = defaultEmails;
    _saveEmailsToStorage(emails);
}

function getPreviewEmail(content) {
    if (content.length > 30) return (content.substring(0, 30) + '...')
    return content;
}

function query(filterBy) {
    // if (!emails || !emails.length) return;
    const emails = _loadEmailsFromStorage();
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
        categorizedEmails = emails.filter(email => { return (email.lable === category) })
    }
    return categorizedEmails.filter(categorizedEmail => {
        return categorizedEmail.body.includes(search)
    })
}

function getEmailById(emailId) {
    const emails = _loadEmailsFromStorage()
    var email = emails.find(function (email) {
        return emailId === email.id
    })
    return Promise.resolve(email)
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