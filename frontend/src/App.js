import React ,{Component} from 'react';
import { HashRouter, BrowserRouter,Route, Link, Switch } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import SignUp from "./routes/Sign_up";
import Search from "./routes/Search_result";
import Upload from "./routes/Upload";
import Artwork from "./routes/Artwork";
import Donation from "./routes/Donation";
import ArtistP from "./routes/Profile_artist";
import MyP from "./routes/Profile_my";
import "./css/App.css";
import "./css/reset.css";

class App extends React.Component {
  render() {
    let level = "pro";
    return (
      <HashRouter>
        <div id="wrap">
          <header className="header">
            <div className="logo__wrap">
              <Link to="/">Valyou</Link>
            </div>
            <div className="search__wrap">
              <input type="text" id="se.keyword" className="search_text" title="검색어 입력" maxLength="18" placeholder="작품명/예술가명 혹은 해쉬태그를 통해 검색할 수 있습니다."/>
              <button type="buttond" className="search_btn" title="검색" alt="검색" />
            </div>
            <div className="info__wrap">
              <ul className="info__btns">
                <li className="upload__btn">
                  <Link to="/upload">upload</Link>
                </li>
                <li className="alarm__btn">
                  <button className="alarm__content__btn">
                    alarm
                  </button>
                </li>
                <li className="my_btn">
                  <Link to="/my_profile">my profile</Link>
                </li>
              </ul>
            </div>
          </header>
          <div className="menu">
            <ul className="levels">
              <li className="pro">
                  Professional
              </li>
              <li className="adv">
                  Advanced
              </li>
              <li className="nov">
                  Novice
              </li>
            </ul>
            <h2 className="blind">홈</h2>
          </div>
          <Route path="/" exact={true} component={Home} />
          <Route path="/artwork" component={Artwork} />
          <Route path="/donation" component={Donation} />
          <Route path="/artist_profile" component={ArtistP} />
          <Route path="/my_profile" component={MyP} />
          <Route path="/sign_up" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/search_result" component={Search} />
          <Route path="/upload" component={Upload} />          
          <div className="footer__wrap">

          </div>
        </div>
      </HashRouter >
    );
  }
}

export default App;