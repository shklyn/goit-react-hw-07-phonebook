import { Button, Item } from './ContactItem.styled';
import { useDispatch, useSelector } from 'react-redux';
import { getVisibleContacts } from 'helperFunctions/helperFunctions';
import { getContacts } from 'redux/selectors';
import { getFiltedContacts } from 'redux/filterSlice/filterSlice';
import { deleteContact } from 'redux/operations';

export const ContactItem = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFiltedContacts);

  return getVisibleContacts(contacts, filter).map(({ id, name, number }) => {
    return (
      <Item key={id}>
        {name}: {number}
        <Button
          type="button"
          onClick={() => {
            dispatch(deleteContact(id));
          }}
        >
          Delete
        </Button>
      </Item>
    );
  });
};