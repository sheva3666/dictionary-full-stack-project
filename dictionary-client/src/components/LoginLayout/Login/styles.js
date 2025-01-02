import { createUseStyles } from "react-jss";

export default createUseStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
