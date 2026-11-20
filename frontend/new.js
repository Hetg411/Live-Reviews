const API_URL = 'http://localhost:3000/api/reviews';
const form = document.querySelector('#review-form');
const statusMessage = document.querySelector('#status-message');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  statusMessage.hidden = true;

  const title = form.elements.title.value.trim();
  const content = form.elements.content.value.trim();

  if (!title || !content) {
    statusMessage.textContent = 'Please enter both a title and review content.';
    statusMessage.hidden = false;
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Unable to save review.');
    }

    window.location.href = './index.html';
  } catch (error) {
    statusMessage.textContent = error.message;
    statusMessage.hidden = false;
  }
});
