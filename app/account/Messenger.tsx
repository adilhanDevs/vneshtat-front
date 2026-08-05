"use client";

import { useState } from "react";
import {
  IcClose, IcDots, IcPin, IcNote, IcMenuChat, IcDoc, IcDocSm, IcSendCircle,
  IcCheckDouble, IcPlus, IcDownload,
} from "./icons";
import "./messenger.css";

type View = "list" | "chat" | "attach";

const CHATS = [
  { id: 1, name: "Романов Алексей Анатольевич", tag: "Оператор", tagType: "op",
    prev: "Да, спасибо за бронь. Сейчас передам остальн...", time: "3 д", pinned: true, av: "/img/avatar.png" },
  { id: 2, name: "Системные уведомления", tag: null, tagType: null,
    prev: "Изменения в пользовательском соглашении", time: "3 ч", badge: "Новое", system: true },
  { id: 3, name: "Яковлев Николай Никитич", tag: "Онлайн", tagType: "on",
    prev: "Да, спасибо за бронь. Сейчас передам о...", badge: "Новое", av: "/img/avatar.png" },
  { id: 4, name: "Яковлев Николай Никитич", tag: "Онлайн", tagType: "on",
    prev: "Да, спасибо за бронь. Сейчас передам о...", time: "3 д", initials: "ЯН" },
];

