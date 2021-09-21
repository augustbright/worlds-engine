import { Pin } from "components/structure/anchor/pin";
import { AnchorViewer } from "components/structure/anchor/viewer";
import { AddItem } from "components/structure/item/add-item";
import { MapItem } from "components/structure/item/map-item";
import { List, ListItem } from "components/structure/list/list";
import { Bracket, withBrackets } from "components/structure/list/withBrackets";
import { noop } from "lodash";
import React from "react";
import { PageLayout } from "./layout/page";

const items1: Array<ListItem> = withBrackets([], Bracket.CURLY);

const items2: Array<ListItem> = withBrackets(
  [
    {
      id: "line1",
      content: (
        <MapItem
          keyContent="key"
          valueContent={<Pin path="line1">line 1</Pin>}
        />
      ),
    },
  ],
  Bracket.CURLY
);

const items3: Array<ListItem> = withBrackets(
  [
    {
      id: "line1",
      content: <Pin path="line 1">line 1</Pin>,
    },
    {
      id: "line2",
      content: <Pin path="line 2">line 2</Pin>,
    },
    {
      id: "new",
      content: <AddItem onClick={noop} />,
    },
  ],
  Bracket.CURLY
);

const items4: Array<ListItem> = withBrackets(
  [
    {
      id: "line1",
      content: <Pin path="line 1">line 1</Pin>,
    },
    {
      id: "sublist1",
      content: (
        <Pin path="sublist 1">
          <List items={items1} />
        </Pin>
      ),
    },
    {
      id: "sublist2",
      content: (
        <Pin path="sublist2">
          <List items={items2} />
        </Pin>
      ),
    },
    {
      id: "sublist3",
      content: (
        <Pin path="sublist3">
          <List items={items3} />
        </Pin>
      ),
    },
    {
      id: "line3",
      content: <Pin path="line3">line 2</Pin>,
    },
  ],
  Bracket.CURLY
);

export const TestPage: React.FC = () => {
  return (
    <PageLayout>
      <AnchorViewer>
        <Pin path="first">
          <div>foo</div>
        </Pin>
        <Pin path="second">
          <div>
            bar of: <Pin path="bar content">eggz</Pin>
          </div>
        </Pin>
      </AnchorViewer>
      <br />
      <AnchorViewer>
        <List items={items4} />
      </AnchorViewer>
    </PageLayout>
  );
};
