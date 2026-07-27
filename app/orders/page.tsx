"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "../account/account.css";
import "./orders.css";
import Sidebar from "../account/Sidebar";
import Messenger from "../account/Messenger";
import {
  IcCard, IcDots, IcBubble, IcMenuChat, IcPlane, IcPlus, IcInfoCircle,
} from "../account/icons";

const ORDERS = [
  { id: "o1", tag: "now", count: 2, },
  { id: "o2", tag: "now", count: 0, },
  { id: "o3", tag: "later", count: 0, },
];

export default function Orders() {
  const router = useRouter();
  const [messenger, setMessenger] = useState(false);
  const [seg, setSeg] = useState<"active" | "archive">("active");
  const [ctx, setCtx] = useState<string | null>(null);

  return (
    <div className="acc">
      <Sidebar active="orders" />

      <main className="acc-main" onClick={() => setCtx(null)}>
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

        <h1 className="acc-title">Заказы</h1>

        <div className="ord-search-row">
          <input className="ord-search" placeholder="Поиск заказов" />
          <div className="ord-seg">
            <button className={seg === "active" ? "on" : ""} onClick={() => setSeg("active")}>Активные</button>
            <button className={seg === "archive" ? "on" : ""} onClick={() => setSeg("archive")}>Архив</button>
          </div>
        </div>

        <div className="ord-list">
          {ORDERS.map((o) => (
            <div key={o.id} className="ord-item px-14">
              <div className="ord-badges">
                <span className={`ord-tag rounded-full ${o.tag}`}>{o.tag === "now" ? "Сейчас" : "Через 14 дней"}</span>
                {o.count > 0 && <span className="ord-count rounded-full">{o.count}</span>}
              </div>
              <div className="ord-card">
                <div className="ord-main">
                  <div className="ord-title">Питер, Самара - проверка объектов для обеспечения надежности беспроводного соединен...</div>
                  <div className="ord-sub">
                    <span>Санкт-Петербург, Самара +3</span>
                    <span>30 июн - 30 июл</span>
                  </div>
                </div>
                <div className="ord-meta">
                  <div>Номер: 4739</div>
                  <div>12 участников</div>
                  <div>18 услуг</div>
                </div>
                <div className="ord-right">
                  <div className="ord-price-row">
                    <div className="ord-price">888 570 ₽</div>
                    <button className="ord-dots" onClick={(e) => { e.stopPropagation(); setCtx(ctx === o.id ? null : o.id); }}><IcDots /></button>
                  </div>
                  <div className="ord-actions">
                    <button className="ord-chat" onClick={() => setMessenger(true)}>Чат</button>
                    <button className="ord-data" onClick={() => router.push("/order")}>Данные</button>
                  </div>
                </div>
                {ctx === o.id && (
                  <div className="msg-ctx" style={{ right: 16, top: 48 }} onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => { setCtx(null); router.push("/order"); }}><IcInfoCircle /> О заказе</button>
                    <button onClick={() => { setCtx(null); router.push("/order"); }}><IcPlane /> Услуги</button>
                    <button onClick={() => { setCtx(null); setMessenger(true); }}><IcMenuChat /> Вложения чата</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      <div className="ord-chatbar">
        <div className="inner">
          <button className="ord-round"><IcPlus /></button>
          <button className="ord-round"><IcPlane /></button>
          <input placeholder="Напишите свой запрос" />
          <button className="ord-send">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#9aa0a8"><path d="m4 11.5 15-6.5-4 15-3.5-6.5L4 11.5Z" /></svg>
          </button>
        </div>
      </div>

      {messenger && <Messenger onClose={() => setMessenger(false)} />}
    </div>
  );
}
