import { ReactElement, createElement } from "react";

import { DemoWidgetContainerProps } from "../typings/DemoWidgetProps";

export default function DemoWidget(_: DemoWidgetContainerProps): ReactElement {
	return (
		<div>
			This isn't doing anything useful.
		</div>
	)
}