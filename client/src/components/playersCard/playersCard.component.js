const PlayerCard = (props) => {
  return (
    <svg
      transform="scale(0.8) translate(-30,0)"
      width="307"
      height="104"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      overflow="hidden"
    >
      <defs>
        <clipPath id="clip0">
          <rect x="263" y="220" width="307" height="104" />
        </clipPath>
        <linearGradient
          x1="302"
          y1="230"
          x2="302"
          y2="299"
          gradientUnits="userSpaceOnUse"
          spreadMethod="reflect"
          id={`fillGradient${props.color.name}`}
        >
          <stop offset="0" stop-color={props.color.primaryColor} />
          <stop offset="0.03" stop-color={props.color.primaryColor} />
          <stop offset="1" stop-color={props.color.secondaryColor} />
        </linearGradient>
        <clipPath id="clip2">
          <rect x="0" y="0" width="476250" height="552450" />
        </clipPath>
        <image
          width="63"
          height="59"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAAA7CAMAAAD7EKL7AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHFUExURQAAAP///4CAgP///6qqqr+/v////8zMzN/f38bGxszMzMjIyMzMzL+/v8/Pz8PDw8bGxsLCws7OzsXFxcrKysLCwsTExL+/v729vb+/v8XFxb+/v8HBwb6+vry8vL6+vrm5ub+/v8LCwr29vcLCwry8vL6+vru7u7m5ubu7u7y8vLu7u7y8vLq6ury8vLq6ura2trm5ubm5uby8vLq6urq6ure3t7q6ura2tru7u7m5ubm5ubi4uLi4uLe3t7W1tbi4uLe3t7y8vLa2tri4uLe3t7i4uLa2trm5ubW1tb6+vre3t7i4uLa2tra2tri4uLW1tbS0tLW1tbm5ubW1tbe3t7W1tbS0tLOzs7a2tra2trW1tba2trW1tbe3t7a2tri4uLW1tbW1tba2trOzs7W1tbe3t7S0tLa2trW1tbe3t7a2tra2trW1tbS0tLS0tLa2trOzs7W1tbS0tLS0tLW1tbS0tLS0tLe3t7S0tLW1tbS0tLW1tbS0tLW1tbKysrS0tLOzs7S0tLOzs7Ozs7Ozs7S0tLOzs7Ozs7S0tLOzs7S0tLOzs7Ozs7Ozs7Ozs7Ozs7KysrOzs7Ozs7KysrOzs7Ozs/CPPpQAAACWdFJOUwABAgIDBAQFCAkKDg8QEBESFRUWGBkaHB8gIyQlJyorLCwuMjI1Nzg+R0hLTE5QUVRUV1dZXWBgYmVpamtsbm9vcnJzd3h6e3t/gYeIiYyPkZaXnJ+goqSlpaetrq+wsbG0t7q9vr6/wcLDxMbHy83NztHV2trb3Nze3t/f4eLk5efo6ers7O7v7/Hz9Pf4+fr7/P3+/l5jhgAAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAH/SURBVEhL7dbXWxNBFMZhApooUqIoNkCwgopdRMBCsyFYADugWEFBxUpRLIiKhBKT/L34uL/AbGYzcwi3vFfZc77vIvsku5OWVE55U0f/yPBQz43aXRnM5IrbJmMLBs9lMZdZfWWGZtyXA6wkgr20FOFTLO0CT+i4hE+ytrpAI0GohL3FBvXOqe4SsDhPXBMuIGHWT1x3hoTRqhBp3S0iRtmEPTwlYpQVIa3rJmLk+0lad52I2UvSunoSZndI68pJmF0krdtKwuwIac0fPwmjjPvENTMHiRiVkvYwnE7G5DRhD7MryZhUEPYg6u8h7OGdj4yJ/zNpXTMRs7LfxBO9WEvCYt1jCi7ROvFbYB8Vl/EVbO3ywnRUXSwlntNRVbGTOEZH8X0NOwn/M1rzItWsZDa+pRfXKvnpKHbOUnT0BZiLPaLpqGQqd5Om4zBTuQc0HYeYyr2h6WhkKpbvvn8PGYs1UMT0ZuZCW35QjOtc1BEsqL3Do02SZyd2vKeliN7OZWuT1+J9Avh0XPIE2HR5grzu9YlMUkkE9t+bIuvta/O2pH8k3+6r34gZRF7VrqfgEqwZiBKxCXXuTXyRFF5Ldujz9uGseqDe3pV4XLYbmz+S57e7f+tSY1X/v8XRca4Xr+ffgfTSXy5SMVqU9ouPqfm4xH5suc+HFC2tH4vNAQj5KPZBVmVdAAAAAElFTkSuQmCC"
          preserveAspectRatio="none"
          id="img3"
        ></image>
        <clipPath id="clip4">
          <rect x="0" y="0" width="476250" height="446012" />
        </clipPath>
        <clipPath id="clip5">
          <rect x="379" y="270" width="15" height="16" />
        </clipPath>
        <clipPath id="clip6">
          <rect x="379" y="270" width="15" height="16" />
        </clipPath>
        <clipPath id="clip7">
          <rect x="379" y="270" width="15" height="16" />
        </clipPath>
      </defs>
      <g clip-path="url(#clip0)" transform="translate(-263 -220)">
        <path
          d="M277 269 348.248 269C353.15 269 357.123 268.216 357.123 267.25 357.123 266.283 353.15 265.5 348.248 265.5L330.498 265.5C325.597 265.5 321.623 264.716 321.623 263.75 321.623 262.783 325.597 262 330.498 262L507.502 262C512.403 262 516.377 262.784 516.377 263.75 516.377 264.717 512.403 265.5 507.502 265.5L489.752 265.5C484.85 265.5 480.877 266.284 480.877 267.25 480.877 268.217 484.85 269 489.752 269L561 269 525.5 251.5 561 234 516.377 234 516.377 228.75C516.377 227.784 512.403 227 507.502 227L330.498 227C325.597 227 321.623 227.784 321.623 228.75L321.623 234 277 234 312.5 251.5Z"
          fill={props.color.primaryColor}
          fillRule="evenodd"
        />
        <path
          d="M357.123 267.25C357.123 266.283 353.15 265.5 348.248 265.5L330.498 265.5C325.597 265.5 321.623 264.716 321.623 263.75 321.623 262.783 325.597 262 330.498 262L357.123 262ZM480.877 267.25C480.877 266.283 484.85 265.5 489.752 265.5L507.502 265.5C512.403 265.5 516.377 264.716 516.377 263.75 516.377 262.783 512.403 262 507.502 262L480.877 262Z"
          fill="#0779CD"
          fillRule="evenodd"
        />
        <path
          d="M277 269 312.5 251.5 277 234 321.623 234 321.623 228.75C321.623 227.784 325.597 227 330.498 227L507.502 227C512.403 227 516.377 227.784 516.377 228.75L516.377 234 516.377 234 561 234 525.5 251.5 561 269 489.752 269C484.85 269 480.877 268.216 480.877 267.25 480.877 266.283 484.85 265.5 489.752 265.5L507.502 265.5C512.403 265.5 516.377 264.716 516.377 263.75 516.377 262.783 512.403 262 507.502 262L330.498 262C325.597 262 321.623 262.784 321.623 263.75 321.623 264.717 325.597 265.5 330.498 265.5L348.248 265.5C353.15 265.5 357.123 266.284 357.123 267.25 357.123 268.217 353.15 269 348.248 269ZM357.123 262 357.123 267.25M480.877 267.25 480.877 262M321.623 263.75 321.623 234M516.377 234 516.377 263.75"
          stroke="#FFCC00"
          strokeWidth="4"
          strokeMiterlimit="8"
          fill="none"
          fillRule="evenodd"
        />
        <text
          fill={props.color.textColor}
          fontFamily="Calibri,Calibri_MSFontService,sans-serif"
          fontWeight="400"
          fontSize="24"
          transform="translate(365.01 252)"
        >
          {props.player && props.player.name}
        </text>
        <rect
          x="300.5"
          y="264.5"
          width="212"
          height="41"
          stroke="#2F528F"
          strokeWidth="1.33333"
          strokeMiterlimit="8"
          fill="#38373F"
        />
        <path
          d="M264 234C264 226.82 269.82 221 277 221L329 221C336.18 221 342 226.82 342 234L342 293C342 300.18 336.18 306 329 306L277 306C269.82 306 264 300.18 264 293Z"
          fill={props.currentPlayer ? "#FFCC00" : "#767171"}
          fillRule="evenodd"
        />
        <path
          d="M270 240.667C270 234.776 274.776 230 280.667 230L323.333 230C329.224 230 334 234.776 334 240.667L334 288.333C334 294.224 329.224 299 323.333 299L280.667 299C274.776 299 270 294.224 270 288.333Z"
          fill={`url(#fillGradient${props.color.name})`}
          fillRule="evenodd"
        />
        <g
          clipPath="url(#clip2)"
          transform="matrix(0.000104987 0 0 0.000104987 277 241)"
        >
          <g clipPath="url(#clip4)" transform="scale(1 1.23864)">
            <use
              width="100%"
              height="100%"
              xlinkHref="#img3"
              transform="scale(7559.52 7559.52)"
            ></use>
          </g>
        </g>
        <path
          d="M397.5 264.5 397.5 310.175 387 316.5 376.5 310.175 376.5 264.5Z"
          stroke="#2F528F"
          strokeWidth="1.33333"
          strokeMiterlimit="8"
          fill={props.color.secondaryColor}
          fillRule="evenodd"
        />
        <path
          d="M372.5 264.5 372.5 310.175 362 316.5 351.5 310.175 351.5 264.5Z"
          stroke="#2F528F"
          strokeWidth="1.33333"
          strokeMiterlimit="8"
          fill={props.color.secondaryColor}
          fillRule="evenodd"
        />
        <path
          d="M366.785 270.535C367.418 272.385 368.051 274.235 366.259 275.857 364.467 277.479 357.716 278.742 356.034 280.268 354.352 281.795 355.259 283.406 356.167 285.016"
          stroke={props.color.textColor}
          strokeWidth="1.33333"
          strokeMiterlimit="8"
          fill="none"
          fillRule="evenodd"
        />
        <g clipPath="url(#clip5)">
          <g clipPath="url(#clip6)">
            <g clipPath="url(#clip7)">
              <path
                d="M14.5605 1.08261 12.6356 1.08261C12.6426 0.869407 12.6465 0.654945 12.6465 0.439452 12.6465 0.196723 12.4497 0 12.207 0L2.79292 0C2.55031 0 2.35347 0.196723 2.35347 0.439452 2.35347 0.654945 2.35736 0.869407 2.36434 1.08261L0.439452 1.08261C0.196723 1.08261 0 1.27933 0 1.52206 0 3.49113 0.51464 5.34884 1.44905 6.75315 2.3727 8.14144 3.60304 8.9377 4.93218 9.01519 5.2335 9.34305 5.55198 9.61038 5.88374 9.81432L5.88374 11.7675 5.14651 11.7675C4.25525 11.7675 3.53027 12.4926 3.53027 13.3837L3.53027 14.1209 3.49904 14.1209C3.25628 14.1209 3.05958 14.3178 3.05958 14.5604 3.05958 14.8031 3.25628 14.9999 3.49904 14.9999L11.5009 14.9999C11.7437 14.9999 11.9404 14.8031 11.9404 14.5604 11.9404 14.3178 11.7437 14.1209 11.5009 14.1209L11.4697 14.1209 11.4697 13.3837C11.4697 12.4926 10.7447 11.7675 9.85346 11.7675L9.11623 11.7675 9.11623 9.81432C9.44799 9.6105 9.76659 9.34305 10.0679 9.01519 11.3969 8.9377 12.6273 8.14144 13.551 6.75315 14.4855 5.34884 15 3.49113 15 1.52206 15 1.27933 14.8032 1.08261 14.5605 1.08261ZM2.18078 6.26633C1.41002 5.10805 0.957183 3.59311 0.888174 1.96151L2.41344 1.96151C2.57194 3.9672 3.04274 5.82113 3.77862 7.29274 3.8958 7.52711 4.01835 7.74854 4.1455 7.95707 3.41457 7.68104 2.73811 7.10401 2.18078 6.26633ZM10.5908 13.3837 10.5908 14.1211 4.40917 14.1211 4.40917 13.3837C4.40917 12.9772 4.7399 12.6464 5.14651 12.6464L9.85346 12.6464C10.2601 12.6464 10.5908 12.9772 10.5908 13.3837ZM8.23733 11.7675 6.76264 11.7675 6.76264 10.1962C7.00422 10.2598 7.25038 10.2929 7.49999 10.2929 7.74959 10.2929 7.99575 10.2598 8.23733 10.1962ZM8.50947 9.15069C8.48966 9.1588 8.47068 9.16864 8.45248 9.17951 8.14188 9.33402 7.82272 9.41401 7.49999 9.41401 7.17737 9.41401 6.85833 9.33402 6.54784 9.17975 6.52941 9.16864 6.51031 9.1588 6.49027 9.15045 6.14568 8.96825 5.81234 8.69316 5.49705 8.33163 5.48044 8.30793 5.46181 8.28608 5.44109 8.26616 5.12809 7.89458 4.83362 7.4375 4.56471 6.89963 3.75708 5.28453 3.29062 3.16086 3.23753 0.878905L11.7624 0.878905C11.7092 3.16086 11.2428 5.28465 10.4353 6.89963 10.1663 7.4375 9.87188 7.89458 9.559 8.26616 9.53817 8.28608 9.5193 8.30805 9.5028 8.33175 9.18754 8.69336 8.85405 8.96837 8.50947 9.15069ZM12.8192 6.26633C12.2619 7.10401 11.5854 7.68104 10.8545 7.95707 10.9816 7.74854 11.1042 7.52711 11.2214 7.29274 11.9572 5.82113 12.4279 3.9672 12.5865 1.96151L14.1118 1.96151C14.0428 3.59311 13.5899 5.10805 12.8192 6.26633Z"
                stroke={props.color.textColor}
                strokeWidth="0.029305"
                fill={props.color.textColor}
                transform="matrix(1 0 0 1.06667 379 270)"
              />
            </g>
          </g>
        </g>
        <text
          fill={props.color.textColor}
          fontFamily="Calibri,Calibri_MSFontService,sans-serif"
          fontWeight="400"
          fontSize="15"
          transform="translate(382.297 310)"
        >
          1
          <tspan font-size="15" x="-26.7424" y="0">
            2
          </tspan>
        </text>
      </g>
    </svg>
  );
};

export default PlayerCard;
