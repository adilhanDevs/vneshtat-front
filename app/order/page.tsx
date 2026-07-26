"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "../account/account.css";
import "../orders/orders.css";
import Sidebar from "../account/Sidebar";
import Messenger from "../account/Messenger";
import Advance from "./Advance";
import {
  IcCard, IcDots, IcClock, IcBack, IcOrderCard, IcReport, IcWidgetsBig,
  IcPlane, IcBellSm, IcChatBubbles, IcClose, IcChevron, IcCalSmall, IcCopy,
  IcLockField, IcMenuChat, IcInfoCircle, IcNote,
} from "../account/icons";

type Modal = null | "tripdata" | "order-cmd";
type Drawer = null | "participants" | "participant";

export default function Order() {
  const router = useRouter();
  const [seg, setSeg] = useState<"info" | "services">("info");
  const [modal, setModal] = useState<Modal>(null);
  const [drawer, setDrawer] = useState<Drawer>(null);
  const [messenger, setMessenger] = useState(false);
  const [advance, setAdvance] = useState(false);
  const [dd, setDd] = useState(false);
  const [ctx, setCtx] = useState<string | null>(null);
  const closeAll = () => { setModal(null); setDrawer(null); };

  return (
    <div className="acc">
      <Sidebar active="orders" />

      <main className="acc-main" style={{ position: "relative" }}>
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
            <button className="acc-iconbtn"><IcClock /></button>
            <img className="acc-avatar" src="/img/avatar-sm.png" alt="" />
          </div>
        </div>

        <button className="acc-backbtn" onClick={() => router.push("/orders")}><IcBack /></button>
        <h1 className="order-title">Заказ</h1>

        <div className="order-row">
          {/* cost */}
          <div className="acc-card order-cost">
            <div className="oc-icon"><IcOrderCard /></div>
            <div className="oc-amount">8 385 388 ₽</div>
            <div className="oc-label">Стоимость услуг в заказе</div>
            <div className="oc-actions">
              <div className="order-timer" style={{ background: "#f3f4f6" }}>
                <b style={{ color: "#b3b5bb" }}>35:44</b>
                <span style={{ color: "#a9abb1" }}>Услуги забронированы</span>
              </div>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                <span className="oc-see">Смотреть счета</span>
                <button className="oc-pay" style={{ margin: 0, width: "100%" }}>Оплатить</button>
              </div>
            </div>
          </div>

          {/* stats */}
          <div className="acc-card order-stats">
            <img className="os-bag" src="/img/backpack.png" alt="" />
            <div className="os-box">
              <div className="st"><b>1</b><span>страна</span></div>
              <div className="st"><b>3</b><span>города</span></div>
              <div className="st"><b>18</b><span>услуг</span></div>
              <div className="st"><b>24</b><span>участника</span></div>
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: "auto", paddingTop: 22 }}>
              <button className="fin-btn" onClick={() => setModal("tripdata")}>Данные заказа</button>
              <button className="fin-btn" onClick={() => setDrawer("participants")}>Участники</button>
            </div>
          </div>
        </div>

        {/* actions */}
        <div className="acc-card order-actions" style={{ padding: 26 }}>
          <div className="oa-left">
            <h2>Действия</h2>
            <p>Управление вашим аккаунтом</p>
          </div>
          <div className="oa-grid">
            <div className="order-optcard" onClick={() => setAdvance(true)} style={{ cursor: "pointer" }}>
              <span className="oo-badge">1</span>
              <IcReport />
              <span className="oo-label">Авансовый отчет</span>
            </div>
            <div className="order-optcard">
              <span className="oo-badge">2</span>
              <IcWidgetsBig />
              <span className="oo-label">Виджеты</span>
            </div>
            <div className="order-optcard" onClick={() => setMessenger(true)} style={{ cursor: "pointer" }}>
              <IcChatBubbles />
              <span className="oo-label">Открыть чат</span>
            </div>
          </div>

          <div className="order-seg">
            <button className={seg === "info" ? "on" : ""} onClick={() => setSeg("info")}>Информация</button>
            <button className={seg === "services" ? "on" : ""} onClick={() => setSeg("services")}>Услуги</button>
          </div>

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

      {/* ===== Данные поездки modal ===== */}
      {modal === "tripdata" && (
        <div className="acc-scrim center" onClick={closeAll}>
          <div className="acc-modal" onClick={(e) => e.stopPropagation()} style={{ width: 400, textAlign: "left", maxHeight: "84vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <h3 style={{ margin: 0 }}>Данные поездки</h3>
              <button style={{ background: "none", border: "none", cursor: "pointer" }} onClick={closeAll}><IcClose size={20} /></button>
            </div>
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
            <div style={{ display: "flex", gap: 14, marginTop: 8 }}>
              <button className="acc-btn-ghost" style={{ flex: 1 }} onClick={closeAll}>Отмена</button>
              <button className="acc-btn-primary" onClick={closeAll}>Сохранить</button>
            </div>
          </div>
        </div>
      )}

      {/* ===== Приказ на командировку modal ===== */}
      {modal === "order-cmd" && (
        <div className="acc-scrim center" onClick={closeAll}>
          <div className="acc-modal" onClick={(e) => e.stopPropagation()} style={{ width: 400, textAlign: "left" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <h3 style={{ margin: 0 }}>Приказ на командировку</h3>
              <button style={{ background: "none", border: "none", cursor: "pointer" }} onClick={closeAll}><IcClose size={20} /></button>
            </div>
            <p className="emp-desc" style={{ marginBottom: 18 }}>Город, цель и даты командировки указаны исходя из данных о поездке. При необходимости, можете изменить их.</p>
            <TF label="Города поездки" value="Санкт-Петербург, Москва" />
            <TF label="Цель поездки" value="Питер, Москва - проверка объектов для обеспечения надежности соединения между участками сети" />
            <div className="acc-grid2">
              <TF label="Дата с" value="11 марта, чт" cal />
              <TF label="Дата по" value="11 марта, чт" cal />
            </div>
            <div style={{ display: "flex", gap: 14, marginTop: 8 }}>
              <button className="acc-btn-ghost" style={{ flex: 1 }} onClick={closeAll}>Отмена</button>
              <button className="acc-btn-primary" onClick={closeAll}>Сформировать</button>
            </div>
          </div>
        </div>
      )}

      {/* ===== Участники поездки drawer ===== */}
      {drawer === "participants" && (
        <div className="acc-scrim" onClick={closeAll}>
          <div className="acc-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="acc-drawer-head">
              <h1>Участники поездки</h1>
              <button onClick={closeAll}><IcClose /></button>
            </div>
            <div className="acc-drawer-body" onClick={() => setCtx(null)}>
              <p className="acc-sec-p" style={{ marginBottom: 14 }}>Все участники поездки, имеющие аккаунт, будут получать уведомления о событиях внутри поездки.</p>
              <input className="msg-search" placeholder="Поиск" />
              {["p1", "p2", "p3"].map((id, i) => (
                <div key={id} className="msg-item" onClick={() => setDrawer("participant")}>
                  <img className="m-av" src="/img/avatar.png" alt="" />
                  <div className="m-body"><div className="m-name">{i === 1 ? "Анастасия Александровна Белосельская-Белозерская" : "Яковлев Николай Никитич"}{i !== 1 && <span className="tag-on">Онлайн</span>}</div></div>
                  <button className="msg-dots" onClick={(e) => { e.stopPropagation(); setCtx(ctx === id ? null : id); }}><IcDots /></button>
                  {ctx === id && (
                    <div className="msg-ctx" style={{ right: 10, top: 44 }} onClick={(e) => e.stopPropagation()}>
                      <button onClick={() => { setCtx(null); setMessenger(true); }}><IcMenuChat /> Открыть чат</button>
                      <button onClick={() => { setCtx(null); setDrawer("participant"); }}><IcInfoCircle /> Данные</button>
                      <button onClick={() => setCtx(null)}><IcNote color="#5a5c63" /> Расходы в поездке</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="acc-drawer-foot">
              <button className="acc-btn-ghost" onClick={closeAll}>Отмена</button>
              <button className="acc-btn-primary" onClick={closeAll}>Сохранить</button>
            </div>
          </div>
        </div>
      )}

      {/* ===== Участник поездки drawer ===== */}
      {drawer === "participant" && (
        <div className="acc-scrim" onClick={closeAll}>
          <div className="acc-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="acc-drawer-head">
              <h1>Участник поездки</h1>
              <button onClick={() => setDrawer("participants")}><IcClose /></button>
            </div>
            <div className="acc-drawer-body">
              <TF label="ФИО" value="Вознесенский Иван Сергеевич" lock />
              <TF label="Документ РФ" value="5089 849503" chevron />
              <TF label="Международный документ" value="78 329098329" chevron />
              <button className="acc-modal-outline">Редактировать</button>
              <div className="acc-sec-h">Расходы в поездке</div>
              <div style={{ height: 10 }} />
              <div className="exp-card">
                <div className="e-top">
                  <div className="e-name">Авансовый отчет</div>
                  <div className="e-amount">6 000 ₽<span>Израсходовано</span></div>
                </div>
                <div className="e-rows">
                  <div>→ Аванс: 7 000 ₽</div>
                  <div>↩ Остаток: 1 000 ₽</div>
                </div>
                <button className="e-btn">Смотреть</button>
              </div>
              <div className="exp-card">
                <div className="e-top">
                  <div className="e-name">Авиабилет №4217296816767</div>
                  <div className="e-amount">8 000 ₽</div>
                </div>
              </div>
            </div>
            <div className="acc-drawer-foot">
              <button className="acc-btn-ghost" onClick={() => setDrawer("participants")}>Отмена</button>
              <button className="acc-btn-primary" onClick={closeAll}>Сохранить</button>
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
