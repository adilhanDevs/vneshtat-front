"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import "../account/account.css";
import "../employees/employees.css";
import "./company.css";
import Sidebar from "../account/Sidebar";
import Messenger from "../account/Messenger";
import { IcCard, IcDots, IcBubble, IcFolder, IcWallet, IcPeople2 } from "../account/icons";
import { AiFillClockCircle } from "react-icons/ai";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

export default function Company() {
  const router = useRouter();
  const [messenger, setMessenger] = useState(false);

  return (
    <div className="acc">
      <Sidebar active="desk" />

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
            <img className="acc-avatar" src="/img/avatar-sm.png" alt="" onClick={() => router.push("/account")} />
          </div>
        </div>

        <h1 className="acc-title">Ваша компания</h1>

        <div className="co-row">
          <div className="co-card shadow-sm">
            <div className="co-ico"><IcFolder /></div>
            <div className="co-title">Договор<br />подписан</div>
            <div className="co-sub">Номер договора: 11 141</div>
            <div className="co-btns">
              <button className="co-btn blue">Данные</button>
              <button className="co-btn">Договор</button>
            </div>
          </div>

          <div className="co-card shadow-sm">
            <div className="co-ico"><IcWallet /></div>
            <div className="co-title blue">490 000 ₽</div>
            <div className="co-sub">Неоплаченные счета<br />отсутствуют</div>
            <div className="co-btns">
              <button className="co-btn blue" onClick={() => router.push("/finance")}>Пополнить</button>
              <button className="co-btn">Подробнее</button>
            </div>
          </div>

          <div className="co-card shadow-sm">
            <div className="co-ico"><IcPeople2 /></div>
            <div className="co-title">99 <span className="light">сотрудников</span></div>
            <div className="co-sub">8 сотрудников сейчас<br />находятся в поездках.</div>
            <div className="co-btns">
              <button className="co-btn" onClick={() => router.push("/employees")}>Подробнее</button>
            </div>
          </div>
        </div>

        <div className="acc-card co-status shadow-sm">
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
              <div className="dots">
                <i /><i /><i /><i /><i /><i className="off" /><i className="off" />
              </div>
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
      </main>

      {messenger && <Messenger onClose={() => setMessenger(false)} />}
    </div>
  );
}
