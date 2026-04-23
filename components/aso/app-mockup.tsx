import Image from "next/image";
import {
  DeviceFrame,
  type DeviceVariant,
} from "@/components/aso/device-frames";

type Props = {
  src: string;
  device: DeviceVariant;
  alt?: string;
  className?: string;
  screenClassName?: string;
  fit?: "cover" | "contain";
};

export function AppMockup({
  src,
  device,
  alt = "",
  className = "",
  screenClassName = "",
  fit = "cover",
}: Props) {
  return (
    <DeviceFrame
      variant={device}
      className={`h-full w-auto ${className}`}
      screenClassName={screenClassName}
    >
      <Image
        src={src}
        alt={alt}
        fill
        unoptimized
        sizes="100vw"
        className={fit === "cover" ? "object-cover" : "object-contain"}
      />
    </DeviceFrame>
  );
}
