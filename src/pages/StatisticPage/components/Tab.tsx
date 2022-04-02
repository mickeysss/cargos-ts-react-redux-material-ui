import { styled } from '@mui/system';

import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';

export const Tab = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  color: white;
  width: 100%;
  padding: 12px 16px;
  margin: 6px 6px;
  background: transparent;
  border-radius: 5px;
  display: flex;
  justify-content: center;

  &:hover {
    background: transparent;
  }

  &:focus {
    color: #fff;
    border-radius: 3px;
    outline: 2px solid yellow;
    outline-offset: 2px;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: black;
    color: white;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
