import dayjs from "dayjs";  
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore.js";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter.js";
import { ISlotAvailablityEntity } from "../../../lawyer/domain/entity/slotAvailablityEntity";
import { IGetLawyerSlotRepository } from "../repositoryInterface/IgetLawyerSlotRepository";
import { Types } from "mongoose";

dayjs.extend(customParseFormat);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export async function generateSlots(
  rule: ISlotAvailablityEntity,
  lawyerId: Types.ObjectId,
  date: string,
  slotRepo: IGetLawyerSlotRepository
) {
  const { startTime, endTime, breakTimes, days } = rule;

  let slots: any[] = [];

  const dayOfWeek = dayjs(date).format("ddd").toLowerCase();
  if (!days.includes(dayOfWeek)) {
    return [];
  }

  let start = dayjs(startTime, "h:mm A");
  let end = dayjs(endTime, "h:mm A");

  while (start.add(30, "minute").isSameOrBefore(end)) {
    let slotEnd = start.add(30, "minute");

    let isInBreak = breakTimes?.some((breakObj: any) => {
      let breakStart = dayjs(breakObj.startTime, "h:mm A");
      let breakEnd = dayjs(breakObj.endTime, "h:mm A");

      return (
        (start.isSameOrAfter(breakStart) && start.isBefore(breakEnd)) ||
        (slotEnd.isAfter(breakStart) && slotEnd.isSameOrBefore(breakEnd)) ||
        (start.isBefore(breakStart) && slotEnd.isAfter(breakEnd))
      );
    });

    if (!isInBreak) {
      let time = `${start.format("h:mm A")}-${slotEnd.format("h:mm A")}`;
      let slotExist = await slotRepo.findAppointmentSlot(lawyerId, date, time);

      slots.push({
        startTime: start.format("h:mm A"),
        endTime: slotEnd.format("h:mm A"),
        isBooked: slotExist ? true : false,
      });

      start = slotEnd.add(15, "minute");
    } else {
      let overlappingBreak = breakTimes.find((b: any) => {
        let breakStart = dayjs(b.startTime, "h:mm A");
        let breakEnd = dayjs(b.endTime, "h:mm A");
        return start.isBefore(breakEnd) && slotEnd.isAfter(breakStart);
      });

      if (overlappingBreak) {
        start = dayjs(overlappingBreak.endTime, "h:mm A");
      } else {
        start = slotEnd.add(15, "minute");
      }
    }
  }

  return slots;
}
