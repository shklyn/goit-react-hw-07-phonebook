import { Formik } from 'formik';
import { MainForm, Label, Input, Button } from './ContactForm.styled';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/operations';
import { getContacts } from 'redux/selectors';
import Notiflix from 'notiflix';

export function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const dispatch = useDispatch();
  const stateContacts = useSelector(getContacts);

  const onChange = e => {
    e.currentTarget.name === 'name'
      ? setName(e.currentTarget.value)
      : setNumber(e.currentTarget.value);
  };

  const handleSubmit = (values, { resetForm }) => {
    resetForm();
    const userObj = {
      name: name,
      number: number,
    };

    const existingNameContact = stateContacts.find(contact => contact.name.toLowerCase() === name.toLowerCase());
    const existingNumberContact = stateContacts.find(contact => contact.number === number);

    if (existingNameContact) {
      Notiflix.Notify.failure(`${name} is already in contact`);
      return;
    }

    if (existingNumberContact) {
      Notiflix.Notify.failure(`${number} is already in contact`);
      return;
    }

    dispatch(addContact(userObj));
    setName('');
    setNumber('');
  };

  return (
    <Formik initialValues={{ name, number }} onSubmit={handleSubmit}>
      <MainForm autoComplete="off">
        <Label>
          Name
          <Input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={onChange}
            value={name}
          />
        </Label>
        <Label>
          Number
          <Input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={onChange}
            value={number}
          />
        </Label>

        <Button type="submit">Add contact</Button>
      </MainForm>
    </Formik>
  );
}
