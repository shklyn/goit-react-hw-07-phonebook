import { SearchLabel, SearchInput } from './Filter.styled';
import { useDispatch } from 'react-redux';
import { changeFilter } from 'redux/filterSlice/filterSlice';



export const Filter = () => {
  const dispatch = useDispatch();

  return (
    <SearchLabel>
      Find contacts by name
      <SearchInput
        type="text"
        onChange={e => {
          dispatch(changeFilter(e.target.value));
        }}
      ></SearchInput>
    </SearchLabel>
  );
};