import React, { useRef } from "react";
import { useFocusable, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import Paper from "@mui/material/Paper";

type ScrollableBoxProps = { children: React.ReactNode };

const SCROLL_OFFSET = 80;

export const ScrollableBox = ({ children }: ScrollableBoxProps): JSX.Element => {
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
      
    case "left":
      setFocus("menu_about_screen");
      break;
    }
    
    return true;
  };
  const { ref, focused } = useFocusable({
    onArrowPress: onArrow,
    focusKey: 'about_scrollable'
  });
  
  return (
    <div ref={ref}>
      <Paper
        ref={paperRef}
        elevation={focused ? 5 : 0}
        sx={{
          background: "transparent",
          height: "85vh",
          padding: 5,
          overflowY: "auto",
        }}
      >
        {children}
      </Paper>
    </div>
  );
};
