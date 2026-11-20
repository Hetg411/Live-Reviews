const API_URL = 'http://localhost:3000/api/reviews';
const reviewList = document.querySelector('#review-list');
const statusMessage = document.querySelector('#status-message');

const formatDate = (dateValue) =>
  new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(dateValue));

const renderReviews = (reviews) => {
  reviewList.replaceChildren();

  if (reviews.length === 0) {
    const row = document.createElement('tr');
    const cell = document.createElement('td');
    cell.className = 'empty-state';
    cell.colSpan = 6;
    cell.textContent = 'No reviews to show yet.';
    row.append(cell);
    reviewList.append(row);
    return;
  }

  reviews.forEach((review, index) => {
    const row = document.createElement('tr');
    const numberCell = document.createElement('td');
    numberCell.className = 'review-number';
    numberCell.textContent = String(index + 1).padStart(2, '0');

    const titleCell = document.createElement('td');
    titleCell.className = 'review-title';
    titleCell.textContent = review.title;

    const contentCell = document.createElement('td');
    contentCell.textContent = review.content;

    const dateCell = document.createElement('td');
    dateCell.className = 'review-date';
    dateCell.textContent = formatDate(review.createdAt);

    const editCell = document.createElement('td');
    const editLink = document.createElement('a');
    editLink.className = 'table-action table-action-edit';
    editLink.href = `./edit.html?id=${encodeURIComponent(review._id)}`;
    editLink.textContent = 'Edit';
    editCell.append(editLink);

    const deleteCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.className = 'table-action table-action-delete';
    deleteButton.type = 'button';
    deleteButton.dataset.reviewId = review._id;
    deleteButton.textContent = 'Delete';
    deleteCell.append(deleteButton);

    row.append(numberCell, titleCell, contentCell, dateCell, editCell, deleteCell);
    reviewList.append(row);
  });
};

const loadReviews = async () => {
  statusMessage.className = 'loading-message';
  statusMessage.textContent = 'Loading reviews...';

  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Unable to load reviews.');
    }

    renderReviews(data.reviews);
    statusMessage.textContent = '';
  } catch (error) {
    statusMessage.className = 'form-error';
    statusMessage.textContent = error.message;
  }
};

reviewList.addEventListener('click', async (event) => {
  const deleteButton = event.target.closest('button[data-review-id]');

  if (!deleteButton || !window.confirm('Delete this review?')) {
    return;
  }

  deleteButton.disabled = true;

  try {
    const response = await fetch(`${API_URL}/${encodeURIComponent(deleteButton.dataset.reviewId)}`, {
      method: 'DELETE',
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Unable to delete review.');
    }

    await loadReviews();
  } catch (error) {
    statusMessage.className = 'form-error';
    statusMessage.textContent = error.message;
    deleteButton.disabled = false;
  }
});

loadReviews();
