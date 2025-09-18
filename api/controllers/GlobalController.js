/**
 * GlobalController - A generic controller to handle CRUD operations.
 * It uses a Data Access Object (DAO) passed in the constructor to perform database actions.
 */
class GlobalController {
  /**
   * Creates an instance of GlobalController.
   * @param {Object} dao - Data Access Object with CRUD methods (create, read, update, delete, getAll).
   */
  constructor(dao) {
    this.dao = dao;
  }

  /**
   * Create a new document.
   *
   * @async
   * @function create
   * @param {import("express").Request} req - Express request object containing the data in `req.body`.
   * @param {import("express").Response} res - Express response object.
   * @returns {Promise<void>} Sends the created document with status 201 or an error with status 400.
   */
  async create(req, res) {
    try {
      const document = await this.dao.create(req.body);
      res.status(201).json(document);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Read a document by ID.
   *
   * @async
   * @function read
   * @param {import("express").Request} req - Express request object containing the document ID in `req.params.id`.
   * @param {import("express").Response} res - Express response object.
   * @returns {Promise<void>} Sends the document with status 200 or an error with status 404.
   */
  async read(req, res) {
    try {
      const document = await this.dao.read(req.params.id);
      res.status(200).json(document);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  /**
   * Update a document by ID.
   *
   * @async
   * @function update
   * @param {import("express").Request} req - Express request object containing the ID in `req.params.id` and updated data in `req.body`.
   * @param {import("express").Response} res - Express response object.
   * @returns {Promise<void>} Sends the updated document with status 200 or an error with status 400.
   */
  async update(req, res) {
    try {
      const document = await this.dao.update(req.params.id, req.body);
      res.status(200).json(document);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Delete a document by ID.
   *
   * @async
   * @function delete
   * @param {import("express").Request} req - Express request object containing the document ID in `req.params.id`.
   * @param {import("express").Response} res - Express response object.
   * @returns {Promise<void>} Sends the deleted document with status 200 or an error with status 404.
   */
  async delete(req, res) {
    try {
      const document = await this.dao.delete(req.params.id);
      res.status(200).json(document);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  /**
   * Get all documents.
   *
   * @async
   * @function getAll
   * @param {import("express").Request} req - Express request object.
   * @param {import("express").Response} res - Express response object.
   * @returns {Promise<void>} Sends all documents with status 200 or an error with status 500.
   */
  async getAll(req, res) {
    try {
      const filter = req.query || {}; // 👈 Aquí pasamos filtros de la query
      const documents = await this.dao.getAll();
      res.status(200).json(documents);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = GlobalController;
