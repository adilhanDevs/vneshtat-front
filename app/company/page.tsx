"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import "../account/account.css";
import "../employees/employees.css";
import "./company.css";
import Sidebar from "../account/Sidebar";
import Messenger from "../account/Messenger";
import { IcCard, IcDots, IcBubble, IcFolder, IcWallet, IcPeople2 } from "../account/icons";

export default function Company() {
  const router = useRouter();
  const [messenger, setMessenger] = useState(false);

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
            <img className="acc-avatar" src="/img/avatar-sm.png" alt="" />
          </div>
        </div>

        <div className="acc-surface">
          <h1 className="acc-title">Ваша компания</h1>

          <div className="co-row">
            <div className="co-card">
              <div className="co-ico"><IcFolder /></div>
              <div className="co-text">
                <div className="co-title">Договор<br />подписан</div>
                <div className="co-sub">Номер договора: 11 141</div>
              </div>
              <div className="co-btns">
                <button className="co-btn blue">Данные</button>
                <button className="co-btn">Договор</button>
              </div>
            </div>

            <div className="co-card">
              <div className="co-ico"><IcWallet /></div>
              <div className="co-text">
                <div className="co-title blue">490 000 ₽</div>
                <div className="co-sub">Неоплаченные счета<br />отсутствуют</div>
              </div>
              <div className="co-btns">
                <button className="co-btn blue" onClick={() => router.push("/finance")}>Пополнить</button>
                <button className="co-btn">Подробнее</button>
              </div>
            </div>

            <div className="co-card">
              <div className="co-ico"><IcPeople2 /></div>
              <div className="co-text">
                <div className="co-title">99 <span className="light">сотрудников</span></div>
                <div className="co-sub">8 сотрудников сейчас<br />находятся в поездках.</div>
              </div>
              <div className="co-btns">
                <button className="co-btn" onClick={() => router.push("/employees")}>Подробнее</button>
              </div>
            </div>
          </div>

          <div className="acc-card co-status">
            <div className="co-status-left">
              <div className="co-status-head">
                <h2>Status</h2>
                <span className="silver-badge"><span>Silver</span></span>
              </div>
              <p>Скоро здесь появится статусная система</p>
            </div>
            <div className="co-status-right">
              <div className="co-progress">
                <div className="fill" />
                <span className="dot" /><span className="dot" /><span className="dot" /><span className="dot" /><span className="dot" /><span className="dot off" /><span className="dot off" />
              </div>
              <div className="co-progress-pill">Чем больше путешествий, тем приятнее условия</div>
            </div>
          </div>

          <div className="emp-secbar">
            <div className="bar">
              <button className="on">Компания</button>
              <button onClick={() => router.push("/finance")}>Финансы</button>
              <button onClick={() => router.push("/employees")}>Сотрудники</button>
            </div>
          </div>
        </div>
      </main>

      {messenger && <Messenger onClose={() => setMessenger(false)} />}
    </div>
  );
}
