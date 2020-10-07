export type TProps = ImageProps | LayoutProps | TextProps | ContainerProps;

type BaseProps = {
    type: string; // "text" | "layout" | "image" …;
    grow?: number; // optionally sets a growth factor if used in a layout (default = 1)
};

export type ImageProps = BaseProps & {
    type: "image";
    document: string; // svg image
    data: string; // base64 image. Will only be read if no svg image is passed
    width?: number; // sets a fixed maximum width
    height?: number; // sets a fixed maximum height
}


export type LayoutProps = BaseProps & {
    type: "layout";
    orientation?: "horizontal" | "vertical"; // "horizontal" | "vertical" (default)
    children: TProps[]; // any other preview element
}

export type TextProps = BaseProps & {
    type: "text";
    content: string; // text that should be shown
    fontSize?: number; // sets the font size
}


export type ContainerProps = BaseProps & {
    type: "container";
    property: object; // widgets property object from Values API
}