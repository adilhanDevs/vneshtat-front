"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Header from "../Header";
import "../account/account.css";
import "./dashboard.css";
import Sidebar from "../account/Sidebar";
import Messenger from "../account/Messenger";
import {
  IcCard, IcDots, IcBubble, IcClose, IcWidgets as IcWidgetsNav,
  IcCalHeader, IcRadar, IcPlus, IcSparkle, IcInfoCircle, IcPlane, IcMenuChat, IcDocMode,
} from "../account/icons";

/* ====================== ICON COMPONENTS ====================== */

const IcWalletDash = () => (
  <img src="/img/balance.png" alt="" width={32} height={26} style={{ display: "block" }} />
);

const IcPeopleWidget = () => (
  <svg width="36" height="30" viewBox="0 0 36 30" fill="none">
    <circle cx="12" cy="9" r="5.5" fill="#8c8e95" />
    <circle cx="25" cy="11" r="4" fill="#bcbec3" />
    <path d="M2 28c0-6 4.5-9 10-9s10 3 10 9H2Z" fill="#8c8e95" />
    <path d="M24 19c4.5.2 9 3 9 9h-8" fill="#bcbec3" />
  </svg>
);

const IcWidgetGrid = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="10" cy="10" r="5" fill="#8b5cf6" />
    <circle cx="22" cy="10" r="5" fill="#8b5cf6" />
    <circle cx="16" cy="21" r="5" fill="#8b5cf6" />
  </svg>
);

const IcSettingsGear = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#5a5c63" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="10" cy="10" r="3" />
    <path d="M10 2v2M10 16v2M3 10h2M15 10h2M4.9 4.9l1.4 1.4M13.7 13.7l1.4 1.4M4.9 15.1l1.4-1.4M13.7 6.3l1.4-1.4" />
  </svg>
);

const IcOpenWidget = () => (
  <img src="/img/ctx-widget-open.png" alt="" style={{ width: 20, height: 20, objectFit: "contain" }} />
);

const IcDisconnect = () => (
  <img src="/img/ctx-widget-off.png" alt="" style={{ width: 20, height: 20, objectFit: "contain" }} />
);

const IcGoTo = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#5a5c63" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="10" cy="10" r="7.5" />
    <path d="M10 6.5V10l2.5 1.5" />
  </svg>
);

const IcCheckCircleFilled = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <circle cx="18" cy="18" r="18" fill="#1e88fa" />
    <path d="m11 18 4.5 4.5L25 13" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IcSendDash = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="m5 12 14-6-3.5 13-3-5.5L5 12Z" fill="#fff" />
  </svg>
);

const IcCalEmoji = () => <img src="/img/Calendar.png" alt="" width={18} height={18} style={{ display: "inline-block" }} />;
const IcRadarEmoji = () => <img src="/img/Radar.png" alt="" width={18} height={18} style={{ display: "inline-block" }} />;

/* ====================== TYPES ====================== */

type WidgetType = "finance" | "employees" | "calendar" | "radar";
type ContextMenu = null | { type: "widget"; widget: string; x: number; y: number }
  | { type: "settings-item"; widget: string };

interface WidgetConfig {
  id: WidgetType;
  name: string;
  desc: string;
  icon: React.ReactNode;
  enabled: boolean;
}

const ORDERS = [
  {
    id: 1, badge: "Сейчас", badgeCount: 2, future: false,
    title: "Питер, Самара - проверка объектов для обеспечения надежности беспроводного соединен...",
    cities: "Санкт-Петербург, Самара + 3", dates: "30 июн - 30 июл",
    num: "4739", price: "888 570 ₽", people: "12 участников", services: "18 услуг",
  },
  {
    id: 2, badge: "Сейчас", badgeCount: 0, future: false,
    title: "Питер, Самара - проверка объектов для обеспечения надежности беспроводного соединен...",
    cities: "Санкт-Петербург, Самара + 3", dates: "30 июн - 30 июл",
    num: "4739", price: "888 570 ₽", people: "12 участников", services: "18 услуг",
  },
  {
    id: 3, badge: "Через 14 дней", badgeCount: 0, future: true,
    title: "Питер, Самара - проверка объектов для обеспечения надежности беспроводного соединен...",
    cities: "Санкт-Петербург, Самара + 3", dates: "30 июн - 30 июл",
    num: "4739", price: "888 570 ₽", people: "12 участников", services: "18 услуг",
  },
];

/* ====================== MAIN COMPONENT ====================== */

