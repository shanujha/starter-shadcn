import { formatDateString } from "@/lib/date-string";
import { timeAgo } from "./time-age";

export default function formatByType (item: string, type: string) {
  switch (type) {
    case "date":
      return formatDateString(item);
    case "elapsed": 
      return timeAgo(item);
    default:
      return item;
  }
}
