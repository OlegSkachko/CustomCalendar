import React, { FC } from 'react'

/**
 * @component Prev
 * * компонент иконки назад
 * @param
 */
export const Prev: FC = () => {
  return (
    <svg width='22' height='16' viewBox='0 0 22 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M3.93315 6.962L9.37083 1.46796L7.91794 0L0 8L7.91794 16L9.37083 14.532L3.93315 9.038L22 9.038V6.962L3.93315 6.962Z'
        fill='currentColor'
      />
    </svg>
  )
}

/**
 * @component Prev
 * * компонент иконки вперед
 * @param
 */
export const Next: FC = () => {
  return (
    <svg width='22' height='16' viewBox='0 0 22 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M18.0668 6.962L12.6292 1.46796L14.0821 -8.65753e-07L22 8L14.0821 16L12.6292 14.532L18.0668 9.038L-5.85646e-07 9.038V6.962L18.0668 6.962Z'
        fill='currentColor'
      />
    </svg>
  )
}
