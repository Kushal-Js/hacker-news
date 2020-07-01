import React, { Component } from "react";
import ReactRouterPropTypes from "react-router-prop-types";
// import { render } from 'react-dom'
import Newsitem from "../../components/newsitem/NewsItem";
import Axios from "../../utils/axios/Axios-Config";
import { FRONT_PAGE_NEWS, LATEST_NEWS } from "../../utils/ServiceURL";
import {
  LATEST_NEWS_ROUTE,
  SUCCESS_STATUS,
  PAGE_SEARCH_PARAM,
  PAGE_SEARCH_PARAM_REMOTE,
} from "../../utils/Constants";
import Aux from "../../hoc/Auxillary";
import Button from "../../components/UI/Button/Button";
import { localeData, defaultLanguage } from "../../utils/Locale-Data";
import Classes from "./Newsfeed.module.scss";
import Votes from "../votes/Votes";

class Newsfeed extends Component {
  constructor(props) {
    super(props);
    const { history } = this.props;
    this.state = {
      newsType: history.location.pathName,
      hits: null,
      page: 0,
      btnHidden: true,
      newsData: {},
    };
  }

  componentDidMount() {
    const newsData = JSON.parse(localStorage.getItem("newsData"));
    if (newsData && newsData.hits && newsData.hits.length > 0) {
      this.setState({
        hits: newsData.hits,
        page: 0,
        newsType: newsData.currentPath,
        btnHidden: newsData.btnFlag,
      });
    } else {
      this.getHackerNews(this.getPageNumber());
    }
  }

  componentDidUpdate() {
    const newsData = JSON.parse(localStorage.getItem("newsData"));
    const pNo = this.getPageNumber();
    const { history } = this.props;
    const { newsType, page } = this.state;
    // if (history.location.pathname !== newsType) {
    //     this.getHackerNews(pNo);
    // }
    this.getHackerNews(pNo);
  }

  getPageNumber() {
    const { history } = this.props;
    const pageNumber = history.location.search.split("=");
    return pageNumber[1] || 0;
  }

  getHackerNews = (pNo) => {
    const { history } = this.props;
    const currentPath = history.location.pathname;
    let newsType = FRONT_PAGE_NEWS;
    if (currentPath === LATEST_NEWS_ROUTE) {
      newsType = LATEST_NEWS;
    }
    const newsData = JSON.parse(localStorage.getItem("newsData"));
    if (newsData && newsData.page && Number(newsData.page) !== Number(pNo) && pNo) {
      Axios.get(newsType + PAGE_SEARCH_PARAM_REMOTE + Math.abs(pNo))
        .then((res) => {
          if (res.status === SUCCESS_STATUS) {
            // console.log("api called");
            this.parseNewsData(res.data, currentPath, Math.abs(pNo));
          }
        })
        .catch(() => {
          // console.log(err);
        });
    }
  };

  parseNewsData = (data, currentPath, pNo) => {
    if (data.hits.length > 0) {
      let btnFlag = false;
      // if (data.nbHits <= data.hits.length + data.hitsPerPage * data.page) {
      //   btnFlag = true;
      // }
      this.setState({
        hits: data.hits,
        page: pNo,
        newsType: currentPath,
        btnHidden: btnFlag,
      });
      const newsData = {
        hits: data.hits,
        page: pNo,
        newsType: currentPath,
        btnHidden: btnFlag,
      };
      localStorage.setItem("newsData", JSON.stringify(newsData));
    }
  };

  onMoreBtnClicked = () => {
    const newsData = JSON.parse(localStorage.getItem("newsData"));
    const { page } = newsData;
    const { history } = this.props;
    const pNo = page + 1;
    history.push({
      search: PAGE_SEARCH_PARAM + pNo,
    });
  };

  onPrevBtnClicked = () => {
    const newsData = JSON.parse(localStorage.getItem("newsData"));
    const { page } = newsData;
    const { history } = this.props;
    // console.log('previous', pNo, page);
    const pNo = page - 1;
    history.push({
      search: PAGE_SEARCH_PARAM + pNo,
    });
  };

  onClickUpVoteHandler = (objectID) => {
    const { hits } = this.state;
    const newState = [...hits];
    newState.forEach((item) => {
      if (item.objectID === objectID) {
        const matchedItem = item;
        matchedItem.points += 1;
      }
      return true;
    });
    this.setState({
      hits: newState,
    });
    const newsData = {
      hits: newState,
      page: this.state.page,
      newsType: this.state.newsType,
      btnHidden: this.state.btnHidden,
    }
    localStorage.setItem("newsData", JSON.stringify(newsData));
  };

  onHideButtonHandler = (objectID) => { 
    const { hits } = this.state;
    const newState = [...hits];
    let position = -1;
    newState.forEach((item, index) => {
      if (item.objectID === objectID) {
        position = index;
      }
      return true;
    });
    newState.splice(position, 1);
    this.setState({
      hits: newState,
    });
    const newsData = {
      hits: newState,
      page: this.state.page,
      newsType: this.state.newsType,
      btnHidden: this.state.btnHidden,
    }
    localStorage.setItem("newsData", JSON.stringify(newsData));
  };

  render() {
    const { hits, btnHidden } = this.state;
    return (
      <Aux>
        <Newsitem
          className={Classes.newsfeed}
          newsItems={hits}
          onClickedUpvote={(objectID) => this.onClickUpVoteHandler(objectID)}
          onHideClicked={(objectID) => this.onHideButtonHandler(objectID)}
        />
        <section className={Classes.paginationButtons}>
          <Button clickHandler={this.onPrevBtnClicked} show={btnHidden}>
            {localeData[defaultLanguage].PREV_BUTTON_TEXT}
          </Button>
          <span />
          <Button clickHandler={this.onMoreBtnClicked} show={btnHidden}>
            {localeData[defaultLanguage].NEXT_BUTTON_TEXT}
          </Button>
        </section>
        <Votes newsItems={hits} />
      </Aux>
    );
  }
}

Newsfeed.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default Newsfeed;
