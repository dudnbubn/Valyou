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
            <Route path="/donation" element={<Donation isLoginCheck={isLogin} />}></Route>
            <Route path="/artist_profile/:artistId" element={<ArtistProfile />} ></Route>
            <Route path="/my_profile/*" element={<MyProfile isLoginCheck={isLogin} />}></Route>
            <Route path="/sign_up" element={<SignUp />} ></Route>
            <Route path="/login" element={<Login onLogin={ this.checkLogin} />}></Route>
            <Route path="/search_result/:keyword" element={<Search />} ></Route>
            <Route path="/upload" element={<Upload isLoginCheck={isLogin}/>} ></Route>
          </Routes>
        </div>
        {/*<footer>footer</footer>*/}
      </>
    );
  }
  
}
/*
function App(){
  const [level, setLevel] = useState("pro");
  const [category, setCategory] = useState("art");
  const [sort, setSort] = useState("latest");
  const [isLogin, setLogin] = useState(false);
  console.log("app", isLogin);
  const setLevelFromOther = (target) => {
    const data = target.dataset.value;
    setLevel(data);
    setCategory("art");
    setSort("latest");
  }
  const setCategoryFromOther = (target) => {
    const data = target.dataset.value;
    setCategory(data);
    setSort("latest");
  }
  const setSortFromOther = (target) => {
    const data = target.dataset.value;
    setSort(data);
  }
  const setDefault = () => {
    setLevel("pro");
    setCategory("art");
    setSort("latest");
  }
  const goToSearch = (data) => {
    window.location.href = `/search_result/${data}`;
  }
  const checkLogin = (data) => {
    setLogin(data);
  }
  return (
      <>
      <HomeHeader onSearch={goToSearch} onDefault={setDefault}
        isLoginCheck={isLogin} onLogout={checkLogin} />
        <HomeNavbar items={{ "level": level, "category":category, "sort":sort }} onLevel={setLevelFromOther} />
        <div className="main__wrap">
          <Routes>
            <Route exact path="/" element={
              <Home
              items={{ "level": level, "category":category, "sort":sort }}
              onCategory={setCategoryFromOther}
              onSort={setSortFromOther}
              />
            }> </Route>
            <Route path="/artwork/:artworkId" element={<Artwork isLoginCheck={isLogin} />} ></Route>
            <Route path="/donation" element={<Donation isLoginCheck={isLogin} />}></Route>
            <Route path="/artist_profile/:artistId" element={<ArtistProfile />} ></Route>
            <Route path="/my_profile/*" element={<MyProfile isLoginCheck={isLogin} />}></Route>
            <Route path="/sign_up" element={<SignUp />} ></Route>
            <Route path="/login" element={<Login onLogin={ checkLogin} />}></Route>
            <Route path="/search_result/:keyword" element={<Search />} ></Route>
            <Route path="/upload" element={<Upload isLoginCheck={isLogin}/>} ></Route>
          </Routes>
        </div>
        <footer>footer</footer>
      </>
    );
}
*/
export default App;
