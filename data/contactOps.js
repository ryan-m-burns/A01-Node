const Contact = require('../models/Contact');

class ContactOps {
  constructor() {}

  /**
   * Create a new contact form submission
   * @param {Object} contactData - Contact form data
   * @returns {Promise<Object>} - The created contact submission
   */
  static async createContact(contactData) {
    console.log(`Creating new contact submission from ${contactData.name}...`);
    const contact = new Contact(contactData);
    return await contact.save();
  }

  /**
   * Get all contact form submissions
   * @returns {Promise<Array>} - Array of contact submissions
   */
  static async getAllContacts() {
    console.log('Getting all contact submissions...');
    return await Contact.find().sort({ createdAt: -1 });
  }

  /**
   * Get a contact submission by ID
   * @param {String} id - Contact submission ID
   * @returns {Promise<Object>} - Contact submission
   */
  static async getContactById(id) {
    console.log(`Getting contact submission with ID ${id}...`);
    return await Contact.findById(id);
  }
}

module.exports = ContactOps;
