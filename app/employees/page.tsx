"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "../account/account.css";
import "./employees.css";
import Sidebar from "../account/Sidebar";
import Messenger from "../account/Messenger";
import {
  IcCard, IcDots, IcBubble, IcClose, IcChevron, IcCalSmall, IcCheckSm,
  IcPeople2, IcCluster3, IcCluster4, IcBan, IcEdit, IcTrash, IcArchive,
  IcMenuChat, IcInfoCircle, IcPlusField,
} from "../account/icons";

type ListT = null | "employees" | "departments" | "groups" | "passengers";
type CardT = null | "employee" | "passenger" | "department" | "group";
export default function Employees() {
  const router = useRouter();
  const [list, setList] = useState<ListT>(null);
  const [card, setCard] = useState<CardT>(null);
  const [empty, setEmpty] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [messenger, setMessenger] = useState(false);
  const [ctx, setCtx] = useState<string | null>(null);
  const [tab, setTab] = useState<"data" | "access" | "travel">("data");
  const [hasData, setHasData] = useState(true);

  const openCard = (c: CardT, isEmpty = false) => {
    setEmpty(isEmpty);
    setTab("data");
    setCard(c);
    setCtx(null);
  };
  const closeAll = () => { setList(null); setCard(null); setAddOpen(false); };

  return (
    <div className="acc">
      <Sidebar active="desk" />

      <main className="acc-main with-surface">
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

        <div className="acc-surface">
          <h1 className="acc-title" style={{ cursor: "pointer" }} onClick={() => setHasData((v) => !v)}>Сотрудники</h1>

        {hasData ? (
          <div className="emp-row">
            <div className="emp-card">
              <div className="e-ico"><IcPeople2 /></div>
              <div className="e-num blue">99 сотрудников</div>
              <div className="emp-btns">
                <button className="emp-btn" onClick={() => setList("employees")}>Открыть список</button>
                <div className="row2">
                  <button className="emp-btn blue" onClick={() => setAddOpen(true)}>Добавить</button>
                  <button className="emp-btn" onClick={() => setMessenger(true)}>Сообщения</button>
                </div>
              </div>
            </div>
            <div className="emp-card">
              <div className="e-ico"><IcCluster3 /></div>
              <div className="e-num">4 отдела</div>
              <div className="emp-btns">
                <button className="emp-btn" onClick={() => setList("departments")}>Открыть список</button>
              </div>
            </div>
            <div className="emp-card">
              <div className="e-ico"><IcCluster4 /></div>
              <div className="e-num">8 групп</div>
              <div className="emp-btns">
                <button className="emp-btn" onClick={() => setList("passengers")}>Пассажиры</button>
                <button className="emp-btn" onClick={() => setList("groups")}>Открыть список</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="emp-row">
            <div className="emp-card">
              <div className="e-ico"><IcPeople2 /></div>
              <div className="e-num grey">Нет сотрудников</div>
              <div className="emp-btns">
                <button className="emp-btn blue" onClick={() => setAddOpen(true)}>Добавить</button>
              </div>
            </div>
            <div className="emp-card">
              <div className="e-ico"><IcCluster3 /></div>
              <div className="e-num grey">Нет отделов</div>
              <div className="emp-btns">
                <button className="emp-btn blue" onClick={() => openCard("department", true)}>Добавить</button>
              </div>
            </div>
            <div className="emp-card">
              <div className="e-ico"><IcCluster4 /></div>
              <div className="e-num grey">Нет групп</div>
              <div className="emp-btns">
                <button className="emp-btn" onClick={() => setList("passengers")}>Пассажиры</button>
                <button className="emp-btn blue" onClick={() => openCard("group", true)}>Добавить</button>
              </div>
            </div>
          </div>
        )}

        <div className="acc-card emp-manage">
          <div className="m-left">
            <h2>Управление</h2>
            <p>Настройка ограничений и полномочий сотрудников</p>
          </div>
          <div className="emp-optgrid">
            <div className="emp-opt">
              <span className="o-emoji">👌</span>
              <span className="o-badge">Изменение</span>
              <span className="o-label">Согласование</span>
            </div>
            <div className="emp-opt">
              <span className="o-emoji">✨</span>
              <span className="o-badge">Изменение</span>
              <span className="o-label">Тревел-<br />политика</span>
            </div>
            <div className="emp-opt">
              <span className="o-emoji">🎯</span>
              <span className="o-label">Центры<br />затрат</span>
            </div>
          </div>
        </div>

        <div className="emp-secbar">
          <div className="bar">
            <button onClick={() => router.push("/company")}>Компания</button>
            <button onClick={() => router.push("/finance")}>Финансы</button>
            <button className="on">Сотрудники</button>
          </div>
        </div>
      </div>
    </main>

      {messenger && <Messenger onClose={() => setMessenger(false)} />}

      {/* ============ list drawers ============ */}
      {list && (
        <div className="acc-scrim" onClick={closeAll}>
          {/* --- employees list --- */}
          {list === "employees" && (
            <div className="acc-drawer" onClick={(e) => e.stopPropagation()}>
              <div className="acc-drawer-head">
                <h1>Сотрудники</h1>
                <button onClick={closeAll}><IcClose /></button>
              </div>
              <div className="acc-drawer-body" onClick={() => setCtx(null)}>
                <input className="msg-search" placeholder="Поиск" />
                {[
                  { id: "e1", name: "Яковлев Николай Никитич", on: true, av: "/img/avatar.png" },
                  { id: "e2", name: "Анастасия Александровна Белосельская-Белозерская", on: false, av: "/img/avatar.png" },
                  { id: "e3", name: "Яковлев Николай Никитич", on: true, av: "/img/avatar.png" },
                ].map((e) => (
                  <div key={e.id} className="msg-item" onClick={() => openCard("employee")}>
                    <img className="m-av" src={e.av} alt="" />
                    <div className="m-body">
                      <div className="m-name">{e.name}{e.on && <span className="tag-on">Онлайн</span>}</div>
                    </div>
                    <div className="m-right">
                      <button className="msg-dots" onClick={(ev) => { ev.stopPropagation(); setCtx(ctx === e.id ? null : e.id); }}><IcDots /></button>
                    </div>
                    {ctx === e.id && (
                      <div className="msg-ctx" style={{ right: 10, top: 44 }} onClick={(ev) => ev.stopPropagation()}>
                        <button onClick={() => { setCtx(null); openCard("employee"); }}><IcMenuChat /> Открыть чат</button>
                        <button onClick={() => setCtx(null)}><IcArchive /> Архивировать</button>
                        <button className="red" onClick={() => setCtx(null)}><IcBan /> Закрыть доступ</button>
                        <button className="red" onClick={() => setCtx(null)}><IcTrash /> Удалить</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="acc-drawer-foot">
                <button className="acc-btn-ghost" onClick={closeAll}>Отмена</button>
                <button className="acc-btn-primary" onClick={() => setAddOpen(true)}>Добавить сотрудника</button>
              </div>
            </div>
          )}

          {/* --- departments list --- */}
          {list === "departments" && (
            <div className="acc-drawer" onClick={(e) => e.stopPropagation()}>
              <div className="acc-drawer-head">
                <h1>Отделы</h1>
                <button onClick={closeAll}><IcClose /></button>
              </div>
              <div className="acc-drawer-body" onClick={() => setCtx(null)}>
                <input className="msg-search" placeholder="Поиск" />
                {[
                  { id: "d1", name: "Администрация", sub: "8 сотрудников" },
                  { id: "d2", name: "Бухгалтерия", sub: "3 сотрудника" },
                  { id: "d3", name: "IT-отдел", sub: "21 сотрудник" },
                ].map((d) => (
                  <div key={d.id} className="msg-item" onClick={() => openCard("department")}>
                    <div className="m-body">
                      <div className="m-name">{d.name}</div>
                      <div className="m-prev">{d.sub}</div>
                    </div>
                    <div className="m-right">
                      <button className="msg-dots" onClick={(ev) => { ev.stopPropagation(); setCtx(ctx === d.id ? null : d.id); }}><IcDots /></button>
                    </div>
                    {ctx === d.id && (
                      <div className="msg-ctx" style={{ right: 10, top: 44 }} onClick={(ev) => ev.stopPropagation()}>
                        <button onClick={() => { setCtx(null); openCard("department"); }}><IcEdit /> Изменить</button>
                        <button className="red" onClick={() => setCtx(null)}><IcTrash /> Удалить</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="acc-drawer-foot">
                <button className="acc-btn-ghost" onClick={closeAll}>Отмена</button>
                <button className="acc-btn-primary" onClick={() => openCard("department", true)}>Создать отдел</button>
              </div>
            </div>
          )}

          {/* --- groups list --- */}
          {list === "groups" && (
            <div className="acc-drawer" onClick={(e) => e.stopPropagation()}>
              <div className="acc-drawer-head">
                <h1>Группы</h1>
                <button onClick={closeAll}><IcClose /></button>
              </div>
              <div className="acc-drawer-body" onClick={() => setCtx(null)}>
                <input className="msg-search" placeholder="Поиск" />
                {[
                  { id: "g1", name: "Командировка в Самару", sub: "8 пассажиров" },
                  { id: "g2", name: "Встреча с инвесторами", sub: "3 пассажира" },
                  { id: "g3", name: "Ремонт моста", sub: "21 пассажир" },
                ].map((g) => (
                  <div key={g.id} className="msg-item" onClick={() => openCard("group")}>
                    <div className="m-body">
                      <div className="m-name">{g.name}</div>
                      <div className="m-prev">{g.sub}</div>
                    </div>
                    <div className="m-right">
                      <button className="msg-dots" onClick={(ev) => { ev.stopPropagation(); setCtx(ctx === g.id ? null : g.id); }}><IcDots /></button>
                    </div>
                    {ctx === g.id && (
                      <div className="msg-ctx" style={{ right: 10, top: 44 }} onClick={(ev) => ev.stopPropagation()}>
                        <button onClick={() => { setCtx(null); openCard("group"); }}><IcEdit /> Изменить</button>
                        <button className="red" onClick={() => setCtx(null)}><IcTrash /> Удалить</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="acc-drawer-foot">
                <button className="acc-btn-ghost" onClick={closeAll}>Отмена</button>
                <button className="acc-btn-primary" onClick={() => openCard("group", true)}>Создать группу</button>
              </div>
            </div>
          )}

          {/* --- passengers list --- */}
          {list === "passengers" && (
            <div className="acc-drawer" onClick={(e) => e.stopPropagation()}>
              <div className="acc-drawer-head">
                <h1>Пассажиры</h1>
                <button onClick={closeAll}><IcClose /></button>
              </div>
              <div className="acc-drawer-body" onClick={() => setCtx(null)}>
                <input className="msg-search" placeholder="Поиск" />
                {[
                  { id: "p1", ini: "ЯН", name: "Яковлев Николай Никитич" },
                  { id: "p2", ini: "БА", name: "Белосельская-Белозерская Анастасия Александровна" },
                ].map((p) => (
                  <div key={p.id} className="msg-item" onClick={() => openCard("passenger")}>
                    <span className="m-av initials">{p.ini}</span>
                    <div className="m-body"><div className="m-name">{p.name}</div></div>
                    <div className="m-right">
                      <button className="msg-dots" onClick={(ev) => { ev.stopPropagation(); setCtx(ctx === p.id ? null : p.id); }}><IcDots /></button>
                    </div>
                    {ctx === p.id && (
                      <div className="msg-ctx" style={{ right: 10, top: 44 }} onClick={(ev) => ev.stopPropagation()}>
                        <button onClick={() => { setCtx(null); openCard("passenger"); }}><IcInfoCircle /> Данные</button>
                        <button className="red" onClick={() => setCtx(null)}><IcTrash /> Удалить</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="acc-drawer-foot">
                <button className="acc-btn-ghost" onClick={closeAll}>Отмена</button>
                <button className="acc-btn-primary" onClick={() => openCard("passenger", true)}>Добавить пассажира</button>
              </div>
            </div>
          )}

          {/* ===== detail cards (stacked) ===== */}
          {card === "employee" && (
            <DetailDrawer title="Карточка сотрудника" onClose={() => setCard(null)} onSave={() => setCard(null)}>
              <p className="emp-desc">У сотрудников есть настройки доступа и тревел-политики, они могут создавать поездки. Внештат ID нужен для того, чтобы сотрудник мог самостоятельно войти в сервис.</p>
              <div className="emp-tabs">
                <button className={tab === "data" ? "on" : ""} onClick={() => setTab("data")}>Данные</button>
                <button className={tab === "access" ? "on" : ""} onClick={() => setTab("access")}>Доступ</button>
              </div>
              {tab === "data" ? <PersonData empty={empty} /> : <EmployeeAccess />}
            </DetailDrawer>
          )}

          {card === "passenger" && (
            <DetailDrawer title="Карточка пассажира" onClose={() => setCard(null)} onSave={() => setCard(null)}>
              <p className="emp-desc">У пассажиров нет настройки доступа и тревел-политики, они могут только участвовать поездки. Внештат ID нужен для того, чтобы пассажир мог самостоятельно войти в сервис и увидеть поездку.</p>
              <div className="emp-tabs">
                <button className={tab === "data" ? "on" : ""} onClick={() => setTab("data")}>Данные</button>
                <button className={tab === "access" ? "on" : ""} onClick={() => setTab("access")}>Доступ</button>
              </div>
              {tab === "data" ? <PassengerData /> : <div className="acc-sec-h" style={{ marginTop: 4 }}>Внештат ID<IdCard /></div>}
            </DetailDrawer>
          )}

          {card === "department" && (
            <DetailDrawer title="Отдел" onClose={() => setCard(null)} onSave={() => setCard(null)}>
              <p className="emp-desc">Отделы позволяют назначить единую тревел-политику и правила согласования для нескольких сотрудников сразу.</p>
              <div className="emp-tabs">
                <button className={tab === "data" ? "on" : ""} onClick={() => setTab("data")}>Данные</button>
                <button className={tab === "travel" ? "on" : ""} onClick={() => setTab("travel")}>Тревел-политика</button>
              </div>
              {tab === "data" ? (
                <>
                  <div className="acc-sec-h" style={{ marginTop: 4 }}>Данные</div>
                  <div style={{ height: 10 }} />
                  <div className="acc-fullrow"><F label="Название" value={empty ? "" : "Бухгалтерия"} ph={empty} /></div>
                  <div className="acc-fullrow"><F label="Руководитель отдела" value={empty ? "" : "Яковлев Николай Никитич"} ph={empty} chevron /></div>
                  <div className="acc-sec-h">Сотрудники</div>
                  <div style={{ height: 10 }} />
                  {!empty && <PersonRow />}
                  <div className="emp-addrow">Добавить сотрудника <IcPlusField /></div>
                </>
              ) : <TravelPolicy />}
            </DetailDrawer>
          )}

          {card === "group" && (
            <DetailDrawer title="Группа" onClose={() => setCard(null)} onSave={() => setCard(null)}>
              <p className="emp-desc">Объедините пассажиров в смысловые группы, чтобы облегчить создание групповых поездок.</p>
              <div className="acc-sec-h" style={{ marginTop: 6 }}>Данные</div>
              <div style={{ height: 10 }} />
              <div className="acc-fullrow"><F label="Название" value={empty ? "" : "Командировка в Самару"} ph={empty} /></div>
              <div className="acc-fullrow"><F label="Ответственный" value={empty ? "" : "Яковлев Николай Никитич"} ph={empty} chevron /></div>
              <div className="acc-sec-h">Пассажиры</div>
              <div style={{ height: 10 }} />
              {!empty && <PersonRow />}
              <div className="emp-addrow">Добавить пассажира <IcPlusField /></div>
            </DetailDrawer>
          )}
        </div>
      )}

      {/* ============ add employee modal ============ */}
      {addOpen && (
        <div className="acc-scrim center" onClick={() => setAddOpen(false)}>
          <div className="acc-modal" onClick={(e) => e.stopPropagation()} style={{ width: 400, textAlign: "left" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <h3 style={{ margin: 0 }}>Добавить сотрудника</h3>
              <button style={{ background: "none", border: "none", cursor: "pointer" }} onClick={() => setAddOpen(false)}><IcClose size={20} /></button>
            </div>
            <p className="emp-desc" style={{ marginBottom: 18 }}>Вы можете ввести данные нового сотрудника вручную или импортировать таблицу с несколькими сотрудниками.</p>
            <div className="acc-field" style={{ marginBottom: 18 }}>
              <label>Выбранный способ</label>
              <div className="val">Добавить вручную</div>
              <span className="chev"><IcChevron /></span>
            </div>
            <div style={{ display: "flex", gap: 14 }}>
              <button className="acc-btn-ghost" style={{ flex: 1 }} onClick={() => setAddOpen(false)}>Отмена</button>
              <button className="acc-btn-primary" onClick={() => { setAddOpen(false); openCard("employee", true); }}>Далее</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- shared bits ---------- */
function DetailDrawer({ title, children, onClose, onSave }: {
  title: string; children: React.ReactNode; onClose: () => void; onSave: () => void;
}) {
  return (
    <div className="acc-drawer stacked" onClick={(e) => e.stopPropagation()}>
      <div className="acc-drawer-head">
        <h1>{title}</h1>
        <button onClick={onClose}><IcClose /></button>
      </div>
      <div className="acc-drawer-body">{children}</div>
      <div className="acc-drawer-foot">
        <button className="acc-btn-ghost" onClick={onClose}>Отмена</button>
        <button className="acc-btn-primary" onClick={onSave}>Сохранить</button>
      </div>
    </div>
  );
}

function F({ label, value, ph, chevron, cal }: {
  label: string; value?: string; ph?: boolean; chevron?: boolean; cal?: boolean;
}) {
  return (
    <div className={`acc-field${ph ? " ph" : ""}`}>
      {!ph && <label>{label}</label>}
      <div className="val">{ph ? label : value}</div>
      {chevron && <span className="chev"><IcChevron /></span>}
      {cal && <span className="cal"><IcCalSmall /></span>}
    </div>
  );
}

function PersonData({ empty }: { empty: boolean }) {
  return (
    <>
      <div className="acc-sec-h" style={{ marginTop: 4 }}>Личные данные</div>
      <div style={{ height: 10 }} />
      <div className="acc-grid2">
        <F label="Фамилия" value="Вознесенский" ph={empty} />
        <F label="Имя" value="Иван" ph={empty} />
      </div>
      <div className="acc-grid2">
        <F label="Отчество" value="Сергеевич" ph={empty} />
        <div className="acc-check" style={{ paddingLeft: 6 }}><span className="box" /> Нет отчества</div>
      </div>
      <div className="acc-fullrow"><F label="Пол" value="Мужской" ph={empty} chevron /></div>
      <div className="acc-fullrow"><F label="Дата рождения" value="18 марта 1999" ph={empty} cal /></div>
      <div className="acc-grid2">
        <F label="Фамилия (латиница)" value="Voznesenskiy" ph={empty} />
        <F label="Имя (латиница)" value="Ivan" ph={empty} />
      </div>
      <div className="acc-sec-h">Контакты</div>
      <div style={{ height: 10 }} />
      <div className="acc-grid2">
        <F label="Телефон" value="+7 913 390 38 90" ph={empty} />
        <F label="Email" value="ivanov.ivan@mail.ru" ph={empty} />
      </div>
    </>
  );
}

function PassengerData() {
  return (
    <>
      <div className="acc-sec-h" style={{ marginTop: 4 }}>Личные данные</div>
      <div style={{ height: 10 }} />
      <div className="acc-grid2">
        <F label="Фамилия" value="Горбачев" />
        <F label="Имя" value="Роман" />
      </div>
      <div className="acc-grid2">
        <F label="Отчество" value="Дмитриевич" />
        <div className="acc-check" style={{ paddingLeft: 6 }}><span className="box" /> Нет отчества</div>
      </div>
      <div className="acc-fullrow"><F label="Пол" value="Мужской" chevron /></div>
      <div className="acc-fullrow"><F label="Дата рождения" value="18 марта 1999" cal /></div>
    </>
  );
}

function IdCard() {
  return (
    <div className="emp-idcard" style={{ marginTop: 10 }}>
      <div>
        <div className="id-name">@gorbachev</div>
        <div className="id-on">Онлайн</div>
      </div>
      <div className="id-right">
        <div className="emp-connected">Подключен <IcCheckSm /></div>
        <button className="emp-settings-btn">Настройки</button>
      </div>
    </div>
  );
}

function EmployeeAccess() {
  return (
    <>
      <div className="acc-sec-h" style={{ marginTop: 4 }}>Внештат ID</div>
      <IdCard />
      <div className="acc-sec-h">Доступ</div>
      <div style={{ height: 10 }} />
      <div className="acc-grid2">
        <F label="Уровень" value="Сотрудник" chevron />
        <F label="Срок действия" value="Бессрочно" cal />
      </div>
      <div className="acc-sec-h">Тревел-политика</div>
      <div style={{ height: 10 }} />
      <div className="acc-fullrow"><F label="Авиабилеты" value="Линейный персонал" chevron /></div>
    </>
  );
}

function TravelPolicy() {
  return (
    <>
      <div className="acc-sec-h" style={{ marginTop: 4 }}>Тревел-политика</div>
      <div style={{ height: 10 }} />
      <div className="acc-fullrow"><F label="Авиабилеты" value="По умолчанию" chevron /></div>
      <div className="acc-fullrow"><F label="Билеты на поезд" value="По умолчанию" chevron /></div>
      <div className="acc-fullrow"><F label="Проживание" value="По умолчанию" chevron /></div>
      <div className="acc-fullrow"><F label="Такси" value="По умолчанию" chevron /></div>
      <div className="acc-sec-h">Согласование</div>
      <div style={{ height: 10 }} />
      <div className="acc-grid2">
        <F label="Поездок" value="По умолчанию" chevron />
        <F label="Отчетов" value="По умолчанию" chevron />
      </div>
    </>
  );
}

function PersonRow() {
  return (
    <div className="msg-item" style={{ cursor: "default" }}>
      <img className="m-av" src="/img/avatar.png" alt="" />
      <div className="m-body"><div className="m-name">Яковлев Николай Никитич<span className="tag-on" style={{ background: "#1e88fa", color: "#fff", padding: "2px 8px", borderRadius: 8, fontSize: 12 }}>Онлайн</span></div></div>
      <button className="msg-dots"><IcDots /></button>
    </div>
  );
}
