"use client";

import { useState } from "react";
import {
  IcClose, IcChevron, IcCalSmall, IcLockField, IcTrash, IcDownload,
} from "../account/icons";

type View = "reports" | "report" | "advance" | "expense";

export default function Advance({ onClose }: { onClose: () => void }) {
  const [view, setView] = useState<View>("reports");

  return (
    <div className="acc-drawer-backdrop" onClick={onClose}>
      <div className="acc-drawer" style={{ width: 600, padding: 30, borderRadius: "36px 0 0 36px" }} onClick={(e) => e.stopPropagation()}>
        {/* ---- Авансовые отчёты ---- */}
        {view === "reports" && (
          <>
            <div className="acc-drawer-head" style={{ marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "none", padding: 0 }}>
              <h2 style={{ fontSize: 30, fontWeight: 700, margin: 0, color: "#17181c", letterSpacing: "-0.5px" }}>Авансовые отчёты</h2>
              <button className="m-close" onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><IcClose /></button>
            </div>
            <div className="acc-drawer-body" style={{ padding: 0, flex: 1, overflowY: "auto" }}>
              <p className="acc-sec-p" style={{ marginBottom: 16 }}>
                Авансовый отчёт нужен для отчёта сотрудника о тратах в течение поездки.
                Здесь вы можете назначить сотрудника, аванс и суточные, посмотреть или скачать отчёты.
              </p>
              <div className="exp-card">
                <div className="e-left">
                  <div className="e-name">Ковалевская-Никитина<br />Наталья Николаевна</div>
                  <div className="e-rows">
                    <div>→ Аванс: 7 000 ₽</div>
                    <div className="e-red">↩ Перерасход: 1 000 ₽</div>
                  </div>
                </div>
                <div className="e-right">
                  <div className="e-amount">8 000 ₽<span>Израсходовано</span></div>
                  <button className="e-btn" onClick={() => setView("report")}>Смотреть</button>
                </div>
              </div>
              <div className="exp-card">
                <div className="e-left">
                  <div className="e-name">Ковалевская-Никитина<br />Наталья Николаевна</div>
                  <div className="e-rows">
                    <div>→ Аванс: 7 000 ₽</div>
                    <div>↩ Остаток: 1 000 ₽</div>
                  </div>
                </div>
                <div className="e-right">
                  <div className="e-amount">6 000 ₽<span>Израсходовано</span></div>
                  <button className="e-btn" onClick={() => setView("report")}>Смотреть</button>
                </div>
              </div>
              <div className="exp-card">
                <div className="e-left">
                  <div className="e-name">Вознесенский<br />Иван Сергеевич</div>
                </div>
                <div className="e-right">
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
            <div className="acc-drawer-head" style={{ marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "none", padding: 0 }}>
              <h2 style={{ fontSize: 30, fontWeight: 700, margin: 0, color: "#17181c", letterSpacing: "-0.5px" }}>Авансовый отчёт</h2>
              <button className="m-close" onClick={() => setView("reports")} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><IcClose /></button>
            </div>
            <div className="acc-drawer-body" style={{ padding: 0, flex: 1, overflowY: "auto" }}>
              <div style={{ display: "inline-block", background: "#f0f2f5", borderRadius: 16, padding: "10px 20px", fontSize: 16, fontWeight: 500, color: "#17181c", marginBottom: 20 }}>Вознесенский Иван Сергеевич</div>
              <div style={{ height: 1, background: "#e5e7ea", margin: "0 0 24px" }} />
              <div className="acc-sec-h" style={{ marginTop: 0 }}>Аванс и суточные</div>
              <p className="acc-sec-p" style={{ marginBottom: 16, color: "#787880", fontSize: 14, lineHeight: 1.2 }}>Укажите сумму аванса и суточных, которые сотрудник получил в кассе организации.</p>
              <div className="exp-card">
                <div className="e-left">
                  <div className="e-name">Суточные</div>
                  <div className="acc-sec-p" style={{ margin: "2px 0 0", fontSize: 14, color: "#8c909c", fontWeight: 500 }}>Москва, 06.04.2025 – 08.04.2025</div>
                </div>
                <div className="e-right" style={{ justifyContent: "center" }}>
                  <div className="e-amount">4 000 ₽</div>
                </div>
              </div>
              <div className="exp-card">
                <div className="e-left">
                  <div className="e-name">Аванс</div>
                </div>
                <div className="e-right" style={{ justifyContent: "center" }}>
                  <div className="e-amount">4 000 ₽</div>
                </div>
              </div>
              <button className="acc-modal-outline" onClick={() => setView("advance")}>Добавить</button>
              <div className="acc-sec-h">Расходы</div>
              <p className="acc-sec-p" style={{ marginBottom: 16, color: "#787880", fontSize: 14, lineHeight: 1.2 }}>Укажите все расходы в поездке, на которые был потрачен выданный аванс. Указывать расходы по суточным не нужно.</p>
              <div className="exp-card">
                <div className="e-left">
                  <div className="e-name" style={{ marginBottom: 0, lineHeight: 1.15 }}>Такси до ресторана Twins Garden</div>
                  <div style={{ fontSize: 14, color: "#8c909c", marginTop: 0, fontWeight: 400, lineHeight: 1.15 }}>Расход</div>
                </div>
                <div className="e-right" style={{ justifyContent: "center" }}>
                  <div className="e-amount">4 000 ₽</div>
                </div>
              </div>
              <button className="acc-modal-outline" onClick={() => setView("expense")}>Добавить</button>
              <div className="acc-sec-h">Документы</div>
              <p className="acc-sec-p" style={{ marginBottom: 16, color: "#787880", fontSize: 14, lineHeight: 1.2 }}>Вы можете приложить подтверждающие расходы документы (например, квитанция, чек, накладная)</p>
              <button className="adv-addfile" style={{ height: 72, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2 }}>
                <span>Добавить файл</span>
                <span style={{ fontSize: 14, color: "#787880", fontWeight: 400 }}>(JPG, PNG, PDF, не более 10 Мб)</span>
              </button>
            </div>
            <div className="acc-drawer-foot" style={{ padding: "24px 0 0", borderTop: "none", display: "flex", gap: 14 }}>
              <button className="acc-btn-ghost" style={{ width: 140, flex: "0 0 140px", height: 52, borderRadius: 18, fontSize: 15, fontWeight: 500, background: "#eceef2", color: "#787880", border: "none", cursor: "pointer" }} onClick={() => setView("reports")}>Отмена</button>
              <button className="acc-btn-primary" style={{ flex: 1, height: 52, borderRadius: 18, fontSize: 15, fontWeight: 500, background: "#007bfb", color: "#fff", border: "none", cursor: "pointer" }} onClick={() => setView("reports")}>Сохранить</button>
            </div>
          </>
        )}

        {/* ---- Аванс ---- */}
        {view === "advance" && (
          <>
            <div className="acc-drawer-head" style={{ marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "none", padding: 0 }}>
              <h2 style={{ fontSize: 30, fontWeight: 700, margin: 0, color: "#17181c", letterSpacing: "-0.5px" }}>Аванс</h2>
              <button className="m-close" onClick={() => setView("report")} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><IcClose /></button>
            </div>
            <div className="acc-drawer-body" style={{ padding: 0, flex: 1, overflowY: "auto" }}>
              <p className="acc-sec-p" style={{ marginBottom: 18 }}>
                Укажите сумму аванса, которую сотрудник получил в кассе организации. Она будет отражена в авансовом отчёте.
              </p>
              <div className="acc-field" style={{ marginBottom: 10 }}>
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
              <div style={{ height: 1, background: "#e5e7ea", margin: "20px 0 16px" }} />
              <button className="adv-addfile">Добавить период</button>
            </div>
            <div className="acc-drawer-foot" style={{ padding: "24px 0 0", borderTop: "none", display: "flex", gap: 14 }}>
              <button className="acc-btn-ghost" style={{ width: 140, flex: "0 0 140px", height: 52, borderRadius: 18, fontSize: 15, fontWeight: 500, background: "#eceef2", color: "#787880", border: "none", cursor: "pointer" }} onClick={() => setView("report")}>Удалить</button>
              <button className="acc-btn-primary" style={{ flex: 1, height: 52, borderRadius: 18, fontSize: 15, fontWeight: 500, background: "#007bfb", color: "#fff", border: "none", cursor: "pointer" }} onClick={() => setView("report")}>Сохранить</button>
            </div>
          </>
        )}

        {/* ---- Расход ---- */}
        {view === "expense" && (
          <>
            <div className="acc-drawer-head" style={{ marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "none", padding: 0 }}>
              <h2 style={{ fontSize: 30, fontWeight: 700, margin: 0, color: "#17181c", letterSpacing: "-0.5px" }}>Расход</h2>
              <button className="m-close" onClick={() => setView("report")} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><IcClose /></button>
            </div>
            <div className="acc-drawer-body" style={{ padding: 0, flex: 1, overflowY: "auto" }}>
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
              <div className="adv-file"><IcDownload /><span className="fn" style={{ textAlign: "center" }}>DCIM_239029014_2390.png</span><IcTrash /></div>
              <button className="adv-addfile" style={{ height: 72, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, marginTop: 8 }}>
                <span>Добавить файл</span>
                <span style={{ fontSize: 14, color: "#787880", fontWeight: 400 }}>(JPG, PNG, PDF, не более 10 Мб)</span>
              </button>
            </div>
            <div className="acc-drawer-foot" style={{ padding: "24px 0 0", borderTop: "none", display: "flex", gap: 14 }}>
              <button className="acc-btn-ghost" style={{ width: 140, flex: "0 0 140px", height: 52, borderRadius: 18, fontSize: 15, fontWeight: 500, background: "#eceef2", color: "#787880", border: "none", cursor: "pointer" }} onClick={() => setView("report")}>Удалить</button>
              <button className="acc-btn-primary" style={{ flex: 1, height: 52, borderRadius: 18, fontSize: 15, fontWeight: 500, background: "#007bfb", color: "#fff", border: "none", cursor: "pointer" }} onClick={() => setView("report")}>Сохранить</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
