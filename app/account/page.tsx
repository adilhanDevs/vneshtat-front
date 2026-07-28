"use client";

import { useState } from "react";
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
import { AiFillClockCircle } from "react-icons/ai";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

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
  const [menu, setMenu] = useState(false);
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
      <main className="acc-main">
        <div className="acc-top">
          <div className="acc-balance shadow-sm">
            <span className="b-alfa">Альфа</span>
            <span className="b-div" />
            <span className="b-amount"><IcCard /> 490 000 ₽</span>
            <span className="b-div" />
            <div className="flex items-center relative">
              <div className="w-4.5 h-4.5 bg-gray-300 rounded-full absolute top-0.4 right-2"></div>
              <AiFillClockCircle className="text-xl text-gray-400 z-10" />
              <div className="w-4.5 h-4.5 rounded-full"></div>
            </div>
          </div>
          <div className="acc-top-right">
            <button className="acc-iconbtn"><IcDots /></button>
            <button className="acc-iconbtn" onClick={() => setMessenger(true)}><IoChatboxEllipsesOutline className="text-xl text-gray-500" /></button>
            <img
              className="acc-avatar"
              src="/img/avatar-sm.png"
              alt=""
              onClick={() => setMenu((v) => !v)}
            />
          </div>
        </div>

        <h1 className="acc-title">Ваш аккаунт</h1>

        <div className="acc-row">
          {/* profile */}
          <div className="acc-card acc-profile shadow-sm">
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
          <div className="acc-card acc-stats shadow-sm">
            <div className="s-label">Ваша статистика</div>
            <div className="s-km">36 312 км</div>
            <div className="s-sub">мы прошли вместе</div>
            <div className="acc-statbox">
              <div className="st"><b>15</b><span>поездок</span></div>
              <div className="st"><b>2</b><span>страны</span></div>
              <div className="st"><b>6</b><span>городов</span></div>
            </div>
            <img className="s-bag" src="/img/backpack.png" alt="" />
          </div>
        </div>

        {/* settings */}
        <div className="acc-card acc-settings shadow-sm">
          <div className="set-left">
            <h2>Настройки</h2>
            <p>Управление вашим аккаунтом</p>
          </div>
          <div className="acc-optgrid">
            <button className="acc-opt" onClick={() => setDrawer("security")}>
              <IcLockPurple />
              <span className="o-label">Безопасность</span>
            </button>
            <button className="acc-opt" onClick={() => setDrawer("personal")}>
              <IcPersonBlue />
              <span className="o-label">Личные данные</span>
            </button>
            <button className="acc-opt" onClick={() => setDrawer("access")}>
              <IcShieldPurple />
              <span className="o-label">Доступ</span>
            </button>
          </div>
        </div>
      </main>

      {/* ---------------- messenger ---------------- */}
      {messenger && <Messenger onClose={() => setMessenger(false)} />}

      {/* ---------------- account dropdown ---------------- */}
      {menu && (
        <>
          <div style={{ position: "fixed", inset: 0, zIndex: 55 }} onClick={() => setMenu(false)} />
          <div className="acc-menu">
            <div className="mn-top">
              <span className="mn-lock"><IcLockTiny /></span>
              <button className="mn-x" onClick={() => setMenu(false)}><IcClose size={18} /></button>
              <img className="mn-av" src="/img/avatar.png" alt="" />
              <div className="mn-name">Иван Вознесенский</div>
              <div className="mn-phone">+7 913 ***-**-96</div>
            </div>
            <div className="mn-sep" />
            <a onClick={() => { setMenu(false); setDrawer("personal"); }}><IcMenuUser /> Управление аккаунтом</a>
            <a><IcMenuHelp /> Справка</a>
            <a><IcMenuFeedback /> Обратная связь</a>
            <Link href="/" className="red"><IcLogout /> Выйти из аккаунта</Link>
          </div>
        </>
      )}

      {/* ---------------- drawers ---------------- */}
      {drawer === "security" && (
        <div className="acc-scrim" onClick={closeAll}>
          <div className="acc-drawer" onClick={(e) => e.stopPropagation()}>
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

              <div className="acc-sec-h">Блокировка экрана</div>
              <p className="acc-sec-p">Блокируйте экран сервиса от посторонних глаз с помощью код-пароля.</p>
              <div className="acc-listcard" style={{ marginBottom: 8 }}>
                <div className="lc-main"><b>Код установлен</b><span>Блокировка через 1 час неактивности</span></div>
                <button className="acc-pill-btn" onClick={() => setModal("codepass-set")}>Изменить</button>
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
              <div style={{ height: 10 }} />
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
              <div className="acc-fullrow"><Field label="Пол" value="Мужской" chevron /></div>
              <div className="acc-fullrow"><Field label="Дата рождения" value="18 марта 1999" cal /></div>
              <div className="acc-grid2">
                <Field label="Фамилия (латиница)" value="Voznesenskiy" />
                <Field label="Имя (латиница)" value="Ivan" />
              </div>
              <div className="acc-sec-h">Контакты</div>
              <div style={{ height: 10 }} />
              <div className="acc-grid2">
                <Field label="Телефон" value="+7 913 390 38 90" />
                <Field label="Email" value="ivanov.ivan@mail.ru" />
              </div>
              <div className="acc-sec-h">Документы</div>
              <div style={{ height: 10 }} />
              <div className="acc-grid2">
                <Field label="Тип документа" value="Паспорт РФ" chevron />
                <Field label="Серия и номер" value="5555 666666" trash />
              </div>
              <div className="acc-fullrow" style={{ width: "calc(50% - 6px)" }}>
                <Field label="Срок действия" value="29.06.2035" cal />
              </div>
              <button className="acc-modal-outline">Добавить документ</button>
              <div className="acc-sec-h">Бонусные карты</div>
              <div style={{ height: 10 }} />
              <div className="acc-grid2">
                <Field label="Компания" value="S7 Airlines" chevron />
                <Field label="Номер карты" value="4389403948" trash />
              </div>
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
                <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
                  <button className="acc-modal-outline" style={{ width: "auto", height: 38, padding: "0 16px", margin: 0, display: "flex", alignItems: "center", gap: 8 }}>
                    Подключен <IcCheckSm />
                  </button>
                  <button className="acc-btn-ghost" style={{ height: 38, padding: "0 22px", fontSize: 14 }}>Настройки</button>
                </div>
              </div>
              <div className="acc-sec-h">Доступ</div>
              <div style={{ height: 10 }} />
              <div className="acc-grid2">
                <Field label="Уровень" value="Сотрудник" chevron />
                <Field label="Срок действия" value="Бессрочно" cal />
              </div>
              <div className="acc-sec-h">Тревел-политика</div>
              <div style={{ height: 10 }} />
              <div className="acc-fullrow"><Field label="Авиабилеты" value="Линейный персонал" chevron /></div>
              <div className="acc-fullrow"><Field label="Билеты на поезд" value="Линейный персонал" chevron /></div>
              <div className="acc-fullrow"><Field label="Проживание" value="Линейный персонал" chevron /></div>
              <div className="acc-fullrow"><Field label="Такси" value="Руководство" chevron /></div>
              <div className="acc-sec-h">Согласование</div>
              <div style={{ height: 10 }} />
              <div className="acc-grid2">
                <Field label="Поездок" value="По умолчанию" chevron />
                <Field label="Авансовых отчетов" value="По умолчанию" chevron />
              </div>
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

      {modal === "2fa-disable" && (
        <ModalScrim onClose={() => setModal(null)}>
          <div className="acc-modal center-c">
            <button className="acc-modal-x" onClick={() => setModal(null)}><IcClose size={20} /></button>
            <div className="m-ico"><IcTwoLocks /></div>
            <h3 style={{ marginBottom: 18 }}>Отключить<br />Двухфакторную<br />аутентификацию</h3>
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
            <button className="acc-modal-btn coral" onClick={() => setModal(null)}>Отключить</button>
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
  label, value, chevron, cal, trash,
}: {
  label: string; value: string; chevron?: boolean; cal?: boolean; trash?: boolean;
}) {
  return (
    <div className="acc-field">
      <label>{label}</label>
      <div className="val">{value}</div>
      {chevron && <span className="chev"><IcChevron /></span>}
      {cal && <span className="cal"><IcCalSmall /></span>}
      {trash && <span className="cal"><IcTrash /></span>}
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
    <div className="acc-modal" style={{ width: 380 }}>
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
