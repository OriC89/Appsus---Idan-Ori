'use strict';

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'

export const emailService = {
    query,
    getPreviewTxt,
    getPreviewClass,
    getEmailById,
    getIsReadTxt,
    saveEmail,
    removeEmail
}

const KEY = 'emailDB'

const loggedinUser = { email: 'user@appsus.com', fullname: 'Mahatma Appsus' }

const defaultEmails = [
    { id: 'e102', by: 'Momo', senderEmail: 'Momo@MomoHouse.com', subject: 'Rent', body: 'Youre behind with rent!', isRead: false, sentAt: 1551133930594, to: 'Me', isStarred: true },
    { id: 'e103', by: 'Robert', senderEmail: 'roberto@walla.co.il', subject: 'Vegtables', body: 'Your Vegtables are not selling quick enough, sadly i have to termenate our buisness relationship.. it has been great, i hope you get your rent money!', isRead: true, sentAt: 1551163930594, to: 'Me', isStarred: true },
    { id: 'e101', by: 'Me', senderEmail: 'user@appsus.com', subject: 'Rent', body: 'I dont have money, honey!', isRead: true, sentAt: 1640788195648, to: 'Momo', isStarred: false },
    { id: 'e104', by: 'Me', sendEmail: 'user@appsus.com', subject: 'MONEY', body: 'hi mom i need money i love you!', isRead: true, sentAt: 1640788205648, to: 'Mom', isStarred: true },
    { id: 'e104', by: 'Mom', sendEmail: 'mom@parents.com', subject: 'MONEY', body: 'sure honey! here are 100,000 dollars!', isRead: false, sentAt: 1640788215648, to: 'Me', isStarred: true }

]

_createEmails();

function _createEmails() {
    var emails = _loadEmailsFromStorage();
    if (!emails || !emails.length) emails = defaultEmails;
    _saveEmailsToStorage(emails);
}

function query(filterBy, sortBy) {
    const emails = _loadEmailsFromStorage();
    if (!emails || !emails.length) return Promise.resolve(defaultEmails);
    const filteredEmails = _getFilteredEmails(emails, filterBy);
    if (!filteredEmails.length) return Promise.resolve(filteredEmails);
    else {
        const sortedEmails = _getSortedEmails(filteredEmails, sortBy);
        return Promise.resolve(sortedEmails);
    }
}

function _getFilteredEmails(emails, filterBy) {
    let { category, search } = filterBy;
    var categorizedEmails = [];
    if (category === 'starred') {
        categorizedEmails = emails.filter(email => { return email.isStarred })

    }
    else if (category === 'read') {
        categorizedEmails = emails.filter(email => { return (email.isRead && email.to === 'Me') })
    }
    else if (category === 'unRead') {
        categorizedEmails = emails.filter(email => { return (!(email.isRead) && email.to === 'Me') })
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
    if (!categorizedEmails) return [];
    return categorizedEmails.filter(categorizedEmail => {
        return (categorizedEmail.body.toUpperCase().includes(search.toUpperCase()) || categorizedEmail.subject.toUpperCase().includes(search.toUpperCase()))
    })
}

function _getSortedEmails(emails, sortBy) {
    var sortedEmails = emails.sort((a, b) => {
        if (a[sortBy] < b[sortBy]) {
            return 1;
        }
        if (a[sortBy] > b[sortBy]) {
            return -1;
        }
        return 0;
    })
    return sortedEmails;
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

function _updateEmail(emailToUpdate, property, value) {
    let emails = _loadEmailsFromStorage()
    emailToUpdate[property] = value;
    var updateIndex = emails.findIndex((email) => email.id === emailToUpdate.id);
    emails.splice(updateIndex, 1);
    emails.push(emailToUpdate);
    _saveEmailsToStorage(emails);
    return Promise.resolve();
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

function getPreviewClass(isRead) {
    if (isRead) return 'email-preview read';
    return 'email-preview';
}

function _saveEmailsToStorage(emails) {
    storageService.save(KEY, emails)
}

function _loadEmailsFromStorage() {
    return storageService.load(KEY)
}