const refs = {
  feedbackForm: document.querySelector('.feedback-form'),
};

const formData = { email: '', message: '' };

const FORM_KEY = 'feedback-form-state';

const fillFeedbackFormFields = feedbackForm => {
  try {
    const savedData = JSON.parse(localStorage.getItem(FORM_KEY));
    if (!savedData) return;

    formData.email = savedData.email || '';
    formData.message = savedData.message || '';

    feedbackForm.elements.email.value = formData.email;
    feedbackForm.elements.message.value = formData.message;
  } catch (err) {
    console.log(err.message);
  }
};

fillFeedbackFormFields(refs.feedbackForm);

const onFeedbackFormFieldInput = ({ target }) => {
  try {
    const name = target.name;
    const value = target.value.trim();

    formData[name] = value;

    localStorage.setItem(FORM_KEY, JSON.stringify(formData));
  } catch (err) {
    console.log(err.message);
  }
};

const onFeedbackFormSubmit = event => {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log('Form submitted:', formData);

  localStorage.removeItem(FORM_KEY);
  formData.email = '';
  formData.message = '';

  event.target.reset();
};

refs.feedbackForm.addEventListener('input', onFeedbackFormFieldInput);
refs.feedbackForm.addEventListener('submit', onFeedbackFormSubmit);
