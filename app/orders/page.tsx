"use client";

import { useState } from "react";
import Header from "../Header";
import { useRouter } from "next/navigation";
import "../account/account.css";
import "./orders.css";
import "../dashboard/dashboard.css";
import Sidebar from "../account/Sidebar";
import Messenger from "../account/Messenger";
import {
  IcCard, IcDots, IcBubble, IcMenuChat, IcPlane, IcPlus, IcInfoCircle, IcDocMode,
} from "../account/icons";

const ORDERS = [
  {
    id: "o1", badge: "Сейчас", badgeCount: 2, future: false,
    title: "Питер, Самара - проверка объектов для обеспечения надежности беспроводного соединен...",
    cities: "Санкт-Петербург, Самара +3", dates: "30 июн - 30 июл",
    num: "4739", price: "888 570 ₽", people: "12 участников", services: "18 услуг",
  },
  {
    id: "o2", badge: "Сейчас", badgeCount: 0, future: false,
    title: "Питер, Самара - проверка объектов для обеспечения надежности беспроводного соединен...",
    cities: "Санкт-Петербург, Самара +3", dates: "30 июн - 30 июл",
    num: "4739", price: "888 570 ₽", people: "12 участников", services: "18 услуг",
  },
  {
    id: "o3", badge: "Через 14 дней", badgeCount: 0, future: true,
    title: "Питер, Самара - проверка объектов для обеспечения надежности беспроводного соединен...",
    cities: "Санкт-Петербург, Самара +3", dates: "30 июн - 30 июл",
    num: "4739", price: "888 570 ₽", people: "12 участников", services: "18 услуг",
  },
];

export default function Orders() {
  const router = useRouter();
  const [messenger, setMessenger] = useState(false);
  const [seg, setSeg] = useState<"active" | "archive">("active");
  const [ctx, setCtx] = useState<string | null>(null);
  const [ordMode, setOrdMode] = useState<"chat" | "docs" | "trip">("trip");

  const cycleOrdMode = () => {
    setOrdMode((prev) => {
      if (prev === "chat") return "docs";
      if (prev === "docs") return "trip";
      return "chat";
    });
  };

  return (
    <div className="ord-root">
      <Sidebar active="orders" />

      <main className="ord-page with-surface" onClick={() => setCtx(null)}>
        <Header onMessengerClick={() => setMessenger(true)} />

        <div className="ord-surface">
          <h1 className="ord-page-title">Заказы</h1>

          <div className="ord-search-row">
            <input className="ord-search" placeholder="Поиск заказов" />
            <div className="ord-seg">
              <button className={seg === "active" ? "on" : ""} onClick={() => setSeg("active")}>Активные</button>
              <button className={seg === "archive" ? "on" : ""} onClick={() => setSeg("archive")}>Архив</button>
            </div>
          </div>

          <div className="dash-orders">
            {ORDERS.map((order) => (
              <div key={order.id} className="dash-order">
                <div className="dash-order-badge">
                  <span className={`tag${order.future ? " future" : ""}`}>{order.badge}</span>
                  {order.badgeCount > 0 && <span className="count">{order.badgeCount}</span>}
                </div>

                <div className="dash-order-left">
                  <div className="dash-order-title">{order.title}</div>
                  <div className="dash-order-meta">
                    <span>{order.cities}</span>
                    <span>{order.dates}</span>
                  </div>
                </div>

                <div className="dash-order-stats">
                  <span className="num">Номер: {order.num}</span>
                  <span className="parts">{order.people}</span>
                  <span className="services">{order.services}</span>
                </div>

                <div className="dash-order-right">
                  <div className="dash-order-price">{order.price}</div>
                  <div className="dash-order-actions">
                    <button className="chat-btn" onClick={(e) => { e.stopPropagation(); router.push("/chat"); }}>Чат</button>
                    <button className="data-btn" onClick={(e) => { e.stopPropagation(); router.push("/order"); }}>Данные</button>
                  </div>
                </div>

                <button
                  className="dash-order-dots"
                  onClick={(e) => { e.stopPropagation(); setCtx(ctx === order.id ? null : order.id); }}
                >
                  <IcDots />
                </button>

                {ctx === order.id && (
                  <div className="msg-ctx" style={{ right: 16, top: 48 }} onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => { setCtx(null); router.push("/order"); }}>
                      <img src="/img/Внештат 2.0 (22)/Info.png" alt="" style={{ width: 18, height: 18, objectFit: "contain" }} /> О заказе
                    </button>
                    <button onClick={() => { setCtx(null); router.push("/order"); }}>
                      <img src="/img/Внештат 2.0 (22)/Orders.png" alt="" style={{ width: 18, height: 18, objectFit: "contain" }} /> Услуги
                    </button>
                    <button onClick={() => { setCtx(null); setMessenger(true); }}>
                      <img src="/img/Внештат 2.0 (22)/Attachments.png" alt="" style={{ width: 18, height: 18, objectFit: "contain" }} /> Вложения чата
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      <div className="ord-chatbar">
        <div className="inner">
          <button className="ord-round"><IcPlus /></button>
          <button
            className="ord-round active"
            onClick={cycleOrdMode}
          >
            {ordMode === "chat" && (
              <img src="/img/chat-mode.png" alt="" style={{ width: 18, height: 18, objectFit: "contain" }} />
            )}
            {ordMode === "docs" && <IcDocMode />}
            {ordMode === "trip" && <IcPlane />}
          </button>
          <input placeholder="Напишите свой запрос" />
          <button className="ord-send">
            <img src="/img/Send (1).png" alt="" style={{ width: 22, height: 22, objectFit: "contain" }} />
          </button>
        </div>
      </div>

      {messenger && <Messenger onClose={() => setMessenger(false)} />}
    </div>
  );
}
