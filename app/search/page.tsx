"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "../account/account.css";
import "./search.css";
import Sidebar from "../account/Sidebar";
import Messenger from "../account/Messenger";
import { IcCard, IcDots, IcBubble, IcSliders, IcPlane } from "../account/icons";

const DEFAULTS = [
  { title: "Поездка в Москву", plane: false, prev: "Оплата прошла успешно, желаю приятной поездки! Обращайтесь по любым вопросам." },
  { title: "Поездка в Москву", plane: true, prev: "Оплата прошла успешно, желаю приятной поездки! Обращайтесь по любым вопросам." },
  { title: "Формирование документов", plane: false, prev: "Документ успешно сформирован и проверен. Но я рекомендую перед отправкой проверить его самостояте..." },
];

const RESULTS = [
  { title: "Поездка в Москву", plane: false },
  { title: "Формирование документов", plane: false },
];

export default function Search() {
  const router = useRouter();
  const [messenger, setMessenger] = useState(false);
  const [query, setQuery] = useState("");
  const active = query.trim().length > 0;

  return (
    <div className="acc">
      <Sidebar active="search" />

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
          <h1 className="acc-title">Поиск в чатах</h1>
          <div className="srch-sub">Напишите название чата или содержащиеся в нем слова.</div>

          <div className="srch-wrap">
            <div className="srch-field-box">
              <input
                className="srch-field"
                placeholder="Поиск"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="srch-filter"><IcSliders /></button>
            </div>

            {!active
              ? DEFAULTS.map((c, i) => (
                  <div key={i} className="srch-item">
                    <div className="srch-body">
                      <div className="srch-title">{c.title}{c.plane && <IcPlane />}</div>
                      <div className="srch-prev">{c.prev}</div>
                    </div>
                    <button className="srch-dots"><IcDots /></button>
                  </div>
                ))
              : RESULTS.map((c, i) => (
                  <div key={i} className="srch-item">
                    <div className="srch-body">
                      <div className="srch-title">{c.title}{c.plane && <IcPlane />}</div>
                      <div className="srch-prev">
                        <span className="hl">отчета о дви</span>жении средств с 12.05.2024 по 12.05.2025 для организации Альфа.
                      </div>
                    </div>
                    <button className="srch-dots"><IcDots /></button>
                  </div>
                ))}
          </div>
        </div>
      </main>

      {messenger && <Messenger onClose={() => setMessenger(false)} />}
    </div>
  );
}
