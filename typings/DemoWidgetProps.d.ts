/**
 * This file was generated from DemoWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { ActionValue, DynamicValue, EditableValue, ListValue, ListWidgetValue, WebImage } from "mendix";

export type OrientationEnum = "vertical" | "horizontal";

export type ColourEnum = "red" | "green" | "blue" | "yellow" | "pink";

export interface SubsType {
    newSubWidget?: ReactNode;
    subBool1: boolean;
    subBool2: boolean;
    subBool3: boolean;
    subBool4: boolean;
    subAction?: ActionValue;
    subContent?: ListWidgetValue;
    subDatasource: ListValue;
    subImage?: DynamicValue<WebImage>;
    subBool5: boolean;
    subBool6: boolean;
    subBool7: boolean;
    subBool8: boolean;
}

export interface SubsWithWidgetsType {
    subWidgets1?: ReactNode;
    subWidgets2?: ReactNode;
    subWidgets3?: ReactNode;
    subWidgets4?: ReactNode;
}

export interface SubsPreviewType {
    newSubWidget: { widgetCount: number; renderer: ComponentType };
    subBool1: boolean;
    subBool2: boolean;
    subBool3: boolean;
    subBool4: boolean;
    subAction: {} | null;
    subContent: { widgetCount: number; renderer: ComponentType };
    subDatasource: {} | null;
    subImage: string;
    subBool5: boolean;
    subBool6: boolean;
    subBool7: boolean;
    subBool8: boolean;
}

export interface SubsWithWidgetsPreviewType {
    subWidgets1: { widgetCount: number; renderer: ComponentType };
    subWidgets2: { widgetCount: number; renderer: ComponentType };
    subWidgets3: { widgetCount: number; renderer: ComponentType };
    subWidgets4: { widgetCount: number; renderer: ComponentType };
}

export interface DemoWidgetContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
    tryMe: boolean;
    subObjectsDemo: boolean;
    previewDemo: boolean;
    setCustomCaptions: boolean;
    setObjectHeaders: boolean;
    orientation: OrientationEnum;
    width: number;
    width2: number;
    height: number;
    height2: number;
    randomString1: string;
    randomString2: string;
    randomString3: string;
    alttab?: ActionValue;
    colour: ColourEnum;
    subs: SubsType[];
    prevDontReturn: boolean;
    prevUseCustomConf: boolean;
    prevCustomConf: string;
    prevUseContainment: boolean;
    prevUseSelectableSubObjects: boolean;
    prevContainment?: ReactNode;
    prevContainment2?: ReactNode;
    customProperties: string;
    subsWithWidgets: SubsWithWidgetsType[];
    someAttr?: EditableValue<BigJs.Big>;
    someDatasource: ListValue;
}

export interface DemoWidgetPreviewProps {
    class: string;
    style: string;
    tryMe: boolean;
    subObjectsDemo: boolean;
    previewDemo: boolean;
    setCustomCaptions: boolean;
    setObjectHeaders: boolean;
    orientation: OrientationEnum;
    width: number | null;
    width2: number | null;
    height: number | null;
    height2: number | null;
    randomString1: string;
    randomString2: string;
    randomString3: string;
    alttab: {} | null;
    colour: ColourEnum;
    subs: SubsPreviewType[];
    prevDontReturn: boolean;
    prevUseCustomConf: boolean;
    prevCustomConf: string;
    prevUseContainment: boolean;
    prevUseSelectableSubObjects: boolean;
    prevContainment: { widgetCount: number; renderer: ComponentType };
    prevContainment2: { widgetCount: number; renderer: ComponentType };
    customProperties: string;
    subsWithWidgets: SubsWithWidgetsPreviewType[];
    someAttr: string;
    someDatasource: {} | null;
}
