import { Fragment } from "react";
import styled from "styled-components";
import GoBackButton from "../GoBackButton/GoBackButton";

export default function FilterMenu({
  onShowFilterMenu,
  onChangeSort,
  onFilter,
  filterData,
}) {
  return (
    <StyledMenu>
      <StyledButton type="button" onClick={onShowFilterMenu}>
        <GoBackButton />
      </StyledButton>
      <StyledH2>sort</StyledH2>
      <form>
        <label htmlFor="sort"></label>
        <StyledSelect
          name="sort"
          id="sort"
          onChange={(event) => onChangeSort(event.target.value)}
        >
          <option value="default">choose option</option>
          <option value="az">a - z</option>
          <option value="za">z - a</option>
          <option value="toOld">newest first</option>
          <option value="toNew">oldest first</option>
        </StyledSelect>
      </form>

      <StyledH2>filter - sport</StyledH2>
      <form>
        {Object.entries(filterData.sport).map((entry) => (
          <Fragment key={entry[0]}>
            <StyledInputWrapper>
              <StyledInput
                type="checkbox"
                value={entry[0]}
                id={entry[0]}
                onChange={(event) => onFilter(event, "sport")}
                checked={entry[1]}
              />
              <label htmlFor={entry[0]}>{entry}</label>
            </StyledInputWrapper>
          </Fragment>
        ))}
      </form>
      <StyledH2>filter - city</StyledH2>
      <form>
        {Object.entries(filterData.city).map((entry) => (
          <Fragment key={entry[0]}>
            <StyledInputWrapper>
              <StyledInput
                type="checkbox"
                value={entry[0]}
                id={entry[0]}
                onChange={(event) => onFilter(event, "city")}
                checked={entry[1]}
              />
              <label htmlFor={entry[0]}>{entry}</label>
            </StyledInputWrapper>
          </Fragment>
        ))}
      </form>
      <StyledH2>filter - rating</StyledH2>
      <form>
        {Object.entries(filterData.rating).map((entry) => (
          <Fragment key={entry[0]}>
            <StyledInputWrapper>
              <StyledInput
                type="checkbox"
                value={entry[0]}
                onChange={(event) => onFilter(event, "rating")}
                checked={entry[1]}
              />
              <label>{entry}</label>
            </StyledInputWrapper>
          </Fragment>
        ))}
      </form>
    </StyledMenu>
  );
}

const StyledMenu = styled.div`
  position: fixed;
  right: 0;
  z-index: 1;
  height: 100vh;
  width: 60%;
  background-color: var(--color-background);
  opacity: 0.95;
`;

const StyledButton = styled.button`
  background: none;
  border: none;
`;

const StyledH2 = styled.h2`
  font-size: 1rem;
  margin: 2rem 0 0.3rem 0.5rem;
`;

const StyledSelect = styled.select`
  margin-left: 0.5rem;
`;

const StyledInputWrapper = styled.div`
  display: inline-flex;
`;

const StyledInput = styled.input`
  margin: 0 0.3rem 0 0.8rem;
`;
