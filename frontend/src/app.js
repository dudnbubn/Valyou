import React, { PureComponent } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './css/app.css';
import HomeHeader from './components/homeHeader';
import HomeNavbar from './components/homeNavbar';

import Home from './routes/home';
import Artwork from './routes/artwork';
import Upload from './routes/upload';
import Login from './routes/login';
import SignUp from './routes/signUp';
import Search from './routes/search';
import Donation from './routes/donation';
import ArtistProfile from "./routes/profileArtist";
import MyProfile from './routes/profileMy';

class App extends PureComponent{
  state = {
    level: "pro",
    category: "art",
    sort: "latest",
    isLogin:false,
  }
  setLevelFromOther = (target) => {
    const data = target.dataset.value;
    this.setState({ level: data, category: "art", sort: "latest" });
  }
  setCategoryFromOther = (target) => {
    const data = target.dataset.value;
    this.setState({ category: data, sort: "latest" });
  }
  setSortFromOther = (target) => {
    const data = target.dataset.value;
    this.setState({ sort: data });
  }
  setDefault = () => {
    this.setState({ level: "pro", category: "art", sort: "latest" });
  }
  goToSearch = (data) => {
    window.location.href = `/search_result/${data}`;
  }
  checkLogin = (data) => {
    this.setState({ isLogin:data });
  }
  componentDidMount = () => {
    const temp = window.sessionStorage.getItem('nickname');
    if (temp!==null) {
      this.setState({ isLogin: true });
    } else {
      this.setState({ isLogin: false });
    }
  }
  render() {
    const { isLogin } = this.state;
    return (
      <>
      <HomeHeader onSearch={this.goToSearch} onDefault={this.setDefault}
        isLoginCheck={isLogin} onLogout={this.checkLogin} />
        <HomeNavbar items={{ "level": this.state.level, "category":this.state.category, "sort":this.state.sort }} onLevel={this.setLevelFromOther} />
        <div className="main__wrap">
          <Routes>
            <Route exact path="/" element={
              <Home
              items={{ "level": this.state.level, "category":this.state.category, "sort":this.state.sort }}
              onCategory={this.setCategoryFromOther}
              onSort={this.setSortFromOther}
              />
            }> </Route>
            <Route path="/artwork/:artworkId" element={<Artwork isLoginCheck={isLogin} />} ></Route>
            <Route path="/donation/:artistNickname" element={<Donation isLoginCheck={isLogin} />}></Route>
            <Route path="/artist_profile/:artistNickname" element={<ArtistProfile />} ></Route>
            <Route path="/my_profile/*" element={<MyProfile isLoginCheck={isLogin} />}></Route>
            <Route path="/sign_up" element={<SignUp />} ></Route>
            <Route path="/login" element={<Login onLogin={ this.checkLogin} />}></Route>
            <Route path="/search_result/:keyword" element={<Search />} ></Route>
            <Route path="/upload" element={<Upload isLoginCheck={isLogin}/>} ></Route>
          </Routes>
        </div>
        <footer>
          <div className="footer">
            <p className="footer__ment">당신의 예술을 응원하겠습니다.</p>
            <p className="copyright">본 콘텐츠의 저작권은 저자 또는 제공처에 있으며, 이를 무단 이용하는 경우 저작권법 등에 따라 법적 책임을 질 수 있습니다.</p>
          </div>
        </footer>
      </>
    );
  }
  
}
export default App;
