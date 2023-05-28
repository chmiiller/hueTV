import React, { useRef } from "react";
import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import Paper from "@mui/material/Paper";

type ScrollableBoxProps = {
  children: React.ReactNode;
};

type FocusableScrollableBoxProps = {
  // focused: boolean;
};

const SCROLL_OFFSET = 80;

const ScrollableBox = ({ children }: ScrollableBoxProps): JSX.Element => {
  const paperRef = useRef<HTMLHeadingElement>(null);

  const onArrow = (direction: string) => {
    switch (direction) {
    case "up":
      paperRef.current?.scrollTo({
        top: paperRef.current?.scrollTop - SCROLL_OFFSET,
        left: 0,
        behavior: "smooth",
      });
      break;

    case "down":
      paperRef.current?.scrollTo({
        top: paperRef.current?.scrollTop + SCROLL_OFFSET,
        left: 0,
        behavior: "smooth",
      });
      break;
    }
  };

  const ScrollableComponent = () => {
    const { ref, focused } = useFocusable();
    return (
      <div ref={ref}>
        <Paper
          ref={paperRef}
          elevation={20}
          sx={{
            background: "#22242b",
            marginLeft: 8,
            marginRight: 8,
            height: "85vh",
            padding: 5,
            border: focused ? 1 : 0,
            borderColor: "#3f444a",
            overflowY: "auto",
          }}
        >
          {children}
        </Paper>
      </div>
    );
  };
  return (
    <ScrollableComponent
      // onArrowPress={onArrow}
    />
  );
};

export default ScrollableBox;
