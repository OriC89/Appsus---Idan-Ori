'use strict';

import { utilService } from './util.service.js'
import { storageService } from './storage.service.js'

export const emailService = {
    query,
    getPreviewEmail
}

const loggedinUser = { email: 'user@appsus.com', fullname: 'Mahatma Appsus' }

const email = [
    { id: 'e101', by: 'Me', subject: 'This Email was sent by me!', body: 'Would love to catch up sometimes', isRead: false, sentAt: 1551133930594, to: 'momo@momo.com' },
    { id: 'e102', by: 'Momo', subject: 'This Email was sent to me!', body: 'Would love to catch up sometimes', isRead: false, sentAt: 1551133930594, to: 'user@appsus.com' }
]

function getPreviewEmail(content) {
    if (content.length > 30) return content.substring(0, 30);
    return content;
}