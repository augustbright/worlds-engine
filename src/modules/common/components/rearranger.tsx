import {
  faCompressArrowsAlt,
  faExpandArrowsAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Color } from "modules/theming";
import { fromThemeProp } from "modules/theming/utils";
import React, { useCallback } from "react";
import { useDrag, useDragLayer, useDrop } from "react-dnd";
import styled from "styled-components";

type Props = {
  id: string;
  type: string;
  onRearrange: (from: string, to: string) => void;
};

const HandleContainer = styled.div`
  display: inline-flex;
  vertical-align: middle;
  width: 22px;
  height: 22px;
  justify-content: center;
  align-items: center;
  color: ${fromThemeProp((t) => t.colors[Color.BUTTON_FOREGROUND])};
  cursor: grab;
  &:hover {
    color: ${fromThemeProp((t) => t.colors[Color.BUTTON_HOVER_FOREGROUND])};
  }
`;

const DropContainer = styled.div`
  display: inline-flex;
  vertical-align: middle;
  justify-content: center;
  align-items: center;
  width: 22px;
  height: 22px;
  border: solid 1px ${fromThemeProp((t) => t.colors[Color.INPUT_BORDER])};
  color: ${fromThemeProp((t) => t.colors[Color.BUTTON_FOREGROUND])};
`;

export const Rearranger = ({ id, type, onRearrange }: Props) => {
  const { monitorItemType, monitorIsDragging, monitorItem } = useDragLayer(
    (monitor) => ({
      monitorItemType: monitor.getItemType(),
      monitorIsDragging: monitor.isDragging(),
      monitorItem: monitor.getItem(),
    })
  );

  const handleDrop = useCallback(
    ({ id: from }) => {
      onRearrange(from, id);
    },
    [id, onRearrange]
  );

  const [{ itemIsDragging }, drag] = useDrag({
    type,
    item: { id },
    collect: (monitor) => ({
      itemIsDragging: monitor.isDragging(),
    }),
  });

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: type,
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver(),
    }),
    drop: handleDrop,
  });

  const isDragging =
    itemIsDragging ||
    (monitorIsDragging && monitorItemType === type && monitorItem.id !== id);

  if (isDragging) {
    return (
      <DropContainer ref={drop}>
        {isOver && canDrop ? (
          <FontAwesomeIcon icon={faCompressArrowsAlt} size="sm" />
        ) : null}
      </DropContainer>
    );
  }
  return (
    <HandleContainer ref={drag}>
      <FontAwesomeIcon icon={faExpandArrowsAlt} size="sm" />
    </HandleContainer>
  );
};
