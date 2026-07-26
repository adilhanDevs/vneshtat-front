"use client";

import { useState } from "react";
import {
  IcClose, IcDots, IcPin, IcNote, IcMenuChat, IcDoc, IcDocSm, IcSendCircle,
  IcCheckDouble, IcPlus, IcDownload,
} from "./icons";

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
    <div className="acc-scrim" onClick={onClose}>
      <div className="acc-drawer" onClick={(e) => e.stopPropagation()}>
        {view === "list" && (
          <>
            <div className="acc-drawer-head">
              <h1>Мессенджер</h1>
              <button onClick={onClose}><IcClose /></button>
            </div>
            <div className="acc-drawer-body" onClick={() => setCtx(null)}>
              <input className="msg-search" placeholder="Поиск" />
              {CHATS.map((c) => (
                <div key={c.id} className="msg-item" onClick={() => setView("chat")}>
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
                      className="msg-dots"
                      onClick={(e) => { e.stopPropagation(); setCtx(ctx === c.id ? null : c.id); }}
                    >
                      <IcDots />
                    </button>
                    {c.pinned ? <IcPin /> : c.badge ? <span className="msg-badge">{c.badge}</span> : <span className="msg-time">{c.time}</span>}
                  </div>
                  {ctx === c.id && (
                    <div className="msg-ctx" style={{ right: 10, top: 44 }} onClick={(e) => e.stopPropagation()}>
                      <button onClick={() => { setCtx(null); setView("chat"); }}><IcMenuChat /> Открыть чат</button>
                      <button onClick={() => setCtx(null)}><IcPin color="#5a5c63" /> Закрепить</button>
                      <button className="blue" onClick={() => setCtx(null)}><IcNote /> Сделать пометку</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="acc-drawer-foot">
              <button className="acc-btn-ghost" onClick={onClose}>Закрыть</button>
              <button className="acc-btn-primary" onClick={() => setView("chat")}>Начать чат</button>
            </div>
          </>
        )}

        {view === "chat" && (
          <>
            <div className="chat-head">
              <span className="c-name">Яковлев Николай Никитич</span>
              <span className="c-on">Онлайн</span>
              <div className="c-actions">
                <button className="msg-dots" onClick={() => setChatMenu((v) => !v)}><IcDots /></button>
                <button className="acc-drawer-head" style={{ padding: 0, background: "none", border: "none", cursor: "pointer" }} onClick={() => setView("list")}><IcClose /></button>
              </div>
              {chatMenu && (
                <div className="msg-ctx" style={{ right: 26, top: 54 }}>
                  <button onClick={() => { setChatMenu(false); setView("attach"); }}><IcMenuChat /> Вложения чата</button>
                  <button onClick={() => setChatMenu(false)}><IcPin color="#5a5c63" /> Закрепить</button>
                  <button className="blue" onClick={() => setChatMenu(false)}><IcNote /> Сделать пометку</button>
                </div>
              )}
            </div>
            <div className="chat-body">
              <div className="bubble in">
                Вот ваша бронь. Сделал ее специально на 15 минут раньше, чтобы точно не опоздали.
                Не в обиду вашей пунктуальности, просто реально тяжело найти вход.
              </div>
              <div className="bubble out">
                Николай, кажется вы забыли приложить файл к сообщению
                <span className="b-meta">17:45 <IcCheckDouble /></span>
              </div>
              <div className="bubble in">
                Точно, наверное какая-то ошибка. Вот файлы
                <span className="b-meta">17:45</span>
              </div>
              <div className="bubble in file">
                <IcDocSm />
                <div>
                  <div className="f-name">Варианты поездки из Москвы в Санкт-Пе...</div>
                  <div className="f-sub">DOC · 16KB</div>
                </div>
              </div>
              <div className="bubble out">
                Спасибо! Можете пожалуйста также распечатать, во сколько обойдется путь до туда.
                И было бы круто всю отчетность сразу отправить боссу, он хочет лично посмотреть на цифры и графики.
                <span className="b-meta">17:45 <IcCheckDouble /></span>
              </div>
              <div className="bubble in">
                Провел расчеты. Путь до ресторана Twins Garden от вашего отеля с помощью нашего трансфера
                обойдется в 2 500 ₽. Отправил всю информацию Романову А.Л.
                <span className="b-meta">17:45</span>
              </div>
            </div>
            <div className="chat-input">
              <span className="plus"><IcPlus /></span>
              <input placeholder="Ваше сообщение" />
              <span className="send"><IcSendCircle /></span>
            </div>
          </>
        )}

        {view === "attach" && (
          <>
            <div className="acc-drawer-head">
              <h1>Вложения</h1>
              <button onClick={() => setView("chat")}><IcClose /></button>
            </div>
            <div className="acc-drawer-body" onClick={() => setAttMenu(null)}>
              <input className="msg-search" placeholder="Поиск" />
              {[1, 2, 3].map((i) => (
                <div key={i} className="att-item">
                  <IcDoc />
                  <div className="a-body">
                    <div className="a-name">Варианты поездки из Москвы в Санкт-Петербург</div>
                    <div className="a-sub">DOC · 16KB</div>
                  </div>
                  <button className="msg-dots" onClick={(e) => { e.stopPropagation(); setAttMenu(attMenu === i ? null : i); }}>
                    <IcDots />
                  </button>
                  {attMenu === i && (
                    <div className="msg-ctx" style={{ right: 10, top: 44 }} onClick={(e) => e.stopPropagation()}>
                      <button onClick={() => { setAttMenu(null); setView("chat"); }}><IcMenuChat /> Показать в чате</button>
                      <button onClick={() => setAttMenu(null)}><IcDownload /> Скачать файл</button>
                      <button className="red" onClick={() => setAttMenu(null)}><IcClose size={18} /> Удалить файл</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
