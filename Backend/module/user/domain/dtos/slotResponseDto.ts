

export interface ISlotResponseDto {
    date: string;
    timeSlots: Array<{ startTime: string, endTime: string, isBooked: boolean }>
}