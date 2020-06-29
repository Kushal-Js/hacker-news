import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import Classes from './Navigation.module.scss';
import { LATEST_NEWS_ROUTE, FRONT_PAGE_ROUTE } from '../../../utils/Constants';
import { localeData, defaultLanguage } from '../../../utils/Locale-Data';

const navigationItems = () => (
  <div className={Classes.newsfeed__article}>
    {/* <NavigationItem link={FRONT_PAGE_ROUTE} exact>
      {localeData[defaultLanguage].TOP_NAVIGATION_TEXT}
    </NavigationItem>
    <NavigationItem link={LATEST_NEWS_ROUTE}>
      {localeData[defaultLanguage].NEW_NAVIGATION_TEXT}
    </NavigationItem> */}
        <span className={Classes.newsfeed__article_box1}>Comments</span>
        <span className={Classes.newsfeed__article_box2_C1}>Votes Count</span>
        <span className={Classes.newsfeed__article_box2_C2}>Up Votes</span>
        <span className={Classes.newsfeed__article_box3}>
          News Details
        </span>
  </div>
);

export default navigationItems;
