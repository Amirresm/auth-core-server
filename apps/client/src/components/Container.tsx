import React from "react";

type ContainerProps = {
	children: React.ReactNode;
	maxWidth?: number;
};
export default function Container({ children, maxWidth }: ContainerProps) {
	return <div className={maxWidth ? `w-[${maxWidth}px]` : ""}>{children}</div>;
}
