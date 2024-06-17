const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading contacts: ${error.message}`);
    throw error;
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((c) => c.id === contactId);
    return contact || null;
  } catch (error) {
    console.error(`Error getting contact: ${error.message}`);
    throw error;
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const initialLength = contacts.length;
    const filteredContacts = contacts.filter((c) => c.id !== contactId);
    if (filteredContacts.length === initialLength) {
      return false;
    }
    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2));
    return true;
  } catch (error) {
    console.error(`Error removing contact: ${error.message}`);
    throw error;
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.error(`Error adding contact: ${error.message}`);
    throw error;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
