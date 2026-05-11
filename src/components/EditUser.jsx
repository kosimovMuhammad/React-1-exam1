import { useState, useRef, useEffect } from "react";
import { useFormik } from "formik";
import { useUserStore } from "../store/useUserStore";

const EMPLOYEES = [
  { name: "Aziz Karimov", email: "aziz@company.com" },
  { name: "Barno Umarova", email: "barno@company.com" },
  { name: "Jasur Toshmatov", email: "jasur@company.com" },
  { name: "Malika Rahimova", email: "malika@company.com" },
  { name: "Sardor Yusupov", email: "sardor@company.com" },
];

function formatCardNumber(value) {
  return value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

function maskCard(value) {
  const digits = value.replace(/\D/g, "");
  const last4 = digits.slice(-4) || "????";
  return `**** **** **** ${last4}`;
}

function getInitial(name) {
  return (name || "?")[0].toUpperCase();
}

export const EditUser = ({ user, onSuccess, onClose }) => {
  const editUser = useUserStore((state) => state.editUser);

  const [employeeSearch, setEmployeeSearch] = useState(user?.assigned || "");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const filteredEmployees = EMPLOYEES.filter(
    (e) =>
      e.name.toLowerCase().includes(employeeSearch.toLowerCase()) ||
      e.email.toLowerCase().includes(employeeSearch.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

const formik = useFormik({
  initialValues: {
    id: user?.id || "",
    name: user?.name || "",
    url: user?.url || "",
    fullCardNumber: user?.fullCardNumber || "",
    amount: user?.amount || "",
    assigned: user?.assigned || "",
    email: user?.email || "",
    status: user?.status || "Done",
  },

  enableReinitialize: true,

  onSubmit: (values) => {
    const updatedUser = {
      ...user,
      ...values,
      amount: Number(values.amount),
      fullCardNumber: values.fullCardNumber.replace(/\D/g, ""),
    };

    editUser(updatedUser);

    onClose?.();

    onSuccess?.();
  },
});

  function selectEmployee(emp) {
    setEmployeeSearch(emp.name);
    formik.setFieldValue("assigned", emp.name);
    formik.setFieldValue("email", emp.email);
    setDropdownOpen(false);
  }

  const cardFormatted = formatCardNumber(formik.values.fullCardNumber);
  const cardMasked = maskCard(formik.values.fullCardNumber);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "0px",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "480px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "20px 24px 16px",
            borderBottom: "1px solid #F0F0F0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#1A1D1F" }}>
            Edit transaction info
          </h2>
          <button
            onClick={onClose}
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              border: "1px solid #E6E8EC",
              background: "#F4F5F6",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              color: "#6F767E",
            }}
          >
            ✕
          </button>
        </div>

        <div
          style={{
            padding: "14px 24px",
            background: "#F8F9FA",
            borderBottom: "1px solid #F0F0F0",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "#E3F9EE",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 16,
              color: "#00C46A",
              flexShrink: 0,
            }}
          >
            {getInitial(formik.values.name)}
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14, color: "#1A1D1F" }}>
              {formik.values.name || "Name"}
            </div>
            <div style={{ fontSize: 12, color: "#9A9FA5", marginTop: 2 }}>
              {formik.values.email || "email@company.com"}
            </div>
          </div>
          <div
            style={{
              marginLeft: "auto",
              padding: "4px 10px",
              borderRadius: 20,
              fontSize: 11,
              fontWeight: 600,
              background:
                formik.values.status === "Done" ? "#E3F9EE" : "#FFF3E8",
              color: formik.values.status === "Done" ? "#00A85A" : "#FF8A34",
            }}
          >
            {formik.values.status}
          </div>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 14 }}>

            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <label style={labelStyle}>Assigned to</label>
              <div style={{ position: "relative" }} ref={dropdownRef}>
                <span
                  style={{
                    position: "absolute",
                    left: 11,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#9A9FA5",
                    fontSize: 14,
                    pointerEvents: "none",
                  }}
                >
                  🔍
                </span>
                <input
                  type="text"
                  placeholder="Search employee..."
                  value={employeeSearch}
                  onChange={(e) => {
                    setEmployeeSearch(e.target.value);
                    setDropdownOpen(true);
                  }}
                  onFocus={() => setDropdownOpen(true)}
                  style={{ ...inputStyle, paddingLeft: 34 }}
                  autoComplete="off"
                />
                {dropdownOpen && filteredEmployees.length > 0 && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 4px)",
                      left: 0,
                      right: 0,
                      background: "#fff",
                      border: "1px solid #E6E8EC",
                      borderRadius: 10,
                      zIndex: 99,
                      overflow: "hidden",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                    }}
                  >
                    {filteredEmployees.map((emp) => (
                      <div
                        key={emp.email}
                        onClick={() => selectEmployee(emp)}
                        style={{
                          padding: "9px 12px",
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          cursor: "pointer",
                          borderBottom: "1px solid #F4F5F6",
                          fontSize: 13,
                          color: "#1A1D1F",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "#F8F9FA")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "transparent")
                        }
                      >
                        <div
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: "50%",
                            background: "#E3F9EE",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 11,
                            fontWeight: 700,
                            color: "#00C46A",
                            flexShrink: 0,
                          }}
                        >
                          {getInitial(emp.name)}
                        </div>
                        <div>
                          <div style={{ fontWeight: 500 }}>{emp.name}</div>
                          <div style={{ fontSize: 11, color: "#9A9FA5" }}>
                            {emp.email}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <label style={labelStyle}>Full name</label>
                <input
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  style={inputStyle}
                  placeholder="Full name"
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <label style={labelStyle}>Website / URL</label>
                <input
                  name="url"
                  value={formik.values.url}
                  onChange={formik.handleChange}
                  style={inputStyle}
                  placeholder="example.com"
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <label style={labelStyle}>Status</label>
                <select
                  name="status"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  style={{
                    ...inputStyle,
                    cursor: "pointer",
                    appearance: "none",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239A9FA5' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 12px center",
                    paddingRight: 32,
                  }}
                >
                  <option value="Done">Done</option>
                  <option value="Pending">Pending</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <label style={labelStyle}>Total used ($)</label>
                <input
                  name="amount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formik.values.amount}
                  onChange={formik.handleChange}
                  style={inputStyle}
                  placeholder="0.00"
                />
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <label style={labelStyle}>Card number</label>
              <input
                name="fullCardNumber"
                value={cardFormatted}
                onChange={(e) => {
                  const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
                  formik.setFieldValue("fullCardNumber", raw);
                }}
                style={inputStyle}
                placeholder="0000 0000 0000 0000"
                maxLength={19}
              />
              <div
                style={{
                  background: "linear-gradient(135deg, #00C46A, #00A85A)",
                  borderRadius: 12,
                  padding: "12px 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  color: "#fff",
                  marginTop: 4,
                }}
              >
                <span style={{ fontSize: 13, letterSpacing: 2, fontWeight: 500 }}>
                  {cardMasked}
                </span>
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>
                  VISA
                </span>
              </div>
            </div>
          </div>

          <div
            style={{
              padding: "16px 24px",
              borderTop: "1px solid #F0F0F0",
              display: "flex",
              gap: 10,
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                height: 42,
                borderRadius: 10,
                border: "1px solid #E6E8EC",
                background: "#F4F5F6",
                color: "#6F767E",
                fontSize: 13,
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                flex: 2,
                height: 42,
                borderRadius: 10,
                border: "none",
                background: "#1A1D1F",
                color: "#fff",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
              }}
            >
              ✓ Update info
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const inputStyle = {
  height: 40,
  borderRadius: 10,
  border: "1px solid #E6E8EC",
  background: "#F8F9FA",
  color: "#1A1D1F",
  padding: "0 12px",
  fontSize: 13,
  outline: "none",
  width: "100%",
};

const labelStyle = {
  fontSize: 11,
  fontWeight: 600,
  color: "#9A9FA5",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};
