import React, { FC, useEffect, useRef } from 'react'
import classNames from 'classnames'

import DatePicker from './DatePicker'
import { DatePickerProvider } from './context'
import Time from './Time'

import useOuterClick from '@/hooks/useOuterClick'

import { formatDateForFrontend, isNull, isUndefined } from '@/utils'

import { DATE_MASKS, EMPTY_CONSTS } from '@/const'

import { ICustomCalendar, TCustomDate } from './interfaces'

import styles from './style/index.module.scss'

/**
 * @component CustomCalendar
 * * Главный компонент календаря
 * @param {ICustomCalendar}                 общий интерфейс входных параметров CustomCalendar
 *
 * @param onClose               функция на закрытие календаря
 * @param setData               функция меняющая выбранную дату в календаре
 * @param data                  выбранная дата
 * @param classNameCalendar     дополнительные стили
 * @param withTime              с выбором времени (часов)
 * @param startDate             начальная дата меньше которой нельзя выбирать
 * @param endDate               конечная дата больше которой нельзя выбирать
 * @param isModal               компонент находится внутри модального окна
 */
const CustomCalendar: FC<ICustomCalendar> = ({
  onClose,
  setData,
  data,
  classNameCalendar = '',
  withTime,
  startDate,
  endDate,
  isModal = EMPTY_CONSTS.FALSE
}) => {
  const dateMask = withTime ? DATE_MASKS.BACKEND : DATE_MASKS.CALENDAR_VALUE
  const containerRef = useRef(null)
  useOuterClick(containerRef, onClose)

  /**
   * * функция для изменения выбранной даты в календаре
   * @func  changeDate
   * @param  val          новая выбранная дата
   */
  const changeDate = (val: TCustomDate): void => {
    if (!isNull(val) && !isUndefined(val)) {
      setData(formatDateForFrontend(val, dateMask))

      if (!withTime) {
        onClose()
      }
    }
  }

  /**
   * * функция для сброса даты и закрытия календаря
   * @func   resetDate
   * @param
   */
  const resetDate = (): void => {
    setData(undefined)
    onClose()
  }

  useEffect(() => {
    if (containerRef.current !== null) {
      const elem: HTMLDivElement = containerRef.current
      const rect = elem?.getBoundingClientRect()

      if (withTime) elem.style.right = '100px'
      // 380 - ширина сайдбара
      if (rect.left < 380) {
        elem.style.left = '0px'
      }
    }
  }, [])

  return (
    <DatePickerProvider onChange={changeDate} data={data} startDate={startDate} endDate={endDate}>
      <div className={classNames(styles.calendar, { [styles.calendar_modal]: isModal })} ref={containerRef}>
        <div className={styles.calendar__container}>
          <DatePicker classNameCalendar={classNameCalendar} />
        </div>
        <div className={styles.calendar__footer}>
          <button
            onClick={resetDate}
            className={styles.calendar__footer_reset}
            type='button'
          >
            Очистить фильтр
          </button>
        </div>
        {withTime && (<Time onClose={onClose} setData={setData} data={data} />)}
      </div>
    </DatePickerProvider>
  )
}

export default CustomCalendar
