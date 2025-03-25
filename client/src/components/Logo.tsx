import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

export const Logo = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="-3.36 -3.36 30.72 30.72">
      <rect
        x="-3.36"
        y="-3.36"
        width="30.72"
        height="30.72"
        rx="15.36"
        fill="#ff7f50"
      />
      <g stroke="#ffffff" strokeWidth="1.91" fill="none">
        <rect x="12.95" y="1.5" width="3.82" height="8.59" rx="1.91" />
        <path d="M8.66,1.5h0a1.43,1.43,0,0,1,1.43,1.43V4.36H8.66A1.43,1.43,0,0,1,7.23,2.93v0A1.43,1.43,0,0,1,8.66,1.5Z" />
        <rect
          x="7.23"
          y="13.91"
          width="3.82"
          height="8.59"
          rx="1.91"
          transform="rotate(180 9.14 18.21)"
        />
        <path
          d="M15.34,19.64h0a1.43,1.43,0,0,1,1.43,1.43V22.5H15.34a1.43,1.43,0,0,1-1.43-1.43v0A1.43,1.43,0,0,1,15.34,19.64Z"
          transform="rotate(180 15.34 21.07)"
        />
        <rect
          x="16.3"
          y="10.57"
          width="3.82"
          height="8.59"
          rx="1.91"
          transform="rotate(90 18.21 14.87)"
        />
        <path
          d="M21.07,7.23h0A1.43,1.43,0,0,1,22.5,8.66v1.43H21.07a1.43,1.43,0,0,1-1.43-1.43v0a1.43,1.43,0,0,1,1.43-1.43Z"
          transform="rotate(90 21.07 8.66)"
        />
        <rect
          x="3.89"
          y="4.84"
          width="3.82"
          height="8.59"
          rx="1.91"
          transform="rotate(-90 5.8 9.14)"
        />
        <path
          d="M2.93,13.91h0a1.43,1.43,0,0,1,1.43,1.43v1.43H2.93A1.43,1.43,0,0,1,1.5,15.34v0A1.43,1.43,0,0,1,2.93,13.91Z"
          transform="rotate(-90 2.93 15.34)"
        />
      </g>
    </SvgIcon>
  );
};
