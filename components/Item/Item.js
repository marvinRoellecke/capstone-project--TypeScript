import styled from "styled-components";
import { IoStar, IoLocationSharp } from "react-icons/io5";

export default function Item({ item }) {
  return (
    <StyledLi image={item.image}>
      <StyledTitle>{item.title}</StyledTitle>
      <StyledRating>
        <IoStar />
        {item.rating}
      </StyledRating>
      <StyledTagWrapper>
        {item.tags.map((tag) => (
          <StyledTag key={tag}>{tag}</StyledTag>
        ))}
      </StyledTagWrapper>

      <StyledAddress>
        <IoLocationSharp /> {item.address.city}
      </StyledAddress>
    </StyledLi>
  );
}

const StyledLi = styled.li`
  font-size: 0.8rem;
  height: 10rem;
  box-shadow: var(--box-shadow);
  border-radius: var(--border-radius);
  margin: 0 1rem;
  padding: 0 1rem;
  background-image: var(--background-filter), url(${(props) => props.image});
  background-position: center;
  background-size: cover;
  text-align: right;
  color: var(--color-background);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  grid-template-areas:
    "title title title title"
    ". . rating rating "
    ". tags tags tags"
    ". city city city";
  align-items: center;
`;

const StyledTitle = styled.h2`
  grid-area: title;
  font-size: 1.7rem;
  white-space: nowrap;
  overflow: hidden;
`;

const StyledRating = styled.p`
  grid-area: rating;
  align-self: flex-start;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.3rem;
`;

const StyledTags = styled.div`
  grid-area: tags;
  align-self: flex-end;
`;

const StyledTag = styled.span`
  font-size: 0.6rem;
  margin-left: 0.3rem;
  border: 1px solid;
  border-radius: 3px;
  padding: 0 2px;
`;

const StyledAddress = styled.p`
  grid-area: city;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.3rem;
`;
