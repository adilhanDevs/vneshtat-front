"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  BackArrow,
  PeopleIcon,
  MonitorIcon,
  InfoIcon,
  CheckCircle,
} from "./icons";

type Step =
  | "identifier"
  | "password"
  | "recovery"
  | "recovery-code"
  | "new-password";

const PASSWORD_REQS = [
  ["6+", "Не менее 6 символов"],
  ["Ff", "Строчные и прописные буквы"],
  ["1#!", "Цифры и другие символы"],
];

function Dots() {
  return (
    <div className="dots">
      {Array.from({ length: 6 }).map((_, i) => (
        <span key={i} />
      ))}
    </div>
  );
}

export default function Home() {
  const [step, setStep] = useState<Step>("identifier");

  // field values
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [recoveryMethod, setRecoveryMethod] = useState<"phone" | "email">(
    "email"
  );
  const [recovery, setRecovery] = useState("");
  const [codeEmail, setCodeEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPass, setNewPass] = useState("");
  const [newPass2, setNewPass2] = useState("");

  // ui state
  const [error, setError] = useState<string | null>(null);
  const [tip, setTip] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!success) return;
    router.prefetch("/account");
    const t = setTimeout(() => router.push("/account"), 1800);
    return () => clearTimeout(t);
  }, [success, router]);

  const go = (s: Step) => {
    setError(null);
    setTip(null);
    setStep(s);
  };

  const looksLikeEmail = (v: string) => v.includes("@");

  /* -------------------- identifier -------------------- */
  const submitIdentifier = () => {
    const v = identifier.trim();
    if (!v) return;
    if (looksLikeEmail(v)) {
      if (v === "sample@mail.ru") return setError("Такой почты нет в системе");
    } else if (v.replace(/\s/g, "").startsWith("89999999")) {
      return setError("Такого номера нет в системе");
    }
    go("password");
  };

  /* -------------------- password -------------------- */
  const submitPassword = () => {
    if (!password) return;
    if (password.length < 6) return setError("Введен неверный пароль");
    setSuccess(true);
  };

  /* -------------------- recovery -------------------- */
  const submitRecovery = () => {
    const v = recovery.trim();
    if (!v) return;
    if (recoveryMethod === "phone" && v.replace(/\s/g, "").startsWith("89999999"))
      return setError("Такого номера нет в системе");
    go("recovery-code");
  };

  const submitCode = () => {
    if (!codeEmail.trim() || !code.trim()) return;
    go("new-password");
  };

  const submitNewPassword = () => {
    if (!newPass || !newPass2) return;
    setSuccess(true);
  };

  return (
    <>
      <div className={`screen${success ? " blurred" : ""}`}>
        <div className="logo">Внештат</div>

        {/* -------- identifier -------- */}
        {step === "identifier" && (
          <div className="card">
            <div className="card-inner">
              <div className="icon-blob">
                <PeopleIcon />
              </div>
              <h1 className="title">
                Введите почту,
                <br />
                телефон или ID
              </h1>
              <div className={`field${error ? " error" : ""}`}>
                <input
                  value={identifier}
                  onChange={(e) => {
                    setIdentifier(e.target.value);
                    setError(null);
                  }}
                  placeholder="8 999 123 4567"
                />
                {error && (
                  <span
                    className="field-info"
                    onMouseEnter={() => setTip(error)}
                    onMouseLeave={() => setTip(null)}
                  >
                    <InfoIcon />
                    {tip && (
                      <span className="tooltip tip-left" style={{ left: 30, top: -8 }}>
                        {error}
                      </span>
                    )}
                  </span>
                )}
              </div>
              <div className="hint">Нужна помощь</div>
              <button className="btn" onClick={submitIdentifier}>
                Далее
              </button>
            </div>
          </div>
        )}

        {/* -------- password -------- */}
        {step === "password" && (
          <div className="card">
            <button className="back" onClick={() => go("identifier")}>
              <BackArrow />
            </button>
            <div className="card-inner">
              <Dots />
              <h1 className="title">
                Введите
                <br />
                пароль
              </h1>
              <div className={`field${error ? " error" : ""}`}>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(null);
                  }}
                />
                <span
                  className="field-info"
                  onMouseEnter={() => setTip("reqs")}
                  onMouseLeave={() => setTip(null)}
                >
                  <InfoIcon />
                  {error && (
                    <span className="tooltip tip-left" style={{ left: 30, top: -8 }}>
                      {error}
                    </span>
                  )}
                  {!error && tip === "reqs" && (
                    <span
                      className="tooltip reqs-tip tip-left"
                      style={{ left: 30, top: -30 }}
                    >
                      {PASSWORD_REQS.map(([k, v]) => (
                        <div key={k}>
                          <b>{k}</b>
                          <span>{v}</span>
                        </div>
                      ))}
                    </span>
                  )}
                </span>
              </div>
              <div className="hint" onClick={() => go("recovery")}>
                Не помню пароль
              </div>
              <button className="btn" onClick={submitPassword}>
                Далее
              </button>
            </div>
          </div>
        )}

        {/* -------- recovery method -------- */}
        {step === "recovery" && (
          <div className="card">
            <button className="back" onClick={() => go("password")}>
              <BackArrow />
            </button>
            <div className="card-inner">
              <div className="icon-blob">
                <MonitorIcon />
              </div>
              <h1 className="title">
                Восстановление
                <br />
                доступа
              </h1>
              <div className="segmented">
                <div
                  className="seg-pill"
                  style={{
                    transform:
                      recoveryMethod === "phone"
                        ? "translateX(0)"
                        : "translateX(100%)",
                  }}
                />
                <button onClick={() => setRecoveryMethod("phone")}>Телефон</button>
                <button onClick={() => setRecoveryMethod("email")}>Почта</button>
              </div>
              <div className={`field${error ? " error" : ""}`}>
                <input
                  value={recovery}
                  onChange={(e) => {
                    setRecovery(e.target.value);
                    setError(null);
                  }}
                  placeholder={
                    recoveryMethod === "email" ? "info@gmail.com" : "8 999 123 4567"
                  }
                />
                {error && (
                  <span
                    className="field-info"
                    onMouseEnter={() => setTip(error)}
                    onMouseLeave={() => setTip(null)}
                  >
                    <InfoIcon />
                    {tip && (
                      <span
                        className="tooltip tip-above"
                        style={{ right: -6, bottom: 40 }}
                      >
                        {error}
                      </span>
                    )}
                  </span>
                )}
              </div>
              <div className="hint">Нужна помощь</div>
              <button className="btn" onClick={submitRecovery}>
                Далее
              </button>
            </div>
          </div>
        )}

        {/* -------- recovery code -------- */}
        {step === "recovery-code" && (
          <div className="card">
            <button className="back" onClick={() => go("recovery")}>
              <BackArrow />
            </button>
            <div className="card-inner">
              <div className="icon-blob">
                <MonitorIcon />
              </div>
              <h1 className="title">
                Восстановление
                <br />
                доступа
              </h1>
              <div className="field">
                <input
                  value={codeEmail}
                  onChange={(e) => setCodeEmail(e.target.value)}
                  placeholder="info@gmail.com"
                />
              </div>
              <div className="field">
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Код из письма"
                />
                <span
                  className="field-info"
                  onMouseEnter={() => setTip("code")}
                  onMouseLeave={() => setTip(null)}
                >
                  <InfoIcon />
                  {tip === "code" && (
                    <span
                      className="tooltip tip-above"
                      style={{ right: -6, bottom: 38 }}
                    >
                      Код придет на указанную почту в течение 2 минут
                    </span>
                  )}
                </span>
              </div>
              <div style={{ height: 8 }} />
              <button
                className="btn"
                disabled={!codeEmail.trim() || !code.trim()}
                onClick={submitCode}
              >
                Далее
              </button>
            </div>
          </div>
        )}

        {/* -------- new password -------- */}
        {step === "new-password" && (
          <div className="card">
            <button className="back" onClick={() => go("recovery-code")}>
              <BackArrow />
            </button>
            <div className="card-inner">
              <Dots />
              <h1 className="title">
                Придумайте
                <br />
                новый пароль
              </h1>
              <div className="field" style={{ marginBottom: 12 }}>
                <input
                  type="password"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                />
              </div>
              <div className="field">
                <input
                  type="password"
                  value={newPass2}
                  onChange={(e) => setNewPass2(e.target.value)}
                />
              </div>
              <div className="reqs">
                {PASSWORD_REQS.map(([k, v]) => (
                  <div key={k}>
                    <b>{k}</b>
                    <span>{v}</span>
                  </div>
                ))}
              </div>
              <button className="btn" onClick={submitNewPassword}>
                Сохранить
              </button>
            </div>
          </div>
        )}
      </div>

      {/* -------- success overlay -------- */}
      {success && (
        <div className="success-overlay">
          <div className="success-title">Добро пожаловать, Иван</div>
          <div className="success-card">
            <CheckCircle />
            <p>
              Авторизация
              <br />
              пройдена
            </p>
          </div>
        </div>
      )}

      <footer className="footer">
        <span>Внештат – часть за пределами целого</span>
        <span className="footer-right">
          <span>Ru</span>
          <span>Справка и поддержка</span>
        </span>
      </footer>
    </>
  );
}
