import moment from "moment";

export const reComposeDate = (date?: Date) => {
  let newDate: string | string[] = moment(date).format("DD MM Y");
  newDate = newDate?.split(" ");
  newDate = newDate[2] + "-" + newDate[1] + "-" + newDate[0];
  return newDate;
};
