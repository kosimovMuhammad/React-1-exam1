import React from "react";
import { X, Mail, Globe, CreditCard, Calendar, User, Activity, ShieldCheck } from "lucide-react";

export const UserDetails = ({ user, onClose }) => {
  if (!user) return null;

  const formatFullCard = (num) => {
    if (!num) return "**** **** **** 2468";
    return num.toString().replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
           <ShieldCheck size={18} className="text-[#00C46A]" />
           <h2 style={{ fontSize: "15px", fontWeight: 600 }}>Full Transaction Info</h2>
        </div>
        <button onClick={onClose} style={closeBtnStyle}><X size={18} /></button>
      </div>

      <div style={profileHero}>
        <div style={avatarStyle}>{user.name.charAt(0)}</div>
        <div style={{ textAlign: "center", marginTop: "12px" }}>
          <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#fff" }}>{user.name}</h3>
          <p style={{ fontSize: "13px", color: "#9A9FA5", marginTop: "4px" }}>{user.url}</p>
        </div>
        <div style={{
          ...statusBadge,
          background: user.status === "Done" ? "rgba(0, 196, 106, 0.1)" : "rgba(255, 138, 52, 0.1)",
          color: user.status === "Done" ? "#00C46A" : "#FF8A34"
        }}>
          {user.status}
        </div>
      </div>

      <div style={contentStyle}>
        <div style={infoGrid}>
          <InfoItem icon={<Mail size={16}/>} label="Email" value={user.email || "No email provided"} />
          <InfoItem icon={<User size={16}/>} label="Assigned to" value={user.assigned} />
          <InfoItem icon={<Calendar size={16}/>} label="End Date" value={user.endDate || "Dec 12, 2026"} />
          <InfoItem icon={<Activity size={16}/>} label="Total Amount" value={`$${user.amount}`} />
        </div>

        <div style={cardFullBox}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <p style={labelStyle}>Full Card Number</p>
            <span style={{ fontSize: "10px", color: "#00C46A", fontWeight: "bold" }}>SECURED</span>
          </div>
          <div style={cardNumberDisplay}>
            <CreditCard size={18} style={{ marginRight: "12px", opacity: 0.7 }} />
            <span style={{ letterSpacing: "2px", fontSize: "16px", fontWeight: "600" }}>
              {formatFullCard(user.fullCardNumber)}
            </span>
          </div>
        </div>
      </div>

      <div style={footerStyle}>
        <button onClick={onClose} style={doneBtn}>Close Details</button>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div style={itemStyle}>
    <div style={iconBox}>{icon}</div>
    <div>
      <p style={labelStyle}>{label}</p>
      <p style={valueStyle}>{value}</p>
    </div>
  </div>
);

const containerStyle = { background: "#1A1D1F", color: "#FCFCFD", borderRadius: "20px", overflow: "hidden", border: "1px solid #33383F", boxShadow: "0 20px 50px rgba(0,0,0,0.5)" };
const headerStyle = { padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #33383F", background: "#272B30" };
const closeBtnStyle = { background: "rgba(255,255,255,0.05)", border: "1px solid #33383F", color: "#9A9FA5", cursor: "pointer", borderRadius: "8px", padding: "4px" };
const profileHero = { padding: "30px 20px", display: "flex", flexDirection: "column", alignItems: "center", background: "linear-gradient(180deg, #272B30 0%, #1A1D1F 100%)", borderBottom: "1px solid #33383F" };
const avatarStyle = { width: "70px", height: "70px", borderRadius: "50%", background: "linear-gradient(135deg, #00C46A 0%, #008A4A 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", fontWeight: "bold", color: "#fff", boxShadow: "0 10px 20px rgba(0, 196, 106, 0.2)" };
const statusBadge = { marginTop: "14px", padding: "5px 14px", borderRadius: "10px", fontSize: "11px", fontWeight: "700", textTransform: "uppercase" };
const contentStyle = { padding: "24px" };
const infoGrid = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "24px" };
const itemStyle = { display: "flex", gap: "12px", alignItems: "center" };
const iconBox = { width: "38px", height: "38px", borderRadius: "12px", background: "#272B30", display: "flex", alignItems: "center", justifyContent: "center", color: "#00C46A", border: "1px solid #33383F" };
const labelStyle = { fontSize: "10px", color: "#6F767E", textTransform: "uppercase", fontWeight: "700", letterSpacing: "1px" };
const valueStyle = { fontSize: "14px", fontWeight: "500", marginTop: "3px", color: "#EFEFEF" };
const cardFullBox = { background: "#272B30", padding: "16px", borderRadius: "14px", border: "1px solid #33383F" };
const cardNumberDisplay = { display: "flex", alignItems: "center", color: "#fff", marginTop: "5px" };
const footerStyle = { padding: "0 24px 24px" };
const doneBtn = { width: "100%", height: "46px", borderRadius: "12px", background: "#00C46A", border: "none", color: "#fff", cursor: "pointer", fontWeight: "600", fontSize: "14px", transition: "0.2s" };