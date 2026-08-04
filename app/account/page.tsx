"use client";

import { useState } from "react";
import Header from "../Header";
import Link from "next/link";
import "./account.css";
import Sidebar from "./Sidebar";
import Messenger from "./Messenger";
import {
  IcCard, IcDots, IcBubble, IcLogout, IcClose, IcChevron, IcCalSmall, IcTrash,
  IcInfoSm, IcCheckSm, IcLockPurple, IcPersonBlue, IcShieldPurple, IcLockBlue,
  IcTwoLocks, IcPhoneBlue, IcMonitorBlue, IcTwoDevices, IcDeviceMonitor,
  IcDevicePhone, IcMenuUser, IcMenuHelp, IcMenuFeedback, IcLockTiny,
} from "./icons";

type Drawer = null | "security" | "personal" | "access";
type Modal =
  | null | "session" | "endall" | "2fa-disable" | "codepass"
  | "codepass-set" | "pass-current" | "pass-recovery" | "pass-new";

const REQS = [
  ["6+", "Не менее 6 символов"],
  ["Ff", "Строчные и прописные буквы"],
  ["1#!", "Цифры и другие символы"],
];

export default function Account() {
  const [drawer, setDrawer] = useState<Drawer>(null);
  const [modal, setModal] = useState<Modal>(null);
  const [activity, setActivity] = useState(false);
  const [messenger, setMessenger] = useState(false);
  const [disableMethod, setDisableMethod] = useState<"phone" | "email">("phone");

  const closeAll = () => {
    setDrawer(null);
    setModal(null);
    setActivity(false);
  };

  return (
    <div className="acc">
      <Sidebar />

      {/* ---------------- main ---------------- */}
      <main className="acc-main with-surface">
        <Header onMessengerClick={() => setMessenger(true)} onManageAccountClick={() => setDrawer("personal")} />

        <div className="acc-surface">
          <h1 className="acc-title">Ваш аккаунт</h1>

          <div className="acc-row">
            {/* profile */}
            <div className="acc-card acc-profile">
              <img className="p-av" src="/img/avatar.png" alt="" />
              <div className="p-name">Иван Вознесенский</div>
              <div className="p-phone">+7 913 ***-**-96</div>
              <div className="p-btns">
                <button className="acc-obtn">Сменить фото</button>
                <button className="acc-obtn red">
                  <IcLogout /> Выйти
                </button>
              </div>
            </div>

            {/* stats */}
            <div className="acc-card acc-stats">
              <div className="s-label">Ваша статистика</div>
              <div className="s-km">36 312 км</div>
              <div className="s-sub">мы прошли вместе</div>
              <div className="acc-statbox">
                <div className="st"><b>15</b><span>поездок</span></div>
                <div className="st"><b>2</b><span>страны</span></div>
                <div className="st"><b className="muted">6</b><span className="muted">городов</span></div>
              </div>
              <img className="s-bag" src="/img/backpack.png" alt="" />
            </div>
          </div>

          {/* settings */}
          <div className="acc-card acc-settings">
            <div className="set-left">
              <h2>Настройки</h2>
              <p>Управление вашим аккаунтом</p>
            </div>
            <div className="acc-optgrid">
              <button className="acc-opt" onClick={() => setDrawer("security")}>
                <img src="/img/settings-icons/Image.png" alt="" width={26} height={31} style={{ display: "block", objectFit: "contain" }} />
                <span className="o-label">Безопасность</span>
              </button>
              <button className="acc-opt" onClick={() => setDrawer("personal")}>
                <img src="/img/settings-icons/Image-1.png" alt="" width={26} height={31} style={{ display: "block", objectFit: "contain" }} />
                <span className="o-label">Личные данные</span>
              </button>
              <button className="acc-opt" onClick={() => setDrawer("access")}>
                <img src="/img/settings-icons/Image-2.png" alt="" width={26} height={31} style={{ display: "block", objectFit: "contain" }} />
                <span className="o-label">Доступ</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* ---------------- messenger ---------------- */}
      {messenger && <Messenger onClose={() => setMessenger(false)} />}

      {/* ---------------- drawers ---------------- */}
      {drawer === "security" && (
        <div className="acc-scrim" onClick={closeAll}>
          <div className={`acc-drawer ${activity ? "shoved" : ""}`} onClick={(e) => { e.stopPropagation(); if (activity) setActivity(false); }}>
            <div className="acc-drawer-head">
              <h1>Безопасность</h1>
              <button onClick={closeAll}><IcClose /></button>
            </div>
            <div className="acc-drawer-body">
              <div className="acc-sec-h">История активности</div>
              <p className="acc-sec-p">История действий пользователя внутри этой компании.</p>
              <div className="acc-listcard">
                <div className="lc-main"><b>2</b><span>активных сеанса</span></div>
                <button className="acc-pill-btn" onClick={() => setActivity(true)}>Смотреть</button>
              </div>

              <div className="acc-sec-h">Двухфакторная аутентификация</div>
              <p className="acc-sec-p">Для входа с нового устройства понадобится подтверждение через телефон.</p>
              <div className="acc-listcard">
                <div className="lc-main"><b>Подключена</b><span>10.01.2025</span></div>
                <button className="acc-pill-btn" onClick={() => setModal("2fa-disable")}>Изменить</button>
              </div>

              <div className="acc-sec-h">Пароль</div>
              <p className="acc-sec-p">Старайтесь обновлять пароль как минимум раз в 4 месяца.</p>
              <div className="acc-listcard">
                <div className="lc-main"><b>Надежный</b><span>Обновлен 10.01.2025</span></div>
                <button className="acc-pill-btn" onClick={() => setModal("pass-current")}>Изменить</button>
              </div>
            </div>
            <div className="acc-drawer-foot">
              <button className="acc-btn-ghost" onClick={closeAll}>Отмена</button>
              <button className="acc-btn-primary" onClick={closeAll}>Сохранить</button>
            </div>
          </div>

          {/* activity sub-drawer stacked */}
          {activity && (
            <div className="acc-drawer stacked" onClick={(e) => e.stopPropagation()}>
              <div className="acc-drawer-head">
                <h1>История активности</h1>
                <button onClick={() => setActivity(false)}><IcClose /></button>
              </div>
              <div className="acc-drawer-body">
                <p className="acc-sec-p" style={{ marginBottom: 18 }}>
                  Список всех устройств, на которых был выполнен вход в аккаунт.
                  Нажмите на сеанс, чтобы узнать подробную информацию.
                </p>
                <div className="acc-device" onClick={() => setModal("session")}>
                  <span className="d-ico"><IcDeviceMonitor /></span>
                  <div className="d-name"><b>Windows</b><span>Сегодня в 11:45</span></div>
                  <div className="d-right"><b>Yandex Browser</b><span>Москва</span></div>
                </div>
                <div className="acc-device" onClick={() => setModal("session")}>
                  <span className="d-ico"><IcDevicePhone /></span>
                  <div className="d-name"><b>iPhone 15</b><span>Сегодня в 11:45</span></div>
                  <div className="d-right"><b>Safari</b><span>Новосибирск</span></div>
                </div>
                <div className="acc-device" onClick={() => setModal("session")}>
                  <span className="d-ico"><IcDevicePhone /></span>
                  <div className="d-name"><b>Xiaomi</b><span>Сегодня в 11:45</span></div>
                  <div className="d-right"><b>Google Chrome</b><span>Москва</span></div>
                </div>
              </div>
              <div className="acc-drawer-foot">
                <button className="acc-btn-ghost" onClick={() => setActivity(false)}>Отмена</button>
                <button className="acc-btn-red" onClick={() => setModal("endall")}>Завершить все сеансы</button>
              </div>
            </div>
          )}
        </div>
      )}

      {drawer === "personal" && (
        <div className="acc-scrim" onClick={closeAll}>
          <div className="acc-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="acc-drawer-head">
              <h1>Личные данные</h1>
              <button onClick={closeAll}><IcClose /></button>
            </div>
            <div className="acc-drawer-body">
              <div className="acc-sec-h" style={{ marginTop: 4 }}>Личные данные</div>
              <div style={{ height: 8 }} />
              <div className="acc-grid2">
                <Field label="Фамилия" value="Вознесенский" />
                <Field label="Имя" value="Иван" />
              </div>
              <div className="acc-grid2">
                <Field label="Отчество" value="Сергеевич" />
                <div className="acc-check" style={{ paddingLeft: 6 }}>
                  <span className="box" /> Нет отчества
                </div>
              </div>
              <div className="acc-fullrow"><Field label="Пол" value="Мужской" options={["Мужской", "Женский"]} /></div>
              <div className="acc-fullrow"><Field label="Дата рождения" value="18 марта 1999" cal /></div>
              <div className="acc-grid2">
                <Field label="Фамилия (латиница)" value="Voznesenskiy" />
                <Field label="Имя (латиница)" value="Ivan" />
              </div>
              <div className="acc-sec-h">Контакты</div>
              <div style={{ height: 8 }} />
              <div className="acc-grid2">
                <Field label="Телефон" value="+7 913 390 38 90" />
                <Field label="Email" value="ivanov.ivan@mail.ru" />
              </div>
              <div className="acc-sec-h">Документы</div>
              <div style={{ height: 8 }} />
              <div className="acc-grid2">
                <Field label="Тип документа" value="Паспорт РФ" options={["Паспорт РФ", "Загранпаспорт", "Водительское удостоверение", "Свидетельство о рождении"]} />
                <Field label="Серия и номер" value="5555 666666" trash />
              </div>
              <div className="acc-group-divider" />
              <div className="acc-grid2">
                <Field label="Тип документа" value="Паспорт РФ" options={["Паспорт РФ", "Загранпаспорт", "Водительское удостоверение", "Свидетельство о рождении"]} />
                <Field label="Серия и номер" value="5555 666666" trash />
              </div>
              <div className="acc-fullrow" style={{ width: "calc(50% - 6px)" }}>
                <Field label="Срок действия" value="29.06.2035" cal />
              </div>
              <div className="acc-group-divider" />
              <button className="acc-modal-outline">Добавить документ</button>

              <div className="acc-sec-h">Бонусные карты</div>
              <div style={{ height: 8 }} />
              <div className="acc-grid2">
                <Field label="Компания" value="S7 Airlines" options={["S7 Airlines", "РЖД", "Аэрофлот", "Уральские авиалинии", "Победа"]} />
                <Field label="Номер карты" value="4389403948" trash />
              </div>
              <div className="acc-group-divider" />
              <div className="acc-grid2">
                <Field label="Компания" value="РЖД" options={["S7 Airlines", "РЖД", "Аэрофлот", "Уральские авиалинии", "Победа"]} />
                <Field label="Номер карты" value="4389403948" trash />
              </div>
              <div className="acc-group-divider" />
              <button className="acc-modal-outline">Добавить карту</button>
            </div>
            <div className="acc-drawer-foot">
              <button className="acc-btn-ghost" onClick={closeAll}>Отмена</button>
              <button className="acc-btn-primary" onClick={closeAll}>Сохранить</button>
            </div>
          </div>
        </div>
      )}

      {drawer === "access" && (
        <div className="acc-scrim" onClick={closeAll}>
          <div className="acc-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="acc-drawer-head">
              <h1>Доступ</h1>
              <button onClick={closeAll}><IcClose /></button>
            </div>
            <div className="acc-drawer-body">
              <div className="acc-sec-h" style={{ marginTop: 4 }}>Внештат ID</div>
              <div style={{ height: 10 }} />
              <div className="acc-listcard" style={{ alignItems: "flex-start" }}>
                <div className="lc-main">
                  <b style={{ fontSize: 18 }}>@ivanvozns</b>
                  <span style={{ color: "var(--blue)" }}>Онлайн</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 170 }}>
                  <button className="acc-id-btn outline">
                    <span>Подключен</span>
                    <span className="acc-blue-check"><IcCheckSm /></span>
                  </button>
                  <button className="acc-id-btn ghost">
                    <span>Настройки</span>
                  </button>
                </div>
              </div>
              <div className="acc-sec-h">Доступ</div>
              <div style={{ height: 8 }} />
              <div className="acc-grid2">
                <Field label="Уровень" value="Сотрудник" options={["Сотрудник", "Руководитель", "Администратор"]} />
                <Field label="Срок действия" value="Бессрочно" cal />
              </div>
              <div className="acc-sec-h">Тревел-политика</div>
              <div style={{ height: 8 }} />
              <div className="acc-fullrow"><Field label="Авиабилеты" value="Линейный персонал" options={["Линейный персонал", "Руководство", "Бизнес-класс"]} /></div>
              <div className="acc-fullrow"><Field label="Билеты на поезд" value="Линейный персонал" options={["Линейный персонал", "Руководство", "Купе / СВ"]} /></div>
              <div className="acc-fullrow"><Field label="Проживание" value="Линейный персонал" options={["Линейный персонал", "Руководство", "Отель 4-5*"]} /></div>
              <div className="acc-fullrow"><Field label="Такси" value="Руководство" options={["Руководство", "Линейный персонал", "Комфорт+"]} /></div>
              <div className="acc-sec-h">Согласование</div>
              <div style={{ height: 8 }} />
              <div className="acc-grid2">
                <Field label="Поездок" value="По умолчанию" options={["По умолчанию", "Требует согласования"]} />
                <Field label="Авансовых отчетов" value="По умолчанию" options={["По умолчанию", "Требует согласования"]} />
              </div>
              <div className="acc-sec-h">Контакты</div>
              <div style={{ height: 8 }} />
              <div className="acc-grid2">
                <Field label="Телефон" value="+7 913 390 38 90" />
                <Field label="Email" value="ivanov.ivan@mail.ru" />
              </div>
              <div className="acc-sec-h">Периоды отсутствия</div>
              <div style={{ height: 8 }} />
              <div className="acc-grid2">
                <Field label="Дата от" value="19.04.2025" cal />
                <Field label="Дата до" value="28.04.2025" cal />
              </div>
              <div className="acc-fullrow">
                <Field label="Заместитель" value="Соколовская Анастасия" options={["Соколовская Анастасия", "Вознесенский Иван", "Петров Алексей"]} />
              </div>
              <button className="acc-modal-outline" style={{ marginTop: 15 }}>Добавить период</button>
            </div>
            <div className="acc-drawer-foot">
              <button className="acc-btn-ghost" onClick={closeAll}>Отмена</button>
              <button className="acc-btn-primary" onClick={closeAll}>Сохранить</button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- centered modals ---------------- */}
      {modal === "session" && (
        <ModalScrim onClose={() => setModal(null)}>
          <SessionCard onClose={() => setModal(null)} />
        </ModalScrim>
      )}

      {modal === "endall" && (
        <ModalScrim onClose={() => setModal(null)}>
          <div className="acc-modal center-c" style={{ width: 340 }}>
            <button className="acc-modal-x" onClick={() => setModal(null)}><IcClose size={20} /></button>
            <div className="m-ico"><IcTwoDevices /></div>
            <h3>Завершить<br />все сеансы?</h3>
            <p className="m-sub">На всех устройствах произойдет принудительный выход.</p>
            <button className="acc-modal-btn" onClick={() => setModal(null)}>Да, завершить</button>
          </div>
        </ModalScrim>
      )}

      {modal === "2fa-enable" && (
        <ModalScrim onClose={() => setModal(null)}>
          <div className="acc-modal center-c" style={{ width: 340, padding: "32px 28px 32px", borderRadius: 36 }}>
            <button className="acc-modal-x" onClick={() => setModal(null)}><IcClose size={20} /></button>
            <div className="m-ico" style={{ margin: "10px 0 20px", color: "#007bfe", transform: "scale(1.2)" }}>
              <IcTwoLocks />
            </div>
            <h3 style={{ fontSize: 22, fontWeight: 600, color: "#121212", marginBottom: 8, textAlign: "center", lineHeight: 1.25 }}>
              Двухфакторная<br />аутентификация
            </h3>
            <p className="m-sub" style={{ fontSize: 14, color: "#8a8c93", marginBottom: 28, textAlign: "center", maxWidth: 260, lineHeight: 1.35 }}>
              Дополнительная защита.<br />Входите в сервис через пароль<br />и одноразовый код.
            </p>
            <button
              className="acc-modal-btn"
              style={{ width: "100%", height: 50, borderRadius: 16, background: "#007BFB", fontSize: 16, fontWeight: 600, color: "#ffffff" }}
              onClick={() => setModal("2fa-disable")}
            >
              Подключить
            </button>
          </div>
        </ModalScrim>
      )}

      {modal === "2fa-disable" && (
        <ModalScrim onClose={() => setModal(null)}>
          <div className="acc-modal center-c" style={{ width: 370, padding: "32px 28px 32px", borderRadius: 36 }}>
            <button className="acc-modal-x" onClick={() => setModal(null)}><IcClose size={20} /></button>
            <div className="m-ico" style={{ margin: "10px 0 20px", color: "#ff4d4f", transform: "scale(1.2)" }}>
              <IcTwoLocks />
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 600, color: "#121212", marginBottom: 18, textAlign: "center", lineHeight: 1.25 }}>
              Отключить<br />Двухфакторную<br />аутентификацию
            </h3>
            <div className="acc-seg" style={{ marginBottom: 14 }}>
              <span className="seg-pill" style={{ transform: disableMethod === "phone" ? "translateX(0)" : "translateX(100%)" }} />
              <button onClick={() => setDisableMethod("phone")}>Телефон</button>
              <button onClick={() => setDisableMethod("email")}>Почта</button>
            </div>
            <input className="acc-input" style={{ borderRadius: 18, height: 48, marginBottom: 8 }} placeholder={disableMethod === "phone" ? "Номер телефона" : "Email"} />
            <div className="acc-input-wrap" style={{ width: "100%", marginBottom: 24 }}>
              <input className="acc-input" style={{ borderRadius: 18, height: 48 }} placeholder={disableMethod === "phone" ? "Код из СМС" : "Код из письма"} />
              <span className="info"><IcInfoSm /></span>
            </div>
            <button
              className="acc-modal-btn"
              style={{ width: "100%", height: 50, borderRadius: 16, background: "#ff4d4f", fontSize: 16, fontWeight: 600, color: "#ffffff" }}
              onClick={() => setModal(null)}
            >
              Отключить
            </button>
          </div>
        </ModalScrim>
      )}

      {modal === "codepass-set" && (
        <ModalScrim onClose={() => setModal(null)}>
          <div className="acc-modal center-c">
            <button className="acc-modal-x" onClick={() => setModal(null)}><IcClose size={20} /></button>
            <div className="m-ico"><IcLockBlue /></div>
            <h3>Код установлен</h3>
            <p className="m-sub">Блокируйте экран сервиса от посторонних глаз.</p>
            <div className="acc-field" style={{ width: "100%", marginBottom: 12, textAlign: "left" }}>
              <label>Блокировка при неактивности</label>
              <div className="val">1 час</div>
              <span className="chev"><IcChevron /></span>
            </div>
            <button className="acc-modal-outline" onClick={() => setModal("codepass")}>Изменить код-пароль</button>
            <button className="acc-modal-outline red" onClick={() => setModal(null)}>Удалить код-пароль</button>
            <button className="acc-modal-btn" onClick={() => setModal(null)}>Сохранить</button>
          </div>
        </ModalScrim>
      )}

      {modal === "codepass" && (
        <ModalScrim onClose={() => setModal(null)}>
          <div className="acc-modal center-c">
            <button className="acc-modal-x" onClick={() => setModal(null)}><IcClose size={20} /></button>
            <div className="m-ico"><IcLockBlue /></div>
            <h3>Код-пароль</h3>
            <p className="m-sub">Блокируйте экран сервиса от посторонних глаз.</p>
            <input className="acc-input" placeholder="Код-пароль" />
            <input className="acc-input" placeholder="Повторите" />
            <button className="acc-modal-btn" onClick={() => setModal("codepass-set")}>Далее</button>
          </div>
        </ModalScrim>
      )}

      {modal === "pass-current" && (
        <ModalScrim onClose={() => setModal(null)}>
          <div className="acc-modal center-c">
            <button className="acc-modal-x" onClick={() => setModal(null)}><IcClose size={20} /></button>
            <div className="m-dots">{[0,0,0,0,0,0].map((_, i) => <span key={i} />)}</div>
            <h3>Введите<br />текущий пароль</h3>
            <div style={{ height: 8 }} />
            <div className="acc-input-wrap">
              <input className="acc-input" type="password" placeholder="Пароль" />
              <span className="info"><IcInfoSm /></span>
            </div>
            <div className="acc-modal-hint">Не помню пароль</div>
            <button className="acc-modal-btn" onClick={() => setModal("pass-recovery")}>Далее</button>
          </div>
        </ModalScrim>
      )}

      {modal === "pass-recovery" && (
        <ModalScrim onClose={() => setModal(null)}>
          <div className="acc-modal center-c">
            <button className="acc-modal-x" onClick={() => setModal(null)}><IcClose size={20} /></button>
            <div className="m-ico"><IcMonitorBlue /></div>
            <h3>Восстановление<br />доступа</h3>
            <div style={{ height: 8 }} />
            <div className="acc-seg">
              <span className="seg-pill" style={{ transform: disableMethod === "phone" ? "translateX(0)" : "translateX(100%)" }} />
              <button onClick={() => setDisableMethod("phone")}>Телефон</button>
              <button onClick={() => setDisableMethod("email")}>Почта</button>
            </div>
            <input className="acc-input" placeholder={disableMethod === "phone" ? "Номер телефона" : "Email"} />
            <div className="acc-input-wrap">
              <input className="acc-input" placeholder={disableMethod === "phone" ? "Код из СМС" : "Код из письма"} />
              <span className="info"><IcInfoSm /></span>
            </div>
            <button className="acc-modal-btn" onClick={() => setModal("pass-new")}>Далее</button>
          </div>
        </ModalScrim>
      )}

      {modal === "pass-new" && (
        <ModalScrim onClose={() => setModal(null)}>
          <div className="acc-modal center-c">
            <button className="acc-modal-x" onClick={() => setModal(null)}><IcClose size={20} /></button>
            <div className="m-dots">{[0,0,0,0,0,0].map((_, i) => <span key={i} />)}</div>
            <h3>Придумайте<br />новый пароль</h3>
            <div style={{ height: 8 }} />
            <input className="acc-input" type="password" placeholder="Новый пароль" />
            <input className="acc-input" type="password" placeholder="Повторите" />
            <div className="acc-reqs">
              {REQS.map(([k, v]) => (
                <div key={k}><b>{k}</b><span>{v}</span></div>
              ))}
            </div>
            <button className="acc-modal-btn" onClick={() => setModal(null)}>Сохранить</button>
          </div>
        </ModalScrim>
      )}
    </div>
  );
}

