export function BackArrow() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <path
        d="M21 13H5M11 6L4.5 13L11 20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PeopleIcon() {
  return (
    <svg width="46" height="40" viewBox="0 0 46 40" fill="none">
      {/* back person (grey) */}
      <circle cx="30.5" cy="12" r="6" fill="#C4C6CB" />
      <path
        d="M20 34c0-6.5 5-9.5 10.5-9.5S41 27.5 41 34v1a2 2 0 0 1-2 2H22a2 2 0 0 1-2-2v-1Z"
        fill="#C4C6CB"
      />
      {/* front person (blue) */}
      <circle cx="16.5" cy="14.5" r="7.5" fill="#0A7CFA" />
      <path
        d="M4 37c0-7.5 5.6-11 12.5-11S29 29.5 29 37v.5a2.5 2.5 0 0 1-2.5 2.5h-20A2.5 2.5 0 0 1 4 37.5V37Z"
        fill="#0A7CFA"
      />
    </svg>
  );
}

export function MonitorIcon() {
  return (
    <svg width="52" height="46" viewBox="0 0 52 46" fill="none">
      <rect
        x="9"
        y="6"
        width="34"
        height="25"
        rx="5"
        stroke="#0A7CFA"
        strokeWidth="3"
      />
      <path d="M9 24.5H43" stroke="#0A7CFA" strokeWidth="3" />
      <path
        d="M21 31L19.5 39M31 31L32.5 39M16 39H36"
        stroke="#0A7CFA"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function InfoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="8.25" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="10" cy="6.3" r="1" fill="currentColor" />
      <path
        d="M10 9.2V14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CheckCircle() {
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
      <circle cx="30" cy="30" r="23" stroke="#0A7CFA" strokeWidth="3" />
      <path
        d="M19 30.5L26.5 38L41 22.5"
        stroke="#0A7CFA"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