export default function Dashboard() {
  const router = useRouter();
  const [messenger, setMessenger] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [ctxMenu, setCtxMenu] = useState<ContextMenu>(null);
  const [ctx, setCtx] = useState<number | null>(null);
  const [settingsCtx, setSettingsCtx] = useState<string | null>(null);

  // Widget configuration
  const [widgets, setWidgets] = useState<WidgetConfig[]>([
    { id: "finance", name: "Финансы", desc: "Ваш текущий баланс", icon: null, enabled: true },
    { id: "employees", name: "Сотрудники", desc: "Какие сотрудники сейчас в поездках", icon: null, enabled: false },
    { id: "calendar", name: "Календарь", desc: "Ваши поездки на текущую неделю", icon: <IcCalEmoji />, enabled: false },
    { id: "radar", name: "Радар", desc: "Первыми выхватим появившийся билет", icon: <IcRadarEmoji />, enabled: false },
  ]);

  // Finance widget state
  const [financeVariant, setFinanceVariant] = useState<"normal" | "debt">("normal");
  const [dashInput, setDashInput] = useState("");
  const [dashMode, setDashMode] = useState<"chat" | "docs" | "trip">("trip");

  const cycleDashMode = () => {
    setDashMode((prev) => {
      if (prev === "chat") return "docs";
      if (prev === "docs") return "trip";
      return "chat";
    });
  };

  // Radar timer
  const [radarTime, setRadarTime] = useState(13534); // 03:45:34 in seconds
  // Full search window; the dark bar shows the remaining share of it.
  const RADAR_TOTAL = 16800;
  const radarProgress = Math.min(100, Math.round((radarTime / RADAR_TOTAL) * 100));

  useEffect(() => {
    const interval = setInterval(() => {
      setRadarTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = useCallback((seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  }, []);

  const enabledWidgets = widgets.filter((w) => w.enabled);
  const hasFinance = widgets.find((w) => w.id === "finance")?.enabled;
  const hasCalendar = widgets.find((w) => w.id === "calendar")?.enabled;
  const hasRadar = widgets.find((w) => w.id === "radar")?.enabled;
  const hasEmployees = widgets.find((w) => w.id === "employees")?.enabled;

  const sideWidgets = enabledWidgets.filter((w) => w.id !== "finance");
  const showAddWidget = sideWidgets.length === 0;
  // With 2 side widgets (3 total), finance becomes an equal-width compact card
  // without the person illustration — matches the design's 3-widget layout.
  const financeCompact = sideWidgets.length >= 2;

  const MAX_WIDGETS = 3;
  const atWidgetLimit = enabledWidgets.length >= MAX_WIDGETS;

  const toggleWidget = (id: WidgetType) => {
    setWidgets((prev) => {
      const target = prev.find((w) => w.id === id);
      // Prevent enabling a new widget once the max is reached.
      if (target && !target.enabled &&
          prev.filter((w) => w.enabled).length >= MAX_WIDGETS) {
        return prev;
      }
      return prev.map((w) => (w.id === id ? { ...w, enabled: !w.enabled } : w));
    });
  };

  const closeCtx = () => {
    setCtxMenu(null);
    setSettingsCtx(null);
    setCtx(null);
  };

  return (
    <div className="dash-root" onClick={closeCtx}>
      <Sidebar active="desk" />

      <main className="dash-main with-surface">
        {/* Top bar */}
        <Header onMessengerClick={() => setMessenger(true)} />

        <div className="dash-surface">
          {/* Greeting */}
        <h1 className="dash-greeting">Добрый день!</h1>

        {/* Widget row */}
        <div className="dash-widgets">
          {/* Finance widget (always first if enabled) */}
          {hasFinance && (
            <div className={`dash-widget finance${financeCompact ? " compact" : ""}`}>
              <div className="dash-fin-header"><IcWalletDash /></div>
              <button
                className="dash-fin-dots"
                onClick={(e) => {
                  e.stopPropagation();
                  setCtxMenu({ type: "widget", widget: "finance", x: 0, y: 0 });
                }}
              >
                <IcDots />
              </button>
              {ctxMenu?.type === "widget" && ctxMenu.widget === "finance" && (
                <div className="dash-ctx-menu" style={{ top: 50, right: 20 }} onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => { setSettingsOpen(true); closeCtx(); }}>
                    <IcSettingsGear /> Настроить рабочий стол
                  </button>
                  <button onClick={closeCtx}>
                    <IcOpenWidget /> Открыть виджет
                  </button>
                </div>
              )}

              {financeVariant === "normal" ? (
                <>
                  <div className="dash-fin-amount">490 000 ₽</div>
                  <div className="dash-fin-sub">Неоплаченные счета<br />отсутствуют</div>
                </>
              ) : (
                <>
                  <div className="dash-fin-amount">90 000 ₽</div>
                  <div className="dash-fin-debt">Долг 10 000 ₽</div>
                  <div className="dash-fin-deadline">до 21.05.2025</div>
                </>
              )}

              <div className="dash-fin-btns">
                <button className="primary">Пополнить</button>
                <button className="secondary">Подробнее</button>
              </div>

              {!financeCompact && (
                <img className="dash-fin-person" src="/img/dashboard-person.png" alt="" />
              )}
            </div>
          )}

          {/* Side widgets */}
          {showAddWidget ? (
            <div className="dash-widget side-widget dash-add-widget">
              <div className="dash-add-icon"><img src="/img/Widget small.png" alt="" width={32} height={32} /></div>
              <div className="dash-add-text">
                <div className="dash-add-title">Добавьте<br />виджеты</div>
                <div className="dash-add-sub">на рабочий стол</div>
              </div>
              <button className="dash-add-btn" onClick={() => setSettingsOpen(true)}>Добавить</button>
            </div>
          ) : (
            sideWidgets.map((widget) => {
              if (widget.id === "calendar") {
                return (
                  <div key="calendar" className="dash-widget side-widget">
                    <img className="dash-cal-decor" src="/img/calendar-decor.png" alt="" aria-hidden="true" />
                    <div className="dash-cal-header">
                      <img src="/img/Calendar.png" alt="" width={30} height={30} />
                      <span className="title">Календарь</span>
                    </div>
                    <button
                      className="dash-cal-dots"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCtxMenu({ type: "widget", widget: "calendar", x: 0, y: 0 });
                      }}
                    >
                      <IcDots />
                    </button>
                    {ctxMenu?.type === "widget" && ctxMenu.widget === "calendar" && (
                      <div className="dash-ctx-menu" style={{ top: 50, right: 20 }} onClick={(e) => e.stopPropagation()}>
                        <button onClick={closeCtx}><IcOpenWidget /> Открыть виджет</button>
                        <button onClick={() => { setSettingsOpen(true); closeCtx(); }}><IcSettingsGear /> Настроить рабочий стол</button>
                      </div>
                    )}
                    <div className="dash-cal-days">
                      {[3, 4, 5, 6, 7, 8, 9].map((d) => (
                        <span key={d} className={`dash-cal-day${d === 4 ? " active" : ""}`}>{d}</span>
                      ))}
                    </div>
                    <div
                      className="dash-cal-msg"
                      style={{ backdropFilter: "blur(15px)", WebkitBackdropFilter: "blur(15px)" }}
                    >
                      <b>На этой неделе поездок нет</b>
                      <span>Все сотрудники на своих местах</span>
                    </div>
                    <button className="dash-cal-action">Организовать</button>
                  </div>
                );
              }
              

              if (widget.id === "radar") {
                return (
                  <div key="radar" className="dash-widget side-widget">
                    <div className="dash-radar-header">
                      <img src="/img/Radar.png" alt="" width={28} height={28} />
                      <span className="title">Радар</span>
                    </div>
                    <button
                      className="dash-radar-dots"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCtxMenu({ type: "widget", widget: "radar", x: 0, y: 0 });
                      }}
                    >
                      <IcDots />
                    </button>
                    {ctxMenu?.type === "widget" && ctxMenu.widget === "radar" && (
                      <div className="dash-ctx-menu" style={{ top: 50, right: 20 }} onClick={(e) => e.stopPropagation()}>
                        <button onClick={closeCtx}><IcOpenWidget /> Открыть виджет</button>
                        <button onClick={() => { setSettingsOpen(true); closeCtx(); }}><IcSettingsGear /> Настроить рабочий стол</button>
                      </div>
                    )}
                    <div className="dash-radar-route">
                      <b>Москва – Санкт-Петербург</b>
                      <span>21 августа, 2 билета, эконом</span>
                    </div>
                    <div className="dash-radar-timer">
                      <div
                        className="dash-radar-progress"
                        style={{ width: `${radarProgress}%` }}
                      />
                      <div className="dash-radar-timer-content">
                        <b>Осталось {formatTime(radarTime)}</b>
                        <span>продолжается поиск...</span>
                      </div>
                    </div>
                  </div>
                );
              }

              if (widget.id === "employees") {
                return (
                  <div key="employees" className="dash-widget side-widget">
                    <div className="dash-emp-icon"><IcPeopleWidget /></div>
                    <button
                      className="dash-fin-dots"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCtxMenu({ type: "widget", widget: "employees", x: 0, y: 0 });
                      }}
                    >
                      <IcDots />
                    </button>
                    {ctxMenu?.type === "widget" && ctxMenu.widget === "employees" && (
                      <div className="dash-ctx-menu" style={{ top: 50, right: 20 }} onClick={(e) => e.stopPropagation()}>
                        <button onClick={closeCtx}><IcOpenWidget /> Открыть виджет</button>
                        <button onClick={() => { setSettingsOpen(true); closeCtx(); }}><IcSettingsGear /> Настроить рабочий стол</button>
                      </div>
                    )}
                    <div className="dash-emp-count">60 сотрудников</div>
                    <div className="dash-emp-sub">Сейчас находятся<br />в поездках</div>
                    <button className="dash-emp-action">Подробнее</button>
                  </div>
                );
              }

              return null;
            })
          )}
        </div>

        {/* Order cards */}
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

          {/* AI input bar */}
          <div className="dash-ai-bar">
            <div className="dash-ai-left">
              <button className="dash-ai-plus"><IcPlus /></button>
              <button
                className="dash-ai-sparkle active"
                onClick={cycleDashMode}
                title={dashMode === "chat" ? "Режим ИИ" : dashMode === "docs" ? "Режим документов" : "Режим поездки"}
              >
                <span key={dashMode} className="mode-ico">
                  {dashMode === "chat" && (
                    <img src="/img/chat-mode.png" alt="" style={{ width: 18, height: 18, objectFit: "contain" }} />
                  )}
                  {dashMode === "docs" && <IcDocMode />}
                  {dashMode === "trip" && <IcPlane />}
                </span>
              </button>
            </div>
            <input
              placeholder="Напишите свой запрос"
              value={dashInput}
              onChange={(e) => setDashInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && dashInput.trim()) {
                  router.push("/chat");
                }
              }}
            />
            <button
              className={`dash-ai-send ${dashInput.trim() ? "active" : ""}`}
              disabled={!dashInput.trim()}
              onClick={() => {
                if (dashInput.trim()) router.push("/chat");
              }}
            >
              <img src="/img/Send (1).png" alt="" style={{ width: 22, height: 22, objectFit: "contain" }} />
            </button>
          </div>
        </div>
      </main>

      {/* Messenger */}
      {messenger && <Messenger onClose={() => setMessenger(false)} />}

      {/* Widget settings panel */}
      {settingsOpen && (
        <div
          className="dash-scrim"
          onClick={() => { setSettingsOpen(false); setSettingsCtx(null); }}
        >
          <div
            className="dash-settings-panel"
            onClick={(e) => {
              e.stopPropagation();
              setSettingsCtx(null);
            }}
          >
            <div className="dash-settings-head" style={{ position: "relative" }}>
              <div className="breadcrumb">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="#8a8c93" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8.5 10 3l7 5.5V16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8.5Z" />
                  <path d="M8 17v-5h4v5" />
                </svg>
                <span>Рабочий стол</span>
              </div>
              <button
                className="close-btn"
                onClick={() => { setSettingsOpen(false); setSettingsCtx(null); }}
              >
                <IcClose />
              </button>
              <h2 className="dash-settings-title">Настройка виджетов</h2>
            </div>

            <div className="dash-settings-body">
              {widgets.map((w) => {
                const locked = !w.enabled && atWidgetLimit;
                return (
                <div key={w.id} className={`dash-widget-item${locked ? " locked" : ""}`}>
                  <div
                    className={`dash-widget-check${w.enabled ? " checked" : ""}`}
                    onClick={() => toggleWidget(w.id)}
                  >
                    {w.enabled && (
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="m4 9 3.5 3.5L14 5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <div className="dash-widget-info" onClick={() => toggleWidget(w.id)}>
                    <div className="name">
                      {w.name}
                      {w.icon}
                    </div>
                    <div className="desc">{w.desc}</div>
                  </div>
                  <button
                    className="dash-widget-dots"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSettingsCtx(settingsCtx === w.id ? null : w.id);
                    }}
                  >
                    <IcDots />
                  </button>
                  {settingsCtx === w.id && (
                    <div className="dash-widget-ctx" onClick={(e) => e.stopPropagation()}>
                      {w.id === "finance" ? (
                        <button onClick={() => setSettingsCtx(null)}>
                          <IcGoTo /> Перейти к разделу
                        </button>
                      ) : (
                        <>
                          <button onClick={() => setSettingsCtx(null)}>
                            <IcOpenWidget /> Открыть виджет
                          </button>
                          <button className="red" onClick={() => { toggleWidget(w.id); setSettingsCtx(null); }}>
                            <IcDisconnect /> Отключить виджет
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
                );
              })}
              <button className="dash-connect-btn" onClick={() => {}}>
                Подключить виджет
              </button>
            </div>

            <div className="dash-settings-foot">
              <button className="cancel" onClick={() => { setSettingsOpen(false); setSettingsCtx(null); }}>Отмена</button>
              <button className="save" onClick={() => { setSettingsOpen(false); setSettingsCtx(null); }}>Сохранить</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
