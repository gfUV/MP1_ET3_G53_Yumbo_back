/**
 * GlobalDAO - A generic Data Access Object to perform CRUD operations.
 * Works with any Mongoose model passed to the constructor.
 */
class GlobalDAO {
  /**
   * Creates an instance of GlobalDAO.
   * @param {import("mongoose").Model} model - The Mongoose model used for database operations.
   */
  constructor(model) {
    this.model = model;
  }

  /**
   * Create a new document in the collection.
   *
   * @async
   * @function create
   * @param {Object} data - Data to create a new document.
   * @returns {Promise<Object>} The created document.
   * @throws {Error} If document creation fails.
   */
  async create(data) {
    try {
      const document = new this.model(data);
      return await document.save();
    } catch (error) {
      throw new Error(`Error creating document: ${error.message}`);
    }
  }

  /**
   * Read a document by its ID.
   *
   * @async
   * @function read
   * @param {string} id - The document ID.
   * @returns {Promise<Object>} The document found.
   * @throws {Error} If no document is found or query fails.
   */
  async read(id) {
    try {
      const document = await this.model.findById(id);
      if (!document) throw new Error("Document not found");
      return document;
    } catch (error) {
      throw new Error(`Error getting document by ID: ${error.message}`);
    }
  }

  /**
   * Update a document by its ID.
   *
   * @async
   * @function update
   * @param {string} id - The document ID.
   * @param {Object} updateData - The data to update.
   * @returns {Promise<Object>} The updated document.
   * @throws {Error} If no document is found or update fails.
   */
  async update(id, updateData) {
    try {
      const updatedDocument = await this.model.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });
      if (!updatedDocument) throw new Error("Document not found");
      return updatedDocument;
    } catch (error) {
      throw new Error(`Error updating document: ${error.message}`);
    }
  }

  /**
   * Delete a document by its ID.
   *
   * @async
   * @function delete
   * @param {string} id - The document ID.
   * @returns {Promise<Object>} The deleted document.
   * @throws {Error} If no document is found or deletion fails.
   */
  async delete(id) {
    try {
      const deletedDocument = await this.model.findByIdAndDelete(id);
      if (!deletedDocument) throw new Error("Document not found");
      return deletedDocument;
    } catch (error) {
      throw new Error(`Error deleting document: ${error.message}`);
    }
  }

  /**
   * Get all documents that match a filter.
   *
   * @async
   * @function getAll
   * @param {Object} [filter={}] - Optional filter object.
   * @returns {Promise<Object[]>} An array of matching documents.
   * @throws {Error} If fetching documents fails.
   */
  async getAll(filter = {}) {
    try {
      return await this.model.find(filter);
    } catch (error) {
      throw new Error(`Error getting documents: ${error.message}`);
    }
  }

  /**
   * Find a single document that matches the query.
   *
   * @async
   * @function findOne
   * @param {Object} query - MongoDB query object.
   * @returns {Promise<Object|null>} The found document or null if none match.
   */
  async findOne(query) {
    return await this.model.findOne(query);
  }
}

module.exports = GlobalDAO;
