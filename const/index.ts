export const WEEKDAY: string[] = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
export const TIME: string[] = [
  '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00',
  '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
  '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
  '21:00', '22:00', '23:00'
]

export const FIRST_MONTH = 1
export const LAST_MONTH = 12
export const TOTAL_DAYS_OF_WEEK = 7

export const DEFAULT_DAY_CELL = {
  isSelected: false,
  isFirstWeekDay: false,
  isLastWeekDay: false,
  isBetweenPickedDates: false,
  isDisabledDay: false,
  onClickDayCell: () => {}
}

export const DEFAULT_CALENDAR_DATA_CONTEXT = {
  pickedDate: null,
  saveDate: () => {},
  curMonth: { year: 0, month: 0 },
  setCurMonth: () => {},
  startDate: undefined,
  endDate: undefined
}
