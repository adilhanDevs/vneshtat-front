/* ---- sidebar nav icons (line style, grey) ---- */
const s = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const IcDesk = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" {...s}>
    <path d="M3 8.5 10 3l7 5.5V16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8.5Z" />
    <path d="M8 17v-5h4v5" />
  </svg>
);
export const IcChat = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" {...s}>
    <path d="M13.5 3.5 16.5 6.5 8 15l-3.5.7L5 12l8.5-8.5Z" />
  </svg>
);
export const IcSearch = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" {...s}>
    <circle cx="9" cy="9" r="5.2" />
    <path d="m13 13 4 4" />
  </svg>
);
export const IcOrders = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" {...s}>
    <path d="M3 11.5 17 5l-2.5 6.5L9 13l-1.5 4-1-4.5L3 11.5Z" />
  </svg>
);
export const IcWidgets = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" {...s}>
    <circle cx="6" cy="6" r="2.4" />
    <rect x="11.6" y="3.6" width="4.8" height="4.8" rx="1.2" />
    <rect x="3.6" y="11.6" width="4.8" height="4.8" rx="1.2" />
    <path d="M14 11.6v4.8M11.6 14h4.8" />
  </svg>
);
export const IcCalendar = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" {...s}>
    <rect x="3.2" y="4.5" width="13.6" height="12.3" rx="2.4" />
    <path d="M3.2 8h13.6M7 3v3M13 3v3" />
  </svg>
);
export const IcArchive = () => (
  <img src="/img/ctx-archive.png" alt="" width={18} height={18} style={{ display: "inline-block", verticalAlign: "middle" }} />
);
export const IcPlane = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="#1e88fa">
    <path d="M17 3.2c.5.5.4 1 0 1.7l-3.4 3.4 1 6.6c0 .3 0 .5-.3.7l-.8.6c-.2.2-.5.1-.6-.2l-2.4-4.6-3 3 .1 1.8c0 .2 0 .3-.2.5l-.4.3c-.2.1-.4.1-.5-.1l-1.4-2.2-2.2-1.4c-.2-.1-.2-.3-.1-.5l.3-.4c.2-.2.3-.2.5-.2l1.8.1 3-3L2.5 6.7c-.3-.1-.4-.4-.2-.6l.6-.8c.2-.3.4-.3.7-.3l6.6 1L14 2.6c.7-.6 1.2-.7 1.7-.2l1.3.8Z" />
  </svg>
);

/* ---- top bar ---- */
export const IcCard = () => (
  <img src="/img/balance.png" alt="" width={22} height={18} style={{ display: "inline-block" }} />
);
export const IcDots = ({ size = 20, color = "#9698a1" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill={color}>
    <circle cx="4" cy="10" r="2" />
    <circle cx="10" cy="10" r="2" />
    <circle cx="16" cy="10" r="2" />
  </svg>
);
export const IcBubble = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#8a8c93" strokeWidth="1.7">
    <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h9A1.5 1.5 0 0 1 16 5.5v6A1.5 1.5 0 0 1 14.5 13H8l-3.5 3v-3H5.5" strokeLinejoin="round" />
  </svg>
);

/* ---- misc ui ---- */
export const IcLogout = ({ color = "#fe6a75" }: { color?: string }) => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 6V4.5a1.5 1.5 0 0 0-1.5-1.5h-5A1.5 1.5 0 0 0 4 4.5v11A1.5 1.5 0 0 0 5.5 17h5a1.5 1.5 0 0 0 1.5-1.5V14" />
    <path d="M8.5 10H17m0 0-2.5-2.5M17 10l-2.5 2.5" />
  </svg>
);
export const IcClose = ({ size = 25 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#9a9ca3" strokeWidth="1.8" strokeLinecap="round">
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);
export const IcChevron = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#9a9ca3" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 8 4 4 4-4" />
  </svg>
);
export const IcCalSmall = () => (
  <img src="/img/vneshtat11/Calendar.png" alt="" width={18} height={18} style={{ display: "inline-block", verticalAlign: "middle" }} />
);
export const IcTrash = () => (
  <img src="/img/ctx-delete.png" alt="" width={18} height={18} style={{ display: "inline-block", verticalAlign: "middle", cursor: "pointer" }} />
);
export const IcInfoSm = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#b3b5bb" strokeWidth="1.4">
    <circle cx="10" cy="10" r="7.6" />
    <circle cx="10" cy="6.6" r="0.9" fill="#b3b5bb" stroke="none" />
    <path d="M10 9.2V14" strokeLinecap="round" />
  </svg>
);
export const IcCheckSm = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect width="16" height="16" rx="5" fill="#1e88fa" />
    <path d="m4.5 8 2.2 2.2L11.5 5.5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ---- settings option icons ---- */
