"use client";

import { useState, useRef } from "react";
import Header from "../Header";
import { useRouter } from "next/navigation";
// account.css нужен только общим Sidebar/Header (.acc-side, .acc-logo, .acc-nav,
// .acc-top, .acc-balance, .acc-avatar, .acc-menu). Собственных acc-* классов у
// /trip больше нет — вся вёрстка страницы, включая шторки и чатбар, в trip.css.
import "../account/account.css";
import "./trip.css";
import Sidebar from "../account/Sidebar";
import Messenger from "../account/Messenger";
import {
  IcCard, IcDots, IcBubble, IcPlus, IcPlane, IcPlaneOutline, IcStop, IcRefresh, IcUndo,
  IcThumbUp, IcThumbDown, IcCopy, IcClose, IcInfoCircle, IcMenuChat, IcDocMode,
} from "../account/icons";

type Phase = "empty" | "generating" | "variants" | "chosen" | "booking";
type Tab = "route" | "search" | "book";

const REQUEST =
  "Мне нужно организовать поездку из Москвы в Санкт-Петербург, с 3 по 5 июля. Туда хотим добраться самолетом, обратно - Сапсаном. Отправление самолета не раньше 11 утра, отправление Сапсана не позднее 6 вечера. В Питере нужен отель около метро Гостиный двор, 2 номера, 2 ночи. Поедет 3 взрослых, желательный бюджет - до 50000 рублей.";

const VARIANTS = [
  {
    n: "Вариант 1", emoji: "💵", title: "Экономный",
    desc: "Самый бюджетный вариант из доступных, но номер будет без окна и вылет в 4 утра.",
    data: ["Туда — самолётом (Pobeda), вылет в 4 утра", "Хостел около м. Петроградская, номер без окна", "Обратно — Сапсаном", "Включен Аэроэкспресс до Шереметьево"],
    price: "~47 050 ₽",
  },
  {
    n: "Вариант 2", emoji: "🎯", title: "Оптимальный",
    desc: "Идеальное соответствие требованиям.",
    data: ["Туда — самолётом (Аэрофлот), вылет в 12:45", "Отель 2 звезды около м. Петроградская", "Обратно — Сапсаном", "Включен Аэроэкспресс до Шереметьево и трансфер из Пулково"],
    price: "~50 500 ₽",
  },
  {
    n: "Вариант 3", emoji: "💸", title: "Чуть дороже",
    desc: "Немного выше максимального бюджета, но перелёт будет бизнес-классом, а отель 4 звезды.",
    data: ["Туда — самолётом (Аэрофлот, бизнес-класс), вылет в 12:45", "Отель 4 звезды около м. Петроградская", "Обратно — Сапсаном", "Включен Аэроэкспресс до Шереметьево и трансфер из Пулково"],
    price: "~53 500 ₽",
  },
];

