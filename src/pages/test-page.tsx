import { AddItem } from "components/structure/item/add-item";
import { Pinnable } from "components/structure/item/pinnable";
import { List, ListItem } from "components/structure/list/list";
import { ListViewer } from "components/structure/list/list-viewer";
import { Bracket, withBrackets } from "components/structure/list/withBrackets";
import { ListPath } from "components/structure/path/path";
import { noop } from "lodash";
import React from "react";
import { PageLayout } from "./layout/page";

const items1: Array<ListItem> = withBrackets([], Bracket.CURLY);

const items2: Array<ListItem> = withBrackets(
  [
    {
      id: "line1",
      content: (navigate: string | null) =>
        navigate ? "line 1" : <Pinnable>line 1</Pinnable>,
    },
  ],
  Bracket.CURLY
);

const items3: Array<ListItem> = withBrackets(
  [
    {
      id: "line1",
      content: (navigate: string | null) =>
        navigate ? "line 1" : <Pinnable>line 1</Pinnable>,
    },
    {
      id: "line2",
      content: (navigate: string | null) =>
        navigate ? "line 2" : <Pinnable>line 2</Pinnable>,
    },
    {
      id: "new",
      content: () => <AddItem onClick={noop} />,
    },
  ],
  Bracket.CURLY
);

const items4: Array<ListItem> = withBrackets(
  [
    {
      id: "line1",
      content: (navigate: string | null) =>
        navigate ? "line 1" : <Pinnable>line 1</Pinnable>,
    },
    {
      id: "sublist1",
      content: (navigate: string | null) =>
        navigate ? (
          <List items={items1} />
        ) : (
          <Pinnable>
            <List items={items1} />
          </Pinnable>
        ),
    },
    {
      id: "sublist2",
      content: (navigate: string | null) =>
        navigate ? (
          <List items={items2} />
        ) : (
          <Pinnable>
            <List items={items2} />
          </Pinnable>
        ),
    },
    {
      id: "sublist3",
      content: (navigate: string | null) =>
        navigate ? (
          <List items={items3} />
        ) : (
          <Pinnable>
            <List items={items3} />
          </Pinnable>
        ),
    },
    {
      id: "line3",
      content: (navigate: string | null) =>
        navigate ? "line 3" : <Pinnable>line 3</Pinnable>,
    },
  ],
  Bracket.CURLY
);

const path = ["one", "two", "three"];

export const TestPage: React.FC = () => {
  return (
    <PageLayout>
      <ListPath path={path} onChangePath={noop} />
      <br />
      <ListViewer>
        <List items={items4} />
      </ListViewer>
    </PageLayout>
  );
};
