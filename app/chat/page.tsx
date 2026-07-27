"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import "../account/account.css";
import "../orders/orders.css";
import "./chat.css";
import "../docs/docs.css";
import Sidebar from "../account/Sidebar";
import Messenger from "../account/Messenger";
import {
  IcCard, IcDots, IcBubble, IcPlus, IcSparkle, IcStop, IcDoc, IcDocSm, IcCal3D, IcDocMode,
  IcWidgets, IcThumbUp, IcThumbDown, IcCopy, IcDownload, IcClose, IcArrowR,
  IcPaperclip, IcFolder2, IcArchive, IcTrash, IcEye, IcMenuChat,
} from "../account/icons";

type Msg =
  | { role: "user"; kind: "text"; text: string }
  | { role: "user"; kind: "file" }
  | { role: "ai"; kind: "md" }
  | { role: "ai"; kind: "file" }
  | { role: "ai"; kind: "widget" };

export default function Chat() {
  const [messenger, setMessenger] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const router = useRouter();
  const [gen, setGen] = useState(false);
  const [text, setText] = useState("");
  const [topMenu, setTopMenu] = useState(false);
  const [attach, setAttach] = useState(false);
  const [plusMenu, setPlusMenu] = useState(false);
  const [mode, setMode] = useState<"chat" | "docs">("chat");
  const [ctx, setCtx] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);
  const resetTa = () => { if (taRef.current) taRef.current.style.height = "auto"; };
  const grow = (el: HTMLTextAreaElement) => { el.style.height = "auto"; el.style.height = Math.min(el.scrollHeight, 200) + "px"; };

  const respond = (q: string) => {
    const s = q.toLowerCase();
    const kind: "md" | "file" | "widget" =
      mode === "docs" ? "file"
        : s.includes("календар") ? "widget" : (s.includes("doc") || s.includes("файл") || s.includes("скачив")) ? "file" : "md";
    setGen(true);
    timer.current = setTimeout(() => {
      setMsgs((m) => [...m, { role: "ai", kind }]);
      setGen(false);
    }, 2300);
  };

  const send = () => {
    if (gen) return;
    const q = text.trim() || "Мне нужно организовать поездку из Москвы в Санкт-Петербург этим летом. Туда хотим добраться самолетом, обратно - Сапсаном. Поедет 3 взрослых, желательный бюджет - до 50000 рублей. В какой месяц будет дешевле организовать эту поездку?";
    setMsgs((m) => [...m, { role: "user", kind: "text", text: q }]);
    setText("");
    resetTa();
    respond(q);
  };
  const attachFile = () => {
    if (gen) return;
    setMsgs((m) => [...m, { role: "user", kind: "file" }, { role: "user", kind: "text", text: text.trim() || "Мне нужно организовать поездку из Москвы в Санкт-Петербург этим летом. Туда хотим добраться самолетом, обратно - Сапсаном. Поедет 3 взрослых, желательный бюджет - до 50000 рублей. В какой месяц будет дешевле организовать эту поездку?" }]);
    setText("");
    respond("маршрут");
  };
  const empty = msgs.length === 0 && !gen;

  return (
    <div className="acc">
      <Sidebar active="chat" />

      <main className="acc-main with-surface" style={{ position: "relative" }}>
        <div className="acc-top">
          <div className="acc-balance">
            <span className="b-alfa">Альфа</span>
            <span className="b-div" />
            <span className="b-amount"><IcCard /> 490 000 ₽</span>
            <span className="b-div" />
            <span className="acc-toggle" />
          </div>
          <div className="acc-top-right">
            <button className="acc-iconbtn" onClick={() => setTopMenu((v) => !v)}><IcDots /></button>
            <button className="acc-iconbtn" onClick={() => setMessenger(true)}><IcBubble /></button>
            <img className="acc-avatar" src="/img/avatar-sm.png" alt="" onClick={() => router.push("/account")} />
          </div>
        </div>

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

        <div className="acc-surface">
          <div className="cht-scroll">
          {empty && mode === "chat" && (
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

          {empty && mode === "docs" && (
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
                  <div className="cht-widget-label"><IcWidgets /> Виджет</div>
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
          <div className="cht-plus-wrap">
            <button className="ord-round" onClick={() => setPlusMenu((v) => !v)}><IcPlus /></button>
            {plusMenu && (
              <div className="cht-plusmenu">
                <button onClick={() => { setPlusMenu(false); setMode("docs"); }}><IcDocMode /> Документы</button>
                <button onClick={() => { setPlusMenu(false); attachFile(); }}><IcPaperclip /> Прикрепить файл</button>
              </div>
            )}
          </div>
          {mode === "docs"
            ? <button className="ord-round active" title="Выйти из режима документов" onClick={() => setMode("chat")}><IcDocMode /></button>
            : <button className="ord-round"><IcSparkle /></button>}
          <textarea
            ref={taRef}
            rows={1}
            placeholder={gen ? "Идет генерация ответа..." : "Напишите свой запрос"}
            value={text}
            disabled={gen}
            onChange={(e) => { setText(e.target.value); grow(e.target); }}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
          />
          <button className="ord-send" style={{ background: gen ? "#eef1f4" : "var(--blue)" }} disabled={gen} onClick={send}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill={gen ? "#9aa0a8" : "#fff"}><path d="m4 11.5 15-6.5-4 15-3.5-6.5L4 11.5Z" /></svg>
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
