const db = require('../models');

exports.listContacts = async (req, res) => {
  try {
    const contacts = await db.Contact.findAll({ where: { userId: req.user.id } });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.markAsSpam = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const contact = await db.Contact.findOne({ where: { phoneNumber, userId: req.user.id } });

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    contact.isSpam = true;
    await contact.save();
    res.status(200).json({ message: 'Marked as spam' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.searchByName = async (req, res) => {
  try {
    const { query } = req.params;
    const contacts = await db.Contact.findAll({
      where: {
        userId: req.user.id,
        name: {
          [db.Sequelize.Op.iLike]: `%${query}%`
        }
      }
    });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.searchByPhone = async (req, res) => {
  try {
    const { phoneNumber } = req.params;
    const contact = await db.Contact.findOne({ where: { phoneNumber, userId: req.user.id } });

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
