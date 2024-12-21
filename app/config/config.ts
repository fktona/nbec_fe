import { inDevEnvironment } from "@/lib/is-dev";
import exp from "constants";

const config = {
  API_URL: inDevEnvironment
    ? process.env.NEXT_PUBLIC_DEV_API_URL
    : process.env.NEXT_PUBLIC_PROD_API_URL,
};

export default { ...config };
