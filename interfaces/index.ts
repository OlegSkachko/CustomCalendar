interface ICurMonth {
  year: number
  month: number
}

export interface IDatePicker {
  classNameCalendar: string
}

export interface IDayCell {
  day: number | false
}

export interface IDayRow {
  dayList: Array<number | false>
}

export interface IDays {
  days: Array<Array<number | false>>
}

export interface IPickedDate extends ICurMonth {
  day: number
}

export interface DayCellDate extends ICurMonth {
  day: number | false
}

export interface IMonthTable {
  onClickNextButton: () => void
  onClickPrevButton: () => void
  year: string
  monthName: string
  days: Array<Array<number | false>>
  role: string
  classNameCalendar: string
}

export interface IUseDatePickGetter {
  pickedDate: IPickedDate
}

export interface IGetFirstLastWeekDay {
  firstDayOfWeek: Date
  lastDayOfWeek: Date
}
export interface ICalendarContext {
  pickedDate: IPickedDate | null
  saveDate: TPickedDateDispatch
  curMonth: ICurMonth
  setCurMonth: React.Dispatch<React.SetStateAction<ICurMonth>>
  startDate: TCustomDate
  endDate: TCustomDate
}

export type TCustomDate = Date | string | null | undefined

export interface ICustomCalendar {
  onClose: () => void
  setData: (date: TCustomDate) => void
  data: TCustomDate
  classNameCalendar?: string
  withTime?: boolean
  startDate: TCustomDate
  endDate: TCustomDate
  isModal?: boolean
}

export interface ITime extends Omit<ICustomCalendar, 'classNameCalendar' | 'withTime' | 'startDate' | 'endDate'> {}

export interface IDatePickerProvider {
  children: React.ReactNode | React.ReactElement
  onChange: (val: null | Date) => void
  data: TCustomDate
  startDate: TCustomDate
  endDate: TCustomDate
}

export type TUseDayCell = (date: IDayCell) => {
  isSelected: boolean
  isFirstWeekDay: boolean
  isLastWeekDay: boolean
  isBetweenPickedDates: boolean
  isDisabledDay: boolean
  onClickDayCell: () => void
}

export interface IUseDatePicker {
  days: TMonthTableRow[]
  year: number
  monthName: string
  onClick: (value?: string) => void
}

export type TIsEqualDate = (date1: Date | null | boolean, date2: Date | null | boolean) => boolean

export type TGetMonthData = (year: number, month: number) => TMonthTableRow[]

export type TMonthTableRow = Array<number | false>

export type TPickedDateDispatch = (val: IPickedDate | null) => void
