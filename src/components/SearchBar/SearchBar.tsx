import SearchIcon from '@mui/icons-material/Search';

import { Search } from './Search';
import { SearchIconWrapper } from './SearchIconWrapper';
import { StyledInputBase } from './StyledInputBase';

export type SearchBarProps = {
  onTextChange: (text: string) => void;
};

export function SearchBar({ onTextChange }: SearchBarProps) {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        onChange={(event) => {
          event.preventDefault();
          const query = event.target.value;
          onTextChange(query);
        }}
      />
    </Search>
  );
}