export const IcLockPurple = () => (
  <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
    <rect x="7" y="15" width="20" height="15" rx="4.5" fill="#8b7bf7" />
    <path d="M11 15v-3a6 6 0 0 1 12 0v3" stroke="#8b7bf7" strokeWidth="3" strokeLinecap="round" />
    <circle cx="17" cy="21.5" r="2.2" fill="#fff" />
    <rect x="16" y="21.5" width="2" height="4.5" rx="1" fill="#fff" />
  </svg>
);
export const IcPersonBlue = () => (
  <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
    <circle cx="17" cy="12.5" r="5.5" fill="#4a90f5" />
    <path d="M7 28c0-5.5 4.5-9 10-9s10 3.5 10 9v.5a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 7 28.5V28Z" fill="#4a90f5" />
  </svg>
);
export const IcShieldPurple = () => (
  <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
    <path d="M17 4.5c3 2 6.2 3 9.5 3.2v9.8c0 5.6-3.8 9.6-9.5 11.5-5.7-1.9-9.5-5.9-9.5-11.5V7.7C10.8 7.5 14 6.5 17 4.5Z" fill="#8b7bf7" />
    <path d="m12.5 16.5 3 3 6-6.5" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ---- big modal icons (outline blue / red) ---- */
export const IcLockBlue = () => (
  <svg width="52" height="52" viewBox="0 0 52 52" fill="none" stroke="#1e88fa" strokeWidth="3.2" strokeLinejoin="round">
    <rect x="13" y="23" width="26" height="20" rx="5" />
    <path d="M18 23v-4a8 8 0 0 1 16 0v4" strokeLinecap="round" />
    <circle cx="26" cy="31" r="2.6" fill="#1e88fa" stroke="none" />
    <path d="M26 33v4" strokeLinecap="round" />
  </svg>
);
export const IcTwoLocks = ({ color = "#fe5b6b" }: { color?: string }) => (
  <svg width="90" height="52" viewBox="0 0 90 52" fill="none" stroke={color} strokeWidth="3.4" strokeLinejoin="round">
    <rect x="8" y="22" width="26" height="20" rx="5" />
    <path d="M13 22v-4a8 8 0 0 1 16 0v4" strokeLinecap="round" />
    <circle cx="21" cy="30" r="2.6" fill={color} stroke="none" />
    <path d="M21 32v4" strokeLinecap="round" />
    <rect x="46" y="22" width="26" height="20" rx="5" />
    <path d="M51 22v-4a8 8 0 0 1 16 0v4" strokeLinecap="round" />
    <circle cx="59" cy="30" r="2.6" fill={color} stroke="none" />
    <path d="M59 32v4" strokeLinecap="round" />
  </svg>
);
export const IcPhoneBlue = () => (
  <svg width="44" height="54" viewBox="0 0 44 54" fill="none" stroke="#1e88fa" strokeWidth="3.2">
    <rect x="12" y="6" width="20" height="42" rx="6" />
    <path d="M19 41h6" strokeLinecap="round" />
  </svg>
);
export const IcMonitorBlue = () => (
  <svg width="56" height="50" viewBox="0 0 56 50" fill="none" stroke="#1e88fa" strokeWidth="3.2">
    <rect x="10" y="8" width="36" height="26" rx="5" />
    <path d="M10 27h36" />
    <path d="M22 34l-1.5 8M34 34l1.5 8M17 42h22" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const IcTwoDevices = () => (
  <svg width="72" height="52" viewBox="0 0 72 52" fill="none" stroke="#1e88fa" strokeWidth="3.2">
    <rect x="4" y="8" width="34" height="24" rx="5" />
    <path d="M4 26h34" />
    <path d="M15 32l-1 8M27 32l1 8M11 40h20" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="46" y="6" width="20" height="40" rx="6" />
    <path d="M53 39h6" strokeLinecap="round" />
  </svg>
);

/* device list icons */
export const IcDeviceMonitor = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e88fa" strokeWidth="1.8">
    <rect x="3" y="4.5" width="18" height="12.5" rx="2.5" />
    <path d="M8 20.5h8M12 17v3.5" strokeLinecap="round" />
  </svg>
);
export const IcDevicePhone = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e88fa" strokeWidth="1.8">
    <rect x="6.5" y="3" width="11" height="18" rx="3" />
    <path d="M10.5 18h3" strokeLinecap="round" />
  </svg>
);

