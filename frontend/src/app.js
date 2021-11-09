import React, { Component } from 'react';
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

class App extends Component {
  state = {
    level: "pro",
    category: "art",
    sort: "latest",
  }
  setLevel = (target) => {
    const data = target.dataset.value;
    this.setState({ level: data, category: "art", sort: "latest" });
  };
  setCategory = (target) => {
    const data = target.dataset.value;
    this.setState({ category: data });
  }
  setSort = (target) => {
    const data = target.dataset.value;
    this.setState({ sort: data });
  }
  setDefault = () => {
    this.setState({ level: "pro", category: "art", sort: "latest" });
  }
  toResearch = (data) => {
    console.log("research", data);
  }
  render() {
    console.log("app", this.state);
    
    return (
      <>
        <HomeHeader onSearch={this.toResearch} onDefault={ this.setDefault}/>
        <HomeNavbar items={this.state} onLevel={this.setLevel} />
        <div className="main__wrap">
          <Routes>
            <Route exact path="/" element={
              <Home
              items={this.state}
              onCategory={this.setCategory}
              onSort={this.setSort}
              />
            }> </Route>
            <Route path="/artwork/:artworkId" element={<Artwork />} ></Route>
            <Route path="/donation" element={<Donation />}></Route>
            <Route path="/artist_profile/:artistId" element={<ArtistProfile />} ></Route>
            <Route path="/my_profile/*" element={<MyProfile />}></Route>
            <Route path="/sign_up" element={<SignUp />} ></Route>
            <Route path="/login"  element={<Login />}></Route>
            <Route path="/search_result" element={<Search />} ></Route>
          <Route path="/upload" element={<Upload />} ></Route>
          </Routes>
        </div>
        {/*<footer>footer</footer>*/}
      </>
    );
  }
  
}

export default App;
