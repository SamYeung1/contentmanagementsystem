import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";
import createNextIntlPlugin from 'next-intl/plugin';
const nextConfig: NextConfig = {
  /* config options here */
};
const withNextIntl = createNextIntlPlugin();
export default withFlowbiteReact(withNextIntl(nextConfig));
