"use client";

import { useState } from "react";
import Header from "../Header";
import { useRouter } from "next/navigation";
import "../account/account.css";
import "../employees/employees.css";
import "./finance.css";
import Sidebar from "../account/Sidebar";
import Messenger from "../account/Messenger";
import {
  IcCard, IcDots, IcBubble, IcClose, IcChevron, IcCalSmall, IcWallet, IcPostpay,
  IcFinRuble, IcActDoc, IcFinSwap, IcSbpRuble, IcSbpPercent, IcInvRuble,
  IcEdit, IcDownload, IcBan, IcTrash, IcInfoCircle,
} from "../account/icons";

type Drawer =
  | null | "topup" | "topup-sbp" | "topup-forming" | "withdraw" | "accounts" | "addaccount" | "accountdata"
  | "reconciliation" | "cashflow" | "invoices";
type Modal =
  | null | "invoice-sbp" | "forming" | "sent" | "rejected" | "approved" | "download-invoice";

export default function Finance() {
  const router = useRouter();
  const [drawer, setDrawer] = useState<Drawer>(null);
  const [modal, setModal] = useState<Modal>(null);
  const [messenger, setMessenger] = useState(false);
  const [ctx, setCtx] = useState<string | null>(null);
  const [debt, setDebt] = useState(false);
  const [topupAmount, setTopupAmount] = useState("");

  const hasAmount = topupAmount.trim().length > 0;
  const displayAmount = topupAmount.includes("₽") ? topupAmount : `${topupAmount} ₽`;

  const closeAll = () => { setDrawer(null); setModal(null); };

  return (
    <div className="acc">
      <Sidebar active="desk" />

      <main className="acc-main fin-main">
        <Header onMessengerClick={() => setMessenger(true)} />

        <div className="fin-surface">
          <h1 className="acc-title" style={{ cursor: "pointer" }} onClick={() => setDebt((v) => !v)}>Финансы</h1>

          <div className="fin-row">
            {/* deposit */}
            <div className="fin-card">
              <div className="fin-head">
                <IcWallet />
                <span className="f-label">Депозит</span>
              </div>
              <div className="fin-money">
                <div className={`fin-num${debt ? " grey" : ""}`}>{debt ? "0 ₽" : "490 000 ₽"}</div>
                <div className="fin-avail">Доступно</div>
              </div>
              <div className="fin-btns">
                <button className="fin-btn" onClick={() => setDrawer("accounts")}>Список счетов</button>
                <div className="row2">
                  <button className="fin-btn blue" disabled={debt} onClick={() => setDrawer("topup")}>Пополнить</button>
                  <button className="fin-btn" disabled={debt} onClick={() => setDrawer("withdraw")}>Вывести</button>
                </div>
              </div>
            </div>
            {/* postpay */}
            <div className="fin-card">
              <div className="fin-head">
                <IcPostpay />
                <span className="f-label">Постоплата</span>
              </div>
              {debt ? (
                <>
                  <div className="fin-amounts">
                    <div>
                      <div className="fin-num">15 000 ₽</div>
                      <div className="fin-avail">Доступно</div>
                    </div>
                    <div>
                      <div className="fin-num red">85 000 ₽</div>
                      <div className="fin-avail">Задолженность</div>
                    </div>
                  </div>
                  <div className="fin-debt-row">
                    <div className="fin-datebox">
                      <b>21.12.2025</b>
                      <span>Дата погашения</span>
                    </div>
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                      <span className="oc-see" onClick={() => setDrawer("invoices")}>Смотреть счета</span>
                      <button className="oc-pay" style={{ margin: 0, width: "100%" }}>Погасить</button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="fin-money">
                    <div className="fin-num grey">100 000 ₽</div>
                    <div className="fin-avail">Доступно</div>
                  </div>
                  <div className="fin-nodebt">Нет<br />задолженности</div>
                </>
              )}
            </div>
          </div>

          {/* payments */}
          <div className="acc-card fin-pay">
            <div className="p-left">
              <h2>Платежи</h2>
              <p>Действия с вашими финансами</p>
            </div>
            <div className="fin-optgrid">
              <button className="fin-opt" onClick={() => setDrawer("invoices")}>
                <img src="/img/rubl.svg" alt="" width={29} height={31} />
                <span className="o-label">Счета на оплату</span>
              </button>
              <button className="fin-opt" onClick={() => setDrawer("reconciliation")}>
               <img src="/img/document.svg" alt="" width={29} height={31} />
                <span className="o-label">Акт сверки</span>
              </button>
              <button className="fin-opt" onClick={() => setDrawer("cashflow")}>
                <img src="/img/transactions.png" alt="" width={29} height={31} />
                <span className="o-label">Отчет<br />о движении<br />средств</span>
              </button>
            </div>
          </div>

          <div className="emp-secbar">
            <div className="bar">
              <button onClick={() => router.push("/company")}>Компания</button>
              <button className="on">Финансы</button>
              <button onClick={() => router.push("/employees")}>Сотрудники</button>
            </div>
          </div>
        </div>
      </main>

      {messenger && <Messenger onClose={() => setMessenger(false)} />}

      {/* ============ drawers ============ */}
      {drawer === "topup" && (
        <DrawerShell title="Пополнить баланс" onClose={closeAll}>
          <p className="emp-desc" style={{ marginBottom: 18 }}>Вы можете пополнить баланс через СБП <br />   или сформировать счет на необходимую сумму.</p>
          <div className="fin-sbp">
            <h4>СБП</h4>
            <div className="fin-sbp-row"><IcSbpRuble /> <b>До 1 млн ₽</b> <span>за один перевод</span></div>
            <div className="fin-sbp-row"><IcSbpPercent /> <b>Низкая комиссия</b> <span>уточните в своем банке</span></div>
          </div>
          <div className="fin-inline-field">
            <label>Сумма пополнения</label>
            <input
              className="fin-inline-input"
              placeholder="100 000 ₽"
              value={topupAmount}
              onChange={(e) => setTopupAmount(e.target.value)}
            />
          </div>
          <div className="fin-hr" />
          <button className={`fin-big-btn ${hasAmount ? "blue" : "grey"}`} disabled={!hasAmount} onClick={() => setDrawer("topup-sbp")}>Пополнить через СБП</button>
          <button className={`fin-big-btn ${hasAmount ? "blue" : "grey"}`} disabled={!hasAmount} onClick={() => setDrawer("topup-forming")}>Сформировать счет</button>
        </DrawerShell>
      )}

      {drawer === "topup-sbp" && (
        <DrawerShell
          title={"Инвойс на пополнение\nчерез СБП"}
          onClose={closeAll}
          noFootBorder
          footer={<button className="fin-big-btn grey" style={{ margin: 0 }} onClick={() => setDrawer("topup")}>Назад</button>}
        >
          <div style={{ display: "flex", flexDirection: "column", minHeight: "calc(100vh - 180px)" }}>
            <div className="fin-sbp" style={{ marginBottom: 12 }}>
              <div className="fin-sbp-row"><IcSbpRuble /> <b>{displayAmount}</b> <span>размер инвойса</span></div>
              <div className="fin-sbp-row"><IcSbpPercent /> <b>Низкая комиссия</b> <span>уточните в своем банке</span></div>
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", paddingBottom: 20 }}>
              <Qr />
              <p style={{ textAlign: "center", color: "var(--muted)", fontSize: 14, margin: "20px 0 0" }}>
                Отсканируйте QR-код<br />или перейдите по <span className="fin-link">ссылке.</span>
              </p>
            </div>
          </div>
        </DrawerShell>
      )}

      {drawer === "topup-forming" && (
        <DrawerShell
          title={"Формирование счета..."}
          onClose={closeAll}
          noFootBorder
          footer={<button className="fin-big-btn blue" style={{ margin: 0 }} onClick={closeAll}>Скачать</button>}
        >
          <div style={{ display: "flex", flexDirection: "column", minHeight: "calc(100vh - 180px)" }}>
            <div className="fin-sbp" style={{ marginBottom: 12 }}>
              <div className="fin-sbp-row"><IcSbpRuble /> <b>{displayAmount}</b> <span>сумма счета</span></div>
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", paddingBottom: 20 }}>
              <p style={{ textAlign: "center", color: "var(--muted)", fontSize: 16, margin: 0, lineHeight: 1.5 }}>
                Загрузка документа начнется автоматически.<br />Если этого не произошло, нажмите кнопку ниже.
              </p>
            </div>
          </div>
        </DrawerShell>
      )}

      {drawer === "withdraw" && (
        <DrawerShell
          title={"Подать заявку на вывод\nсвободных средств"}
          onClose={closeAll}
          footer={<button className="acc-btn-primary" onClick={() => setModal("sent")}>Подать заявку</button>}
        >
          <p className="emp-desc" style={{ marginBottom: 20 }}>Вы можете вывести активы с депозита, если у вас нет неоплаченных счетов. Вывод средств осуществляется ежедневно (тут коррекция текста)</p>
          <div className="fin-field">
            <span className="lbl">Сумма пополнения</span>
            <div className="box ph">100 000 ₽</div>
          </div>
          <div className="fin-field">
            <span className="lbl">Расчетный счет</span>
            <div className="box">ПАО “Альфа-Банк” <span className="chev"><IcChevron /></span></div>
          </div>

          <div className="acc-sec-h">Заявки</div>
          <div style={{ height: 10 }} />
          {[
            { st: "sent" as const, label: "Отправлена" },
            { st: "rejected" as const, label: "Отклонена" },
            { st: "approved" as const, label: "Одобрена" },
          ].map((r) => (
            <div key={r.st} className="fin-req">
              <div className="r-title">Заявка №1 <span>от 09.05.2025</span></div>
              <div className="r-row"><IcSbpRuble /> <b>100 000 ₽</b> <span>за один перевод</span></div>
              <div className="r-row"><IcSbpPercent /> <b>ПАО “Альфа-Банк”</b> <span>расчетный счет</span></div>
              <div className="fin-req-actions">
                <button className="disabled">{r.label}</button>
                <button onClick={() => setModal(r.st)}>{r.st === "sent" ? "Отозвать" : r.st === "rejected" ? "Подробнее" : "Открыть"}</button>
              </div>
            </div>
          ))}
        </DrawerShell>
      )}

      {drawer === "accounts" && (
        <DrawerShell
          title="Расчетные счета"
          onClose={closeAll}
          footer={<button className="acc-btn-primary" onClick={() => setDrawer("addaccount")}>Добавить счет</button>}
        >
          <div onClick={() => setCtx(null)}>
            {[
              { id: "a1", name: "ПАО “Альфа-Банк”", num: "329502895024809", main: true },
              { id: "a2", name: "ПАО “Совкомбанк”", num: "457923739847 2984", main: false },
            ].map((a) => (
              <div key={a.id} className="fin-acc-item">
                <div>
                  <div className="a-name">{a.name}{a.main && <span className="fin-main-badge">Основной счет</span>}</div>
                  <div className="a-num">{a.num}</div>
                </div>
                <button className="msg-dots" onClick={(e) => { e.stopPropagation(); setCtx(ctx === a.id ? null : a.id); }}><IcDots /></button>
                {ctx === a.id && (
                  <div className="msg-ctx" style={{ right: 10, top: 44 }} onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => setCtx(null)}><IcEdit /> Сделать основным</button>
                    <button onClick={() => { setCtx(null); setDrawer("accountdata"); }}><IcInfoCircle /> Данные счета</button>
                    <button className="red" onClick={() => setCtx(null)}><IcTrash /> Удалить счет</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </DrawerShell>
      )}

      {drawer === "addaccount" && (
        <DrawerShell
          title="Добавить расчетный счет"
          onClose={closeAll}
          footer={<button className="acc-btn-primary" onClick={() => setModal("sent")}>Подать заявку</button>}
        >
          <AccountForm ph />
        </DrawerShell>
      )}

      {drawer === "accountdata" && (
        <DrawerShell
          title="Данные расчетного счета"
          onClose={closeAll}
          footer={<>
            <button className="acc-btn-ghost" style={{ flex: 1 }} onClick={closeAll}>Сделать основным</button>
            <button className="acc-btn-primary" style={{ background: "var(--coral)" }} onClick={closeAll}>Удалить счет</button>
          </>}
        >
          <AccountForm />
        </DrawerShell>
      )}

      {drawer === "reconciliation" && (
        <DrawerShell
          title="Сформировать акт сверки"
          onClose={closeAll}
          footer={<>
            <button className="acc-btn-ghost" onClick={closeAll}>Отмена</button>
            <button className="acc-btn-primary" onClick={closeAll}>Скачать</button>
          </>}
        >
          <div className="acc-grid2">
            <F label="Дата от" value="19.04.2025" cal />
            <F label="Дата до" value="19.05.2025" cal />
          </div>
          <div className="acc-grid2">
            <F label="Тип" value="Простой акт" chevron />
            <F label="Тип файла" value="PDF" chevron />
          </div>
        </DrawerShell>
      )}

      {drawer === "cashflow" && (
        <DrawerShell
          title="Отчет о движении средств"
          onClose={closeAll}
          footer={<>
            <button className="acc-btn-ghost" onClick={closeAll}>Отмена</button>
            <button className="acc-btn-primary" onClick={closeAll}>Скачать</button>
          </>}
        >
          <div className="acc-grid2">
            <F label="Дата от" value="19.04.2025" cal />
            <F label="Дата до" value="19.05.2025" cal />
          </div>
          <div className="acc-fullrow"><F label="Тип файла" value="PDF" chevron /></div>
        </DrawerShell>
      )}

      {drawer === "invoices" && (
        <DrawerShell title="Счета на оплату" onClose={closeAll}>
          <input className="msg-search" placeholder="Поиск" />
          <div onClick={() => setCtx(null)}>
            {[
              { id: "i1", badge: "overdue", label: "Просрочен", amount: "8 570,00 ₽", plus: "+270,00 ₽", muted: false },
              { id: "i2", badge: "waiting", label: "Ожидает оплаты", amount: "8 570,00 ₽", plus: null, muted: false },
              { id: "i3", badge: "paid", label: "Оплачен", amount: "8 570,00 ₽", plus: null, muted: true },
            ].map((inv) => (
              <div key={inv.id} className="fin-inv">
                <IcInvRuble muted={inv.muted} />
                <div className="i-body">
                  <div className="i-top">№ 8909 <span className={`fin-badge ${inv.badge}`}>{inv.label}</span></div>
                  <div className="i-amount">{inv.amount}{inv.plus && <span className="plus">{inv.plus}</span>}</div>
                </div>
                <div className="i-dates">от 01.09.2025<br />до 01.10.2025</div>
                <button className="msg-dots" onClick={(e) => { e.stopPropagation(); setCtx(ctx === inv.id ? null : inv.id); }}><IcDots /></button>
                {ctx === inv.id && (
                  <div className="msg-ctx" style={{ right: 10, top: 44 }} onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => setCtx(null)}><IcEdit /> Оплатить</button>
                    <button onClick={() => { setCtx(null); setModal("download-invoice"); }}><IcDownload /> Скачать</button>
                    <button className="red" onClick={() => setCtx(null)}><IcBan /> Оспорить</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </DrawerShell>
      )}

      {/* ============ modals ============ */}




      {modal === "sent" && (
        <ModalWrap onClose={() => setModal(null)}>
          <div className="acc-modal center-c fin-status" style={{ width: 400 }}>
            <button className="acc-modal-x" onClick={() => setModal(null)}><IcClose size={20} /></button>
            <div style={{ height: 30 }} />
            <h3>Заявка отправлена!</h3>
            <p className="m-sub">Менеджер проверит заявку и если всё в порядке, мы оповестим вас.</p>
            <div style={{ height: 20 }} />
            <button className="fin-big-btn" style={{ margin: 0, background: "var(--coral)", color: "#fff" }} onClick={() => setModal(null)}>Отозвать заявку</button>
          </div>
        </ModalWrap>
      )}

      {modal === "rejected" && (
        <ModalWrap onClose={() => setModal(null)}>
          <div className="acc-modal center-c fin-status" style={{ width: 400 }}>
            <button className="acc-modal-x" onClick={() => setModal(null)}><IcClose size={20} /></button>
            <div style={{ height: 30 }} />
            <h3>Заявка отклонена</h3>
            <p className="m-sub">Наш менеджер обнаружил ошибку в заявке. Подробности <span className="fin-link">в чате.</span></p>
            <div style={{ height: 20 }} />
            <div style={{ display: "flex", gap: 12, width: "100%" }}>
              <button className="fin-big-btn grey" style={{ margin: 0, flex: 1, color: "#c2c4ca" }}>Отозвать заявку</button>
              <button className="fin-big-btn blue" style={{ margin: 0, flex: 1 }} onClick={() => setModal(null)}>Редактировать</button>
            </div>
          </div>
        </ModalWrap>
      )}

      {modal === "approved" && (
        <ModalWrap onClose={() => setModal(null)}>
          <div className="acc-modal center-c fin-status" style={{ width: 400 }}>
            <button className="acc-modal-x" onClick={() => setModal(null)}><IcClose size={20} /></button>
            <div style={{ height: 30 }} />
            <h3>Заявка одобрена!</h3>
            <p className="m-sub">Деньги поступят на ваш расчетный счет в течение 3 рабочих дней.</p>
            <div style={{ height: 20 }} />
            <div style={{ display: "flex", gap: 12, width: "100%" }}>
              <button className="fin-big-btn grey" style={{ margin: 0, flex: 1, color: "#c2c4ca" }}>Отозвать заявку</button>
              <button className="fin-big-btn grey" style={{ margin: 0, flex: 1, color: "#c2c4ca" }}>Редактировать</button>
            </div>
          </div>
        </ModalWrap>
      )}

      {modal === "download-invoice" && (
        <ModalWrap onClose={() => setModal(null)}>
          <div className="acc-modal" style={{ width: 400, textAlign: "left" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <h3 style={{ margin: 0 }}>Скачать счет</h3>
              <button style={{ background: "none", border: "none", cursor: "pointer" }} onClick={() => setModal(null)}><IcClose size={20} /></button>
            </div>
            <p className="emp-desc" style={{ marginBottom: 18 }}>Выберите формат файла, в котором хотите скачать счет на оплату.</p>
            <div className="acc-field" style={{ marginBottom: 18 }}>
              <label>Тип файла</label>
              <div className="val">PDF</div>
              <span className="chev"><IcChevron /></span>
            </div>
            <div style={{ display: "flex", gap: 14 }}>
              <button className="acc-btn-ghost" style={{ flex: 1 }} onClick={() => setModal(null)}>Отмена</button>
              <button className="acc-btn-primary" onClick={() => setModal(null)}>Скачать</button>
            </div>
          </div>
        </ModalWrap>
      )}
    </div>
  );
}

/* ---------- shared ---------- */
function DrawerShell({ title, children, onClose, footer, noFootBorder }: {
  title: string; children: React.ReactNode; onClose: () => void; footer?: React.ReactNode; noFootBorder?: boolean;
}) {
  return (
    <div className="acc-scrim" onClick={onClose}>
      <div className="acc-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="acc-drawer-head">
          <h1 style={{ whiteSpace: "pre-line" }}>{title}</h1>
          <button onClick={onClose}><IcClose /></button>
        </div>
        <div className="acc-drawer-body">{children}</div>
        {footer && (
          <div
            className="acc-drawer-foot"
            style={noFootBorder ? { borderTop: "none", paddingTop: 0, paddingBottom: 30 } : undefined}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

function ModalWrap({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="acc-scrim center" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}

function F({ label, value, chevron, cal }: { label: string; value: string; chevron?: boolean; cal?: boolean }) {
  return (
    <div className="acc-field">
      <label>{label}</label>
      <div className="val">{value}</div>
      {chevron && <span className="chev"><IcChevron /></span>}
      {cal && <span className="cal"><IcCalSmall /></span>}
    </div>
  );
}

function AccountForm({ ph }: { ph?: boolean }) {
  const rows: [string, string][] = [
    ["Расчетный счет", ph ? "0000000000000" : "0000000000000"],
    ["БИК банка", "439748397"],
    ["Название банка", "ПАО “Альфа-Банк”"],
    ["Корпоративный счет", "00000000000"],
    ["Город", "Москва"],
  ];
  return (
    <>
      {rows.map(([lbl, val]) => (
        <div key={lbl} className="fin-field">
          <span className="lbl">{lbl}</span>
          <div className={`box${ph ? " ph" : ""}`}>{val}</div>
        </div>
      ))}
    </>
  );
}

/* deterministic QR-like pattern */
function Qr() {
  const n = 25;
  const cells: React.ReactNode[] = [];
  let seed = 7;
  const rnd = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
  const finder = (r: number, c: number) =>
    (r < 7 && c < 7) || (r < 7 && c >= n - 7) || (r >= n - 7 && c < 7);
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      let on = false;
      if (finder(r, c)) {
        const rr = r >= n - 7 ? r - (n - 7) : r;
        const cc = c >= n - 7 ? c - (n - 7) : c;
        on = rr === 0 || rr === 6 || cc === 0 || cc === 6 || (rr >= 2 && rr <= 4 && cc >= 2 && cc <= 4);
      } else {
        on = rnd() > 0.5;
      }
      if (on) cells.push(<rect key={`${r}-${c}`} x={c} y={r} width="1" height="1" fill="#17181c" />);
    }
  }
  return (
    <svg className="fin-qr" viewBox={`0 0 ${n} ${n}`} shapeRendering="crispEdges">
      {cells}
    </svg>
  );
}
