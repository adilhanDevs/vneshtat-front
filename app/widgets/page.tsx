"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
        <div className="acc-top">
          <div className="acc-balance">
            <span className="b-alfa">Альфа</span>
            <span className="b-div" />
            <span className="b-amount"><IcCard /> 490 000 ₽</span>
            <span className="b-div" />
            <span className="acc-toggle" />
          </div>
          <div className="acc-top-right">
            <button className="acc-iconbtn"><IcDots /></button>
            <button className="acc-iconbtn" onClick={() => setMessenger(true)}><IcBubble /></button>
            <img className="acc-avatar" src="/img/avatar-sm.png" alt="" onClick={() => router.push("/account")} />
          </div>
        </div>

        <div className="acc-surface">
          <h1 className="acc-title">Виджеты</h1>

          <div className="wg-search-wrap">
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
            {showDropdown && (
              <div className="wg-dropdown">
                <button className="hl" onMouseDown={() => setQuery("Календарь")}>Календарь</button>
                <button onMouseDown={() => setQuery("Календарь")}>Календарь</button>
              </div>
            )}
          </div>

          <div className="wg-row">
            <div className="wg-card">
              <div className="wg-illus"><IcCal3D /></div>
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
              <div className="wg-illus"><IcCal3D /></div>
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
