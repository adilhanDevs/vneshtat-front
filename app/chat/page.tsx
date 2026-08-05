"use client";

import { useState, useRef } from "react";
import Header from "../Header";
import { useRouter } from "next/navigation";
import "../account/account.css";
import "../orders/orders.css";
import "./chat.css";
import "../docs/docs.css";
import "../trip/trip.css";
import Sidebar from "../account/Sidebar";
import Messenger from "../account/Messenger";
import {
  IcCard, IcDots, IcBubble, IcPlus, IcSparkle, IcStop, IcDoc, IcDocSm, IcCal3D, IcDocMode, IcPlane, IcPlaneOutline,
  IcWidgets, IcThumbUp, IcThumbDown, IcCopy, IcDownload, IcClose, IcArrowR,
  IcPaperclip, IcFolder2, IcArchive, IcTrash, IcEye, IcMenuChat, IcRefresh, IcUndo, IcInfoCircle,
} from "../account/icons";

type Msg =
  | { role: "user"; kind: "text"; text: string }
  | { role: "user"; kind: "file" }
  | { role: "ai"; kind: "md" }
  | { role: "ai"; kind: "file" }
  | { role: "ai"; kind: "widget" };

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

export default function Chat() {
  const [messenger, setMessenger] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const router = useRouter();
  const [gen, setGen] = useState(false);
  const [text, setText] = useState("");
  const [topMenu, setTopMenu] = useState(false);
  const [attach, setAttach] = useState(false);
  const [plusMenu, setPlusMenu] = useState(false);
  const [mode, setMode] = useState<"chat" | "docs" | "trip">("chat");

  const [tripPhase, setTripPhase] = useState<Phase>("empty");
  const [tripTab, setTripTab] = useState<Tab>("route");
  const [chosen, setChosen] = useState<number | null>(null);
  const [detail, setDetail] = useState<number | null>(null);
  const [participants, setParticipants] = useState(false);
  const [checked, setChecked] = useState<Record<number, boolean>>({ 0: true });

  const cycleMode = () => {
    setMode((prev) => {
      if (prev === "chat") return "docs";
      if (prev === "docs") return "trip";
      return "chat";
    });
  };
  const [ctx, setCtx] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);
  const resetTa = () => { if (taRef.current) taRef.current.style.height = "auto"; };
  const grow = (el: HTMLTextAreaElement) => { el.style.height = "auto"; el.style.height = Math.min(el.scrollHeight, 200) + "px"; };

  const respond = (q: string, userCount: number) => {
    const s = q.toLowerCase();
    let kind: "md" | "file" | "widget" = "md";
    if (s.includes("календар") || s.includes("ужин") || s.includes("twins") || userCount >= 3) {
      kind = "widget";
    } else if (s.includes("doc") || s.includes("файл") || s.includes("скачив") || mode === "docs" || userCount === 2) {
      kind = "file";
    } else {
      kind = "md";
    }
    setGen(true);
    timer.current = setTimeout(() => {
      setMsgs((m) => [...m, { role: "ai", kind }]);
      setGen(false);
    }, 2300);
  };

  const send = () => {
    if (gen || tripPhase === "generating") return;
    if (mode === "trip") {
      resetTa();
      if (tripPhase === "empty") {
        setText("");
        setTripPhase("generating");
        setTripTab("route");
        timer.current = setTimeout(() => { setTripPhase("variants"); setTripTab("search"); }, 2500);
      } else if (tripPhase === "chosen") {
        setText("");
        setTripPhase("booking");
        setTripTab("book");
      } else {
        setText("");
      }
      return;
    }

    const userMsgs = msgs.filter((m) => m.role === "user");
    const userCount = userMsgs.length + 1;
    let q = text.trim();
    if (!q) {
      if (userCount === 1) {
        q = "Мне нужно организовать поездку из Москвы в Санкт-Петербург этим летом. Туда хотим добраться самолетом, обратно - Сапсаном. Поедет 3 взрослых, желательный бюджет - до 50000 рублей. В какой месяц будет дешевле организовать эту поездку?";
      } else if (userCount === 2) {
        q = "Сформируй пожалуйста DOC-файл с подробным описанием маршрута и расходами";
      } else {
        q = "Добавь пожалуйста в календарь, что 25 августа в 16.00 по МСК у меня ужин с инвесторами в ресторане Twins garden";
      }
    }
    setMsgs((m) => [...m, { role: "user", kind: "text", text: q }]);
    setText("");
    resetTa();
    respond(q, userCount);
  };
  const attachFile = () => {
    if (gen) return;
    setMsgs((m) => [...m, { role: "user", kind: "file" }, { role: "user", kind: "text", text: text.trim() || "Мне нужно организовать поездку из Москвы в Санкт-Петербург этим летом. Туда хотим добраться самолетом, обратно - Сапсаном. Поедет 3 взрослых, желательный бюджет - до 50000 рублей. В какой месяц будет дешевле организовать эту поездку?" }]);
    setText("");
    respond("маршрут", 2);
  };
  const empty = msgs.length === 0 && !gen;

  return (
    <div className="acc">
      <Sidebar active={mode === "trip" ? "trip" : "chat"} tripTitle={mode === "trip" && tripPhase !== "empty" ? "Поездка в Санкт-Пе..." : undefined} />

      <main className="acc-main with-surface" style={{ position: "relative" }}>
        <Header onMessengerClick={() => setMessenger(true)} />

        {topMenu && (
          <>
            <div style={{ position: "fixed", inset: 0, zIndex: 55 }} onClick={() => setTopMenu(false)} />
            <div className="cht-topmenu">
              <button onClick={() => { setTopMenu(false); setAttach(true); }}><IcPaperclip /> Вложения чата</button>
              <button onClick={() => setTopMenu(false)}><IcFolder2 /> Добавить в папку</button>
              <button onClick={() => setTopMenu(false)}><IcArchive /> Архивировать чат</button>
              <button className="red" onClick={() => setTopMenu(false)}><IcTrash /> Удалить чат</button>
            </div>
          </>
        )}

        <div className="acc-surface chat-surface">
          <div className="cht-scroll">
          {mode === "trip" && (
            <>
              <div
                className="trip-steps-row"
                style={tripPhase === "empty" ? { position: "absolute", top: 10, right: 10, zIndex: 5, margin: 0 } : { marginBottom: 20 }}
              >
                <div className="trip-steps">
                  <div className="trip-steps-titles">
                    <button onClick={() => setTripTab("route")}>Маршрут</button>
                    <button onClick={() => setTripTab("search")}>Поиск</button>
                    <button onClick={() => setTripTab("book")}>Бронь</button>
                  </div>
                  <div className="trip-steps-track">
                    <div
                      className="trip-steps-fill"
                      style={{ width: tripTab === "route" ? "33%" : tripTab === "search" ? "66%" : "100%" }}
                    />
                  </div>
                </div>
              </div>

              {tripPhase === "empty" && (
                <div className="trip-hero">
                  <div className="hero-title">Поездка</div>
                  <img src="/img/trip-hero.png" alt="" />
                  <div className="hero-sub">
                    Вы находитесь в режиме создания поездки. Опишите все пожелания
                    в сообщении и чат предложит вам готовые варианты поездок.
                  </div>
                </div>
              )}

              {tripPhase !== "empty" && (
                <div className="trip-out-row">
                  <button className="trip-copy"><IcCopy /></button>
                  <div className="trip-out">{REQUEST}</div>
                </div>
              )}

              {tripPhase === "generating" && (
                <div className="trip-gen-row">
                  <div className="trip-progress">
                    <div className="p-text">Формирую ответ...</div>
                    <div className="p-track"><div className="p-fill" /></div>
                  </div>
                  <button className="trip-stop" onClick={() => { if (timer.current) clearTimeout(timer.current); setTripPhase("variants"); setTripTab("search"); }}><IcStop /></button>
                </div>
              )}

              {(tripPhase === "variants" || tripPhase === "chosen" || tripPhase === "booking") && (
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
                        {tripPhase === "variants"
                          ? <button className="trip-select" onClick={() => { setChosen(i); setTripPhase("chosen"); setTripTab("route"); setDetail(null); }}>Выбрать</button>
                          : chosen === i
                            ? <button className="trip-select chosen">Выбран</button>
                            : <button className="trip-select dim" onClick={() => { setChosen(i); setTripPhase("chosen"); setTripTab("route"); setDetail(null); }}>Выбрать</button>}
                      </div>
                    ))}
                    {tripPhase === "variants" && (
                      <div className="trip-refresh-pill">
                        <button><IcRefresh /> Обновить</button>
                        <button><IcUndo /> Отмена</button>
                      </div>
                    )}
                  </div>
                </>
              )}

              {(tripPhase === "chosen" || tripPhase === "booking") && (
                <>
                  <div className="trip-chosen-pill">
                    <span>Выбран вариант {(chosen ?? 0) + 1}</span>
                    <span className="cancel" onClick={() => { setTripPhase("variants"); setChosen(null); setTripTab("search"); }}>Отмена</span>
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

              {tripPhase === "booking" && (
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
            </>
          )}

          {mode !== "trip" && empty && mode === "chat" && (
            <div className="cht-hero">
              <div className="cht-hero-stack">
                <div className="hero-title">Новый чат</div>
                <img src="/img/chat-hero.png" alt="" />
              </div>
              <div className="hero-sub">
                Попросите чат организовать поездку, найти самый дешевый билет
                или сформировать документы. Он умеет очень многое.
              </div>
            </div>
          )}

          {mode !== "trip" && empty && mode === "docs" && (
            <div className="cht-hero doc-hero">
              <div className="cht-hero-stack">
                <div className="hero-title">Документы</div>
                <img src="/img/person-docs.png" alt="" />
              </div>
              <div className="hero-sub">
                Вы находитесь в режиме работы с документами. Напишите
                в сообщении запрос и чат соберет необходимый документ.
              </div>
            </div>
          )}

          {msgs.map((m, i) => {
            if (m.role === "user" && m.kind === "text")
              return (
                <div key={i} className="cht-out-row">
                  <button className="cht-copy"><IcCopy /></button>
                  <div className="cht-out wide">{m.text}</div>
                </div>
              );
            if (m.role === "user" && m.kind === "file")
              return (
                <div key={i} className="cht-userfile-row">
                  <button className="cht-copy"><IcDownload /></button>
                  <div className="cht-userfile">
                    <IcDocSm />
                    <div><div className="f-name">Варианты поездки из Москвы в Санкт-Пе...</div><div className="f-sub">DOC · 16KB</div></div>
                  </div>
                </div>
              );
            if (m.role === "ai" && m.kind === "md") return <MdAnswer key={i} />;
            if (m.role === "ai" && m.kind === "file")
              return (
                <div key={i}>
                  <div className="cht-ai">Готово! Вот DOC-файл с вариантами маршрута.</div>
                  <div className="cht-file"><IcDocSm /><div><div className="f-name">Варианты поездки из Москвы в Санкт-Пе...</div><div className="f-sub">DOC · 16KB</div></div></div>
                  <div className="cht-fb"><button><IcThumbUp /></button><button><IcThumbDown /></button><button><IcCopy /></button><button><IcDownload /></button></div>
                </div>
              );
            if (m.role === "ai" && m.kind === "widget")
              return (
                <div key={i}>
                  <div className="cht-ai">Готово! Событие добавлено в календарь. Хотите добавить напоминание или геолокацию к этому событию?</div>
                  <div className="cht-widget-label"><img src="/img/widget-purple.png" alt="" style={{ width: 18, height: 18, objectFit: "contain" }} /> Виджет</div>
                  <div className="cht-widget">
                    <span><IcCal3D /></span>
                    <div className="w-main"><b>Событие добавлено в календарь!</b><span>Отменить действие</span></div>
                    <button className="w-btn">Открыть виджет <IcArrowR /></button>
                  </div>
                </div>
              );
            return null;
          })}

          {gen && (
            <div className="cht-gen2-row">
              <div className="cht-progress2"><div className="p-text">Формирую ответ...</div><div className="p-track"><div className="p-fill" /></div></div>
              <button className="cht-stop" onClick={() => { if (timer.current) clearTimeout(timer.current); setGen(false); setMsgs((m) => [...m, { role: "ai", kind: mode === "docs" ? "file" : "md" }]); }}><IcStop /></button>
            </div>
          )}
          </div>
        </div>
      </main>

      {plusMenu && <div style={{ position: "fixed", inset: 0, zIndex: 55 }} onClick={() => setPlusMenu(false)} />}

      {/* fixed bar makes its own stacking context, so it must outrank the
          close-overlay (55) while the menu is open — but not the drawer scrim (50) otherwise */}
      <div className="ord-chatbar" style={plusMenu ? { zIndex: 56 } : undefined}>
        <div className="inner">
          <div className="dash-ai-left">
            <div className="cht-plus-wrap">
              <button className="ord-round" onClick={() => setPlusMenu((v) => !v)}><IcPlus /></button>
              {plusMenu && (
                <div className="cht-plusmenu">
                  <button onClick={() => { setPlusMenu(false); setMode("docs"); }}><IcDocMode /> Документы</button>
                  <button onClick={() => { setPlusMenu(false); setMode("trip"); }}><IcPlane /> Поездка</button>
                  <button onClick={() => { setPlusMenu(false); attachFile(); }}><IcPaperclip /> Прикрепить файл</button>
                </div>
              )}
            </div>
            <button
              className="ord-round active"
              title={mode === "chat" ? "Режим ИИ" : mode === "docs" ? "Режим документов" : "Режим поездки"}
              onClick={cycleMode}
            >
              <IcPlane />
            </button>
          </div>
          <textarea
            ref={taRef}
            rows={1}
            placeholder={gen ? "Идет генерация ответа..." : "Напишите свой запрос"}
            value={text}
            disabled={gen}
            onChange={(e) => { setText(e.target.value); grow(e.target); }}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
          />
          <button
            className={`ord-send ${text.trim() ? "active" : ""}`}
            disabled={!text.trim() || gen}
            onClick={send}
          >
            <img src="/img/Send (1).png" alt="" style={{ width: 22, height: 22, objectFit: "contain" }} />
          </button>
        </div>
      </div>

      {messenger && <Messenger onClose={() => setMessenger(false)} />}

      {/* attachments drawer */}
      {attach && (
        <div className="acc-scrim" onClick={() => setAttach(false)}>
          <div className="acc-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="acc-drawer-head"><h1>Вложения</h1><button onClick={() => setAttach(false)}><IcClose /></button></div>
            <div className="acc-drawer-body" onClick={() => setCtx(null)}>
              <input className="msg-search" placeholder="Поиск" />
              {[1, 2, 3].map((i) => (
                <div key={i} className="att-item">
                  <IcDoc />
                  <div className="a-body"><div className="a-name">Варианты поездки из Москвы в Санкт-Петербург</div><div className="a-sub">DOC · 16KB</div></div>
                  <button className="msg-dots" onClick={(e) => { e.stopPropagation(); setCtx(ctx === i ? null : i); }}><IcDots /></button>
                  {ctx === i && (
                    <div className="msg-ctx" style={{ right: 10, top: 44 }} onClick={(e) => e.stopPropagation()}>
                      <button onClick={() => setCtx(null)}><IcEye /> Показать в чате</button>
                      <button onClick={() => setCtx(null)}><IcDownload /> Скачать файл</button>
                      <button className="red" onClick={() => setCtx(null)}><IcTrash /> Удалить файл</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
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
              <button className="trip-btn-primary" onClick={() => { setChosen(detail); setTripPhase("chosen"); setTripTab("route"); setDetail(null); }}>Выбрать</button>
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

function MdAnswer() {
  return (
    <div>
      <div className="cht-md">
        Привет! Помогу собрать оптимальный маршрут Москва — Санкт-Петербург на лето 🏖️✈️
        <div className="h">📍 Вводные:</div>
        <ul>
          <li>Туда — самолётом</li>
          <li>Обратно — Сапсаном</li>
          <li>3 взрослых</li>
          <li>Бюджет: до 50 000 ₽</li>
        </ul>
        <div className="h2">Что нужно иметь в виду</div>
        <div className="h">🌦️ Погода:</div>
        <ul>
          <li>Для прогулок, фотосессий, романтики — ИЮНЬ<span className="sub">Белые ночи (пик — с 11 по 22 июня), воздух свежий, нет изнуряющей жары.</span></li>
          <li>Если хочется тепла — ИЮЛЬ<span className="sub">Максимум зелени и солнца, но может быть душно. При этом выше цены и больше туристов.</span></li>
          <li>Август — компромисс, но ближе к осени: больше дождей, меньше солнца.</li>
        </ul>
        <div className="h">🔔 ИТОГ:</div>
        Если выбирать по соотношению цена + погода + атмосфера — ИЮНЬ снова выходит на первое
        место. Хочешь — соберу конкретный маршрут с учётом погоды, комфортного времени вылета и
        прогулочных зон 🗺️🏙️
      </div>
      <div className="cht-fb"><button><IcThumbUp /></button><button><IcThumbDown /></button><button><IcCopy /></button></div>
    </div>
  );
}
