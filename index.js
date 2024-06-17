const { Command } = require("commander");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contacts");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.log("All contacts:");
      console.log(contacts);
      break;

    case "get":
      const contact = await getContactById(id);
      if (contact) {
        console.log("Contact by ID:");
        console.log(contact);
      } else {
        console.log(`Contact with ID ${id} not found`);
      }
      break;

    case "add":
      if (!name || !email || !phone) {
        console.log("Please provide name, email, and phone to add a contact.");
        return;
      }
      const newContact = await addContact(name, email, phone);
      console.log("Added new contact:");
      console.log(newContact);
      break;

    case "remove":
      const removed = await removeContact(id);
      if (removed) {
        console.log(`Removed contact with ID ${id}`);
      } else {
        console.log(`Contact with ID ${id} not found`);
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
