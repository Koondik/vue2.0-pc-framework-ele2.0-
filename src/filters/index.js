import {formatDate} from "src/config/mUtils";

export function date(time, formatText = "yyyy-MM-dd hh:mm:ss") {
  return formatDate(time, formatText);
}
