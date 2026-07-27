"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import "../account/account.css";
import "../orders/orders.css";
import "./trip.css";
import Sidebar from "../account/Sidebar";
import Messenger from "../account/Messenger";
import {
  IcCard, IcDots, IcBubble, IcPlus, IcPlane, IcStop, IcRefresh, IcUndo,
  IcThumbUp, IcThumbDown, IcCopy, IcClose, IcInfoCircle, IcMenuChat,
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
    <div className="acc">
      <Sidebar />

      <main className="acc-main">
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
      </main>

      <div className="ord-chatbar">
        <div className="inner">
          <button className="ord-round"><IcPlus /></button>
          <button className="ord-round active"><IcPlane /></button>
          <textarea
            ref={taRef}
            rows={1}
            placeholder={phase === "generating" ? "Идет генерация ответа..." : "Напишите свой запрос"}
            value={text}
            disabled={phase === "generating"}
            onChange={(e) => { setText(e.target.value); grow(e.target); }}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey && phase !== "generating") { e.preventDefault(); send(); } }}
          />
          <button className="ord-send" style={{ background: phase === "generating" ? "#eef1f4" : "var(--blue)" }} disabled={phase === "generating"} onClick={send}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill={phase === "generating" ? "#9aa0a8" : "#fff"}><path d="m4 11.5 15-6.5-4 15-3.5-6.5L4 11.5Z" /></svg>
          </button>
        </div>
      </div>

      {messenger && <Messenger onClose={() => setMessenger(false)} />}

      {/* variant detail drawer */}
      {detail !== null && (
        <div className="acc-scrim" onClick={() => setDetail(null)}>
          <div className="acc-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="acc-drawer-head" style={{ display: "block" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div className="vd-eyebrow"><IcPlane /> {VARIANTS[detail].n}</div>
                  <div className="vd-h1">{VARIANTS[detail].title}</div>
                </div>
                <button style={{ background: "none", border: "none", cursor: "pointer" }} onClick={() => setDetail(null)}><IcClose /></button>
              </div>
              <div className="vd-desc">{VARIANTS[detail].desc}</div>
            </div>
            <div className="acc-drawer-body">
              <div className="vd-day">11 марта, четверг</div>
              <div className="vd-card">
                <div className="vd-left">
                  <div className="vd-flight-top"><b>08:35</b><span className="line" /><b>10:05</b></div>
                  <div className="vd-flight-sub"><span>DME</span><span>LED</span></div>
                  <div className="vd-flight-note"><IcPlane /> Перелет: Санкт-Петербург - Москва</div>
                </div>
                <div className="vd-mid">В пути: 4ч 50мин<br />Рейс: DP 2550<br /><span className="more">Подробнее</span></div>
                <div className="vd-price">8 570 ₽</div>
              </div>
              <div className="vd-card">
                <div className="vd-left"><div className="vd-title">Аэроэкспресс<span>Поезд, туда-обратно</span></div></div>
                <div className="vd-mid">В пути: 45 мин<br />Класс: Стандартный<br /><span className="more">Подробнее</span></div>
                <div className="vd-price">8 570 ₽</div>
              </div>
              <div className="vd-card hotel">
                <div className="vd-hotel-img" />
                <div className="vd-left"><div className="vd-title">Заезд 11 марта, чт<span>с 15:00</span></div><div className="vd-title">Выезд 15 марта, вт<span>до 12:00</span></div></div>
                <div className="vd-mid">Отель: Pentahotel<br />Moscow Arbat<br /><span className="more">Подробнее</span></div>
                <div className="vd-price">8 570 ₽</div>
              </div>
            </div>
            <div className="acc-drawer-foot">
              <button className="acc-btn-ghost" onClick={() => setDetail(null)}>Отмена</button>
              <button className="acc-btn-primary" onClick={() => choose(detail)}>Выбрать</button>
            </div>
          </div>
        </div>
      )}

      {/* participants drawer */}
      {participants && (
        <div className="acc-scrim" onClick={() => setParticipants(false)}>
          <div className="acc-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="acc-drawer-head" style={{ display: "block" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div className="vd-eyebrow"><IcPlane /> Бронирование</div>
                  <div className="vd-h1">Выбор участников поездки</div>
                </div>
                <button style={{ background: "none", border: "none", cursor: "pointer" }} onClick={() => setParticipants(false)}><IcClose /></button>
              </div>
            </div>
            <div className="acc-drawer-body" onClick={() => setCtx(null)}>
              <input className="msg-search" placeholder="Поиск" />
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="pd-item" onClick={() => setChecked((c) => ({ ...c, [i]: !c[i] }))}>
                  <span className={`pd-check${checked[i] ? " on" : ""}`}>{checked[i] && (
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="m4 8 2.5 2.5L12 5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  )}</span>
                  <div className="p-name">Яковлев Николай Никитич {(i === 0 || i === 2) && <span className="on">Онлайн</span>}</div>
                  <button className="msg-dots" onClick={(e) => { e.stopPropagation(); setCtx(ctx === i ? null : i); }}><IcDots /></button>
                  {ctx === i && (
                    <div className="msg-ctx" style={{ right: 10, top: 44 }} onClick={(e) => e.stopPropagation()}>
                      <button onClick={() => setCtx(null)}><IcInfoCircle /> Смотреть данные</button>
                      <button onClick={() => { setCtx(null); setMessenger(true); }}><IcMenuChat /> Открыть чат</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="acc-drawer-foot">
              <button className="acc-btn-ghost" onClick={() => setParticipants(false)}>Отмена</button>
              <button className="acc-btn-primary" onClick={() => setParticipants(false)}>Продолжить</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