export default function Messenger({ onClose }: { onClose: () => void }) {
  const [view, setView] = useState<View>("list");
  const [ctx, setCtx] = useState<number | null>(null);
  const [chatMenu, setChatMenu] = useState(false);
  const [attMenu, setAttMenu] = useState<number | null>(null);

  return (
    <div className="msgr-scrim" onClick={onClose}>
      {/* --- base messenger list drawer --- */}
      <div
        className={`msgr-drawer${view !== "list" ? " shoved" : ""}${view === "attach" ? " shoved-2" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="msgr-head">
          <h1>Мессенджер</h1>
          <button onClick={onClose}><IcClose /></button>
        </div>
        <div className="msgr-body" onClick={() => setCtx(null)}>
          <input className="msgr-search" placeholder="Поиск" />
          {CHATS.map((c) => (
            <div key={c.id} className="msgr-item" onClick={() => setView("chat")}>
              {c.system ? (
                <span className="m-av system"><img src="/img/logo-mark.png" alt="" style={{ width: 16, filter: "invert(1)" }} /></span>
              ) : c.initials ? (
                <span className="m-av initials">{c.initials}</span>
              ) : (
                <img className="m-av" src={c.av} alt="" />
              )}
              <div className="m-body">
                <div className="m-name">
                  {c.name}
                  {c.tagType === "op" && <span className="tag-op">{c.tag}</span>}
                  {c.tagType === "on" && <span className="tag-on">{c.tag}</span>}
                </div>
                <div className="m-prev">{c.prev}</div>
              </div>
              <div className="m-right">
                <button
                  className="msgr-dots"
                  onClick={(e) => { e.stopPropagation(); setCtx(ctx === c.id ? null : c.id); }}
                >
                  <IcDots />
                </button>
                {c.pinned ? <IcPin /> : c.badge ? <span className="msgr-badge">{c.badge}</span> : <span className="msgr-time">{c.time}</span>}
              </div>
              {ctx === c.id && (
                <div className="msgr-ctx" style={{ right: 10, top: 44 }} onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => { setCtx(null); setView("chat"); }}><IcMenuChat /> Открыть чат</button>
                  <button onClick={() => setCtx(null)}><IcPin /> Закрепить</button>
                  <button className="blue" onClick={() => setCtx(null)}><IcNote /> Сделать пометку</button>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="msgr-foot">
          <button className="msgr-btn-ghost" onClick={onClose}>Закрыть</button>
          <button className="msgr-btn-primary" onClick={() => setView("chat")}>Начать чат</button>
        </div>
      </div>

      {/* --- detail stacked chat drawer --- */}
      {(view === "chat" || view === "attach") && (
        <div
          className={`msgr-drawer stacked${view === "attach" ? " shoved" : ""}`}
          onClick={(e) => { e.stopPropagation(); if (view === "attach") setView("chat"); }}
        >
          <div className="msgr-chat-head">
            <span className="c-name">Яковлев Николай Никитич</span>
            <div className="c-pills">
              <span className="c-on">Онлайн</span>
              <button className="msgr-dots-btn" onClick={() => setChatMenu((v) => !v)}><IcDots /></button>
            </div>
            <button className="msgr-close-btn" onClick={() => setView("list")}><IcClose /></button>
            {chatMenu && (
              <div className="msgr-ctx" style={{ right: 26, top: 54 }}>
                <button onClick={() => { setChatMenu(false); setView("attach"); }}><IcMenuChat /> Вложения чата</button>
                <button onClick={() => setChatMenu(false)}><IcPin /> Закрепить</button>
                <button className="blue" onClick={() => setChatMenu(false)}><IcNote /> Сделать пометку</button>
              </div>
            )}
          </div>
          <div className="msgr-chat-body">
            <div className="msgr-bubble in">
              Вот ваша бронь. Сделал ее специально на 15 минут раньше, чтобы точно не опоздали.
              Не в обиду вашей пунктуальности, просто реально тяжело найти вход.
            </div>
            <div className="msgr-bubble out">
              Николай, кажется вы забыли приложить файл к сообщению
              <span className="b-meta">17:45 <IcCheckDouble /></span>
            </div>
            <div className="msgr-bubble in">
              Точно, наверное какая-то ошибка. Вот файлы
              <span className="b-meta">17:45</span>
            </div>
            <div className="msgr-bubble in file">
              <img className="file-icon" src="/img/Image (2).png" alt="doc" />
              <div>
                <div className="f-name">Варианты поездки из Москвы в Санкт-Пе...</div>
                <div className="f-sub">DOC · 16KB</div>
              </div>
            </div>
            <div className="msgr-bubble out">
              Спасибо! Можете пожалуйста также распечатать, во сколько обойдется путь до туда.
              И было бы круто всю отчетность сразу отправить боссу, он хочет лично посмотреть на цифры и графики.
              <span className="b-meta">17:45 <IcCheckDouble /></span>
            </div>
            <div className="msgr-bubble in">
              Провел расчеты. Путь до ресторана Twins Garden от вашего отеля с помощью нашего трансфера
              обойдется в 2 500 ₽. Отправил всю информацию Романову А.Л.
              <span className="b-meta">17:45</span>
            </div>
          </div>
          <div className="msgr-chat-input">
            <span className="plus"><IcPlus /></span>
            <input placeholder="Ваше сообщение" />
            <span className="send"><IcSendCircle /></span>
          </div>
        </div>
      )}

      {/* --- detail stacked attach drawer --- */}
      {view === "attach" && (
        <div className="msgr-drawer stacked" onClick={(e) => e.stopPropagation()}>
          <div className="msgr-head">
            <h1>Вложения</h1>
            <button onClick={() => setView("chat")}><IcClose /></button>
          </div>
          <div className="msgr-body" onClick={() => setAttMenu(null)}>
            <input className="msgr-search" placeholder="Поиск" />
            {[1, 2, 3].map((i) => (
              <div key={i} className="msgr-att-item">
                <img className="att-icon" src="/img/Image (2).png" alt="doc" />
                <div className="a-body">
                  <div className="a-name">Варианты поездки из Москвы в Санкт-Петербург</div>
                  <div className="a-sub">DOC · 16KB</div>
                </div>
                <button className="msgr-dots" onClick={(e) => { e.stopPropagation(); setAttMenu(attMenu === i ? null : i); }}>
                  <IcDots />
                </button>
                {attMenu === i && (
                  <div className="msgr-ctx" style={{ right: 10, top: 44 }} onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => { setAttMenu(null); setView("chat"); }}><img src="/img/ctx-view-chat.png" alt="" style={{width:20,height:20,objectFit:"contain"}} /> Показать в чате</button>
                    <button onClick={() => setAttMenu(null)}><img src="/img/ctx-download.png" alt="" style={{width:20,height:20,objectFit:"contain"}} /> Скачать файл</button>
                    <button className="red" onClick={() => setAttMenu(null)}><img src="/img/ctx-att-delete.png" alt="" style={{width:20,height:20,objectFit:"contain",filter:"invert(39%) sepia(95%) saturate(600%) hue-rotate(320deg) brightness(100%)"}} /> Удалить файл</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
