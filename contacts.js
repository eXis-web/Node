import fs from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// Determine the filename and directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define the path to the contacts JSON file
const contactsPath = path.join(__dirname, 'db', 'contacts.json');

// Function to list all contacts
async function listContacts() {
    const data = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(data);
}

// Function to get a contact by ID
async function getContactById(contactId) {
    const contacts = await listContacts();
    const contact = contacts.find(contact => contact.id === contactId);
    return contact || null;
}

// Function to remove a contact by ID
async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index === -1) {
        return null;
    }
    const [removedContact] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return removedContact;
}

// Function to add a new contact
async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = {
        id: generateId(), // Generate a unique ID for the new contact
        name,
        email,
        phone
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
}

function generateId() {
    return Math.random().toString(36).substr(2, 10);
}

export { listContacts, getContactById, removeContact, addContact };
