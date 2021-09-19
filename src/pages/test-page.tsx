import { PatternContainer } from "components/structure/item/pattern-container";
import { Pinnable } from "components/structure/item/pinnable";
import { List, ListItem } from "components/structure/list/list";
import { ListViewer } from "components/structure/list/list-viewer";
import { ListPath } from "components/structure/path/path";
import { noop } from "lodash";
import React from "react";
import { PageLayout } from "./layout/page";

const items1: Array<ListItem> = [
  {
    id: "{",
    content: () => <PatternContainer>{"{"}</PatternContainer>,
  },
  {
    id: "}",
    content: () => <PatternContainer>{"}"}</PatternContainer>,
  },
];

const items2: Array<ListItem> = [
  {
    id: "{",
    content: () => <PatternContainer>{"{"}</PatternContainer>,
  },
  {
    id: "line1",
    content: () => <Pinnable>line 1</Pinnable>,
  },
  {
    id: "}",
    content: () => <PatternContainer>{"}"}</PatternContainer>,
  },
];

const items3: Array<ListItem> = [
  {
    id: "{",
    content: () => <PatternContainer>{"{"}</PatternContainer>,
  },
  {
    id: "line1",
    content: () => <Pinnable>line 1</Pinnable>,
  },
  {
    id: "line2",
    content: () => <Pinnable>line 2</Pinnable>,
  },
  {
    id: "}",
    content: () => <PatternContainer>{"}"}</PatternContainer>,
  },
];

const items4: Array<ListItem> = [
  {
    id: "{",
    content: () => <PatternContainer>{"{"}</PatternContainer>,
  },
  {
    id: "line1",
    content: () => <Pinnable>line 1</Pinnable>,
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
    content: () => <Pinnable>line 3</Pinnable>,
  },
  {
    id: "}",
    content: () => <PatternContainer>{"{"}</PatternContainer>,
  },
];

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
