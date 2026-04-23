import { z } from "zod";

export const DeviceFrameVariant = z.enum([
  "iphone-15-pro",
  "iphone-15",
  "ipad-13",
  "android-phone",
]);

export type DeviceFrameVariant = z.infer<typeof DeviceFrameVariant>;

export const ProjectConfigSchema = z.object({
  name: z.string().min(1, "name is required"),
  bundleId: z
    .string()
    .regex(
      /^[a-zA-Z0-9._-]+$/,
      "bundleId must contain only letters, digits, dots, dashes or underscores",
    ),
  appStoreId: z.string().optional(),
  playStoreId: z.string().optional(),
  defaultDeviceFrame: DeviceFrameVariant.optional(),
  languages: z.array(z.string().regex(/^[a-z]{2}(-[A-Z]{2})?$/)).optional(),
  protected: z.boolean().optional(),
});

export type ProjectConfig = z.infer<typeof ProjectConfigSchema>;
