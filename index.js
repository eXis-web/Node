import { program } from "commander";
import { listContacts, getContactById, removeContact, addContact } from './contacts.js';

program
    .option("-a, --action <type>", "choose action")
    .option("-i, --i <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const options = program.opts();

async function invokeAction({ action, i, name, email, phone }) {
    switch (action) {
        case "list":
            const contacts = await listContacts();
            console.table(contacts);
            break;

        case "get":
            const contact = await getContactById(i);
            if (contact) {
                console.log(contact);
            } else {
                console.log(`Contact with id ${i} not found`);
            }
            break;

        case "add":
            const newContact = await addContact(name, email, phone);
            console.log('Added new contact:', newContact);
            break;

        case "remove":
            const removedContact = await removeContact(i);
            if (removedContact) {
                console.log('Removed contact:', removedContact);
            } else {
                console.log(`Contact with id ${i} not found`);
            }
            break;

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(options);

//functions for test and invoke
//node index.js -a list
//node index.js -a get -i 05olLMgyVQdWRwgKfg5J6
//node index.js -a remove -i qdggE76Jtbfd9eWJHrssH
//node index.js -a add -n Bob -e b@b.com -p 12345678
//node index.js -a add -n Mango -e mango@gmail.com -p 322-22-22