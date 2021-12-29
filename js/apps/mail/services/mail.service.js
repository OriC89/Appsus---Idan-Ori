'use strict';

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'

export const emailService = {
    query,
    getPreviewEmail
}

const KEY = 'emailDB'

const loggedinUser = { email: 'user@appsus.com', fullname: 'Mahatma Appsus' }

const defaultEmails = [
    { id: 'e101', by: 'Me', subject: 'This Email was sent by me!', body: 'Would love to catch up sometimes', isRead: false, sentAt: 1640788195648, to: 'momo@momo.com' },
    { id: 'e102', by: 'Momo', subject: 'This Email was sent to me!', body: 'Would love to catch up sometimes', isRead: false, sentAt: 1551133930594, to: 'user@appsus.com' }
]

_createEmails();

function _createEmails() {
    var emails = _loadEmailsFromStorage();
    if (!emails || !emails.length) emails = defaultEmails;
    _saveEmailsToStorage(emails);
}

function getPreviewEmail(content) {
    if (content.length > 30) return content.substring(0, 30);
    return content;
}

function query(filterBy) {
    const emails = _loadEmailsFromStorage()
    console.log('at storage', emails);
    if (!filterBy) return Promise.resolve(emails)
    const filteredEmails = _getFilteredEmails(emails, filterBy)
    return Promise.resolve(filteredEmails)
}

function _saveEmailsToStorage(emails) {
    storageService.save(KEY, emails)
}

function _loadEmailsFromStorage() {
    return storageService.load(KEY)
}