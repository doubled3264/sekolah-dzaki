import { disket } from './svg-vars'
export const save = (width) => {
  return `

   <svg
      width="${width}"
      height="${width}"
      viewBox="0 0 24 24"
      xml:space="preserve"
      xmlns="http://www.w3.org/2000/svg"
   >
      <path d="M0 0h24v24H0z" fill="none" />
      <g ref="icon">
         <path
            d="${disket}"
            fill="currentColor"
            stroke="currentColor"
            stroke-width="0.09"
         />
      </g>
   </svg>
  `
}
