import { useAppContext } from "../Context/AppContext";

const ProfileSection = ({ name, role }: { name: string; role: string }) => {
  const { theme, themeColor } = useAppContext();
  const curr = themeColor[theme];
  return (
    <>
      <div
        className="rounded-circle"
        style={{
          width: "320px",
          height: "320px",
          border: `5px solid ${curr.name === "dark" ? "white" : "black"}`,
        }}
      >
        <img
          src="/DaysGone.jpg"
          alt="Profile-Image"
          className="rounded-circle"
          style={{ height: "100%", width: "100%", objectFit: "fill" }}
        />
      </div>
      <div className="d-flex flex-column gap-2 align-items-center">
        <h2 className="fw-bold">{name}</h2>
        <p className="fs-5">
          <span className="fw-bold" style={{ color: curr.highLight }}>
            Role:
          </span>{" "}
          {role.charAt(0).toUpperCase() + role.slice(1)}
        </p>
      </div>
    </>
  );
};

export default ProfileSection;
