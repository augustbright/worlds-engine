import React from "react";
import styled from "styled-components";
import { NavigationItem, Item } from "./navigation-item";

type Props = {
  items: Array<NavigationItem>;
};

const Nav = styled.nav``;

const Ul = styled.ul`
  height: 24px;
  display: flex;
  list-style: none;
`;

export const NavigationBar: React.FC<Props> = ({ items }) => {
  return (
    <Nav>
      <Ul>
        {items.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </Ul>
    </Nav>
  );
};
