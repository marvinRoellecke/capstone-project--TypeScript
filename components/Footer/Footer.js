import NavigationBar from "../NavigationBar/NavigationBar";
import styled from "styled-components";

export default function Footer({ atHomePage, atFavoritesPage }) {
  return (
    <StyledFooter>
      <NavigationBar
        atHomePage={atHomePage}
        atFavoritesPage={atFavoritesPage}
      />
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  margin: auto 0;
`;
