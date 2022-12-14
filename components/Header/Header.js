import styled from "styled-components";
import Icon from "../Icon/Icon";

export default function Header({ onShowFilterMenu, filterMenu, addLocation }) {
  return (
    <StyledHeader>
      <StyledH1>localSports</StyledH1>
      {filterMenu && (
        <StyledButton type="button" onClick={onShowFilterMenu}>
          <Icon option />
        </StyledButton>
      )}
      {addLocation && <StyledH2 id="formTitle">add location</StyledH2>}
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin: 0 1rem 1rem 1rem;
`;

const StyledH1 = styled.h1`
  width: fit-content;
  height: fit-content;
`;

const StyledH2 = styled.h2`
  font-size: 1rem;
`;

const StyledButton = styled.button`
  background: none;
  border: none;
`;
