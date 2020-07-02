import React from "react";

import NavigationItem from "./NavigationItem/NavigationItem";
import Classes from "./Navigation.module.scss";
import { LATEST_NEWS_ROUTE, FRONT_PAGE_ROUTE } from "../../../utils/Constants";
import { localeData, defaultLanguage } from "../../../utils/Locale-Data";

const navigationItems = () => (
  <div className={Classes.newsfeed__article}>
    <span className={Classes.newsfeed__article_box1}>
      {localeData[defaultLanguage].COMMENTS}
    </span>
    <span className={Classes.newsfeed__article_box2}>
      <span className={Classes.newsfeed__article_box2_C1}>
        {localeData[defaultLanguage].VOTES_COUNT}
      </span>
      <span className={Classes.newsfeed__article_box2_C2}>
        {localeData[defaultLanguage].UP_VOTE}
      </span>
    </span>
    <span className={Classes.newsfeed__article_box3}>
      {localeData[defaultLanguage].NEWS_DETAILS}
    </span>
  </div>
);

export default navigationItems;
