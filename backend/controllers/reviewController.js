const mongoose = require('mongoose');
const Review = require('../database/models/review');

const getReviewInput = (body) => {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return null;
  }

  const { title, content } = body;

  if (
    typeof title !== 'string' ||
    typeof content !== 'string' ||
    !title.trim() ||
    !content.trim()
  ) {
    return null;
  }

  return {
    title: title.trim(),
    content: content.trim(),
  };
};

const isValidReviewId = (id) => mongoose.isValidObjectId(id);

const getAllReviews = async (req, res) => {
  const reviews = await Review.find().sort({ createdAt: -1 });
  return res.status(200).json({ reviews });
};

const getReviewById = async (req, res) => {
  const { id } = req.params;

  if (!isValidReviewId(id)) {
    return res.status(400).json({ message: 'Invalid review ID.' });
  }

  const review = await Review.findById(id);

  if (!review) {
    return res.status(404).json({ message: 'Review not found.' });
  }

  return res.status(200).json({ review });
};

const createReview = async (req, res) => {
  const reviewInput = getReviewInput(req.body);

  if (!reviewInput) {
    return res
      .status(400)
      .json({ message: 'Title and content must be non-empty strings.' });
  }

  const review = await Review.create(reviewInput);
  const io = req.app.get('io');
  if (io) {
    io.emit('review:created', review);
  }

  return res.status(201).json({ review });
};

const updateReview = async (req, res) => {
  const { id } = req.params;

  if (!isValidReviewId(id)) {
    return res.status(400).json({ message: 'Invalid review ID.' });
  }

  const reviewInput = getReviewInput(req.body);

  if (!reviewInput) {
    return res
      .status(400)
      .json({ message: 'Title and content must be non-empty strings.' });
  }

  const review = await Review.findByIdAndUpdate(id, reviewInput, {
    new: true,
    runValidators: true,
  });

  if (!review) {
    return res.status(404).json({ message: 'Review not found.' });
  }

  const io = req.app.get('io');
  if (io) {
    io.emit('review:updated', review);
  }

  return res.status(200).json({ review });
};

const deleteReview = async (req, res) => {
  const { id } = req.params;

  if (!isValidReviewId(id)) {
    return res.status(400).json({ message: 'Invalid review ID.' });
  }

  const review = await Review.findByIdAndDelete(id);

  if (!review) {
    return res.status(404).json({ message: 'Review not found.' });
  }

  const io = req.app.get('io');
  if (io) {
    io.emit('review:deleted', { reviewId: review._id });
  }

  return res.status(200).json({ message: 'Review deleted successfully.' });
};

module.exports = {
  createReview,
  deleteReview,
  getAllReviews,
  getReviewById,
  updateReview,
};
