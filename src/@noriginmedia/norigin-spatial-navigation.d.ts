declare module "@noriginmedia/react-spatial-navigation" {
  export interface FocusableComponentLayout {
    left: number;
    top: number;
    width: number;
    height: number;
    x: number;
    y: number;
    node: HTMLElement;
  }
  
  interface FocusableComponent {
    focusKey: string;
    node: HTMLElement;
    parentFocusKey: string;
    onEnterPress: (details?: KeyPressDetails) => void;
    onEnterRelease: () => void;
    onArrowPress: (direction: string, details: KeyPressDetails) => boolean;
    onFocus: (layout: FocusableComponentLayout, details: FocusDetails) => void;
    onBlur: (layout: FocusableComponentLayout, details: FocusDetails) => void;
    onUpdateFocus: (focused: boolean) => void;
    onUpdateHasFocusedChild: (hasFocusedChild: boolean) => void;
    saveLastFocusedChild: boolean;
    trackChildren: boolean;
    preferredChildFocusKey?: string;
    focusable: boolean;
    isFocusBoundary: boolean;
    autoRestoreFocus: boolean;
    lastFocusedChildKey?: string;
    layout?: FocusableComponentLayout;
    layoutUpdated?: boolean;
  }
  
  interface FocusableComponentUpdatePayload {
    node: HTMLElement;
    preferredChildFocusKey?: string;
    focusable: boolean;
    isFocusBoundary: boolean;
    onEnterPress: (details?: KeyPressDetails) => void;
    onEnterRelease: () => void;
    onArrowPress: (direction: string, details: KeyPressDetails) => boolean;
    onFocus: (layout: FocusableComponentLayout, details: FocusDetails) => void;
    onBlur: (layout: FocusableComponentLayout, details: FocusDetails) => void;
  }
  
  interface FocusableComponentRemovePayload {
    focusKey: string;
  }
  
  interface CornerCoordinates {
    x: number;
    y: number;
  }
  
  interface Corners {
    a: CornerCoordinates;
    b: CornerCoordinates;
  }
  
  export type PressedKeys = { [index: string]: number };
  
  /**
   * Extra details about pressed keys passed on the key events
   */
  export interface KeyPressDetails {
    pressedKeys: PressedKeys;
  }
  
  /**
   * Extra details passed from outside to be bounced back on other callbacks
   */
  export interface FocusDetails {
    event?: Event;
    nativeEvent?: Event;
    [key: string]: any;
  }
  
  export type BackwardsCompatibleKeyMap = { [index: string]: number | number[] };
  
  export type KeyMap = { [index: string]: number[] };

}
