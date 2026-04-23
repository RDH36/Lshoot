import type { ComponentProps, ReactNode } from "react";
import { IPhone15Pro } from "./iphone-15-pro";
import { IPhone15 } from "./iphone-15";
import { IPad13 } from "./ipad-13";
import { AndroidPhone } from "./android-phone";

export { IPhone15Pro, IPhone15, IPad13, AndroidPhone };

export type DeviceVariant =
  | "iphone-15-pro"
  | "iphone-15"
  | "ipad-13"
  | "android-phone";

const FRAMES = {
  "iphone-15-pro": IPhone15Pro,
  "iphone-15": IPhone15,
  "ipad-13": IPad13,
  "android-phone": AndroidPhone,
} as const;

type BaseProps = ComponentProps<typeof IPhone15Pro>;

export function DeviceFrame({
  variant,
  children,
  className,
  screenClassName,
}: BaseProps & { variant: DeviceVariant; children?: ReactNode }) {
  const Component = FRAMES[variant];
  return (
    <Component className={className} screenClassName={screenClassName}>
      {children}
    </Component>
  );
}
