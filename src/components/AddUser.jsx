import { useState, useRef, useEffect } from "react";
import { useFormik } from "formik";
import { useUserStore } from "../store/useUserStore";
import { X, Search, Calendar, Check } from "lucide-react";

const EMPLOYEES = [
  { name: "Aziz Karimov", email: "aziz@company.com" },
  { name: "Barno Umarova", email: "barno@company.com" },
  { name: "Jasur Toshmatov", email: "jasur@company.com" },
  { name: "Malika Rahimova", email: "malika@company.com" },
  { name: "Sardor Yusupov", email: "sardor@company.com" },
];

export const AddUser = ({ onSuccess, onClose }) => {
  const addUser = useUserStore((state) => state.addUser);
  const [employeeSearch, setEmployeeSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const filteredEmployees = EMPLOYEES.filter(
    (e) =>
      e.name.toLowerCase().includes(employeeSearch.toLowerCase()) ||
      e.email.toLowerCase().includes(employeeSearch.toLowerCase())
  );

  const formik = useFormik({
    initialValues: {
      name: "",
      url: "",
      fullCardNumber: "",
      amount: "",
      assigned: "",
      email: "",
      status: "Done",
      endDate: "2026-12-12",
    },
    onSubmit: (values) => {
      addUser({ 
        ...values, 
        id: Date.now(), 
        lastTransaction: "May 11, 2026" 
      });
      onSuccess?.();
    },
  });

  const maskCard = (num) => {
    const d = num.replace(/\D/g, "");
    return `**** **** **** ${d.slice(-4) || "????"}`;
  };

  return (
    <div style={overlayStyle} onClick={(e) => e.target === e.currentTarget && onClose?.()}>
      <div style={modalStyle}>
        <div style={headerStyle}>
          <h2 style={{ fontSize: "15px", fontWeight: 600 }}>Add transaction info</h2>
          <button onClick={onClose} style={closeBtnStyle}><X size={18} /></button>
        </div>

        <div style={previewSection}>
          <div style={avatarStyle}>{(formik.values.name || "?")[0].toUpperCase()}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: "14px" }}>{formik.values.name || "Company Name"}</div>
            <div style={{ fontSize: "12px", color: "#9A9FA5" }}>{formik.values.email || "email@company.com"}</div>
          </div>
          <div style={activeBadge}>Active</div>
        </div>

        <form onSubmit={formik.handleSubmit} style={{ padding: "20px" }}>
          <div style={fieldGroup}>
            <label style={labelStyle}>ASSIGNED TO</label>
            <div style={{ position: "relative" }} ref={dropdownRef}>
              <Search size={14} style={searchIcon} />
              <input
                placeholder="Search employee..."
                value={employeeSearch}
                onChange={(e) => { setEmployeeSearch(e.target.value); setDropdownOpen(true); }}
                onFocus={() => setDropdownOpen(true)}
                style={inputStyle}
              />
              {dropdownOpen && filteredEmployees.length > 0 && (
                <div style={dropdownStyle}>
                  {filteredEmployees.map(emp => (
                    <div key={emp.email} onClick={() => {
                      formik.setFieldValue("assigned", emp.name);
                      formik.setFieldValue("email", emp.email);
                      setEmployeeSearch(emp.name);
                      setDropdownOpen(false);
                    }} style={dropdownItem}>
                      {emp.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div style={fieldGroup}>
            <label style={labelStyle}>FULL NAME</label>
            <input name="name" onChange={formik.handleChange} value={formik.values.name} style={inputStyle} />
          </div>

          <div style={fieldGroup}>
            <label style={labelStyle}>CARD NUMBER</label>
            <input 
              name="fullCardNumber" 
              placeholder="5294 2436 4780 2468"
              onChange={(e) => formik.setFieldValue("fullCardNumber", e.target.value.replace(/\D/g, "").slice(0, 16))} 
              value={formik.values.fullCardNumber} 
              style={inputStyle} 
            />
            <div style={cardPreview}>
               <span>{maskCard(formik.values.fullCardNumber)}</span>
               <span style={{ fontWeight: "bold" }}>VISA</span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
            <div style={fieldGroup}>
              <label style={labelStyle}>STATUS</label>
              <select name="status" onChange={formik.handleChange} style={inputStyle}>
                <option value="Done">Done</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            <div style={fieldGroup}>
              <label style={labelStyle}>TOTAL USED ($)</label>
              <input name="amount" type="number" onChange={formik.handleChange} style={inputStyle} />
            </div>
            <div style={fieldGroup}>
              <label style={labelStyle}>END DATE</label>
              <div style={{ position: "relative" }}>
                <input name="endDate" type="date" onChange={formik.handleChange} style={inputStyle} />
              </div>
            </div>
            <div style={fieldGroup}>
              <label style={labelStyle}>WEBSITE / URL</label>
              <input name="url" onChange={formik.handleChange} style={inputStyle} placeholder="company.com" />
            </div>
          </div>

          <div style={footerStyle}>
            <button type="button" onClick={onClose} style={cancelBtn}>Cancel</button>
            <button type="submit" style={submitBtn}><Check size={16} /> Update info</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const overlayStyle = { position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 };
const modalStyle = { background: "#272B30", color: "#FCFCFD", borderRadius: "12px", width: "440px", border: "1px solid #33383F", overflow: "hidden" };
const headerStyle = { padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #33383F" };
const closeBtnStyle = { background: "none", border: "1px solid #33383F", color: "#9A9FA5", borderRadius: "8px", cursor: "pointer", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center" };
const previewSection = { padding: "15px 20px", display: "flex", alignItems: "center", gap: "12px", background: "#1A1D1F" };
const avatarStyle = { width: "40px", height: "40px", borderRadius: "50%", background: "rgba(0, 196, 106, 0.1)", color: "#00C46A", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" };
const activeBadge = { background: "rgba(0, 196, 106, 0.1)", color: "#00C46A", padding: "4px 10px", borderRadius: "8px", fontSize: "11px", fontWeight: "bold" };
const fieldGroup = { marginBottom: "15px", display: "flex", flexDirection: "column", gap: "6px" };
const labelStyle = { fontSize: "10px", color: "#9A9FA5", fontWeight: "700", letterSpacing: "0.5px" };
const inputStyle = { background: "#1A1D1F", border: "1px solid #33383F", borderRadius: "8px", height: "40px", padding: "0 12px", color: "#fff", outline: "none", width: "100%", fontSize: "13px" };
const searchIcon = { position: "absolute", left: "12px", top: "13px", color: "#9A9FA5" };
const cardPreview = { marginTop: "8px", background: "#00C46A", color: "#fff", padding: "10px 15px", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px" };
const footerStyle = { marginTop: "10px", display: "flex", gap: "10px" };
const cancelBtn = { flex: 1, height: "44px", borderRadius: "10px", border: "1px solid #33383F", background: "none", color: "#fff", cursor: "pointer" };
const submitBtn = { flex: 2, height: "44px", borderRadius: "10px", background: "none", border: "1px solid #33383F", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontWeight: "600" };
const dropdownStyle = { position: "absolute", top: "100%", left: 0, right: 0, background: "#272B30", border: "1px solid #33383F", borderRadius: "8px", zIndex: 10, marginTop: "5px" };
const dropdownItem = { padding: "10px", cursor: "pointer", fontSize: "13px", borderBottom: "1px solid #33383F" };