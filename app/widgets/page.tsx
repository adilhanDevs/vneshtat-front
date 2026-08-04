"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../Header";
import "../account/account.css";
import "./widgets.css";
import Sidebar from "../account/Sidebar";
import Messenger from "../account/Messenger";
import { IcCard, IcDots, IcBubble, IcCalHeader, IcRadar, IcCal3D } from "../account/icons";

export default function Widgets() {
  const router = useRouter();
  const [messenger, setMessenger] = useState(false);
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const showDropdown = focused && query.length > 0;

  return (
    <div className="acc">
      <Sidebar active="widgets" />

      <main className="acc-main with-surface">
        <Header onMessengerClick={() => setMessenger(true)} />

        <div className="acc-surface">
          <h1 className="acc-title">Виджеты</h1>

          <div className="wg-search-wrap">
            {!showDropdown ? (
              <>
                <input
                  className="wg-search"
                  placeholder="Поиск виджетов"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setTimeout(() => setFocused(false), 150)}
                />
                {query && (
                  <button className="wg-search-x" onMouseDown={(e) => { e.preventDefault(); setQuery(""); }}>
                    <IcClose />
                  </button>
                )}
              </>
            ) : (
              <div className="wg-search-card">
                <div className="wg-search-card-top">
                  <input
                    className="wg-search-card-input"
                    placeholder="Поиск виджетов"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setTimeout(() => setFocused(false), 150)}
                    autoFocus
                  />
                  <button className="wg-search-card-x" onMouseDown={(e) => { e.preventDefault(); setQuery(""); setFocused(false); }}>
                    <IcClose />
                  </button>
                </div>
                <div className="wg-dropdown-items">
                  <button className="hl" onMouseDown={() => setQuery("Календарь")}>Календарь</button>
                  <button onMouseDown={() => setQuery("Календарь")}>Календарь</button>
                </div>
              </div>
            )}
          </div>

          <div className="wg-row">
            <div className="wg-card">
              <div className="wg-illus"><img src="/img/calendar-decor.png" alt="" width={142} height={142} style={{ display: "block", objectFit: "contain" }} /></div>
              <div className="wg-content">
                <div className="wg-head">
                  <IcCalHeader />
                  <span className="t">Календарь</span>
                  <span className="wg-badge">2</span>
                </div>
                <div className="wg-desc">Следите за своими<br />поездками на календаре.</div>
                <div className="wg-actions">
                  <button className="wg-btn">Открыть</button>
                  <button className="wg-dots"><IcDots /></button>
                </div>
              </div>
            </div>

            <div className="wg-card">
              <div className="wg-illus"><img src="/img/Image.png" alt="" width={142} height={142} style={{ display: "block", objectFit: "contain" }} /></div>
              <div className="wg-content">
                <div className="wg-head">
                  <IcRadar />
                  <span className="t">Радар</span>
                </div>
                <div className="wg-desc">Автобронирвоание<br />появившихся билетов.</div>
                <div className="wg-actions">
                  <button className="wg-btn">Подключить</button>
                  <button className="wg-dots"><IcDots /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {messenger && <Messenger onClose={() => setMessenger(false)} />}
    </div>
  );
}

function IcClose() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a9abb1" strokeWidth="1.8" strokeLinecap="round">
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}