/* account menu icons */
export const IcMenuUser = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#5a5c63" strokeWidth="1.6">
    <circle cx="10" cy="7" r="3" />
    <path d="M4.5 16c0-3 2.5-4.5 5.5-4.5s5.5 1.5 5.5 4.5" strokeLinecap="round" />
  </svg>
);
export const IcMenuHelp = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#5a5c63" strokeWidth="1.6">
    <circle cx="10" cy="10" r="7" />
    <path d="M8 8a2 2 0 1 1 2.6 1.9c-.6.2-.6.6-.6 1.1" strokeLinecap="round" />
    <circle cx="10" cy="13.5" r="0.5" fill="#5a5c63" stroke="none" />
  </svg>
);
export const IcMenuFeedback = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#5a5c63" strokeWidth="1.6">
    <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h9A1.5 1.5 0 0 1 16 5.5v6A1.5 1.5 0 0 1 14.5 13H8l-3.5 3v-3H5.5" strokeLinejoin="round" />
  </svg>
);
export const IcLockTiny = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#b3b5bb" strokeWidth="1.5">
    <rect x="5" y="9" width="10" height="7.5" rx="2" />
    <path d="M7 9V7a3 3 0 0 1 6 0v2" />
  </svg>
);
export const IcSend = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">
    <path d="M4 11.5 19 5l-4 15-3.5-6.5L4 11.5Z" />
  </svg>
);
export const IcPlus = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8a8c93" strokeWidth="1.8" strokeLinecap="round">
    <path d="M12 6v12M6 12h12" />
  </svg>
);

export const IcPin = () => (
  <img src="/img/ctx-pin.png" alt="" width={18} height={18} style={{ display: "inline-block", verticalAlign: "middle" }} />
);
export const IcNote = () => (
  <img src="/img/ctx-mark.png" alt="" width={18} height={18} style={{ display: "inline-block", verticalAlign: "middle" }} />
);
export const IcDownload = () => (
  <img src="/img/vneshtat11/Download.png" alt="" width={18} height={18} style={{ display: "inline-block", verticalAlign: "middle", cursor: "pointer" }} />
);
export const IcMenuChat = () => (
  <img src="/img/ctx-messenger.png" alt="" width={18} height={18} style={{ display: "inline-block", verticalAlign: "middle" }} />
);
export const IcDoc = () => (
  <svg width="34" height="40" viewBox="0 0 34 40" fill="none">
    <path d="M4 5a3 3 0 0 1 3-3h13l10 10v20a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V5Z" fill="#ffd24d" />
    <path d="M20 2v8a2 2 0 0 0 2 2h8" fill="#ffc21a" />
    <rect x="9" y="19" width="16" height="2.2" rx="1.1" fill="#fff" />
    <rect x="9" y="24" width="16" height="2.2" rx="1.1" fill="#fff" />
    <rect x="9" y="29" width="10" height="2.2" rx="1.1" fill="#fff" />
  </svg>
);
export const IcDocSm = () => (
  <svg width="26" height="30" viewBox="0 0 34 40" fill="none">
    <path d="M4 5a3 3 0 0 1 3-3h13l10 10v20a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V5Z" fill="#ffd24d" />
    <path d="M20 2v8a2 2 0 0 0 2 2h8" fill="#ffc21a" />
    <rect x="9" y="20" width="16" height="2.4" rx="1.2" fill="#fff" />
    <rect x="9" y="26" width="11" height="2.4" rx="1.2" fill="#fff" />
  </svg>
);
export const IcSendCircle = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
    <circle cx="22" cy="22" r="22" fill="#1e88fa" />
    <path d="m15 22 14-6-3.5 13-3-5.5L15 22Z" fill="#fff" />
  </svg>
);
export const IcCheckDouble = ({ color = "#fff" }: { color?: string }) => (
  <svg width="16" height="12" viewBox="0 0 18 12" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 6.5 4 9.5 9.5 3" />
    <path d="M8 9 8.5 9.5 14 3" />
  </svg>
);
export const IcClock = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#8a8c93" strokeWidth="1.6">
    <circle cx="10" cy="10" r="7" />
    <path d="M10 6v4l2.5 1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const IcBack = () => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="#4a4c52" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 13H5M11 6 4.5 13 11 20" />
  </svg>
);
export const IcOrderCard = () => (
  <svg width="40" height="35" viewBox="0 0 30 26" fill="none">
    <rect x="10" y="4" width="14" height="18" rx="4" fill="#BDBFC7" transform="rotate(14 17 13)" />
    <rect x="2" y="2" width="16" height="22" rx="5" fill="#8C909C" />
  </svg>
);
export const IcWalletCard = () => (
  <img src="/img/deposit-25.png" alt="" width={40} height={35} style={{ objectFit: 'contain' }} />
);
export const IcReport = () => (
  <svg width="30" height="30" viewBox="0 0 34 34" fill="none">
    <rect x="6" y="4" width="22" height="26" rx="4" fill="#8b7bf7" />
    <rect x="11" y="10" width="12" height="2.4" rx="1.2" fill="#fff" />
    <rect x="11" y="15" width="12" height="2.4" rx="1.2" fill="#fff" />
    <rect x="11" y="20" width="7" height="2.4" rx="1.2" fill="#fff" />
  </svg>
);
export const IcWidgetsBig = () => (
  <svg width="30" height="30" viewBox="0 0 34 34" fill="none">
    <circle cx="10" cy="10" r="4.5" fill="#4a90f5" />
    <rect x="19" y="5.5" width="9" height="9" rx="2.4" fill="#4a90f5" />
    <rect x="5.5" y="19" width="9" height="9" rx="2.4" fill="#4a90f5" />
    <circle cx="23.5" cy="23.5" r="4.5" fill="#4a90f5" />
  </svg>
);
export const IcBellSm = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#8a8c93" strokeWidth="1.5" strokeLinejoin="round">
    <path d="M6 8a4 4 0 0 1 8 0c0 4 1.5 5 1.5 5h-11S6 12 6 8Z" />
    <path d="M8.5 16a1.5 1.5 0 0 0 3 0" strokeLinecap="round" />
  </svg>
);

