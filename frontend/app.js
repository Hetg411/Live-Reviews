const app = document.querySelector('#app');

const createSampleDate = (daysAgo, hoursAgo) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  date.setHours(date.getHours() - hoursAgo);
  return date.toISOString();
};

const reviews = [
  {
    id: 'review-aurora',
    title: 'A lovely little neighborhood cafe',
    content: 'Warm service, thoughtful coffee, and a calm place to spend the afternoon.',
    createdAt: createSampleDate(0, 2),
  },
  {
    id: 'review-trail',
    title: 'The weekend trail guide',
    content: 'Clear directions and a beautiful route. The lookout near the end is worth it.',
    createdAt: createSampleDate(1, 4),
  },
  {
    id: 'review-notebook',
    title: 'A notebook that goes everywhere',
    content: 'The paper feels great and the cover has held up nicely in my everyday bag.',
    createdAt: createSampleDate(3, 1),
  },
];

const getRoute = () => {
  const pathname = window.location.pathname.replace(/\/index\.html$/, '/');
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0 || (segments.length === 1 && segments[0] === 'frontend')) {
    return { page: 'list' };
  }

  if (segments.length === 1 && segments[0] === 'new') {
    return { page: 'new' };
  }

  if (segments.length === 1) {
    return { page: 'edit', id: decodeURIComponent(segments[0]) };
  }

  return { page: 'not-found' };
};

const createElement = (tagName, className, text) => {
  const element = document.createElement(tagName);

  if (className) {
    element.className = className;
  }

  if (text !== undefined) {
    element.textContent = text;
  }

  return element;
};

const createButtonLink = (href, className, text) => {
  const link = createElement('a', `button ${className}`, text);
  link.href = href;
  link.dataset.route = '';
  return link;
};

const formatDate = (dateValue) =>
  new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(dateValue));

const renderPageHeading = ({ eyebrow, title, description, action }) => {
  const heading = createElement('section', 'page-heading');
  const copy = document.createElement('div');
  copy.append(
    createElement('p', 'eyebrow', eyebrow),
    createElement('h1', '', title),
    createElement('p', 'page-description', description),
  );
  heading.append(copy);

  if (action) {
    heading.append(action);
  }

  return heading;
};

const renderReviewTable = () => {
  const card = createElement('section', 'table-card');
  const cardHeading = createElement('div', 'card-heading');
  cardHeading.append(
    createElement('h2', '', 'Recent reviews'),
    createElement('span', 'demo-label', 'Sample data'),
  );

  const tableScroll = createElement('div', 'table-scroll');
  const table = createElement('table', 'review-table');
  const head = document.createElement('thead');
  const headerRow = document.createElement('tr');

  ['#', 'Title', 'Content', 'Date-time', 'Edit', 'Delete'].forEach((label) => {
    headerRow.append(createElement('th', '', label));
  });
  head.append(headerRow);
  table.append(head);

  const body = document.createElement('tbody');
  reviews.forEach((review, index) => {
    const row = document.createElement('tr');
    row.append(
      createElement('td', 'review-number', String(index + 1).padStart(2, '0')),
      createElement('td', 'review-title', review.title),
      createElement('td', '', review.content),
      createElement('td', 'review-date', formatDate(review.createdAt)),
    );

    const editCell = document.createElement('td');
    const editLink = createElement('a', 'table-action table-action-edit', 'Edit');
    editLink.href = `/${encodeURIComponent(review.id)}`;
    editLink.dataset.route = '';
    editCell.append(editLink);
    row.append(editCell);

    const deleteCell = document.createElement('td');
    const deleteButton = createElement('button', 'table-action table-action-delete', 'Delete');
    deleteButton.type = 'button';
    deleteButton.dataset.deleteId = review.id;
    deleteCell.append(deleteButton);
    row.append(deleteCell);

    body.append(row);
  });

  if (reviews.length === 0) {
    const emptyRow = document.createElement('tr');
    const emptyCell = createElement('td', 'empty-state', 'No reviews to show yet.');
    emptyCell.colSpan = 6;
    emptyRow.append(emptyCell);
    body.append(emptyRow);
  }

  table.append(body);
  tableScroll.append(table);
  card.append(cardHeading, tableScroll);
  return card;
};

const renderListPage = () => {
  app.replaceChildren(
    renderPageHeading({
      eyebrow: 'Your workspace',
      title: 'Reviews, at a glance.',
      description: 'Keep useful feedback, recommendations, and little discoveries all in one place.',
      action: createButtonLink('/new/', 'button-primary', 'Create review'),
    }),
    renderReviewTable(),
  );
};

