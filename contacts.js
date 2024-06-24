import fs from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url'; 


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
    const data = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(data);
}

async function getContactByIndex(index) {
    const contacts = await listContacts();
    if (index >= 0 && index < contacts.length) {
        return contacts[index];
    } else {
        return null;
    }
}


async function removeContact(index) {
    const contacts = await listContacts();
    if (index < 0 || index >= contacts.length) {
        return null;
    }
    const removedContact = contacts.splice(index, 1)[0];
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return removedContact;
}

async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = {
        id: generateId(contacts),
        name,
        email,
        phone
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
}

function generateId(contacts) {
    const existingIds = contacts.map(contact => contact.id);
    let id;
    do {
        id = generateRandomId();
    } while (existingIds.includes(id));
    return id;
}

function generateRandomId() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
    let id = '';
    for (let i = 0; i < 20; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}

export { listContacts, getContactByIndex, removeContact, addContact };





//node index.js --action list
//node index.js --action get --id 1
//node index.js --action add --name "John Doe" --email "john.doe@example.com" --phone "1234567890"
//node index.js --action add --name "Нове Ім'я" --email "новий.email@example.com" --phone "(123) 456-7890"

//node index.js --action remove --id 2