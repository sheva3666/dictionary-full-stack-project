import { createUseStyles } from "react-jss";

export default createUseStyles((theme) => ({
  title: {
    color: "#fff",
    fontSize: 64,
    textAlign: "center",
  },
  buttonsContainer: {
    display: "flex",
    gap: 90,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 60,
    margin: "0 auto",
    marginTop: 200,
    maxWidth: 1200,
  },
  "@media only screen and (max-width: 900px)": {
    buttonsContainer: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
    },
    title: {
      color: "#fff",
      fontSize: 36,
      textAlign: "center",
    },
  },
}));
