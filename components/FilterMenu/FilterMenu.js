import styled from "styled-components";
import GoBackButton from "../GoBackButton/GoBackButton";

export default function FilterMenu({
  onShowFilterMenu,
  onChangeSort,
  onFilter,
}) {
  return (
    <StyledMenu>
      <StyledButton type="button" onClick={onShowFilterMenu}>
        <GoBackButton />
      </StyledButton>
      <h2>sort</h2>
      <form>
        <label htmlFor="sort"></label>
        <select
          name="sort"
          id="sort"
          onChange={(event) => onChangeSort(event.target.value)}
        >
          <option value="default">choose option</option>
          <option value="az">a - z</option>
          <option value="za">z - a</option>
          <option value="toOld">newest first</option>
          <option value="toNew">oldest first</option>
        </select>
      </form>
      <h2>filter - sport</h2>
      <form>
        <input
          type="checkbox"
          value="Basketball"
          onChange={(event) => onFilter(event, "sport")}
        />
        <label>basketball</label>

        <input
          type="checkbox"
          value="Soccer"
          onChange={(event) => onFilter(event, "sport")}
        />
        <label>soccer</label>

        <input
          type="checkbox"
          value="Tennis"
          onChange={(event) => onFilter(event, "sport")}
        />
        <label>tennis</label>

        <input
          type="checkbox"
          value="Volleyball"
          onChange={(event) => onFilter(event, "sport")}
        />
        <label>volleyball</label>
      </form>
      <h2>filter - city</h2>
      <form>
        <input
          type="checkbox"
          value="Münster"
          onChange={(event) => onFilter(event, "city")}
        />
        <label>Münster</label>

        <input
          type="checkbox"
          value="Düsseldorf"
          onChange={(event) => onFilter(event, "city")}
        />
        <label>Düsseldorf</label>
      </form>
    </StyledMenu>
  );
}

const StyledMenu = styled.div`
  position: fixed;
  right: 0;
  z-index: 1;
  height: 100vh;
  width: 80vw;
  background-color: var(--color-background);
  opacity: 0.95;
`;

const StyledButton = styled.button`
  background: none;
  border: none;
`;
