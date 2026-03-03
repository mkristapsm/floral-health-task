import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
    reactCompiler: true,
    sassOptions: {
    // 	prependData: `
    //     /// Scss code that you want to be
    //     /// prepended to every single scss file.
    //     @use '../styles/abstracts/_index' as *;
    //   `,
  	}
};

export default nextConfig;