/* ---- employees ---- */
export const IcPeople2 = () => (
  <img src="/img/vneshtat12/People.png" alt="" width={24} height={24} style={{ display: "inline-block", verticalAlign: "middle" }} />
);
export const IcCluster3 = () => (
  <svg width="28" height="26" viewBox="0 0 30 28" fill="none">
    <circle cx="15" cy="7" r="5" fill="#8c8e95" />
    <circle cx="7" cy="20" r="5" fill="#bcbec3" />
    <circle cx="23" cy="20" r="5" fill="#bcbec3" />
  </svg>
);
export const IcCluster4 = () => (
  <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
    <circle cx="8" cy="8" r="5" fill="#8c8e95" />
    <circle cx="20" cy="8" r="5" fill="#bcbec3" />
    <circle cx="8" cy="20" r="5" fill="#bcbec3" />
    <circle cx="20" cy="20" r="5" fill="#8c8e95" />
  </svg>
);
export const IcBan = () => (
  <img src="/img/ctx-ban.png" alt="" width={18} height={18} style={{ display: "inline-block", verticalAlign: "middle" }} />
);
export const IcEdit = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#5a5c63" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 14.5 13 5.5l2 2-9 9-2.5.5.5-2.5Z" />
    <path d="m12 6.5 2 2" />
  </svg>
);
export const IcInfoCircle = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#5a5c63" strokeWidth="1.5">
    <circle cx="10" cy="10" r="7.2" />
    <circle cx="10" cy="6.8" r="0.9" fill="#5a5c63" stroke="none" />
    <path d="M10 9.4V14" strokeLinecap="round" />
  </svg>
);
export const IcPlusField = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#a9abb1" strokeWidth="1.7" strokeLinecap="round">
    <path d="M10 5v10M5 10h10" />
  </svg>
);

