"use client";

import { useState } from "react";
import {
  IcClose, IcChevron, IcCalSmall, IcLockField, IcTrash,
} from "../account/icons";

type View = "reports" | "report" | "advance" | "expense";

export default function Advance({ onClose }: { onClose: () => void }) {
  const [view, setView] = useState<View>("reports");

  return (
    <div className="acc-scrim" onClick={onClose}>
      <div className="acc-drawer" onClick={(e) => e.stopPropagation()}>
        {/* ---- Авансовые отчёты ---- */}
        {view === "reports" && (
          <>
            <div className="acc-drawer-head">
              <h1>Авансовые отчёты</h1>
              <button onClick={onClose}><IcClose /></button>
            </div>
            <div className="acc-drawer-body">
              <p className="acc-sec-p" style={{ marginBottom: 16 }}>
                Авансовый отчёт нужен для отчёта сотрудника о тратах в течение поездки.
                Здесь вы можете назначить сотрудника, аванс и суточные, посмотреть или скачать отчёты.
              </p>
              <div className="exp-card">
                <div className="e-top">
                  <div className="e-name">Ковалевская-Никитина<br />Наталья Николаевна</div>
                  <div className="e-amount">8 000 ₽<span>Израсходовано</span></div>
                </div>
                <div className="e-rows">
                  <div>→ Аванс: 7 000 ₽</div>
                  <div className="e-red">↩ Перерасход: 1 000 ₽</div>
                </div>
                <button className="e-btn" onClick={() => setView("report")}>Смотреть</button>
              </div>
              <div className="exp-card">
                <div className="e-top">
                  <div className="e-name">Ковалевская-Никитина<br />Наталья Николаевна</div>
                  <div className="e-amount">6 000 ₽<span>Израсходовано</span></div>
                </div>
                <div className="e-rows">
                  <div>→ Аванс: 7 000 ₽</div>
                  <div>↩ Остаток: 1 000 ₽</div>
                </div>
                <button className="e-btn" onClick={() => setView("report")}>Смотреть</button>
              </div>
              <div className="exp-card">
                <div className="e-top">
                  <div className="e-name">Вознесенский<br />Иван Сергеевич</div>
                  <button className="e-btn" style={{ marginTop: 0 }} onClick={() => setView("report")}>Создать</button>
                </div>
              </div>
            </div>
            <div className="acc-drawer-foot">
              <button className="acc-btn-ghost" onClick={onClose}>Отмена</button>
              <button className="acc-btn-primary" onClick={onClose}>Скачать все отчёты</button>
            </div>
          </>
        )}

        {/* ---- Авансовый отчёт ---- */}
        {view === "report" && (
          <>
            <div className="acc-drawer-head">
              <h1>Авансовый отчёт</h1>
              <button onClick={() => setView("reports")}><IcClose /></button>
            </div>
            <div className="acc-drawer-body">
              <div className="acc-sec-p" style={{ fontSize: 16, color: "var(--ink)", fontWeight: 600, marginBottom: 16 }}>Вознесенский Иван Сергеевич</div>
              <div className="acc-sec-h" style={{ marginTop: 0 }}>Аванс и суточные</div>
              <div style={{ height: 10 }} />
              <div className="exp-card">
                <div className="e-top"><div className="e-name">Суточные</div><div className="e-amount">4 000 ₽</div></div>
                <div className="acc-sec-p" style={{ margin: "2px 0 0", fontSize: 13 }}>Москва, 06.04.2025 – 08.04.2025</div>
              </div>
              <div className="exp-card">
                <div className="e-top"><div className="e-name">Аванс</div><div className="e-amount">4 000 ₽</div></div>
              </div>
              <button className="acc-modal-outline" onClick={() => setView("advance")}>Добавить</button>
              <div className="acc-sec-h">Расходы</div>
              <div style={{ height: 10 }} />
              <div className="exp-card">
                <div className="e-top"><div className="e-name">Такси до ресторана Twins Garden<br /><span style={{ fontWeight: 400, fontSize: 13, color: "var(--muted)" }}>Расход</span></div><div className="e-amount">4 000 ₽</div></div>
              </div>
              <button className="acc-modal-outline" onClick={() => setView("expense")}>Добавить</button>
              <div className="acc-sec-h">Документы</div>
              <div style={{ height: 10 }} />
              <button className="adv-addfile">Добавить файл</button>
            </div>
            <div className="acc-drawer-foot">
              <button className="acc-btn-ghost" onClick={() => setView("reports")}>Отмена</button>
              <button className="acc-btn-primary" onClick={() => setView("reports")}>Сохранить</button>
            </div>
          </>
        )}

        {/* ---- Аванс ---- */}
        {view === "advance" && (
          <>
            <div className="acc-drawer-head">
              <h1>Аванс</h1>
              <button onClick={() => setView("report")}><IcClose /></button>
            </div>
            <div className="acc-drawer-body">
              <p className="acc-sec-p" style={{ marginBottom: 18 }}>
                Укажите сумму аванса, которую сотрудник получил в кассе организации. Она будет отражена в авансовом отчёте.
              </p>
              <div className="acc-field" style={{ marginBottom: 12 }}>
                <label>Номер поездки</label>
                <div className="val">Москва</div>
              </div>
              <div className="acc-grid2">
                <div className="acc-field"><label>Дата с</label><div className="val">11 марта, чт</div><span className="cal"><IcCalSmall /></span></div>
                <div className="acc-field"><label>Дата по</label><div className="val">11 марта, чт</div><span className="cal"><IcCalSmall /></span></div>
              </div>
              <div className="adv-sum">
                <div className="big">10 000 ₽</div>
                <div className="cur">RUB (₽) <IcLockField /></div>
              </div>
              <button className="adv-addfile">Добавить период</button>
            </div>
            <div className="acc-drawer-foot">
              <button className="acc-btn-ghost" onClick={() => setView("report")}>Удалить</button>
              <button className="acc-btn-primary" onClick={() => setView("report")}>Сохранить</button>
            </div>
          </>
        )}

        {/* ---- Расход ---- */}
        {view === "expense" && (
          <>
            <div className="acc-drawer-head">
              <h1>Расход</h1>
              <button onClick={() => setView("report")}><IcClose /></button>
            </div>
            <div className="acc-drawer-body">
              <p className="acc-sec-p" style={{ marginBottom: 18 }}>
                Укажите расход и прикрепите документ, подтверждающий трату. Сумма расхода будет отражена в авансовом отчёте.
              </p>
              <div className="acc-field" style={{ marginBottom: 12 }}><label>ФИО</label><div className="val">Вознесенский Иван Сергеевич</div><span className="cal"><IcLockField /></span></div>
              <div className="acc-field" style={{ marginBottom: 12 }}><label>Название расхода</label><div className="val">Обед в ресторане Twins Garden</div></div>
              <div className="acc-field" style={{ marginBottom: 12 }}><label>Подтверждающий документ</label><div className="val">Кассовый чек</div><span className="chev"><IcChevron /></span></div>
              <div className="acc-grid2">
                <div className="acc-field"><label>Номер</label><div className="val">30623098</div></div>
                <div className="acc-field"><label>Дата</label><div className="val">11 марта</div><span className="cal"><IcCalSmall /></span></div>
              </div>
              <div className="adv-file"><IcTrash /><span className="fn">DCØM_239029014_2390.png</span></div>
              <button className="adv-addfile">Добавить файл</button>
            </div>
            <div className="acc-drawer-foot">
              <button className="acc-btn-ghost" onClick={() => setView("report")}>Удалить</button>
              <button className="acc-btn-primary" onClick={() => setView("report")}>Сохранить</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
