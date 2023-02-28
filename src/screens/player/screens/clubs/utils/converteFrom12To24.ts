export const converteFrom12To24 = (time: string) => {
  let newTime = time.split(":");
  if (Number(newTime[0]) < 12) {
    return time + " AM";
  }
  if (Number(newTime[0]) === 12) {
    return time + " PM";
  } else {
    newTime[0] = (Number(newTime[0]) - 12).toString();
    return newTime.join(":") + " PM";
  }
};