/* documents mode toggle in the chat bar */
export const IcDocMode = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M4.6 3.6A1.6 1.6 0 0 1 6.2 2h5.1l4.1 4.1v10.3a1.6 1.6 0 0 1-1.6 1.6H6.2a1.6 1.6 0 0 1-1.6-1.6V3.6Z" fill="#1e88fa" />
    <rect x="7" y="8.3" width="6.2" height="1.5" rx=".75" fill="#fff" />
    <rect x="7" y="11.5" width="6.2" height="1.5" rx=".75" fill="#fff" />
  </svg>
);
export const IcSparkle = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#8a8c93">
    <path d="M12 2.5c.4 3.6 1.9 5.1 5.5 5.5-3.6.4-5.1 1.9-5.5 5.5-.4-3.6-1.9-5.1-5.5-5.5 3.6-.4 5.1-1.9 5.5-5.5Z" />
    <path d="M18.5 13c.2 1.8 1 2.6 2.8 2.8-1.8.2-2.6 1-2.8 2.8-.2-1.8-1-2.6-2.8-2.8 1.8-.2 2.6-1 2.8-2.8Z" />
  </svg>
);
export const IcPaperclip = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#5a5c63" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 7.5 8 13.5a2.5 2.5 0 0 1-3.5-3.5l6.5-6.5a1.6 1.6 0 0 1 2.3 2.3L7 12" />
  </svg>
);
export const IcFolder2 = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#5a5c63" strokeWidth="1.6" strokeLinejoin="round">
    <path d="M3 6a2 2 0 0 1 2-2h3l1.5 1.5H15a2 2 0 0 1 2 2V14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6Z" />
  </svg>
);
export const IcEye = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#5a5c63" strokeWidth="1.6">
    <path d="M2 10s3-5 8-5 8 5 8 5-3 5-8 5-8-5-8-5Z" strokeLinejoin="round" />
    <circle cx="10" cy="10" r="2.2" />
  </svg>
);
export const IcArrowR = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 10h11m0 0-4-4m4 4-4 4" />
  </svg>
);
export const IcRefresh = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#6d6f77" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15.5 6.5A6 6 0 1 0 16 10" />
    <path d="M16 3.5V7h-3.5" />
  </svg>
);
export const IcUndo = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#6d6f77" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 6H12a4 4 0 0 1 0 8H6" />
    <path d="M8.5 3.5 5.5 6l3 2.5" />
  </svg>
);
export const IcDocBtn = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1e88fa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 4.5A1.5 1.5 0 0 1 7.5 3h6l4.5 4.5v12A1.5 1.5 0 0 1 16.5 21h-9A1.5 1.5 0 0 1 6 19.5v-15Z" />
    <path d="M13 3v5h5M9 12h6M9 15.5h6" />
  </svg>
);
export const IcStop = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="#6d6f77">
    <rect x="5" y="5" width="10" height="10" rx="2.5" />
  </svg>
);
export const IcSliders = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9aa0a8" strokeWidth="1.7" strokeLinecap="round">
    <path d="M4 8h10M18 8h2M4 16h2M10 16h10" />
    <circle cx="16" cy="8" r="2.2" />
    <circle cx="8" cy="16" r="2.2" />
  </svg>
);
export const IcThumbUp = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
    <path d="M7 10v9H4a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h3Zm0 0 4-7c1.3 0 2 .9 2 2v3h4.5a2 2 0 0 1 2 2.4l-1.2 6A2 2 0 0 1 16.3 19H7" />
  </svg>
);
export const IcThumbDown = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
    <path d="M17 14V5h3a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-3Zm0 0-4 7c-1.3 0-2-.9-2-2v-3H6.5a2 2 0 0 1-2-2.4l1.2-6A2 2 0 0 1 7.7 5H17" />
  </svg>
);

export const IcCopy = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#9aa0a8" strokeWidth="1.5" strokeLinejoin="round">
    <rect x="7" y="7" width="9" height="9" rx="2" />
    <path d="M13 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
  </svg>
);
export const IcLockField = () => (
  <img src="/img/vneshtat11/Lock.png" alt="" width={18} height={18} style={{ display: "inline-block", verticalAlign: "middle" }} />
);
export const IcChatBubbles = () => (
  <svg width="30" height="30" viewBox="0 0 34 34" fill="none">
    <path d="M5 11a4 4 0 0 1 4-4h11a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4h-7l-5 4v-4H9a4 4 0 0 1-4-4v-6Z" fill="#8b7bf7" />
    <path d="M17 19a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3h-1v3l-4-3h-1a3 3 0 0 1-3-3v-4Z" fill="#b3a8f9" />
  </svg>
);

