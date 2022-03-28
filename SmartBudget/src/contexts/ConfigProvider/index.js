import React, { useState } from "react";
import PropTypes from "prop-types";
import { ConfigProvider as AntdConfigProvider } from "antd";

import enUS from "antd/lib/locale/en_US";
import frFR from "antd/es/locale/fr_FR";

import ConfigContext from "contexts/ConfigContext";

import i18n from "translations/i18n";

const ConfigProvider = ({ children }) => {
  const [antdLocale, setAntdLocale] = useState(
    i18n.locale === "en" ? enUS : frFR
  );
  const [i18nLang, seti18nLang] = useState(i18n.language || "en");

  const onChangeLanguage = (lang) => {
    if (lang === "en") {
      setAntdLocale(enUS);
    }

    if (lang === "fr") {
      setAntdLocale(frFR);
    }

    seti18nLang(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <ConfigContext.Provider
      value={{ onChangeLanguage, currentLanguage: i18nLang }}
    >
      <AntdConfigProvider locale={antdLocale}>{children}</AntdConfigProvider>
    </ConfigContext.Provider>
  );
};

ConfigProvider.propTypes = {
  children: PropTypes.node,
};

ConfigProvider.defaultProps = {
  children: null,
};

export default ConfigProvider;
