import React, { FC } from 'react'
import { setHours, getHours } from 'date-fns'
import classNames from 'classnames'

import Flex from '@/components/Flex/Flex'

import { formatDateForFrontend, isNull, isUndefined } from '@/utils'

import { DATE_MASKS, EMPTY_CONSTS } from '@/const'
import { TIME } from './const'

import { ITime } from './interfaces'

import styles from './style/index.module.scss'

/**
 * @component Time
 * * компонент выбора времени (часов) в календаре
 *
 * @param onClose               функция на закрытие календаря
 * @param setData               функция меняющая выбранную дату\время в календаре
 * @param data                  выбранная дата\время
 */
const Time: FC<ITime> = ({
  onClose,
  setData,
  data
}) => {
  const currentHour = typeof data === 'string' ? getHours(new Date(data)) : EMPTY_CONSTS.UNDEFINED

  /**
   * * функция для установки времени
   * @func   handleTime
   * @param   hour  количество часов
   */
  const handleTime = (hour: number): void => {
    if (!isNull(data) && !isUndefined(data)) {
      const date = setHours(new Date(data), hour)
      setData(formatDateForFrontend(date, DATE_MASKS.BACKEND))
      onClose()
    }
  }

  return (
    <div className={styles.time}>
      <Flex
        className={styles.time__title}
        alignItem='center'
        justifyContent='center'
      >
        Время
      </Flex>
      <Flex
        className={styles.time__container}
        direction='column'
      >
        {TIME.map((time, i) => (
          <button
            type='button'
            key={i}
            onClick={() => handleTime(i)}
            className={classNames(styles.time__container_item, {
              [styles.time__container_item_active]: i === currentHour
            })}
          >
            {time}
          </button>
        ))}
      </Flex>
    </div>
  )
}

export default Time
