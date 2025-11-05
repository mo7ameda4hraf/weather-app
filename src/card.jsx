import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import WbCloudyIcon from "@mui/icons-material/WbCloudy";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment/moment";
import "moment/min/locales";
import { useTranslation } from "react-i18next";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
moment.locale("ar");

let canclling = null;
export default function CardComponant() {
  const { t, i18n } = useTranslation();

  const [dateAndTime, setDateAndTime] = useState("");
  const [temp, setTemp] = useState({
    number: null,
    discription: "",
    min: null,
    max: null,
    icon: null,
  });

  const [locale, setLocale] = useState("ar");

  function handleLanguageClick() {
    if (locale === "en") {
      setLocale("ar");
      i18n.changeLanguage("ar");
      moment.locale("ar");
    } else {
      setLocale("en");
      i18n.changeLanguage("en");
      moment.locale("en");
    }
    setDateAndTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
  }

  useEffect(() => {
    i18n.changeLanguage("ar");
    setDateAndTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
    // Make a request for a user with a given ID
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=Cairo&appid=${API_KEY}&units=metric&lang=ar`,
        {
          cancelToken: new axios.CancelToken(function executor(c) {
            canclling = c;
          }),
        }
      )
      .then(function (response) {
        // handle success
        console.log(response);
        let responseTemp = Math.round(response.data.main.temp);
        let tempMin = Math.round(response.data.main.temp_min);
        let tempMax = Math.round(response.data.main.temp_max);
        let discriptionResponse = response.data.weather[0].description;
        let iconResponse = response.data.weather[0].icon;

        setTemp({
          number: responseTemp,
          discription: discriptionResponse,
          min: tempMin,
          max: tempMax,
          icon: `https://openweathermap.org/img/wn/${iconResponse}@2x.png`,
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    //clean up
    return () => {
      canclling();
    };
  }, []);
  return (
    <>
      <Container maxWidth="sm">
        <div
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "start",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {/* Card */}
          <div
            className="card"
            style={{
              background: "rgb(1 68 177 / 36%)",
              color: "white",
              padding: "20px",
              borderRadius: "15px",
              boxShadow: "0px 11px 1px rgba(0, 0, 0, 0.05)",
              width: "100%",
            }}
          >
            {/* date & Time */}
            <div
              dir={locale === "ar" ? "rtl" : "ltr"}
              style={{
                display: "flex",
                alignItems: "end",
                justifyContent: "start",
                marginRight: "20px",
              }}
            >
              <Typography variant="h2" style={{ fontWeight: "600" }}>
                {t("Cairo")}
              </Typography>
              <Typography
                variant="h5"
                style={{ marginRight: "20px", fontSize: "20px" }}
              >
                {dateAndTime}
              </Typography>
            </div>
            <hr />
            {/* Description */}
            <div
              dir={locale === "ar" ? "rtl" : "ltr"}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {/* Temp */}
              <div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="h1">{temp.number}</Typography>
                  <img src={temp.icon} alt="" />
                </div>
                <Typography variant="p">{t(temp.discription)}</Typography>
                <div style={{ display: "flex", gap: "10px" }}>
                  <h5>
                    {t("min")} : {temp.min}
                  </h5>
                  <h5>|</h5>
                  <h5>
                    {t("max")} : {temp.max}
                  </h5>
                </div>
              </div>
              {/* icon */}
              <div>
                <WbCloudyIcon
                  className="cloud-icon"
                  style={{ fontSize: "170px", marginLeft: "30px" }}
                />
              </div>
            </div>
          </div>
          {/* button direction */}
          <button
            onClick={handleLanguageClick}
            style={{
              background: "none",
              color: "white",
              border: "0",
              fontSize: "20px",
              margin: "20px 0",
              cursor: "pointer",
            }}
          >
            {i18n.language === "ar" ? "English" : "عربي"}
          </button>
        </div>
      </Container>
    </>
  );
}