/* ---- widgets ---- */
export const IcCalHeader = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3.5" y="5" width="17" height="15.5" rx="3" />
    <path d="M3.5 9.5h17M8 3v3.5M16 3v3.5" />
  </svg>
);
export const IcRadar = ({ size = 24 }: { size?: number }) => (
  <img src="/img/Radar.png" alt="" width={size} height={size} style={{ display: "inline-block", verticalAlign: "middle" }} />
);
export const IcCal3D = () => (
  <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
    <ellipse cx="102" cy="30" rx="4" ry="5" fill="#c9cbd1" />
    <ellipse cx="96" cy="20" rx="3" ry="4" fill="#dfe0e4" />
    <path d="M22 44c0-6 5-11 11-11h54c6 0 11 5 11 11v46c0 6-5 11-11 11H33c-6 0-11-5-11-11V44Z" fill="#8b5cf6" />
    <path d="M22 44c0-6 5-11 11-11h54c6 0 11 5 11 11v10H22V44Z" fill="#7c4ff0" />
    <path d="M87 33c6 0 11 5 11 11v46c0 6-5 11-11 11 4-2 5-6 5-11V44c0-5-1-9-5-11Z" fill="#6f42e8" />
    <rect x="38" y="26" width="7" height="18" rx="3.5" fill="#eceef1" />
    <rect x="66" y="26" width="7" height="18" rx="3.5" fill="#eceef1" />
    <text x="56" y="90" fontSize="34" fontWeight="700" fill="#e7defd" textAnchor="middle" fontFamily="Arial">5</text>
    <path d="M28 30l6 6M34 30l-6 6" stroke="#f2683a" strokeWidth="3" strokeLinecap="round" />
    <circle cx="92" cy="96" r="4" fill="#7c4ff0" />
  </svg>
);

/* ---- company ---- */
export const IcFolder = () => (
  <img src="/img/vneshtat12/Contract.png" alt="" width={24} height={24} style={{ display: "inline-block", verticalAlign: "middle" }} />
);

/* ---- finance ---- */
export const IcWallet = () => (
  <img src="/img/vneshtat12/Frame.png" alt="" width={24} height={24} style={{ display: "inline-block", verticalAlign: "middle" }} />
);
export const IcPostpay = () => (
  <svg width="38" height="26" viewBox="0 0 38 26" fill="none">
    <circle cx="25" cy="13" r="13" fill="#d6d8dd" />
    <circle cx="13" cy="13" r="13" fill="#a9abb1" />
    <path d="M13 6.5v6.5l-4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
/* document silhouette with a folded top-right corner, shared by the three
   payment tiles */
const DOC_PATH =
  "M8 0h10.6L30 11.4V22a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8V8a8 8 0 0 1 8-8Z";

export const IcFinRuble = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
    <path d={DOC_PATH} fill="#43b25f" />
    <path d="M11.5 9h4.8a3.5 3.5 0 0 1 0 7h-4.8m0-2.6h7m-7-4.4v12.2" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const IcActDoc = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
    <path d={DOC_PATH} fill="#f3d34a" />
    <rect x="8" y="10" width="14" height="2.2" rx="1.1" fill="#fff" />
    <rect x="8" y="14.4" width="14" height="2.2" rx="1.1" fill="#fff" />
    <rect x="8" y="18.8" width="9" height="2.2" rx="1.1" fill="#fff" />
  </svg>
);
export const IcFinSwap = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
    <path d={DOC_PATH} fill="#c9cbd1" />
    <path d="M9.5 12.5h11l-2.6-2.6m2.6 7h-11l2.6 2.6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const IcSbpRuble = () => (
  <img src="/img/amount.png" alt="" width={30} height={20} style={{ display: "inline-block", verticalAlign: "middle", objectFit: "contain" }} />
);
export const IcSbpPercent = () => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
    <rect width="26" height="26" rx="8" fill="#1e88fa" />
    <circle cx="10" cy="10" r="2" fill="#fff" />
    <circle cx="16" cy="16" r="2" fill="#fff" />
    <path d="M17 9 9 17" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);
export const IcInvRuble = ({ muted }: { muted?: boolean }) => (
  <img
    src={muted ? "/img/rubl-grey.png" : "/img/rubl.svg"}
    alt=""
    width={34}
    height={36}
  />
);

