const API_URL = 'http://localhost:3000/api/reviews';
const reviewId = new URLSearchParams(window.location.search).get('id');
const form = document.querySelector('#review-form');
const titleInput = form.elements.title;
const contentInput = form.elements.content;
const statusMessage = document.querySelector('#status-message');
const deleteButton = document.querySelector('#delete-review');
const saveButton = form.querySelector('button[type="submit"]');

const loadReview = async () => {
  if (!reviewId) {
    throw new Error('Review ID is missing.');
  }

  const response = await fetch(`${API_URL}/${encodeURIComponent(reviewId)}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Unable to load review.');
  }

  titleInput.defaultValue = data.review.title;
  contentInput.defaultValue = data.review.content;
};

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  statusMessage.hidden = true;

  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (!title || !content) {
    statusMessage.textContent = 'Please enter both a title and review content.';
    statusMessage.hidden = false;
    return;
  }

  try {
    const response = await fetch(`${API_URL}/${encodeURIComponent(reviewId)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Unable to update review.');
    }

    window.location.href = './index.html';
  } catch (error) {
    statusMessage.textContent = error.message;
    statusMessage.hidden = false;
  }
});

deleteButton.addEventListener('click', async () => {
  if (!window.confirm('Delete this review?')) {
    return;
  }

  statusMessage.hidden = true;

  try {
    const response = await fetch(`${API_URL}/${encodeURIComponent(reviewId)}`, {
      method: 'DELETE',
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Unable to delete review.');
    }

    window.location.href = './index.html';
  } catch (error) {
    statusMessage.textContent = error.message;
    statusMessage.hidden = false;
  }
});

saveButton.disabled = true;
loadReview()
  .catch((error) => {
    statusMessage.textContent = error.message;
    statusMessage.hidden = false;
    deleteButton.disabled = true;
  })
  .finally(() => {
    saveButton.disabled = false;
  });
