/**
 * @swagger
 * /api/businesses:
 *   get:
 *     summary: Retrieve a list of businesses
 *     tags: [Businesses]
 *     responses:
 *       200:
 *         description: A list of businesses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Business'
 * 
 *   post:
 *     summary: Create a new business
 *     tags: [Businesses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Business'
 *     responses:
 *       201:
 *         description: New business created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Business'
 * 
 * /api/businesses/{id}:
 *   put:
 *     summary: Update an existing business
 *     tags: [Businesses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the business to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Business'
 *     responses:
 *       200:
 *         description: Updated business
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Business'
 *       404:
 *         description: Business not found
 * 
 *   delete:
 *     summary: Delete an existing business
 *     tags: [Businesses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the business to delete
 *     responses:
 *       200:
 *         description: Business deleted successfully
 *       404:
 *         description: Business not found
 */
const express = require('express');
const router = express.Router();
const businessController = require('../controllers/business.controller');


router.get('/', businessController.getAllBusinesses);
router.get('/:id', businessController.getBusinessById);
router.post('/', businessController.createBusiness);
router.put('/:id', businessController.updateBusiness);
router.delete('/:id', businessController.deleteBusiness);

module.exports = router;