/* ---------- helpers ---------- */
function Field({
  label, value, chevron, cal, trash, options,
}: {
  label: string;
  value: string;
  chevron?: boolean;
  cal?: boolean;
  trash?: boolean;
  options?: string[];
}) {
  const [val, setVal] = useState(value);
  const [openSelect, setOpenSelect] = useState(false);
  const [openCal, setOpenCal] = useState(false);

  // Calendar popover state
  const [currentMonth, setCurrentMonth] = useState(2); // 2 = March
  const [currentYear, setCurrentYear] = useState(1999);
  const [selectedDay, setSelectedDay] = useState(18);

  const months = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
  ];
  const monthsGen = [
    "января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря"
  ];

  const hasChevron = chevron || !!options;

  const handleSelectDay = (day: number) => {
    setSelectedDay(day);
    if (label.toLowerCase().includes("срок")) {
      const mm = String(currentMonth + 1).padStart(2, "0");
      const dd = String(day).padStart(2, "0");
      setVal(`${dd}.${mm}.${currentYear}`);
    } else {
      setVal(`${day} ${monthsGen[currentMonth]} ${currentYear}`);
    }
    setOpenCal(false);
  };

  return (
    <div className="acc-field-wrap" style={{ position: "relative", width: "100%" }}>
      <div
        className={`acc-field ${hasChevron || cal ? "clickable" : ""}`}
        onClick={() => {
          if (hasChevron) setOpenSelect(!openSelect);
          if (cal) setOpenCal(!openCal);
        }}
      >
        <label>{label}</label>
        <div className="val">{val}</div>
        {hasChevron && <span className="chev"><IcChevron /></span>}
        {cal && <span className="cal"><IcCalSmall /></span>}
        {trash && <span className="cal"><IcTrash /></span>}
      </div>

      {/* Select popover */}
      {openSelect && options && (
        <div className="acc-select-popover" onClick={(e) => e.stopPropagation()}>
          {options.map((opt) => (
            <div
              key={opt}
              className={`acc-select-opt ${opt === val ? "active" : ""}`}
              onClick={() => {
                setVal(opt);
                setOpenSelect(false);
              }}
            >
              <span>{opt}</span>
              {opt === val && <IcCheckSm />}
            </div>
          ))}
        </div>
      )}

      {/* Calendar popover */}
      {openCal && (
        <div className="acc-cal-popover" onClick={(e) => e.stopPropagation()}>
          <div className="acc-cal-head">
            <button
              type="button"
              onClick={() => {
                if (currentMonth === 0) {
                  setCurrentMonth(11);
                  setCurrentYear(currentYear - 1);
                } else {
                  setCurrentMonth(currentMonth - 1);
                }
              }}
            >
              &lt;
            </button>
            <span>{months[currentMonth]} {currentYear}</span>
            <button
              type="button"
              onClick={() => {
                if (currentMonth === 11) {
                  setCurrentMonth(0);
                  setCurrentYear(currentYear + 1);
                } else {
                  setCurrentMonth(currentMonth + 1);
                }
              }}
            >
              &gt;
            </button>
          </div>
          <div className="acc-cal-week">
            <span>Пн</span><span>Вт</span><span>Ср</span><span>Чт</span><span>Пт</span><span>Сб</span><span>Вс</span>
          </div>
          <div className="acc-cal-days">
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={`empty-${i}`} className="empty" />
            ))}
            {Array.from({ length: 31 }).map((_, i) => {
              const day = i + 1;
              const isSelected = day === selectedDay;
              return (
                <button
                  type="button"
                  key={day}
                  className={`day-btn ${isSelected ? "selected" : ""}`}
                  onClick={() => handleSelectDay(day)}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function ModalScrim({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="acc-scrim center" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}

function SessionCard({ onClose }: { onClose: () => void }) {
  return (
    <div className="acc-modal" style={{ width: 440 }}>
      <button className="acc-modal-x" onClick={onClose}><IcClose size={20} /></button>
      <div className="acc-modal-title-row">
        <IcDevicePhone />
        <h3>Xiaomi 22031847G</h3>
      </div>
      <div className="acc-kv"><span className="k">Место</span><span className="v">Новосибирск</span></div>
      <div className="acc-kv"><span className="k">Время</span><span className="v">Сегодня в 11:24</span></div>
      <div className="acc-kv"><span className="k">Приложение</span><span className="v">Google Chrome</span></div>
      <div className="acc-kv"><span className="k">IP-адрес</span><span className="v">37.182.382.209</span></div>
      <div className="acc-kv"><span className="k">Статус</span><span className="v blue">Активен</span></div>
      <button className="acc-modal-btn" onClick={onClose}>Завершить сеанс</button>
    </div>
  );
}