export default function Trip() {
  const [messenger, setMessenger] = useState(false);
  const [phase, setPhase] = useState<Phase>("empty");
  const [tab, setTab] = useState<Tab>("route");
  const [text, setText] = useState("");
  const [chosen, setChosen] = useState<number | null>(null);
  const [detail, setDetail] = useState<number | null>(null);
  const [participants, setParticipants] = useState(false);
  const [checked, setChecked] = useState<Record<number, boolean>>({ 0: true });
  const router = useRouter();
  const [ctx, setCtx] = useState<number | null>(null);
  const [tripMode, setTripMode] = useState<"chat" | "docs" | "trip">("trip");

  const cycleTripMode = () => {
    setTripMode((prev) => {
      if (prev === "chat") return "docs";
      if (prev === "docs") return "trip";
      return "chat";
    });
  };
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);
  const grow = (el: HTMLTextAreaElement) => { el.style.height = "auto"; el.style.height = Math.min(el.scrollHeight, 200) + "px"; };

  const send = () => {
    if (taRef.current) taRef.current.style.height = "auto";
    if (phase === "empty") {
      setText("");
      setPhase("generating");
      setTab("route");
      timer.current = setTimeout(() => { setPhase("variants"); setTab("search"); }, 2500);
    } else if (phase === "chosen") {
      setText("");
      setPhase("booking");
      setTab("book");
    } else {
      setText("");
    }
  };
  const choose = (i: number) => { setChosen(i); setPhase("chosen"); setTab("route"); setDetail(null); };

  return (
    <div className="trip-root">
      <Sidebar />

      <main className="trip-main with-surface">
        <Header onMessengerClick={() => setMessenger(true)} />

        <div className="trip-surface">
          <div className="trip-scroll">
          <div className="trip-steps-row">
            <div className="trip-steps">
              <div className="trip-steps-titles">
                <button onClick={() => setTab("route")}>Маршрут</button>
                <button onClick={() => setTab("search")}>Поиск</button>
                <button onClick={() => setTab("book")}>Бронь</button>
              </div>
              <div className="trip-steps-track">
                <div
                  className="trip-steps-fill"
                  style={{ width: tab === "route" ? "33%" : tab === "search" ? "66%" : "100%" }}
                />
              </div>
            </div>
          </div>

          {phase === "empty" && (
            <div className="trip-hero">
              <div className="hero-title">Поездка</div>
              <img src="/img/trip-hero.png" alt="" />
              <div className="hero-sub">
                Вы находитесь в режиме создания поездки. Опишите все пожелания
                в сообщении и чат предложит вам готовые варианты поездок.
              </div>
            </div>
          )}

          {phase !== "empty" && (
            <div className="trip-out-row">
              <button className="trip-copy"><IcCopy /></button>
              <div className="trip-out">{REQUEST}</div>
            </div>
          )}

          {phase === "generating" && (
            <div className="trip-gen-row">
              <div className="trip-progress">
                <div className="p-text">Формирую ответ...</div>
                <div className="p-track"><div className="p-fill" /></div>
              </div>
              <button className="trip-stop" onClick={() => { if (timer.current) clearTimeout(timer.current); setPhase("variants"); setTab("search"); }}><IcStop /></button>
            </div>
          )}

          {(phase === "variants" || phase === "chosen" || phase === "booking") && (
            <>
              <div className="trip-ai center">
                Я подготовил 2 варианта поездки на выбор. Укажите, какой из них наиболее точно
                подходит вам и я его доработаю. Если такого варианта нет, напишите, что мне стоит поменять.
              </div>
              <div className="trip-variants">
                {VARIANTS.map((v, i) => (
                  <div key={i} className="trip-optcard">
                    <div className="oc-num"><IcPlane /> {v.n}</div>
                    <div className="oc-title">{v.emoji} {v.title}</div>
                    <div className="oc-desc">{v.desc}</div>
                    <div className="oc-data-h">📍 Данные:</div>
                    <ul>{v.data.map((d, j) => <li key={j}>{d}</li>)}</ul>
                    <div className="oc-row">
                      <button>{v.price}</button>
                      <button onClick={() => setDetail(i)}>Подробнее</button>
                    </div>
                    {phase === "variants"
                      ? <button className="trip-select" onClick={() => choose(i)}>Выбрать</button>
                      : chosen === i
                        ? <button className="trip-select chosen">Выбран</button>
                        : <button className="trip-select dim" onClick={() => choose(i)}>Выбрать</button>}
                  </div>
                ))}
                {phase === "variants" && (
                  <div className="trip-refresh-pill">
                    <button><IcRefresh /> Обновить</button>
                    <button><IcUndo /> Отмена</button>
                  </div>
                )}
              </div>
            </>
          )}

          {(phase === "chosen" || phase === "booking") && (
            <>
              <div className="trip-chosen-pill">
                <span>Выбран вариант {(chosen ?? 0) + 1}</span>
                <span className="cancel" onClick={() => { setPhase("variants"); setChosen(null); setTab("search"); }}>Отмена</span>
              </div>
              <div className="trip-ai">
                Отличный выбор! Хотите ли вы внести какие-то изменения в этот вариант? Возможно заменить
                рейс или найти другой отель? Напишите любые пожелания и я сделаю всё возможное, чтобы их
                учесть. Если всё хорошо – дайте мне знать и мы перейдём к бронированию.
              </div>
              <div className="trip-feedback">
                <button><IcThumbUp /></button><button><IcThumbDown /></button><button><IcCopy /></button>
              </div>
            </>
          )}

          {phase === "booking" && (
            <>
              <div className="trip-out-row"><button className="trip-copy"><IcCopy /></button><div className="trip-out">Всё хорошо</div></div>
              <div className="trip-ai">Отлично! Теперь мы готовы приступать к бронированию.</div>
              <div className="trip-booking">
                <div>
                  <h3>Бронирование</h3>
                  <p>Чтобы забронировать услуги, необходимо указать данные участников поездки. Выберите их из карточки компании или добавьте прямо сейчас.</p>
                </div>
                <div className="bk-btns">
                  <button onClick={() => setParticipants(true)}>Выбрать из компании</button>
                  <button>Добавить вручную</button>
                </div>
              </div>
            </>
          )}
          </div>
        </div>
      </main>

      <div className="trip-chatbar">
        <div className="inner">
          <button className="trip-round"><IcPlus /></button>
          <button
            className="trip-round active"
            onClick={cycleTripMode}
          >
            {tripMode === "chat" && (
              <img src="/img/chat-mode.png" alt="" style={{ width: 18, height: 18, objectFit: "contain" }} />
            )}
            {tripMode === "docs" && <IcDocMode />}
            {tripMode === "trip" && <IcPlane />}
          </button>
          <textarea
            ref={taRef}
            rows={1}
            placeholder={phase === "generating" ? "Идет генерация ответа..." : "Напишите свой запрос"}
            value={text}
            disabled={phase === "generating"}
            onChange={(e) => { setText(e.target.value); grow(e.target); }}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey && phase !== "generating") { e.preventDefault(); send(); } }}
          />
          <button className={`trip-send ${text.trim() ? "active" : ""}`} disabled={!text.trim() || phase === "generating"} onClick={send}>
            <img src="/img/Send (1).png" alt="" style={{ width: 22, height: 22, objectFit: "contain" }} />
          </button>
        </div>
      </div>

      {messenger && <Messenger onClose={() => setMessenger(false)} />}

      {/* variant detail drawer */}
      {detail !== null && (
        <div className="trip-scrim" onClick={() => setDetail(null)}>
          <div className="trip-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="trip-drawer-head" style={{ display: "block" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div className="vd-eyebrow"><IcPlaneOutline /> {VARIANTS[detail].n}</div>
                  <div className="vd-h1">{VARIANTS[detail].title}</div>
                </div>
                <button style={{ background: "none", border: "none", cursor: "pointer" }} onClick={() => setDetail(null)}><IcClose /></button>
              </div>
              <div className="vd-desc">{VARIANTS[detail].desc}</div>
            </div>
            <div className="trip-drawer-body">
              <div className="vd-day">11 марта, четверг</div>
              <div className="vd-card vd-card-flight">
                <div className="vd-left vd-left-flight">
                  <div className="vd-flight-route">
                    <div className="vd-point"><b>08:35</b><span>DME</span></div>
                    <span className="line" />
                    <div className="vd-point text-right"><b>10:05</b><span>LED</span></div>
                  </div>
                  <div className="vd-flight-note"><IcPlaneOutline /> Перелет: Санкт-Петербург - Москва</div>
                </div>
                <div className="vd-mid vd-mid-flight">В пути: 4ч 50мин<br />Рейс: DP 2550<br /><span className="more">Подробнее</span></div>
                <div className="vd-price vd-price-flight">8 570 ₽</div>
              </div>
              <div className="vd-card vd-card-train">
                <div className="vd-left vd-left-train"><div className="vd-title">Аэроэкспресс<span>Поезд, туда-обратно</span></div></div>
                <div className="vd-mid vd-mid-train">В пути: 45 мин<br />Класс: Стандартный<br /><span className="more">Подробнее</span></div>
                <div className="vd-price vd-price-train">8 570 ₽</div>
              </div>
              <div className="vd-card vd-card-hotel hotel">
                <div className="vd-hotel-img" />
                <div className="vd-left vd-left-hotel"><div className="vd-title">Заезд 11 марта, чт<span>с 15:00</span></div><div className="vd-title">Выезд 15 марта, вт<span>до 12:00</span></div></div>
                <div className="vd-mid vd-mid-hotel">Отель: Pentahotel<br />Moscow Arbat<br /><span className="more">Подробнее</span></div>
                <div className="vd-price vd-price-hotel">8 570 ₽</div>
              </div>
            </div>
            <div className="trip-drawer-foot">
              <button className="trip-btn-ghost" onClick={() => setDetail(null)}>Отмена</button>
              <button className="trip-btn-primary" onClick={() => choose(detail)}>Выбрать</button>
            </div>
          </div>
        </div>
      )}

      {/* participants drawer */}
      {participants && (
        <div className="trip-scrim" onClick={() => setParticipants(false)}>
          <div className="trip-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="trip-drawer-head" style={{ display: "block" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div className="vd-eyebrow"><IcPlaneOutline /> Бронирование</div>
                  <div className="vd-h1">Выбор участников поездки</div>
                </div>
                <button style={{ background: "none", border: "none", cursor: "pointer" }} onClick={() => setParticipants(false)}><IcClose /></button>
              </div>
            </div>
            <div className="trip-drawer-body" onClick={() => setCtx(null)}>
              <input className="trip-search" placeholder="Поиск" />
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="pd-item" onClick={() => setChecked((c) => ({ ...c, [i]: !c[i] }))}>
                  <span className={`pd-check${checked[i] ? " on" : ""}`}>{checked[i] && (
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="m4 8 2.5 2.5L12 5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  )}</span>
                  <div className="p-name">Яковлев Николай Никитич {(i === 0 || i === 2) && <span className="on">Онлайн</span>}</div>
                  <button className="trip-dots" onClick={(e) => { e.stopPropagation(); setCtx(ctx === i ? null : i); }}><IcDots /></button>
                  {ctx === i && (
                    <div className="trip-ctx" style={{ right: 10, top: 44 }} onClick={(e) => e.stopPropagation()}>
                      <button onClick={() => setCtx(null)}><IcInfoCircle /> Смотреть данные</button>
                      <button onClick={() => { setCtx(null); setMessenger(true); }}><IcMenuChat /> Открыть чат</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="trip-drawer-foot">
              <button className="trip-btn-ghost" onClick={() => setParticipants(false)}>Отмена</button>
              <button className="trip-btn-primary" onClick={() => setParticipants(false)}>Продолжить</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
