import { List, ListItem } from "components/structure/list/list";
import { ListViewer } from "components/structure/list/list-viewer";
import { ListPath } from "components/structure/list/path";
import { noop } from "lodash";
import React from "react";
import { PageLayout } from "./layout/page";

const items1: Array<ListItem> = [
  {
    id: "{",
    content: "{",
  },
  {
    id: "}",
    content: "}",
  },
];

const items2: Array<ListItem> = [
  {
    id: "{",
    content: "{",
  },
  {
    id: "line1",
    content: "line1",
  },
  {
    id: "}",
    content: "}",
  },
];

const items3: Array<ListItem> = [
  {
    id: "{",
    content: "{",
  },
  {
    id: "line1",
    content: "line1",
  },
  {
    id: "line2",
    content: "line1",
  },
  {
    id: "}",
    content: "}",
  },
];

const items4: Array<ListItem> = [
  {
    id: "{",
    content: "{",
  },
  {
    id: "line1",
    content: "line1",
  },
  {
    id: "sublist",
    content: <List items={items3} />,
  },
  {
    id: "line3",
    content: "line1",
  },
  {
    id: "}",
    content: "}",
  },
];

const path = ["one", "two", "three"];

export const TestPage: React.FC = () => {
  return (
    <PageLayout>
      <ListPath path={path} onChangePath={noop} />
      <br />
      <ListViewer>
        <List items={items1} />
      </ListViewer>
      <br />
      <ListViewer>
        <List items={items2} />
      </ListViewer>
      <br />
      <ListViewer>
        <List items={items3} />
      </ListViewer>
      <br />
      <ListViewer>
        <List items={items4} />
      </ListViewer>
    </PageLayout>
  );
};
