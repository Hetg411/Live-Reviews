const express = require('express');
const {
  createReview,
  deleteReview,
  getAllReviews,
  getReviewById,
  updateReview,
} = require('../controllers/reviewController');

const router = express.Router();

router.get('/', getAllReviews);
router.get('/:id', getReviewById);
router.post('/', createReview);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

module.exports = router;