const renderFormPage = (route) => {
  const isEditing = route.page === 'edit';
  const review = isEditing ? reviews.find((item) => item.id === route.id) : null;

  if (isEditing && !review) {
    renderNotFoundPage();
    return;
  }

  const formCard = createElement('section', 'form-card');
  const form = document.createElement('form');
  form.className = 'form-content';

  const intro = createElement(
    'p',
    'form-intro',
    isEditing
      ? 'Make any changes you need, then save your updated review.'
      : 'Capture a recommendation, an experience, or anything worth remembering.',
  );

  const titleField = document.createElement('div');
  titleField.className = 'form-field';
  const titleLabel = createElement('label', '', 'Title');
  titleLabel.htmlFor = 'review-title';
  const titleInput = document.createElement('input');
  titleInput.id = 'review-title';
  titleInput.name = 'title';
  titleInput.type = 'text';
  titleInput.placeholder = 'Give your review a clear title';
  titleInput.autocomplete = 'off';
  titleInput.required = true;
  titleInput.defaultValue = review?.title ?? '';
  titleField.append(titleLabel, titleInput);

  const contentField = document.createElement('div');
  contentField.className = 'form-field';
  const contentLabel = createElement('label', '', 'Content');
  contentLabel.htmlFor = 'review-content';
  const contentInput = document.createElement('textarea');
  contentInput.id = 'review-content';
  contentInput.name = 'content';
  contentInput.placeholder = 'What would you like to share?';
  contentInput.required = true;
  contentInput.defaultValue = review?.content ?? '';
  contentField.append(contentLabel, contentInput);

  const errorMessage = createElement('p', 'form-error');
  errorMessage.hidden = true;
  errorMessage.setAttribute('role', 'alert');

  const actions = createElement('div', 'form-actions');
  if (isEditing) {
    const deleteButton = createElement('button', 'button button-danger', 'Delete review');
    deleteButton.type = 'button';
    deleteButton.dataset.deleteId = review.id;
    actions.append(deleteButton);
  } else {
    actions.append(createElement('span'));
  }

  const mainActions = createElement('div', 'form-actions-main');
  const cancelLink = createElement('a', 'button button-secondary', 'Cancel');
  cancelLink.href = '/';
  cancelLink.dataset.route = '';

  const resetButton = createElement('button', 'button button-secondary', 'Reset');
  resetButton.type = 'reset';

  const saveButton = createElement('button', 'button button-primary', 'Save review');
  saveButton.type = 'submit';
  mainActions.append(cancelLink, resetButton, saveButton);
  actions.append(mainActions);

  form.append(intro, titleField, contentField, errorMessage, actions);
  formCard.append(form);

  const pageHeading = renderPageHeading({
    eyebrow: isEditing ? 'Review details' : 'A new note',
    title: isEditing ? 'Edit your review.' : 'Create a review.',
    description: isEditing
      ? 'Keep the details up to date.'
      : 'A few words can help someone else make a great choice.',
  });

  app.replaceChildren(pageHeading, formCard);

  form.addEventListener('reset', () => {
    errorMessage.hidden = true;
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (!title || !content) {
      errorMessage.textContent = 'Please enter both a title and review content.';
      errorMessage.hidden = false;
      return;
    }

    if (isEditing) {
      review.title = title;
      review.content = content;
    } else {
      reviews.unshift({
        id: `review-${crypto.randomUUID()}`,
        title,
        content,
        createdAt: new Date().toISOString(),
      });
    }

    navigateTo('/');
  });
};

const renderNotFoundPage = () => {
  const card = createElement('section', 'not-found-card');
  card.append(
    createElement('p', 'eyebrow', 'Not found'),
    createElement('h1', '', 'We could not find that review.'),
    createElement('p', '', 'It may have been removed or the link may be incorrect.'),
    createButtonLink('/', 'button-primary', 'Back to reviews'),
  );
  app.replaceChildren(card);
};

const render = () => {
  const route = getRoute();

  if (route.page === 'list') {
    renderListPage();
  } else if (route.page === 'new' || route.page === 'edit') {
    renderFormPage(route);
  } else {
    renderNotFoundPage();
  }
};

const navigateTo = (href) => {
  window.history.pushState({}, '', href);
  render();
};

document.addEventListener('click', (event) => {
  const routeLink = event.target.closest('a[data-route]');

  if (routeLink && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey) {
    event.preventDefault();
    navigateTo(routeLink.href);
    return;
  }

  const deleteButton = event.target.closest('button[data-delete-id]');
  if (deleteButton && window.confirm('Delete this review?')) {
    const reviewIndex = reviews.findIndex((review) => review.id === deleteButton.dataset.deleteId);

    if (reviewIndex !== -1) {
      const currentRoute = getRoute();
      const isDeletingEditedReview =
        currentRoute.page === 'edit' && currentRoute.id === deleteButton.dataset.deleteId;
      reviews.splice(reviewIndex, 1);

      if (isDeletingEditedReview) {
        navigateTo('/');
      } else {
        render();
      }
    }
  }
});

window.addEventListener('popstate', render);

render();
