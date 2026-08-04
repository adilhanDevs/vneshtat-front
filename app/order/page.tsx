"use client";

import { useState } from "react";
import Header from "../Header";
import { useRouter } from "next/navigation";
import "../account/account.css";
import "../orders/orders.css";
import Sidebar from "../account/Sidebar";
import Messenger from "../account/Messenger";
import Advance from "./Advance";
import {
  IcCard, IcDots, IcClock, IcBack, IcOrderCard, IcWalletCard, IcReport, IcWidgetsBig,
  IcPlane, IcBellSm, IcChatBubbles, IcClose, IcChevron, IcCalSmall, IcCopy,
  IcLockField, IcMenuChat, IcInfoCircle, IcNote,
} from "../account/icons";

type Modal = null | "tripdata" | "order-cmd";
type Drawer = null | "participants" | "participant" | "invoices";

export default function Order() {
  const router = useRouter();
  const [seg, setSeg] = useState<"info" | "services">("info");
  const [modal, setModal] = useState<Modal>(null);
  const [drawer, setDrawer] = useState<Drawer>(null);
  const [invoiceMenu, setInvoiceMenu] = useState<number | null>(3);
  const [messenger, setMessenger] = useState(false);
  const [advance, setAdvance] = useState(false);
  const [dd, setDd] = useState(false);
  const [ctx, setCtx] = useState<string | null>(null);
  const closeAll = () => { setModal(null); setDrawer(null); };

  return (
    <div className="acc">
      <Sidebar active="orders" />

      <main className="acc-main with-surface" style={{ position: "relative" }}>
        <Header onMessengerClick={() => setMessenger(true)} />

        <div className="acc-surface">
          <button className="acc-backbtn" onClick={() => router.push("/orders")}><IcBack /></button>
          {seg === "info" ? (
            <>
              <div className="order-header-wrap">
                <h1 className="order-title">Заказ</h1>
              </div>

              <div className="order-row">
                {/* cost */}
                <div className="acc-card order-cost" style={{ borderRadius: 28, boxShadow: "0px 0.886045px 7.26557px rgba(0, 0, 0, 0.08)" }}>
                  <div className="oc-icon"><IcWalletCard /></div>
                  <div className="oc-amount">8 385 388 ₽</div>
                  <div className="oc-label">Стоимость услуг в заказе</div>
                  <div className="oc-actions">
                    <div className="order-timer" style={{ background: "#f8f9fb", border: "1px solid #e8eaee", width: "45%", minWidth: 0, height: 86, borderRadius: 20, display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "left", paddingLeft: 16 }}>
                      <b style={{ color: "#b3b5bb", fontSize: 16 }}>35:44</b>
                      <span style={{ color: "#a9abb1", fontSize: 12, lineHeight: 1.2, marginTop: 4 }}>Услуги <br /> забронированы</span>
                    </div> 
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "stretch", justifyContent: "space-between", height: 86 }}>
                      <span className="oc-see" onClick={() => setDrawer("invoices")} style={{ display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #e5e7ea", height: 40, borderRadius: 13, fontSize: 14, fontWeight: 500, color: "#6d6f77", cursor: "pointer" }}>Смотреть счета</span>
                      <button className="oc-pay" style={{ margin: 0, width: "100%", height: 40, borderRadius: 13, background: "var(--blue)", color: "#fff", border: "none", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>Оплатить</button>
                    </div>
                  </div>
                </div>

                {/* stats */}
                <div className="acc-card order-stats" style={{ borderRadius: 28, boxShadow: "0px 0.886045px 7.26557px rgba(0, 0, 0, 0.08)" }}>
                  <div className="oc-icon"><IcOrderCard /></div>
                  <img className="os-bag" src="/img/backpack-corner.png" alt="" />
                  <div className="os-box" style={{ border: "1px solid #e5e7ea", borderRadius: 20, padding: "14px 18px", display: "flex", gap: 12 }}>
                    <div className="st"><b>1</b><span>страна</span></div>
                    <div className="st"><b>3</b><span>города</span></div>
                    <div className="st"><b>18</b><span>услуг</span></div>
                    <div className="st"><b>24</b><span>участника</span></div>
                  </div>
                  <div style={{ display: "flex", gap: 12, marginTop: "auto" }}>
                    <button style={{ flex: 1, border: "1px solid #e5e7ea", borderRadius: 16, color: "#6d6f77", height: 44, background: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: 500 }} onClick={() => setModal("tripdata")}>Данные заказа</button>
                    <button style={{ flex: 1, border: "1px solid #e5e7ea", borderRadius: 16, color: "#6d6f77", height: 44, background: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: 500 }} onClick={() => setDrawer("participants")}>Участники</button>
                  </div>
                </div>
              </div>

              {/* actions */}
              <div className="acc-card order-actions">
                <div className="oa-left">
                  <h2>Действия</h2>
                  <p>Управление вашим аккаунтом</p>
                </div>
                <div className="oa-grid">
                  <div className="order-optcard" onClick={() => setAdvance(true)}>
                    <img src='/img/avance.png' width={33} height={36} alt="Авансовый отчет" className="oo-icon" />
                    <span className="oo-label">Авансовый<br/>отчет</span>
                  </div>
                  <div className="order-optcard">
                    <img src='/img/widget.png' width={31} height={31} alt="Виджеты" className="oo-icon" />
                    <span className="oo-label">Виджеты</span>
                  </div>
                  <div className="order-optcard" onClick={() => setMessenger(true)}>
                    <img src='/img/chat.png' width={46} height={31} alt="Открыть чат" className="oo-icon" />
                    <span className="oo-label">Открыть чат</span>
                  </div>
                </div>
              </div>

              <div className="order-seg">
                <button className="on" onClick={() => setSeg("info")}>Информация</button>
                <button className="" onClick={() => setSeg("services")}>Услуги</button>
              </div>
            </>
          ) : (
            <div className="svc-container" style={{ paddingBottom: 60 }}>
              <div className="svc-header" style={{ position: "relative" }}>
                <h1 className="svc-title" >Услуги</h1>
                <button className="svc-btn-pill">3 услуги</button>
              </div>

              <div className="svc-filters">
                <div className="svc-seg">
                  <button className="on">Все траты</button>
                  <button>Только услуги</button>
                </div>
                <button className="svc-filter-pill active">
                  <span className="sf-close">✕</span>
                  Хронологически
                </button>
                <button className="svc-filter-pill">Требующие оформления</button>
              </div>

              <div className="svc-date-head">11 марта, четверг</div>

              <div className="svc-card">
                <div className="svc-card-left">
                  <div className="svc-col">
                    <div className="svc-time-block">
                      <div className="svc-time-col">
                        <div className="svc-time">08:35</div>
                        <div className="svc-time-sub">DME</div>
                      </div>
                      <div className="svc-time-line"></div>
                      <div className="svc-time-col">
                        <div className="svc-time">10:05</div>
                        <div className="svc-time-sub" style={{ textAlign: "right" }}>LED</div>
                      </div>
                    </div>
                    <div className="svc-info-title">
                      <span style={{ color: "#1e88fa", display: "flex", transform: "scale(1.2)", transformOrigin: "left center" }}><IcPlane /></span> 
                      Перелет: Санкт-Петербург - Москва
                    </div>
                  </div>
                  <div className="svc-info-block">
                    <div className="svc-info-meta">
                      <span>В пути: 4ч 50мин</span>
                      <span>Рейс: DP 2550</span>
                    </div>
                    <span className="svc-info-link">Подробнее</span>
                  </div>
                </div>
                <div className="svc-card-right">
                  <div className="svc-price">8 570 ₽</div>
                  <div className="svc-actions">
                    <button className="svc-status-btn">Оформлен</button>
                    <button className="svc-more-btn">...</button>
                  </div>
                </div>
              </div>

              <div className="svc-card">
                <div className="svc-card-left">
                  <div className="svc-col">
                    <div className="svc-info-title" style={{ fontSize: 20, fontWeight: 700, color: "#17181c" }}>Аэроэкспресс</div>
                    <div className="svc-info-sub" style={{ marginTop: -6 }}>Поезд, туда-обратно</div>
                  </div>
                  <div className="svc-info-block">
                    <div className="svc-info-meta">
                      <span>В пути: 45 мин</span>
                      <span>Класс: Стандартный</span>
                    </div>
                    <span className="svc-info-link">Подробнее</span>
                  </div>
                </div>
                <div className="svc-card-right">
                  <div className="svc-price">550 ₽</div>
                  <div className="svc-actions">
                    <button className="svc-status-btn">Оформлен</button>
                    <button className="svc-more-btn">...</button>
                  </div>
                </div>
              </div>

              <div className="svc-card">
                <div className="svc-card-left">
                  <div className="svc-col" style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
                    <img src="/img/hotel-room.jpg" className="svc-thumb" alt="Hotel" style={{ backgroundColor: "#eef0f3", flexShrink: 0 }} />
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <div>
                        <div className="svc-info-title" style={{ fontSize: 16, fontWeight: 700, color: "#17181c" }}>Заезд 11 марта, чт</div>
                        <div className="svc-info-sub" style={{ marginTop: 2 }}>с 15:00</div>
                      </div>
                      <div>
                        <div className="svc-info-title" style={{ fontSize: 16, fontWeight: 700, color: "#17181c" }}>Выезд 15 марта, вт</div>
                        <div className="svc-info-sub" style={{ marginTop: 2 }}>до 12:00</div>
                      </div>
                    </div>
                  </div>
                  <div className="svc-info-block">
                    <div className="svc-info-meta">
                      <span>Отель: Pentahotel</span>
                      <span>Moscow Arbat</span>
                    </div>
                    <span className="svc-info-link">Подробнее</span>
                  </div>
                </div>
                <div className="svc-card-right">
                  <div className="svc-price">19 570 ₽</div>
                  <div className="svc-actions">
                    <button className="svc-status-btn">Оформлен</button>
                    <button className="svc-more-btn">...</button>
                  </div>
                </div>
              </div>

              <div className="order-seg">
                <button className="" onClick={() => setSeg("info")}>Информация</button>
                <button className="on" onClick={() => setSeg("services")}>Услуги</button>
              </div>
            </div>
          )}

          <div className="order-notes">
              <div className="order-note">
                <span className="n-ico" style={{ background: "#eaf1fe" }}><IcPlane /></span>
                <div style={{ flex: 1 }}>
                  <div className="n-top"><span className="n-title">Уведомление</span><span className="n-time">4 минуты</span></div>
                  <div className="n-text">Поездка в Москву (Август 2025)</div>
                  <div className="n-title" style={{ marginTop: 2 }}>На посадку назначен выход А8</div>
                </div>
              </div>
              <div className="order-note">
                <span className="n-ico"><img src="/img/avatar.png" alt="" /></span>
                <div style={{ flex: 1 }}>
                  <div className="n-top"><span className="n-title">Новое сообщение</span><span className="n-time">34 минуты</span></div>
                  <div className="n-text">Елена Романова</div>
                  <div className="n-title" style={{ marginTop: 2 }}>Иван, подскажите, что делать с билетами н...</div>
                </div>
              </div>
              <div className="order-note">
                <span className="n-ico"><IcBellSm /></span>
                <div style={{ flex: 1 }}>
                  <div className="n-top"><span className="n-title">Системное уведомление</span><span className="n-time">34 минуты</span></div>
                  <div className="n-text">Изменения в пользовательском соглашении</div>
                </div>
              </div>
            </div>
        </div>
      </main>

      {messenger && <Messenger onClose={() => setMessenger(false)} />}
      {advance && <Advance onClose={() => setAdvance(false)} />}

      {/* ===== Данные поездки drawer ===== */}
      {modal === "tripdata" && (
        <div className="acc-drawer-backdrop" onClick={closeAll}>
          <div className="acc-drawer" style={{ width: 600, padding: 30, borderRadius: "36px 0 0 36px" }} onClick={(e) => e.stopPropagation()}>
            <div className="acc-drawer-head" style={{ marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "none", padding: 0 }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, margin: 0, color: "#17181c" }}>Данные поездки</h2>
              <button className="m-close" onClick={closeAll} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><IcClose /></button>
            </div>
            <div className="acc-drawer-body" style={{ padding: 0, flex: 1, overflowY: "auto" }}>
              <p className="emp-desc" style={{ marginBottom: 18 }}>Укажите информацию о поездке. С ее помощью можно будет сделать аналитику точнее и детальнее.</p>
              <TF label="Компания" value="Альфа" lock />
              <TF label="Контактное лицо" value="Вознесенский Иван Сергеевич" chevron onClick={() => setDd((v) => !v)} />
              {dd && (
                <div className="trip-dd">
                  <button className="hl">Значение 1</button>
                  <button>Значение 1</button>
                  <button>Значение 1</button>
                  <button className="new">Новое значение</button>
                </div>
              )}
              <TF label="Название поездки" value="Питер, Москва - проверка объектов для обеспечения надежности соединения между участками сети" />
              <TF label="ID поездки" value="#8098" copy />
              <div className="acc-sec-h">Центры затрат</div>
              <div style={{ height: 10 }} />
              <TF label="Центр затрат (тип: список)" value="Значение 1" chevron />
              <TF label="Центр затрат (тип: строка)" value="" ph />
            </div>
            <div className="acc-drawer-foot" style={{ padding: "20px 0 0", borderTop: "none", display: "flex", gap: 14 }}>
              <button className="acc-btn-ghost" style={{ flex: 1 }} onClick={closeAll}>Отмена</button>
              <button className="acc-btn-primary" style={{ flex: 1 }} onClick={closeAll}>Сохранить</button>
            </div>
          </div>
        </div>
      )}

      {/* ===== Приказ на командировку drawer ===== */}
      {modal === "order-cmd" && (
        <div className="acc-drawer-backdrop" onClick={closeAll}>
          <div className="acc-drawer" style={{ width: 600, padding: 30, borderRadius: "36px 0 0 36px" }} onClick={(e) => e.stopPropagation()}>
            <div className="acc-drawer-head" style={{ marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "none", padding: 0 }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, margin: 0, color: "#17181c" }}>Приказ на командировку</h2>
              <button className="m-close" onClick={closeAll} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><IcClose /></button>
            </div>
            <div className="acc-drawer-body" style={{ padding: 0, flex: 1, overflowY: "auto" }}>
              <p className="emp-desc" style={{ marginBottom: 18 }}>Город, цель и даты командировки указаны исходя из данных о поездке. При необходимости, можете изменить их.</p>
              <TF label="Города поездки" value="Санкт-Петербург, Москва" />
              <TF label="Цель поездки" value="Питер, Москва - проверка объектов для обеспечения надежности соединения между участками сети" />
              <div className="acc-grid2">
                <TF label="Дата с" value="11 марта, чт" cal />
                <TF label="Дата по" value="11 марта, чт" cal />
              </div>
            </div>
            <div className="acc-drawer-foot" style={{ padding: "20px 0 0", borderTop: "none", display: "flex", gap: 14 }}>
              <button className="acc-btn-ghost" style={{ flex: 1 }} onClick={closeAll}>Отмена</button>
              <button className="acc-btn-primary" style={{ flex: 1 }} onClick={closeAll}>Сформировать</button>
            </div>
          </div>
        </div>
      )}

      {/* ===== Участники поездки drawer ===== */}
      {drawer === "participants" && (
        <div className="acc-drawer-backdrop" onClick={closeAll}>
          <div className="acc-drawer" style={{ width: 600, padding: 30, borderRadius: "36px 0 0 36px" }} onClick={(e) => e.stopPropagation()}>
            <div className="acc-drawer-head" style={{ marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "none", padding: 0 }}>
              <h2 style={{ fontSize: 30, fontWeight: 600, margin: 0, color: "#17181c" }}>Участники поездки</h2>
              <button className="m-close" onClick={closeAll} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><IcClose /></button>
            </div>
            <div className="acc-drawer-body" style={{ padding: 0, flex: 1, overflowY: "auto" }} onClick={() => setCtx(null)}>
              <p className="acc-sec-p" style={{ marginBottom: 14 }}>Все участники поездки, имеющие аккаунт, будут получатьуведомления о событиях внутри поездки.</p>
              <input className="msg-search" placeholder="Поиск" />
              {["p1", "p2", "p3"].map((id, i) => (
                <div key={id} className="msg-item" onClick={() => setDrawer("participant")}>
                  <img className="m-av" src="/img/avatar.png" alt="" />
                  <div className="m-body"><div className="m-name">{i === 1 ? "Анастасия Александровна Белосельская-Белозерская" : "Яковлев Николай Никитич"}{i !== 1 && <span className="tag-on">Онлайн</span>}</div></div>
                  <button className="msg-dots" onClick={(e) => { e.stopPropagation(); setCtx(ctx === id ? null : id); }}><IcDots /></button>
                  {ctx === id && (
                    <div className="msg-ctx" style={{ right: 10, top: 44 }} onClick={(e) => e.stopPropagation()}>
                      <button onClick={() => { setCtx(null); setMessenger(true); }}><img src="/img/Внештат 2.0 (10)/Messenger.png" alt="" style={{ width: 16, height: 16 }} /> Открыть чат</button>
                      <button onClick={() => { setCtx(null); setDrawer("participant"); }}><img src="/img/Внештат 2.0 (10)/Info.png" alt="" style={{ width: 16, height: 16 }} /> Данные</button>
                      <button onClick={() => setCtx(null)}><img src="/img/Внештат 2.0 (10)/Pay.png" alt="" style={{ width: 16, height: 16 }} /> Расходы в поездке</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="acc-drawer-foot" style={{ padding: "20px 0 0", borderTop: "none", display: "flex", gap: 14 }}>
              <button className="acc-btn-ghost" style={{ flex: 1 }} onClick={closeAll}>Отмена</button>
              <button className="acc-btn-primary" style={{ flex: 1 }} onClick={closeAll}>Сохранить</button>
            </div>
          </div>
        </div>
      )}

      {/* ===== Участник поездки drawer ===== */}
      {drawer === "participant" && (
        <div className="acc-drawer-backdrop" onClick={closeAll}>
          <div className="acc-drawer" style={{ width: 600, padding: 30, borderRadius: "36px 0 0 36px" }} onClick={(e) => e.stopPropagation()}>
            <div className="acc-drawer-head" style={{ marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "none", padding: 0 }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, margin: 0, color: "#17181c" }}>Участник поездки</h2>
              <button className="m-close" onClick={() => setDrawer("participants")} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><IcClose /></button>
            </div>
            <div className="acc-drawer-body" style={{ padding: 0, flex: 1, overflowY: "auto" }}>
              <TF label="ФИО" value="Вознесенский Иван Сергеевич" lock />
              <TF label="Документ РФ" value="5089 849503" chevron />
              <TF label="Международный документ" value="78 329098329" chevron />
              <button className="acc-modal-outline">Редактировать</button>
              <div className="acc-sec-h">Расходы в поездке</div>
              <div style={{ height: 10 }} />
              <div className="exp-card">
                <div className="e-left">
                  <div className="e-name">Авансовый отчет</div>
                  <div className="e-rows">
                    <div>→ Аванс: 7 000 ₽</div>
                    <div>↩ Остаток: 1 000 ₽</div>
                  </div>
                </div>
                <div className="e-right">
                  <div className="e-amount">6 000 ₽<span>Израсходовано</span></div>
                  <button className="e-btn" onClick={() => setAdvance(true)}>Смотреть</button>
                </div>
              </div>
              <div className="exp-card">
                <div className="e-top">
                  <div className="e-name">Авиабилет №4217296816767</div>
                  <div className="e-amount">8 000 ₽</div>
                </div>
              </div>
            </div>
            <div className="acc-drawer-foot" style={{ padding: "20px 0 0", borderTop: "none", display: "flex", gap: 14 }}>
              <button className="acc-btn-ghost" style={{ flex: 1 }} onClick={() => setDrawer("participants")}>Отмена</button>
              <button className="acc-btn-primary" style={{ flex: 1 }} onClick={closeAll}>Сохранить</button>
            </div>
          </div>
        </div>
      )}

      {/* ===== Счета на оплату drawer ===== */}
      {drawer === "invoices" && (
        <div className="acc-drawer-backdrop" onClick={closeAll}>
          <div className="acc-drawer" style={{ width: 690, padding: 30, paddingTop: 20, borderRadius: "36px 0 0 36px" }} onClick={(e) => e.stopPropagation()}>
            <div className="acc-drawer-head" style={{ marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, margin: 0, color: "#17181c" }}>Счета на оплату</h2>
              <button className="m-close" onClick={closeAll} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><IcClose /></button>
            </div>

            <div className="acc-drawer-body" style={{ padding: 0 }}>
              {/* Search bar */}
              <div style={{ position: "relative", marginBottom: 10 }}>
                <input
                  type="text"
                  placeholder="Поиск"
                  style={{
                    width: "100%",
                    height: 52,
                    background: "#f8f9fb",
                    border: "1px solid #e8eaee",
                    borderRadius: 18,
                    paddingLeft: 20,
                    paddingRight: 16,
                    fontSize: 15,
                    color: "#17181c",
                    fontFamily: "inherit",
                    outline: "none",
                    outlineOffset: 0,
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Invoices List */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12, position: "relative" }}>
                {/* Invoice 1: Просрочен */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", border: "1px solid #e8eaee", borderRadius: 22, background: "#fff", position: "relative" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <img src="/img/Внештат 2.0 (8)/Image.png" alt="₽" style={{ width: 44, height: 44, borderRadius: 14 }} />
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 16, fontWeight: 700, color: "#17181c" }}>№ 8909</span>
                        <span style={{ background: "#ff4d4f", color: "#fff", padding: "2px 10px", borderRadius: 10, fontSize: 11, fontWeight: 600 }}>Просрочен</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14 }}>
                        <span style={{ fontWeight: 500, color: "#6d6f77" }}>8 570,00 ₽</span>
                        <span style={{ color: "#9b9fad" }}>+ 270,00 ₽</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ textAlign: "right", fontSize: 12, color: "#9b9fad", lineHeight: 1.4 }}>
                      <div>от 01.09.2025</div>
                      <div>до 01.10.2025</div>
                    </div>
                    <button style={{ background: "none", border: "none", cursor: "pointer", color: "#9b9fad", padding: 4 }} onClick={() => setInvoiceMenu(invoiceMenu === 1 ? null : 1)}><IcDots /></button>
                  </div>
                  {invoiceMenu === 1 && (
                    <div style={{
                      position: "absolute", right: 16, top: 60, width: 140, background: "#ffffff", borderRadius: 18, padding: 8, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.12)", border: "1px solid #f0f2f5", zIndex: 100, display: "flex", flexDirection: "column", gap: 4
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 12, fontSize: 13, fontWeight: 500, color: "#17181c", cursor: "pointer" }}><img src="/img/Внештат 2.0 (9)/Pay.png" alt="" style={{ width: 16, height: 16 }} /> Оплатить</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 12, fontSize: 13, fontWeight: 500, color: "#17181c", cursor: "pointer" }}><img src="/img/Внештат 2.0 (9)/Download.png" alt="" style={{ width: 16, height: 16 }} /> Скачать</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 12, fontSize: 13, fontWeight: 500, color: "#ff4d4f", cursor: "pointer" }}><img src="/img/Внештат 2.0 (9)/Argue.png" alt="" style={{ width: 16, height: 16 }} /> Оспорить</div>
                    </div>
                  )}
                </div>

                {/* Invoice 2: Ожидает оплаты */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", border: "1px solid #e8eaee", borderRadius: 22, background: "#fff", position: "relative" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <img src="/img/Внештат 2.0 (8)/Image.png" alt="₽" style={{ width: 44, height: 44, borderRadius: 14 }} />
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 16, fontWeight: 700, color: "#17181c" }}>№ 8909</span>
                        <span style={{ background: "#007BFB", color: "#fff", padding: "2px 10px", borderRadius: 10, fontSize: 11, fontWeight: 600 }}>Ожидает оплаты</span>
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 500, color: "#6d6f77" }}>
                        8 570,00 ₽
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ textAlign: "right", fontSize: 12, color: "#9b9fad", lineHeight: 1.4 }}>
                      <div>от 01.09.2025</div>
                      <div>до 01.10.2025</div>
                    </div>
                    <button style={{ background: "none", border: "none", cursor: "pointer", color: "#9b9fad", padding: 4 }} onClick={() => setInvoiceMenu(invoiceMenu === 2 ? null : 2)}><IcDots /></button>
                  </div>
                  {invoiceMenu === 2 && (
                    <div style={{
                      position: "absolute", right: 16, top: 60, width: 140, background: "#ffffff", borderRadius: 18, padding: 8, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.12)", border: "1px solid #f0f2f5", zIndex: 100, display: "flex", flexDirection: "column", gap: 4
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 12, fontSize: 13, fontWeight: 500, color: "#17181c", cursor: "pointer" }}><img src="/img/Внештат 2.0 (9)/Pay.png" alt="" style={{ width: 16, height: 16 }} /> Оплатить</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 12, fontSize: 13, fontWeight: 500, color: "#17181c", cursor: "pointer" }}><img src="/img/Внештат 2.0 (9)/Download.png" alt="" style={{ width: 16, height: 16 }} /> Скачать</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 12, fontSize: 13, fontWeight: 500, color: "#ff4d4f", cursor: "pointer" }}><img src="/img/Внештат 2.0 (9)/Argue.png" alt="" style={{ width: 16, height: 16 }} /> Оспорить</div>
                    </div>
                  )}
                </div>

                {/* Invoice 3: Оплачен with Options Dropdown */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", border: "1px solid #e8eaee", borderRadius: 22, background: "#fff", position: "relative" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <img src="/img/Внештат 2.0 (8)/Image-1.png" alt="₽" style={{ width: 44, height: 44, borderRadius: 14 }} />
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 16, fontWeight: 700, color: "#17181c" }}>№ 8909</span>
                        <span style={{ background: "#eef0f3", color: "#8c909c", padding: "2px 10px", borderRadius: 10, fontSize: 11, fontWeight: 600 }}>Оплачен</span>
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 500, color: "#6d6f77" }}>
                        8 570,00 ₽
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ textAlign: "right", fontSize: 12, color: "#9b9fad", lineHeight: 1.4 }}>
                      <div>от 01.09.2025</div>
                    </div>
                    <button style={{ background: "none", border: "none", cursor: "pointer", color: "#9b9fad", padding: 4 }} onClick={() => setInvoiceMenu(invoiceMenu === 3 ? null : 3)}><IcDots /></button>
                  </div>

                  {/* Dropdown Options Popup */}
                  {invoiceMenu === 3 && (
                    <div style={{
                      position: "absolute",
                      right: 16,
                      top: 60,
                      width: 140,
                      background: "#ffffff",
                      borderRadius: 18,
                      padding: 8,
                      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.12)",
                      border: "1px solid #f0f2f5",
                      zIndex: 100,
                      display: "flex",
                      flexDirection: "column",
                      gap: 4
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 12, fontSize: 13, fontWeight: 500, color: "#17181c", cursor: "pointer" }} className="inv-op-item">
                        <img src="/img/Внештат 2.0 (9)/Pay.png" alt="" style={{ width: 16, height: 16 }} /> Оплатить
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 12, fontSize: 13, fontWeight: 500, color: "#17181c", cursor: "pointer" }} className="inv-op-item">
                        <img src="/img/Внештат 2.0 (9)/Download.png" alt="" style={{ width: 16, height: 16 }} /> Скачать
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 12, fontSize: 13, fontWeight: 500, color: "#ff4d4f", cursor: "pointer" }} className="inv-op-item">
                        <img src="/img/Внештат 2.0 (9)/Argue.png" alt="" style={{ width: 16, height: 16 }} /> Оспорить
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TF({ label, value, lock, copy, chevron, cal, ph, onClick }: {
  label: string; value: string; lock?: boolean; copy?: boolean; chevron?: boolean; cal?: boolean; ph?: boolean; onClick?: () => void;
}) {
  return (
    <div className="acc-field" style={{ marginBottom: 12, cursor: onClick ? "pointer" : undefined }} onClick={onClick}>
      <label>{label}</label>
      <div className="val" style={ph ? { color: "#a9abb1" } : undefined}>{ph ? label : value}</div>
      {lock && <span className="cal"><IcLockField /></span>}
      {copy && <span className="cal"><IcCopy /></span>}
      {chevron && <span className="chev"><IcChevron /></span>}
      {cal && <span className="cal"><IcCalSmall /></span>}
    </div>
  );
}
